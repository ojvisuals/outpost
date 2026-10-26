import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Disclaimer from '../components/ui/Disclaimer.jsx';
import ScanArt from '../components/brand/ScanArt.jsx';
import DemoPicker from '../components/demo/DemoPicker.jsx';
import RecordRow from '../components/history/RecordRow.jsx';
import { useHistory } from '../hooks/useHistory.js';
import { STATUS, STATUS_ORDER } from '../utils/status.js';

export default function HomePage() {
  const { records } = useHistory();
  const recent = records.slice(0, 3);

  return (
    <div className="home">
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__copy">
          <h1 id="home-title" className="hero__title">Check a product before you buy it.</h1>
          <p className="lead">
            Scan the barcode, or type the NAFDAC number printed on the pack. Scana checks it against
            available registration records and tells you plainly what it found.
          </p>
          <div className="hero__actions">
            <Button to="/scan" size="lg" icon="scan">Scan product</Button>
            <Button to="/manual" size="lg" variant="secondary" icon="hash">Enter NAFDAC number</Button>
          </div>
          <p className="hero__note">Takes a few seconds. No account needed.</p>
        </div>
        <ScanArt />
      </section>

      <section className="outcomes" aria-labelledby="outcomes-title">
        <h2 id="outcomes-title" className="section-title">What you’ll see</h2>
        <ul className="outcomes__list">
          {STATUS_ORDER.map((key) => (
            <li key={key} className="outcome">
              <StatusBadge status={key} />
              <p>{STATUS[key].summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <DemoPicker />

      {recent.length > 0 && (
        <section aria-labelledby="recent-title">
          <div className="section-head">
            <h2 id="recent-title" className="section-title">Recent checks</h2>
            <Link to="/history">See all</Link>
          </div>
          <ul className="record-list">
            {recent.map((r) => (
              <RecordRow key={r.id} record={r} />
            ))}
          </ul>
        </section>
      )}

      <Disclaimer />
    </div>
  );
}
