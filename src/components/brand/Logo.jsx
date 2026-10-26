export default function Logo({ size = 34 }) {
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#2347D6" />
        <g fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12V9.5A1.5 1.5 0 0 1 9.5 8H12M20 8h2.5A1.5 1.5 0 0 1 24 9.5V12M24 20v2.5a1.5 1.5 0 0 1-1.5 1.5H20M12 24H9.5A1.5 1.5 0 0 1 8 22.5V20" />
          <path d="m12.5 16.5 2.5 2.5 4.5-5" />
        </g>
      </svg>
      <span className="logo__word">Scana</span>
    </span>
  );
}
