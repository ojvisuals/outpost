import Icon from './Icon.jsx';

const ICONS = { info: 'info', warn: 'alert', bad: 'alert', ok: 'check' };

export default function Alert({ tone = 'info', title, children }) {
  return (
    <div className={`alert alert--${tone}`} role="note">
      <Icon name={ICONS[tone]} size={22} />
      <div>
        {title && <p className="alert__title">{title}</p>}
        <div className="alert__text">{children}</div>
      </div>
    </div>
  );
}
