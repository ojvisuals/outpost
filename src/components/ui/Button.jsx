import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';

/** Renders a router link when `to` is given, otherwise a button. */
export default function Button({ to, variant = 'primary', size, block, icon, children, className = '', ...rest }) {
  const classes = ['btn', `btn--${variant}`, size && `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      {icon && <Icon name={icon} size={size === 'lg' ? 24 : 20} />}
      <span>{children}</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
