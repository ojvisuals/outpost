const PATHS = {
  scan: <><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" /><path d="M8 9v6M12 9v6M16 9v6" /></>,
  hash: <path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16" />,
  shieldCheck: <><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01" /></>,
  searchX: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M9 9l4 4M13 9l-4 4" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>,
  home: <path d="M4 11 12 4l8 7v9H4v-9ZM10 20v-5h4v5" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  flash: <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />,
  flashOff: <><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" /><path d="M4 4l16 16" /></>,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  arrowRight: <path d="M5 12h14m-5-5 5 5-5 5" />,
  cameraOff: <><path d="M3 3l18 18" /><path d="M9 5h6l1.5 2H19a2 2 0 0 1 2 2v7M5 7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12" /></>,
  wifiOff: <path d="M3 3l18 18M5 12.5a10 10 0 0 1 3.5-2M10 6.2A15 15 0 0 1 22 9M8.5 16a5 5 0 0 1 4.2-1.4M12 20h.01" />,
  alert: <><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 10v4M12 17h.01" /></>,
  refresh: <path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5" />,
  trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
  check: <path d="m5 12 5 5 9-10" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  package: <path d="M3 8 12 3l9 5v8l-9 5-9-5V8Zm0 0 9 5 9-5M12 13v8" />,
  building: <path d="M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3" />,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12Z" /><path d="M7.5 8h.01" /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
  barcode: <path d="M4 5v14M7 5v14M11 5v14M14 5v14M18 5v14M20 5v14" />,
};

export default function Icon({ name, size = 24, strokeWidth = 1.8, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
