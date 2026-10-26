import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarLoader from '../components/ui/BarLoader.jsx';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import StateMessage from '../components/ui/StateMessage.jsx';
import { useVerification } from '../hooks/useVerification.js';
import { historyStore } from '../services/historyStore.js';
import { normalizeInput } from '../utils/identifiers.js';

const STEPS = ['Reading the code', 'Identifying the product', 'Checking registration records'];

const ERRORS = {
  INVALID_INPUT: {
    tone: 'warn',
    icon: 'alert',
    title: 'That code doesn’t look right',
    body: (message) => message,
  },
  NETWORK: {
    tone: 'warn',
    icon: 'wifiOff',
    title: 'We can’t reach the verification service',
    body: () => 'Check your internet connection and try again. Nothing has been concluded about this product.',
  },
  UNAVAILABLE: {
    tone: 'warn',
    icon: 'package',
    title: 'Product information unavailable',
    body: () =>
      'We recognise this identifier, but there isn’t enough information to produce a result right now. This is not a sign the product is fake.',
  },
};

function Loading({ shown }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 520);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="checking" role="status" aria-live="polite">
      <BarLoader label="Checking" />
      <h1 className="checking__title">Checking this product</h1>
      <p className="checking__id">{shown}</p>
      <ol className="steps">
        {STEPS.map((label, i) => (
          <li key={label} className={i < step ? 'is-done' : i === step ? 'is-active' : ''}>
            <span className="steps__dot">{i < step && <Icon name="check" size={14} strokeWidth={3} />}</span>
            {label}
          </li>
        ))}
      </ol>
      <p className="checking__why">We’re comparing it with the registration records available to Scana.</p>
    </div>
  );
}

export default function CheckPage() {
  const { identifier } = useParams();
  const navigate = useNavigate();
  const { state, retry } = useVerification(identifier);

  useEffect(() => {
    if (state.phase === 'done') {
      historyStore.add(state.result);
      navigate(`/result/${state.result.id}`, { replace: true });
    }
  }, [state, navigate]);

  if (state.phase === 'error') {
    const cfg = ERRORS[state.code] ?? ERRORS.NETWORK;
    return (
      <div className="check-error">
        <StateMessage
          tone={cfg.tone}
          icon={cfg.icon}
          title={cfg.title}
          actions={
            <>
              {state.code !== 'INVALID_INPUT' && (
                <Button icon="refresh" onClick={retry}>Try again</Button>
              )}
              <Button to="/manual" variant={state.code === 'INVALID_INPUT' ? 'primary' : 'secondary'} icon="hash">
                Enter NAFDAC number
              </Button>
              <Button to="/scan" variant="quiet" icon="scan">Scan another product</Button>
            </>
          }
        >
          {cfg.body(state.message)}
        </StateMessage>
      </div>
    );
  }

  return <Loading shown={normalizeInput(identifier)} />;
}
