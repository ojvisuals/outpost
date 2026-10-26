import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import StateMessage from '../components/ui/StateMessage.jsx';
import RecordRow from '../components/history/RecordRow.jsx';
import { useHistory } from '../hooks/useHistory.js';
import { STATUS, STATUS_ORDER } from '../utils/status.js';

const FILTERS = [{ key: 'all', label: 'All' }, ...STATUS_ORDER.map((k) => ({ key: k, label: STATUS[k].label }))];

export default function HistoryPage() {
  const { records, clear } = useHistory();
  const [filter, setFilter] = useState('all');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const shown = filter === 'all' ? records : records.filter((r) => r.status === filter);

  return (
    <div className="history">
      <PageHeader title="History" />
      {records.length === 0 ? (
        <StateMessage
          tone="info"
          icon="history"
          title="No checks yet"
          actions={<Button to="/scan" icon="scan">Scan a product</Button>}
        >
          Products you check will show up here so you can look at them again.
        </StateMessage>
      ) : (
        <>
          <div className="filters" role="group" aria-label="Filter by result">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`chip${filter === f.key ? ' is-on' : ''}`}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          {shown.length ? (
            <ul className="record-list record-list--grid">
              {shown.map((r) => (
                <RecordRow key={r.id} record={r} />
              ))}
            </ul>
          ) : (
            <p className="empty-note">Nothing with that result yet.</p>
          )}
          <div className="history__foot">
            <p>History is saved on this device only.</p>
            <Button variant="quiet" icon="trash" onClick={() => setConfirmOpen(true)}>Clear history</Button>
          </div>
        </>
      )}

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Clear all history?"
        actions={
          <>
            <Button variant="quiet" onClick={() => setConfirmOpen(false)}>Keep it</Button>
            <Button
              onClick={() => {
                clear();
                setConfirmOpen(false);
              }}
            >
              Clear history
            </Button>
          </>
        }
      >
        <p>This removes every saved check from this device. It can’t be undone.</p>
      </Modal>
    </div>
  );
}
