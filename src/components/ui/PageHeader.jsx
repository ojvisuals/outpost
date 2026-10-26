import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';

export default function PageHeader({ title, backTo, backLabel = 'Back' }) {
  return (
    <header className="page-header">
      {backTo && (
        <Link to={backTo} className="back">
          <Icon name="chevronLeft" size={22} />
          {backLabel}
        </Link>
      )}
      <h1 className="page-header__title">{title}</h1>
    </header>
  );
}
