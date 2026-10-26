import { useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import Logo from '../brand/Logo.jsx';

const NAV = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/scan', label: 'Scan', icon: 'scan', primary: true },
  { to: '/history', label: 'History', icon: 'history' },
  { to: '/help', label: 'Help', icon: 'info' },
];

function NavItems({ className }) {
  return NAV.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        [className, item.primary && `${className}--primary`, isActive && 'is-active'].filter(Boolean).join(' ')
      }
    >
      <span className="navicon">
        <Icon name={item.icon} size={22} />
      </span>
      <span>{item.label}</span>
    </NavLink>
  ));
}

export default function AppShell() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  // Scanning and checking are focused tasks, so the bottom tabs step aside.
  const focusMode = /^\/(scan|check)/.test(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true }); // moves screen-reader focus to the new page
  }, [pathname]);

  return (
    <div className="app">
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus(); }}>
        Skip to content
      </a>
      <div className="banner" role="note">
        Demo prototype. Results use sample data, not live NAFDAC records.
      </div>
      <div className="shell">
        <aside className="rail">
          <Logo />
          <nav className="rail__nav" aria-label="Main">
            <NavItems className="rail__link" />
          </nav>
          <p className="rail__note">
            Scana checks a product against available registration records. It’s independent of NAFDAC and GS1.
          </p>
        </aside>
        <div className="shell__body">
          <div className="topbar">
            <Logo size={30} />
          </div>
          <main id="main" className="main" ref={mainRef} tabIndex={-1}>
            <Outlet />
          </main>
        </div>
      </div>
      <nav className={`tabbar${focusMode ? ' is-hidden' : ''}`} aria-label="Main">
        <NavItems className="tabbar__link" />
      </nav>
    </div>
  );
}
