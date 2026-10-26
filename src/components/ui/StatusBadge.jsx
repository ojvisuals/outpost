import Icon from './Icon.jsx';
import { STATUS } from '../../utils/status.js';

export default function StatusBadge({ status }) {
  const s = STATUS[status];
  return (
    <span className={`badge badge--${s.tone}`}>
      <Icon name={s.icon} size={18} strokeWidth={2} />
      {s.label}
    </span>
  );
}
