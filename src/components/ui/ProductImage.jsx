const TONES = {
  ochre: ['#E9B44C', '#B7791F'],
  rose: ['#E58A7B', '#B5473A'],
  sage: ['#8DBF9E', '#3F7D5A'],
  sky: ['#8FB5F2', '#2D5DB8'],
};

/** Illustration only. Real product photos will come from the data source later. */
export default function ProductImage({ tone = 'sky', label }) {
  const [light, dark] = TONES[tone] ?? TONES.sky;
  return (
    <figure className="product-image">
      <svg viewBox="0 0 160 200" role="img" aria-label={label ?? 'Product illustration'}>
        <rect x="52" y="14" width="56" height="22" rx="6" fill={dark} />
        <rect x="36" y="32" width="88" height="152" rx="16" fill={light} />
        <rect x="46" y="76" width="68" height="64" rx="8" fill="#fff" opacity="0.92" />
        <rect x="54" y="88" width="52" height="7" rx="3.5" fill={dark} />
        <rect x="54" y="102" width="38" height="5" rx="2.5" fill={dark} opacity="0.5" />
        <rect x="54" y="114" width="44" height="5" rx="2.5" fill={dark} opacity="0.5" />
        <rect x="36" y="150" width="88" height="34" rx="16" fill={dark} opacity="0.16" />
      </svg>
      <figcaption>Illustration for demo</figcaption>
    </figure>
  );
}
