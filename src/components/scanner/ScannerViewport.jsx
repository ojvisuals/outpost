import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';
import StateMessage from '../ui/StateMessage.jsx';
import BarLoader from '../ui/BarLoader.jsx';
import { useBarcodeScanner } from '../../hooks/useBarcodeScanner.js';

export default function ScannerViewport({ onDetect, onManual }) {
  const scanner = useBarcodeScanner({ onDetect });
  const { status } = scanner;

  if (status === 'denied' || status === 'unavailable') {
    const denied = status === 'denied';
    return (
      <div className="viewport viewport--message">
        <StateMessage
          tone="warn"
          icon="cameraOff"
          title={denied ? 'Camera access is off' : 'We can’t reach a camera'}
          actions={
            <>
              {denied && <Button icon="refresh" onClick={scanner.restart}>Try again</Button>}
              <Button variant="secondary" icon="hash" onClick={onManual}>Enter NAFDAC number</Button>
            </>
          }
        >
          {denied
            ? 'Scana needs your camera to read barcodes. Allow camera access for this site in your browser settings, then try again.'
            : 'This device or browser isn’t giving Scana a camera. Camera scanning also needs a secure (https) connection. You can still enter the NAFDAC number.'}
        </StateMessage>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="viewport viewport--message">
        <StateMessage
          tone="warn"
          icon="scan"
          title="We couldn’t read that code"
          actions={
            <>
              <Button icon="refresh" onClick={scanner.restart}>Scan again</Button>
              <Button variant="secondary" icon="hash" onClick={onManual}>Enter NAFDAC number</Button>
            </>
          }
        >
          Hold the phone steady, add more light, and keep the whole barcode inside the frame.
        </StateMessage>
      </div>
    );
  }

  return (
    <div className="viewport">
      <video ref={scanner.videoRef} className="viewport__video" playsInline muted aria-label="Camera view" />
      <div className="viewport__frame">
        <span className="corner corner--tl" />
        <span className="corner corner--tr" />
        <span className="corner corner--bl" />
        <span className="corner corner--br" />
        {status === 'active' && <span className="viewport__beam" />}
      </div>

      <p className="viewport__hint" role="status">
        {status === 'starting'
          ? 'Starting camera…'
          : scanner.detectionSupported
            ? 'Hold the barcode or QR code inside the frame'
            : 'This browser can’t read barcodes. Use the demo scan or enter the number.'}
      </p>

      {status === 'starting' && (
        <div className="viewport__loading">
          <BarLoader label="Starting camera" />
        </div>
      )}

      <div className="viewport__controls">
        {scanner.torchSupported && (
          <button
            type="button"
            className="icon-btn"
            onClick={scanner.toggleTorch}
            aria-pressed={scanner.torchOn}
            aria-label={scanner.torchOn ? 'Turn flashlight off' : 'Turn flashlight on'}
          >
            <Icon name={scanner.torchOn ? 'flashOff' : 'flash'} size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
