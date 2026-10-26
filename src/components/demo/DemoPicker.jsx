import { useNavigate } from 'react-router-dom';
import { DEMO_SCENARIOS } from '../../data/mockProducts.js';

/**
 * Lets people try every outcome without real products.
 * With `onPick` it acts as a "simulated scan"; without it, it goes straight to checking.
 */
export default function DemoPicker({ title = 'Try the demo', intro, onPick }) {
  const navigate = useNavigate();
  const pick = (value) => (onPick ? onPick(value) : navigate(`/check/${encodeURIComponent(value)}`));

  return (
    <section className="demo" aria-labelledby="demo-title">
      <h2 id="demo-title" className="demo__title">{title}</h2>
      <p className="demo__intro">
        {intro ?? 'This prototype uses sample products. Pick one to see how each result looks.'}
      </p>
      <ul className="demo__list">
        {DEMO_SCENARIOS.map((s) => (
          <li key={s.id}>
            <button type="button" className="demo__item" onClick={() => pick(s.value)}>
              <span className="demo__label">{s.label}</span>
              <span className="demo__outcome">Shows: {s.outcome}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
