import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import ScannerViewport from '../components/scanner/ScannerViewport.jsx';
import DemoPicker from '../components/demo/DemoPicker.jsx';
import { normalizeInput } from '../utils/identifiers.js';

export default function ScanPage() {
  const navigate = useNavigate();
  const go = useCallback(
    (raw) => navigate(`/check/${encodeURIComponent(normalizeInput(raw))}`),
    [navigate]
  );

  return (
    <div className="scan">
      <PageHeader title="Scan a product" backTo="/" backLabel="Cancel" />
      <div className="scan__layout">
        <ScannerViewport onDetect={go} onManual={() => navigate('/manual')} />
        <aside className="scan__side">
          <div>
            <h2 className="section-title">Getting a good scan</h2>
            <ul className="tips">
              <li>Keep the whole barcode or QR code inside the frame.</li>
              <li>Hold steady about 15 to 20 cm away.</li>
              <li>Use the flashlight if the pack is in shade.</li>
              <li>Flatten curved or creased labels.</li>
            </ul>
          </div>
          <Button to="/manual" variant="secondary" icon="hash" block>
            Enter NAFDAC number instead
          </Button>
          <DemoPicker
            title="Demo: simulate a scan"
            intro="No product to hand? Pick a sample to act as the scanned code."
            onPick={go}
          />
        </aside>
      </div>
    </div>
  );
}
