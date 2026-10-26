// The one expressive moment in the UI: a barcode being read. Decorative only.
const BARS = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 1, 4, 2, 1, 2, 3, 1, 1, 3, 2, 1, 4, 1, 2, 1, 3, 2, 1, 1, 3];

export default function ScanArt() {
  return (
    <div className="scanart" aria-hidden="true">
      <span className="scanart__corner scanart__corner--tl" />
      <span className="scanart__corner scanart__corner--tr" />
      <span className="scanart__corner scanart__corner--bl" />
      <span className="scanart__corner scanart__corner--br" />
      <div className="scanart__bars">
        {BARS.map((w, i) => (
          <span key={i} style={{ flexGrow: w }} className={i % 2 === 0 ? 'is-ink' : 'is-gap'} />
        ))}
      </div>
      <span className="scanart__beam" />
    </div>
  );
}
