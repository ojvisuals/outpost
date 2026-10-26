import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Disclaimer from '../components/ui/Disclaimer.jsx';
import { STATUS, STATUS_ORDER } from '../utils/status.js';

const STEPS = [
  ['Scan', 'Scan the product’s barcode or QR code with your phone camera.'],
  ['Identify', 'Scana works out which product it is.'],
  ['Verify', 'It checks the registration records available to it.'],
  ['Understand', 'You get a clear result and know what to do next.'],
];

const FAQ = [
  ['If a product isn’t verified, is it fake?', 'No. Not being verified only means Scana couldn’t confirm it from the records it can see. Barcodes can be missing from records, and records can be out of date.'],
  ['Where does the information come from?', 'In the finished product, from trusted registration records. In this demo, every result comes from made-up sample data and is not real regulatory information.'],
  ['Why can’t it read my barcode?', 'Try more light, hold the phone steady, and keep the whole code inside the frame. If it still fails, type the NAFDAC number printed on the pack.'],
  ['Does Scana save my checks?', 'Your history is saved on this device only, and you can clear it from the History screen.'],
];

export default function HelpPage() {
  return (
    <div className="help">
      <PageHeader title="How Scana works" />
      <ol className="how">
        {STEPS.map(([title, text]) => (
          <li key={title} className="how__step">
            <h2 className="how__title">{title}</h2>
            <p>{text}</p>
          </li>
        ))}
      </ol>

      <section aria-labelledby="meaning-title" className="help__section">
        <h2 id="meaning-title" className="section-title">What the results mean</h2>
        <ul className="explain">
          {STATUS_ORDER.map((key) => (
            <li key={key}>
              <StatusBadge status={key} />
              <p>{STATUS[key].body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq-title" className="help__section">
        <h2 id="faq-title" className="section-title">Common questions</h2>
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="actions">
        <Button to="/scan" icon="scan">Scan product</Button>
        <Button to="/manual" variant="secondary" icon="hash">Enter NAFDAC number</Button>
      </div>
      <Disclaimer />
    </div>
  );
}
