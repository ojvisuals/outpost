import Icon from './Icon.jsx';

/** Label/value pairs. Rows with no value are skipped. */
export default function FactList({ items }) {
  const rows = items.filter((item) => item.value);
  return (
    <dl className="facts">
      {rows.map((item) => (
        <div className="facts__row" key={item.label}>
          <dt>
            {item.icon && <Icon name={item.icon} size={18} />}
            {item.label}
          </dt>
          <dd className={item.strong ? 'is-strong' : undefined}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
