import Icon from './Icon.jsx';

/** Full-width message for system states: errors, empty screens, permission problems. */
export default function StateMessage({ tone = 'info', icon, title, children, actions }) {
  return (
    <div className={`state state--${tone}`} role="status">
      <div className="state__icon">
        <Icon name={icon} size={34} strokeWidth={1.6} />
      </div>
      <h2 className="state__title">{title}</h2>
      <div className="state__text">{children}</div>
      {actions && <div className="state__actions">{actions}</div>}
    </div>
  );
}
