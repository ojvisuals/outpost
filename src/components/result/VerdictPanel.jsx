import Icon from '../ui/Icon.jsx';
import { STATUS } from '../../utils/status.js';
import { identifierLabel } from '../../utils/format.js';

export default function VerdictPanel({ record }) {
  const s = STATUS[record.status];
  const product = record.product;
  return (
    <section className={`verdict verdict--${s.tone}`} aria-labelledby="verdict-title">
      <div className="verdict__mark">
        <Icon name={s.icon} size={40} strokeWidth={1.7} />
      </div>
      <p className="verdict__label">{s.label}</p>
      <h2 id="verdict-title" className="verdict__headline">{s.headline}</h2>
      <p className="verdict__body">{s.body}</p>
      <p className="verdict__subject">
        {record.status === 'registered' && product ? (
          <>
            <strong>{product.name}</strong>
            {product.variant ? `, ${product.variant}` : ''}
          </>
        ) : (
          <>
            {identifierLabel(record.identifier.type)}: <strong>{record.identifier.value}</strong>
          </>
        )}
      </p>
    </section>
  );
}
