# Scana prototype

Frontend-only prototype of a consumer product verification app. **All results come from fictional demo data.
It is not connected to NAFDAC or GS1.**

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Camera scanning needs HTTPS or `localhost`. To test on a phone, use a tunnelling tool or deploy the build
(`npm run build`, then host `dist/` on any static host).

On browsers without `BarcodeDetector` (Safari, Firefox) the camera opens but can't decode; use the
"Demo: simulate a scan" tray or type a NAFDAC number.

## Try every outcome

Home and Scan have a demo panel. See `docs/ANALYSIS.md` §5 for the sample codes.

## Connecting real data later

1. Build a backend that accepts `{ identifier: { type, value } }` and returns a `VerificationResult`
   (`src/types/index.js`). It holds all GS1/NAFDAC credentials.
2. Set `VITE_VERIFICATION_PROVIDER=api` and `VITE_SCANA_API_URL` (public URL only).
3. Fill in `providers/apiProvider.js` if the contract changes. No page or component should need edits.

## Structure

```
src/
  components/  ui · brand · layout · scanner · result · history · demo
  pages/       one file per screen
  services/    verification (verifyProduct + providers) · historyStore
  hooks/       useVerification · useHistory · useBarcodeScanner
  data/        mockProducts · mockHistory   (DEMO ONLY)
  utils/       identifiers · format · status
  types/       JSDoc typedefs
  styles/      tokens · base · components · layout · pages
```
