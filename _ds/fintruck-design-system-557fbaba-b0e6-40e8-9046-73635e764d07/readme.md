# Fintruck Design System

Fintruck is a **dark-themed bookkeeping / accounts-payable product**. The reference
surface is the **Match Transaction** screen: an accountant picks the bank
transaction that pays a given bill, the app shows whether the totals reconcile,
and — when they don't — a *resolving transactions* table lets them add custom
journal entries to close the gap.

The aesthetic is **calm, dense, near-black** with a **single confident green
accent** and a **soft red reserved for unreconciled deltas**. It reads like a
serious financial tool: tabular numerics, hairline dividers, quiet chrome, one
loud action per screen.

> **Sources.** This system was reconstructed from a **single product screenshot**
> (`uploads/Screenshot 2026-06-18 at 18.06.37.png`) — no codebase or Figma was
> provided. Colors were sampled directly from that image; type, spacing, and
> component behavior are inferred. Treat tokens as accurate and component details
> as a faithful-but-editable best guess. See **Caveats** at the bottom.

---

## Content fundamentals

How Fintruck writes copy, inferred from the reference screen:

- **Voice: plain, instructional, second person.** Tells the user what to do, in
  order: *"Select a transaction to match the bill with."* → *"Pick the bank
  transaction that pays this bill."* Imperative verbs lead.
- **Conditional guidance, not jargon.** Explains the *why/when*: *"If the totals
  don't reconcile, use the resolving transactions table below to add custom
  journal entries."* Accounting terms (reconcile, journal entry, sub-account) are
  used precisely but never decoratively.
- **Casing: sentence case everywhere.** Titles (*"Match Transaction"* is the one
  Title-Case exception — a page name), section headings (*"Add resolving
  transactions"*), labels (*"Bill number"*, *"Sub account"*, *"Bank Account"*),
  buttons (*"Match"*). Field labels are short noun phrases.
- **Labels are terse; values are bold.** *"Bill number: **12221**", "Vendor:
  **Tectra Inc**", "Due date: **06/24/2026**"* — muted label, emphasized value.
- **Numbers are explicit and formatted.** Currency always `$1,000.00` (thousands
  separators, two decimals). Dates as `May 23, 2026` in tables, `06/24/2026` in
  metadata.
- **No emoji. No exclamation. No marketing tone.** Required fields get a red `*`.
  Errors are stated as facts (*"Difference $500.00"*), not apologies.
- **Vibe:** competent, neutral, low-drama. The product trusts the user to know
  bookkeeping; it removes friction rather than cheerleading.

---

## Visual foundations

- **Color.** Near-black elevation ladder — `#101010` (overlay/chrome) → `#181818`
  (page) → `#1d1d1d` (inset) → `#202020` (card) → `#262626` (raised). A single
  brand **green** `#22a05f` (with `#2cb56e` hover, `#1b8a55` active, `#60d090` for
  text/links and success). One semantic **red** `#ff8787` reserved almost
  exclusively for the reconciliation **difference** and required-field markers.
  Amber/blue exist for warning/info but are used rarely. Tints are low-alpha
  fills (`14%` green, `12%` red) over the dark surface.
- **Type.** A single neo-grotesque sans (**Inter**, substitution — see Caveats).
  Compact scale: 22px page title / 18px section / 15px sub / **14px body & table
  cells** / 13–11px meta and labels. Weights 400/500/600/700. **Tabular numerics
  (`font-variant-numeric: tabular-nums`)** on every money column so decimals
  stack and amounts right-align.
- **Spacing.** 4px base grid. Generous *outer* padding (24–28px page gutters),
  tight *intra-row* rhythm (12–16px) so tables stay dense.
- **Backgrounds.** Flat dark fills only — **no gradients, no imagery, no
  texture, no patterns.** Elevation is communicated by lightening the surface a
  few percent, not by drop shadows.
- **Borders.** Hairline `1px` dividers in `#303030` (subtle) / `#484848`
  (strong). They do most of the structural work; tables separate rows with
  hairlines rather than zebra striping.
- **Corner radii.** Soft, never bubbly: `8px` default (buttons, inputs, cards),
  `6px` small controls, `12px` large panels. Pills (`999px`) only for chips/
  badges and toggles.
- **Shadows.** Minimal on dark. Real shadows appear only on floating layers
  (popovers/menus/dialogs): `0 8px 24px rgba(0,0,0,.6)`. Resting cards use border
  + surface lift, no shadow.
- **Hover / press.** Hover lightens the surface one step (`raised` → `#303030`)
  or, for primary, shifts green lighter. Press nudges `translateY(0.5px)` and
  darkens green. No scale-bounce.
- **Focus.** Visible green ring: `0 0 0 3px rgba(34,160,95,.35)` — accessibility
  is explicit, not suppressed.
- **Selection state.** A selected table row gets a **green-tinted fill**
  (`accent-fill`), not a checkbox-only cue.
- **Motion.** Restrained and fast: 120–180ms, `cubic-bezier(0.2,0,0.2,1)` for UI
  state, a gentle `ease-out` for the switch thumb. No looping/decorative
  animation. Reduced-motion safe (state is the base style).
- **Transparency / blur.** Used sparingly — low-alpha tint fills for status; no
  glassmorphism.
- **Layout.** Sticky 56px top chrome on the deep `#101010` surface; one wide
  content column with a max width; a **bottom-right reconciliation summary** as a
  fixed ledger convention; the one **primary green action lives top-right** of the
  title row.

---

## Iconography

- **Style:** single-weight **outline icons**, `1.5px` strokes, round caps & joins,
  drawn on a 24px grid. Quiet gray (`--text-secondary`) by default; they brighten
  to primary on hover. Sizes 16–22px in chrome.
- **No icon font or sprite shipped** (none was available in the source). The
  recommended CDN match is **[Lucide](https://lucide.dev)** — its stroke weight
  and geometry match the product. Substitute the closest Lucide glyph and keep
  weights consistent. *(Flagged substitution.)*
- The UI kit ships a small hand-built line-icon set (`ui_kits/app/icons.jsx`:
  search, bell, sun/theme, help, sitemap, back-arrow, document, calendar, plus)
  that approximates this style for the recreation. Swap for Lucide in production.
- **No emoji**, no unicode-glyph icons. Required fields use a red `*` (typographic,
  not an icon).

---

## Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this). `@import` lines only.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`.
- `readme.md` — this file. `SKILL.md` — portable Agent-Skill wrapper.

**Components** (`components/<group>/` — `window.FintruckDesignSystem_557fba.<Name>`)
- `core/` — **Button**, **IconButton**, **Badge**, **Card**
- `forms/` — **Input**, **SearchInput**, **Select**, **DatePill**, **Radio**, **Checkbox**, **Switch**
- `feedback/` — **Callout**
- `data/` — **DataTable**, **SummaryRow**

**UI kit** (`ui_kits/app/`)
- `index.html` — interactive **Match Transaction** screen (also a Starting Point).
  Composed from `AppHeader.jsx`, `MatchTransaction.jsx`, `ResolvingSection.jsx`,
  `icons.jsx`, `data.js`.

**Foundation cards** (`guidelines/*.card.html`) — color, type, spacing, brand
specimens shown in the Design System tab.

---

## Caveats

- **Built from one screenshot.** No codebase/Figma. Tokens (colors especially)
  are sampled and reliable; component APIs and states are a reasonable
  reconstruction, open to correction.
- **Font is a substitution.** The product face closely resembles **Inter**, used
  here as a stand-in. Provide the real typeface (and a logo) to finalize.
- **No brand logo.** The wordmark card is a placeholder.
- **Dark theme only.** The reference shows a theme toggle; a light theme can be
  layered onto the semantic tokens if wanted.
