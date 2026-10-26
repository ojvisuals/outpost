import { useCallback, useEffect, useRef, useState } from 'react';

const FORMATS = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'qr_code', 'data_matrix'];

/**
 * Camera + barcode detection.
 * status: starting | active | denied | unavailable | failed
 *
 * Uses the browser's BarcodeDetector where it exists (Chrome/Android, recent Edge).
 * Where it doesn't, the camera still shows but cannot decode, and the UI offers the demo tray.
 * Production option: add a decoder library such as @zxing/browser behind this same hook.
 */
export function useBarcodeScanner({ onDetect, timeoutMs = 25000 }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const onDetectRef = useRef(onDetect);
  onDetectRef.current = onDetect;

  const [status, setStatus] = useState('starting');
  const [torchSupported, setTorchSupported] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const detectionSupported = typeof window !== 'undefined' && 'BarcodeDetector' in window;

  useEffect(() => {
    let cancelled = false;
    let poll;
    let timeout;
    setStatus('starting');
    setTorchOn(false);

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus('unavailable'); // no camera API, or the page isn't served over HTTPS
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play().catch(() => {});
        }
        const track = stream.getVideoTracks()[0];
        setTorchSupported(Boolean(track?.getCapabilities?.().torch));
        setStatus('active');

        if (detectionSupported && video) {
          const detector = new window.BarcodeDetector({ formats: FORMATS });
          poll = setInterval(async () => {
            if (video.readyState < 2) return;
            try {
              const codes = await detector.detect(video);
              if (codes.length) {
                clearInterval(poll);
                clearTimeout(timeout);
                onDetectRef.current(codes[0].rawValue);
              }
            } catch {
              /* a failed frame is normal; try the next one */
            }
          }, 300);
          timeout = setTimeout(() => {
            clearInterval(poll);
            setStatus('failed');
          }, timeoutMs);
        }
      } catch (err) {
        if (cancelled) return;
        setStatus(err?.name === 'NotAllowedError' || err?.name === 'SecurityError' ? 'denied' : 'unavailable');
      }
    }

    start();
    return () => {
      cancelled = true;
      clearInterval(poll);
      clearTimeout(timeout);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [attempt, detectionSupported, timeoutMs]);

  const toggleTorch = useCallback(async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    try {
      await track.applyConstraints({ advanced: [{ torch: !torchOn }] });
      setTorchOn((on) => !on);
    } catch {
      /* torch not controllable on this device */
    }
  }, [torchOn]);

  return {
    videoRef,
    status,
    detectionSupported,
    torchSupported,
    torchOn,
    toggleTorch,
    restart: () => setAttempt((a) => a + 1),
  };
}
