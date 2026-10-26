import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import StatusBadge from '../ui/StatusBadge.jsx';
import { timeAgo, identifierLabel } from '../../utils/format.js';

export default function RecordRow({ record }) {
  const title = record.product?.name ?? `${identifierLabel(record.identifier.type)} ${record.identifier.value}`;
  return (
    <li>
      <Link to={`/result/${record.id}`} className="record">
        <span className="record__main">
          <span className="record__title">{title}</span>
          <span className="record__meta">
            {identifierLabel(record.identifier.type)} {record.identifier.value}
          </span>
        </span>
        <span className="record__side">
          <StatusBadge status={record.status} />
          <span className="record__time">{timeAgo(record.checkedAt)}</span>
        </span>
        <Icon name="chevronRight" size={20} className="record__chevron" />
      </Link>
    </li>
  );
}
