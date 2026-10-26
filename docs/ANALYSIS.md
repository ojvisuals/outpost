# Scana: pre-implementation analysis

## 1. Contradictions, gaps and risky assumptions in the spec

| # | Finding | Decision taken |
|---|---------|----------------|
| 1 | **The barcode flow can't be true "one scan" yet.** A barcode gives a GTIN, not a NAFDAC number. The GTIN → GS1 → NAFDAC chain needs both integrations. | Prototype simulates the chain with mock data. The UI shows a 3-step loading sequence that is explicitly demo-backed. |
| 2 | **Manual NAFDAC entry skips the GTIN/GS1 steps**, so "Product identified" doesn't exist on that path. | The service takes an `Identifier {type, value}` and each provider handles both types. |
| 3 | **"Not enough information" vs "Product unavailable" overlap.** Both mean "identifier known, can't confirm". | Split by cause. *Not enough information* = a product record exists but has no NAFDAC link (a result screen). *Product unavailable* = no usable record at all (a system-state screen). |
| 4 | **NAFDAC number format is unspecified.** The only example is `A1-123456`; real numbers vary in prefix and length. | Permissive pattern: 2 letters/digits, dash, 3–6 digits. Easy to tighten once NAFDAC supplies the real spec (`utils/identifiers.js`). |
| 5 | **GTIN vs NAFDAC ambiguity** for digits-only input. | Digits-only values of length 8/12/13/14 are treated as GTINs and checksum-validated; everything else is tried as a NAFDAC number. |
| 6 | **A registered number may be expired or suspended.** The spec only models "Active". | `nafdac.status` supports `active/expired/suspended/unknown`. Only `active` maps to *Registered*; handling the others is a product decision flagged for the partner phase. |
| 7 | **Real brands in mock data would look like real verdicts.** | All products, manufacturers and numbers are fictional and marked as demo data in code and in a permanent banner. |
| 8 | **Camera scanning is browser-dependent.** `BarcodeDetector` isn't in Safari/Firefox, and camera access needs HTTPS. | Hook uses `BarcodeDetector` where available; otherwise a clear message plus a "simulate a scan" tray. A decoder library (e.g. ZXing) can drop in behind the same hook. |
| 9 | **Spec lists Tailwind or CSS.** | Plain CSS with design tokens: zero build-time dependency, easier to hand over. |
| 10 | **Spec says "React" with no TypeScript requirement.** | JavaScript + JSDoc typedefs (`src/types`). Migration to TS is mechanical. |
| 11 | **No-affiliation wording.** The pitch is to NAFDAC/GS1, but the spec forbids implying partnership. | Footer/disclaimer states Scana is independent. Update deliberately if a partnership is agreed. |
| 12 | **History is "mock data".** | Seeded with sample items, then new checks persist to `localStorage`. Replaceable by Supabase later behind `historyStore`. |

## 2. Architecture

```
UI (pages/components)
   └─ hooks (useVerification, useHistory, useBarcodeScanner)
        └─ services/verification/index.js   verifyProduct(rawInput)
              ├─ providers/mockProvider.js  ← used now (demo data)
              └─ providers/apiProvider.js   ← future Scana backend (placeholder, not connected)
                    backend ─→ GS1 ─→ NAFDAC   (credentials live server-side only)
```

The UI only ever sees a `VerificationResult` (see `src/types/index.js`). Switching providers is one env var.

## 3. Screens and routes (HashRouter)

`/` Home · `/scan` Scanner · `/manual` NAFDAC entry · `/check/:identifier` Loading + error states ·
`/result/:id` Result · `/result/:id/details` Product details · `/history` · `/help`

Additional states: invalid input, scan failed, no camera permission, camera unavailable, loading,
connection error, product unavailable, empty history, result not found.

## 4. Components

- `ui/`: Button, Icon, StatusBadge, Alert, Modal (native `<dialog>`), StateMessage, BarLoader, FactList, ProductImage, PageHeader, Disclaimer
- `brand/`: Logo, ScanArt (the hero barcode-being-read motif)
- `layout/`: AppShell (top banner, desktop side rail, mobile tab bar)
- `scanner/`: ScannerViewport
- `result/`: VerdictPanel · `history/`: RecordRow · `demo/`: DemoPicker

## 5. Mock data

`src/data/mockProducts.js` (marked DEVELOPMENT / DEMO DATA ONLY). Scenarios:

| Outcome | Input |
|---|---|
| Registered | GTIN `6154000123451`, or NAFDAC `A1-123456` / `A7-205331` |
| Not enough information | GTIN `6154000456788` |
| Not verified | GTIN `6154000789015`, or NAFDAC `B4-9999` |
| Product unavailable | GTIN `6154000912345` |
| Invalid input | GTIN `6154000123450` (bad checksum), or free text |
| Connection error | GTIN `6154000000004` (demo-only trigger) |

## 6. Design system summary

- **Type:** Bricolage Grotesque (display) + Atkinson Hyperlegible (body, designed for low-vision readability).
- **Colour:** ultramarine `#2347D6`, ink navy `#0E1B2E`, cool paper `#F8FAFD`; green/amber/red reserved for results.
- **Status without colour alone:** each result has its own icon shape (shield-check, question circle, search-with-X), label, and panel treatment (solid fill / dashed border / heavy left rule).
- **Motif:** the barcode being read. Used once, on Home; everything else stays quiet.
- **Responsive:** phone tab bar → desktop side rail; two-column result, scan and details layouts from 900px.
