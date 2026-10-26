import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import Alert from '../components/ui/Alert.jsx';
import FactList from '../components/ui/FactList.jsx';
import Modal from '../components/ui/Modal.jsx';
import StateMessage from '../components/ui/StateMessage.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Disclaimer from '../components/ui/Disclaimer.jsx';
import VerdictPanel from '../components/result/VerdictPanel.jsx';
import { useHistory } from '../hooks/useHistory.js';
import { STATUS_ORDER, STATUS } from '../utils/status.js';
import { formatDateTime, identifierLabel } from '../utils/format.js';

const NOT_VERIFIED_REASONS = [
  'The barcode isn’t in the records yet.',
  'The product details don’t match.',
  'The records haven’t been updated recently.',
  'The manufacturer hasn’t provided the information needed.',
  'This kind of product isn’t covered by the records we use.',
];

export default function ResultPage() {
  const { id } = useParams();
  const { records } = useHistory();
  const [explainOpen, setExplainOpen] = useState(false);
  const record = records.find((r) => r.id === id);

  if (!record) {
    return (
      <StateMessage
        tone="info"
        icon="history"
        title="We can’t find that result"
        actions={<Button to="/scan" icon="scan">Scan a product</Button>}
      >
        It may have been cleared from your history.
      </StateMessage>
    );
  }

  const { status, product, nafdac, identifier } = record;
  const recheck = `/check/${encodeURIComponent(identifier.value)}`;

  return (
    <div className="result">
      <PageHeader title="Result" backTo="/" backLabel="Home" />
      <div className="result__grid">
        <VerdictPanel record={record} />

        <div className="result__detail">
          {status === 'registered' && (
            <>
              <section className="panel" aria-labelledby="confirmed-title">
                <h2 id="confirmed-title" className="section-title">What we confirmed</h2>
                <FactList
                  items={[
                    { label: 'Product', value: product?.name, strong: true },
                    { label: 'Manufacturer', value: product?.manufacturer },
                    { label: 'NAFDAC number', value: nafdac?.number, strong: true },
                    { label: 'Registration status', value: nafdac?.status === 'active' ? 'Active' : nafdac?.status },
                    { label: 'Category', value: product?.category },
                  ]}
                />
                <Button to={`/result/${record.id}/details`} variant="secondary" block>View full product details</Button>
              </section>
              <Alert tone="info" title="Compare it with the pack">
                Check that the name and NAFDAC number above match what’s printed on the product in your hand.
                If they differ, be cautious.
              </Alert>
            </>
          )}

          {status === 'insufficient' && (
            <>
              {product && (
                <section className="panel" aria-labelledby="found-title">
                  <h2 id="found-title" className="section-title">What we found</h2>
                  <FactList
                    items={[
                      { label: 'Product', value: product.name, strong: true },
                      { label: 'Manufacturer', value: product.manufacturer },
                      { label: identifierLabel(identifier.type), value: identifier.value },
                    ]}
                  />
                  <p className="panel__note">The record we found doesn’t include a NAFDAC registration number to check.</p>
                </section>
              )}
              <section aria-labelledby="try-title">
                <h2 id="try-title" className="section-title">What you can try</h2>
                <ul className="next-list">
                  <li>Find the NAFDAC number printed on the pack and enter it yourself.</li>
                  <li>Scan the barcode again, or scan a different code on the pack.</li>
                  <li>Check that the name and details on the pack look right.</li>
                </ul>
              </section>
              <div className="actions">
                <Button to="/manual" icon="hash">Enter NAFDAC number</Button>
                <Button to="/scan" variant="secondary" icon="scan">Scan again</Button>
                <Button to={recheck} variant="quiet" icon="refresh">Try again</Button>
              </div>
            </>
          )}

          {status === 'not_verified' && (
            <>
              <section aria-labelledby="why-title">
                <h2 id="why-title" className="section-title">Why this can happen</h2>
                <ul className="next-list">
                  {NOT_VERIFIED_REASONS.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </section>
              <Alert tone="warn" title="This is not an accusation">
                Scana can only report what it found in the records available. If you’re unsure about a product,
                check the pack for a NAFDAC number, ask the seller, or contact NAFDAC through its official channels.
              </Alert>
              <div className="actions">
                <Button to="/manual" icon="hash">Enter NAFDAC number</Button>
                <Button to="/scan" variant="secondary" icon="scan">Scan again</Button>
              </div>
            </>
          )}

          <section className="meta" aria-label="Check details">
            <FactList
              items={[
                { label: identifierLabel(identifier.type), value: identifier.value, icon: 'barcode' },
                { label: 'Checked', value: formatDateTime(record.checkedAt), icon: 'clock' },
                { label: 'Data source', value: record.source.label, icon: 'info' },
              ]}
            />
          </section>

          <div className="result__foot">
            {status === 'registered' && <Button to="/scan" icon="scan">Check another product</Button>}
            <Button variant="ghost" icon="info" onClick={() => setExplainOpen(true)}>What do these results mean?</Button>
          </div>
        </div>
      </div>
      <Disclaimer />

      <Modal
        open={explainOpen}
        onClose={() => setExplainOpen(false)}
        title="What the results mean"
        actions={<Button onClick={() => setExplainOpen(false)}>Got it</Button>}
      >
        <ul className="explain">
          {STATUS_ORDER.map((key) => (
            <li key={key}>
              <StatusBadge status={key} />
              <p>{STATUS[key].body}</p>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
