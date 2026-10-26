import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import { classifyIdentifier } from '../utils/identifiers.js';

export default function ManualPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const parsed = classifyIdentifier(value);
    if (!parsed.ok) {
      setError(parsed.message);
      return;
    }
    if (parsed.type !== 'nafdac') {
      setError('That looks like a barcode number. Use Scan for barcodes, or enter the NAFDAC number printed on the pack.');
      return;
    }
    navigate(`/check/${encodeURIComponent(parsed.value)}`);
  }

  return (
    <div className="manual">
      <PageHeader title="Enter NAFDAC number" backTo="/" backLabel="Back" />
      <div className="manual__layout">
        <form className="manual__form" onSubmit={submit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="nafdac">NAFDAC registration number</label>
            <p className="field__hint" id="nafdac-hint">
              Look for “NAFDAC Reg. No.” on the label or carton. Example: A1-123456
            </p>
            <input
              id="nafdac"
              className="input"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError('');
              }}
              placeholder="A1-123456"
              autoCapitalize="characters"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              aria-describedby={error ? 'nafdac-hint nafdac-error' : 'nafdac-hint'}
              aria-invalid={error ? 'true' : undefined}
            />
            {error && (
              <p className="field__error" id="nafdac-error" role="alert">
                <Icon name="alert" size={20} />
                {error}
              </p>
            )}
          </div>
          <Button size="lg" block icon="shieldCheck" type="submit">Verify</Button>
          <Button to="/scan" variant="ghost" icon="scan" block>Scan the barcode instead</Button>
        </form>

        <aside className="manual__side">
          <h2 className="section-title">Format guide</h2>
          <ul className="tips">
            <li>Two letters or digits, a dash, then 3 to 6 digits.</li>
            <li>Capital letters and spaces don’t matter. We tidy them for you.</li>
            <li>Copy it exactly as printed. Don’t add words like “Reg. No.”.</li>
          </ul>
          <div className="demo-numbers">
            <p className="demo-numbers__title">Demo numbers</p>
            <button type="button" className="chip" onClick={() => { setValue('A1-123456'); setError(''); }}>A1-123456</button>
            <button type="button" className="chip" onClick={() => { setValue('B4-9999'); setError(''); }}>B4-9999</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
