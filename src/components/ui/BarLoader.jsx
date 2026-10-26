export default function BarLoader({ label = 'Loading' }) {
  return (
    <div className="barloader" role="img" aria-label={label}>
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} style={{ '--i': i }} />
      ))}
    </div>
  );
}
