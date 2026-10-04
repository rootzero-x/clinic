/* @ds-bundle: {"format":3,"namespace":"FintruckDesignSystem_557fba","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"SummaryRow","sourcePath":"components/data/SummaryRow.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"DatePill","sourcePath":"components/forms/DatePill.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"SearchInput","sourcePath":"components/forms/SearchInput.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"85769819651f","components/core/Button.jsx":"57143d4a2164","components/core/Card.jsx":"41bbda467d29","components/core/IconButton.jsx":"1358bd88739a","components/data/DataTable.jsx":"1b120c9945f3","components/data/SummaryRow.jsx":"6a95df136d25","components/feedback/Callout.jsx":"fcb6945bc4b3","components/forms/Checkbox.jsx":"5f3fd4b4660b","components/forms/DatePill.jsx":"ca9b15b6d803","components/forms/Input.jsx":"0ade8baa5363","components/forms/Radio.jsx":"ea2887977fc0","components/forms/SearchInput.jsx":"f80473bcc82b","components/forms/Select.jsx":"3749a024a901","components/forms/Switch.jsx":"29457c596a56","components/forms/choiceStyles.js":"8856c3fce3ab","ui_kits/app/AppHeader.jsx":"356ddf73484d","ui_kits/app/MatchTransaction.jsx":"8110eabb034b","ui_kits/app/ResolvingSection.jsx":"658d7bdb77ee","ui_kits/app/data.js":"b4f534b68b16","ui_kits/app/icons.jsx":"3cb4db62efad"},"inlinedExternals":[],"unexposedExports":[{"name":"ensureChoiceStyles","sourcePath":"components/forms/choiceStyles.js"}]} */

(() => {

const __ds_ns = (window.FintruckDesignSystem_557fba = window.FintruckDesignSystem_557fba || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-badge-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-badge {
    display: inline-flex; align-items: center; gap: var(--space-1);
    font-family: var(--font-sans); font-size: var(--fs-xs); font-weight: var(--fw-medium);
    line-height: 1; white-space: nowrap;
    padding: 5px var(--space-2); border-radius: var(--radius-sm);
    border: var(--border-width) solid transparent;
  }
  .ft-badge--pill { border-radius: var(--radius-pill); }
  /* neutral — the default "Uncategorized Expense" chip */
  .ft-badge--neutral { background: var(--surface-raised); color: var(--text-secondary); border-color: var(--border-subtle); }
  .ft-badge--success { background: var(--success-fill); color: var(--success); }
  .ft-badge--danger  { background: var(--danger-fill); color: var(--danger); }
  .ft-badge--warning { background: var(--warning-fill); color: var(--warning); }
  .ft-badge--info    { background: var(--info-fill); color: var(--info); }
  .ft-badge--accent  { background: var(--accent-fill); color: var(--accent-text); }
  .ft-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  `;
  document.head.appendChild(el);
}
function Badge({
  tone = "neutral",
  pill = false,
  dot = false,
  className = "",
  children,
  ...rest
}) {
  useStyles();
  const cls = ["ft-badge", `ft-badge--${tone}`, pill ? "ft-badge--pill" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "ft-badge__dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component CSS once. Token-driven; no external deps. */
const STYLE_ID = "ft-button-styles";
function useButtonStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-btn {
    --_bg: var(--accent);
    --_fg: var(--text-on-accent);
    --_bd: transparent;
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--space-2);
    font-family: var(--font-sans); font-weight: var(--fw-semibold);
    font-size: var(--fs-body); line-height: 1; white-space: nowrap;
    border: var(--border-width) solid var(--_bd);
    background: var(--_bg); color: var(--_fg);
    height: var(--control-h-md); padding: 0 var(--control-px);
    border-radius: var(--radius-md); cursor: pointer;
    transition: background var(--dur-fast) var(--ease-standard),
                border-color var(--dur-fast) var(--ease-standard),
                opacity var(--dur-fast) var(--ease-standard),
                transform var(--dur-fast) var(--ease-standard);
    -webkit-font-smoothing: antialiased; text-decoration: none;
  }
  .ft-btn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
  .ft-btn:active:not(:disabled) { transform: translateY(0.5px); }
  .ft-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .ft-btn--sm { height: var(--control-h-sm); font-size: var(--fs-sm); padding: 0 var(--space-3); border-radius: var(--radius-sm); }
  .ft-btn--lg { height: var(--control-h-lg); font-size: var(--fs-h3); padding: 0 var(--space-5); }
  .ft-btn--full { width: 100%; }

  .ft-btn--primary { --_bg: var(--accent); --_fg: var(--text-on-accent); }
  .ft-btn--primary:hover:not(:disabled) { --_bg: var(--accent-hover); }
  .ft-btn--primary:active:not(:disabled) { --_bg: var(--accent-active); }

  .ft-btn--secondary { --_bg: var(--surface-raised); --_fg: var(--text-body); --_bd: var(--border-default); }
  .ft-btn--secondary:hover:not(:disabled) { --_bg: var(--gray-700); }

  .ft-btn--ghost { --_bg: transparent; --_fg: var(--text-secondary); }
  .ft-btn--ghost:hover:not(:disabled) { --_bg: var(--surface-raised); --_fg: var(--text-primary); }

  .ft-btn--danger { --_bg: transparent; --_fg: var(--danger); --_bd: var(--border-default); }
  .ft-btn--danger:hover:not(:disabled) { --_bg: var(--danger-fill); --_bd: var(--danger); }

  .ft-btn__icon { display: inline-flex; align-items: center; justify-content: center; }
  .ft-btn__icon svg { display: block; width: 1em; height: 1em; }
  `;
  document.head.appendChild(el);
}
function Button({
  variant = "primary",
  size = "md",
  leadingIcon = null,
  trailingIcon = null,
  fullWidth = false,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  useButtonStyles();
  const cls = ["ft-btn", `ft-btn--${variant}`, size !== "md" ? `ft-btn--${size}` : "", fullWidth ? "ft-btn--full" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls
  }, rest), leadingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ft-btn__icon"
  }, leadingIcon) : null, children ? /*#__PURE__*/React.createElement("span", null, children) : null, trailingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ft-btn__icon"
  }, trailingIcon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-card-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-card {
    background: var(--surface-card);
    border: var(--border-width) solid var(--border-subtle);
    border-radius: var(--radius-lg);
    color: var(--text-body);
  }
  .ft-card--inset { background: var(--surface-inset); }
  .ft-card--flush { padding: 0; }
  .ft-card--pad { padding: var(--space-5); }
  .ft-card__header { padding: var(--space-4) var(--space-5); border-bottom: var(--border-width) solid var(--border-subtle); }
  .ft-card__title { font-size: var(--fs-h3); font-weight: var(--fw-semibold); color: var(--text-primary); margin: 0; }
  .ft-card__body { padding: var(--space-5); }
  `;
  document.head.appendChild(el);
}
function Card({
  title,
  inset = false,
  padded = true,
  className = "",
  children,
  ...rest
}) {
  useStyles();
  const cls = ["ft-card", inset ? "ft-card--inset" : "", title ? "ft-card--flush" : padded ? "ft-card--pad" : "ft-card--flush", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), title ? /*#__PURE__*/React.createElement("div", {
    className: "ft-card__header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ft-card__title"
  }, title)) : null, title ? /*#__PURE__*/React.createElement("div", {
    className: "ft-card__body"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-iconbutton-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-iconbtn {
    display: inline-flex; align-items: center; justify-content: center;
    width: var(--control-h-md); height: var(--control-h-md);
    border-radius: var(--radius-md); border: var(--border-width) solid transparent;
    background: transparent; color: var(--text-secondary); cursor: pointer;
    transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard);
  }
  .ft-iconbtn:hover:not(:disabled) { background: var(--surface-raised); color: var(--text-primary); }
  .ft-iconbtn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
  .ft-iconbtn:disabled { opacity: 0.4; cursor: not-allowed; }
  .ft-iconbtn--sm { width: var(--control-h-sm); height: var(--control-h-sm); border-radius: var(--radius-sm); }
  .ft-iconbtn--lg { width: var(--control-h-lg); height: var(--control-h-lg); }
  .ft-iconbtn--solid { background: var(--surface-raised); border-color: var(--border-default); }
  .ft-iconbtn--solid:hover:not(:disabled) { background: var(--gray-700); }
  .ft-iconbtn svg { display: block; width: 18px; height: 18px; }
  `;
  document.head.appendChild(el);
}
function IconButton({
  size = "md",
  solid = false,
  label,
  className = "",
  children,
  ...rest
}) {
  useStyles();
  const cls = ["ft-iconbtn", size !== "md" ? `ft-iconbtn--${size}` : "", solid ? "ft-iconbtn--solid" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-table-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-table-wrap { width: 100%; overflow: auto; border: var(--border-width) solid var(--border-subtle); border-radius: var(--radius-md); background: var(--surface-page); }
  .ft-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: var(--fs-body); }
  .ft-table thead th {
    position: sticky; top: 0; z-index: 1;
    background: var(--surface-card); color: var(--text-secondary);
    font-weight: var(--fw-medium); font-size: var(--fs-sm); text-align: left;
    padding: var(--space-3) var(--space-4); white-space: nowrap;
    border-bottom: var(--border-width) solid var(--border-default);
  }
  .ft-table th.ft-th--right, .ft-table td.ft-td--right { text-align: right; }
  .ft-table th.ft-th--center, .ft-table td.ft-td--center { text-align: center; }
  .ft-th__btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: none; color: inherit; font: inherit; cursor: pointer; padding: 0; }
  .ft-th__btn:hover { color: var(--text-primary); }
  .ft-th__sort { color: var(--text-muted); display: inline-flex; }
  .ft-table tbody td {
    padding: var(--space-3) var(--space-4); color: var(--text-body);
    border-bottom: var(--border-width) solid var(--border-subtle);
    vertical-align: middle;
  }
  .ft-table tbody tr { transition: background var(--dur-fast) var(--ease-standard); }
  .ft-table tbody tr:hover { background: var(--surface-card); }
  .ft-table tbody tr[data-selected="true"] { background: var(--accent-fill); }
  .ft-table tbody tr:last-child td { border-bottom: none; }
  .ft-table--rowclick tbody tr { cursor: pointer; }
  .ft-td--num { font-variant-numeric: tabular-nums; }
  .ft-td--muted { color: var(--text-muted); }
  `;
  document.head.appendChild(el);
}
const SortGlyph = /*#__PURE__*/React.createElement("svg", {
  className: "ft-th__sort",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 1.5v9M6 1.5L3.5 4M6 1.5L8.5 4M6 10.5L3.5 8M6 10.5L8.5 8",
  stroke: "currentColor",
  strokeWidth: "1.1",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
function DataTable({
  columns = [],
  rows = [],
  rowKey = "id",
  selectedKey,
  onRowClick,
  className = "",
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ft-table-wrap", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("table", {
    className: ["ft-table", onRowClick ? "ft-table--rowclick" : ""].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => {
    const alignCls = c.align === "right" ? "ft-th--right" : c.align === "center" ? "ft-th--center" : "";
    return /*#__PURE__*/React.createElement("th", {
      key: c.key,
      className: alignCls,
      style: c.width ? {
        width: c.width
      } : undefined
    }, c.sortable ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "ft-th__btn",
      onClick: c.onSort
    }, SortGlyph, c.header) : c.header);
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => {
    const key = row[rowKey] ?? i;
    const selected = selectedKey != null && key === selectedKey;
    return /*#__PURE__*/React.createElement("tr", {
      key: key,
      "data-selected": selected || undefined,
      onClick: onRowClick ? () => onRowClick(row, i) : undefined
    }, columns.map(c => {
      const alignCls = c.align === "right" ? "ft-td--right" : c.align === "center" ? "ft-td--center" : "";
      const numCls = c.numeric ? "ft-td--num" : "";
      const mutedCls = c.muted ? "ft-td--muted" : "";
      return /*#__PURE__*/React.createElement("td", {
        key: c.key,
        className: [alignCls, numCls, mutedCls].filter(Boolean).join(" ")
      }, c.render ? c.render(row[c.key], row, i) : row[c.key]);
    }));
  }))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/SummaryRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-summary-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-summary { display: inline-flex; flex-direction: column; gap: var(--space-2); min-width: 280px; }
  .ft-summary__row { display: grid; grid-template-columns: 1fr auto; align-items: baseline; gap: var(--space-8); }
  .ft-summary__label { color: var(--text-secondary); font-size: var(--fs-body); }
  .ft-summary__value { color: var(--text-primary); font-size: var(--fs-body); font-variant-numeric: tabular-nums; text-align: right; }
  .ft-summary__row--total .ft-summary__label,
  .ft-summary__row--total .ft-summary__value { font-weight: var(--fw-semibold); }
  .ft-summary__row--delta .ft-summary__value { color: var(--danger); font-weight: var(--fw-semibold); }
  .ft-summary__row--delta.ft-summary__row--ok .ft-summary__value { color: var(--success); }
  .ft-summary__divider { height: 1px; background: var(--border-subtle); margin: var(--space-1) 0; }
  `;
  document.head.appendChild(el);
}
function SummaryRow({
  items = [],
  className = "",
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ft-summary", className].filter(Boolean).join(" ")
  }, rest), items.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: `d${i}`,
    className: "ft-summary__divider"
  }) : /*#__PURE__*/React.createElement("div", {
    key: it.label || i,
    className: ["ft-summary__row", it.total ? "ft-summary__row--total" : "", it.delta ? "ft-summary__row--delta" : "", it.delta && it.ok ? "ft-summary__row--ok" : ""].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("span", {
    className: "ft-summary__label"
  }, it.label), /*#__PURE__*/React.createElement("span", {
    className: "ft-summary__value"
  }, it.value))));
}
Object.assign(__ds_scope, { SummaryRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SummaryRow.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-callout-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-callout {
    --_accent: var(--accent);
    --_fill: var(--accent-fill);
    display: flex; gap: var(--space-3);
    background: var(--surface-card);
    border: var(--border-width) solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: var(--space-4) var(--space-5);
  }
  .ft-callout--success { --_accent: var(--success); --_fill: var(--success-fill); }
  .ft-callout--info    { --_accent: var(--info); --_fill: var(--info-fill); }
  .ft-callout--warning { --_accent: var(--warning); --_fill: var(--warning-fill); }
  .ft-callout--danger  { --_accent: var(--danger); --_fill: var(--danger-fill); }
  .ft-callout__icon { flex: none; color: var(--_accent); display: inline-flex; margin-top: 1px; }
  .ft-callout__icon svg { display: block; width: 18px; height: 18px; }
  .ft-callout__body { display: flex; flex-direction: column; gap: var(--space-2); min-width: 0; }
  .ft-callout__title { margin: 0; font-size: var(--fs-body); font-weight: var(--fw-semibold); color: var(--_accent); }
  .ft-callout__text { margin: 0; font-size: var(--fs-sm); color: var(--text-secondary); line-height: var(--lh-normal); }
  `;
  document.head.appendChild(el);
}
const InfoGlyph = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 18 18",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "9",
  r: "7.25",
  stroke: "currentColor",
  strokeWidth: "1.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 8v4.5",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "5.6",
  r: "1",
  fill: "currentColor"
}));
function Callout({
  tone = "success",
  title,
  icon,
  className = "",
  children,
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ft-callout", `ft-callout--${tone}`, className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ft-callout__icon"
  }, icon || InfoGlyph), /*#__PURE__*/React.createElement("div", {
    className: "ft-callout__body"
  }, title ? /*#__PURE__*/React.createElement("p", {
    className: "ft-callout__title"
  }, title) : null, children ? /*#__PURE__*/React.createElement("p", {
    className: "ft-callout__text"
  }, children) : null));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

// components/forms/DatePill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-datepill-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-datepill {
    display: inline-flex; align-items: center; gap: var(--space-3);
    height: var(--control-h-md); padding: 0 var(--space-3) 0 var(--space-4);
    background: var(--surface-inset); color: var(--text-body);
    border: var(--border-width) solid var(--border-default); border-radius: var(--radius-md);
    font-family: var(--font-sans); font-size: var(--fs-body); cursor: pointer;
    transition: border-color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard);
  }
  .ft-datepill:hover { border-color: var(--border-strong); }
  .ft-datepill:focus-visible { outline: none; border-color: var(--border-focus); box-shadow: var(--shadow-focus); }
  .ft-datepill__label { font-weight: var(--fw-medium); color: var(--text-primary); }
  .ft-datepill__value { color: var(--text-muted); }
  .ft-datepill__icon { display: inline-flex; color: var(--text-secondary); margin-left: var(--space-1); }
  `;
  document.head.appendChild(el);
}
const CalendarGlyph = /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "3",
  width: "12",
  height: "11",
  rx: "2",
  stroke: "currentColor",
  strokeWidth: "1.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 6.5h12M5.5 1.5v3M10.5 1.5v3",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round"
}));
function DatePill({
  label = "Custom",
  value = "",
  className = "",
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: ["ft-datepill", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ft-datepill__label"
  }, label), value ? /*#__PURE__*/React.createElement("span", {
    className: "ft-datepill__value"
  }, value) : null, /*#__PURE__*/React.createElement("span", {
    className: "ft-datepill__icon"
  }, CalendarGlyph));
}
Object.assign(__ds_scope, { DatePill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DatePill.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-input-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-field { display: flex; flex-direction: column; gap: var(--space-2); }
  .ft-field__label { font-size: var(--fs-xs); font-weight: var(--fw-medium); color: var(--text-secondary); }
  .ft-field__label .req { color: var(--danger); margin-left: 2px; }
  .ft-input-wrap {
    display: flex; align-items: center; gap: var(--space-2);
    background: var(--surface-inset);
    border: var(--border-width) solid var(--border-default);
    border-radius: var(--radius-md);
    height: var(--control-h-md); padding: 0 var(--control-px);
    transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
  }
  .ft-input-wrap--sm { height: var(--control-h-sm); padding: 0 var(--space-3); }
  .ft-input-wrap:hover { border-color: var(--border-strong); }
  .ft-input-wrap:focus-within { border-color: var(--border-focus); box-shadow: var(--shadow-focus); }
  .ft-input-wrap--error { border-color: var(--danger); }
  .ft-input-wrap--disabled { opacity: 0.5; pointer-events: none; }
  .ft-input {
    flex: 1; min-width: 0; background: transparent; border: none; outline: none;
    color: var(--text-primary); font-family: var(--font-sans); font-size: var(--fs-body);
  }
  .ft-input::placeholder { color: var(--text-placeholder); }
  .ft-input__icon { display: inline-flex; color: var(--text-muted); }
  .ft-input__icon svg { display: block; width: 16px; height: 16px; }
  .ft-field__hint { font-size: var(--fs-xs); color: var(--text-muted); }
  .ft-field__hint--error { color: var(--danger); }
  `;
  document.head.appendChild(el);
}
function Input({
  label,
  required = false,
  size = "md",
  leadingIcon = null,
  trailingIcon = null,
  error = false,
  hint = "",
  disabled = false,
  className = "",
  id,
  ...rest
}) {
  useStyles();
  const wrap = ["ft-input-wrap", size === "sm" ? "ft-input-wrap--sm" : "", error ? "ft-input-wrap--error" : "", disabled ? "ft-input-wrap--disabled" : ""].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: ["ft-field", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ft-field__label",
    htmlFor: id
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: wrap
  }, leadingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ft-input__icon"
  }, leadingIcon) : null, /*#__PURE__*/React.createElement("input", _extends({
    className: "ft-input",
    id: id,
    disabled: disabled
  }, rest)), trailingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ft-input__icon"
  }, trailingIcon) : null), hint ? /*#__PURE__*/React.createElement("span", {
    className: ["ft-field__hint", error ? "ft-field__hint--error" : ""].filter(Boolean).join(" ")
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SearchGlyph = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "7",
  cy: "7",
  r: "5",
  stroke: "currentColor",
  strokeWidth: "1.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M11 11l3.5 3.5",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round"
}));
function SearchInput({
  placeholder = "Search",
  size = "md",
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Input, _extends({
    type: "search",
    placeholder: placeholder,
    size: size,
    leadingIcon: SearchGlyph
  }, rest));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-select-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-select-field { display: flex; flex-direction: column; gap: var(--space-2); }
  .ft-select-field__label { font-size: var(--fs-xs); font-weight: var(--fw-medium); color: var(--text-secondary); }
  .ft-select-wrap { position: relative; display: flex; align-items: center; }
  .ft-select {
    appearance: none; -webkit-appearance: none;
    width: 100%; height: var(--control-h-md);
    padding: 0 36px 0 var(--control-px);
    background: var(--surface-inset);
    color: var(--text-primary); font-family: var(--font-sans); font-size: var(--fs-body);
    border: var(--border-width) solid var(--border-default); border-radius: var(--radius-md);
    cursor: pointer; outline: none;
    transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
  }
  .ft-select--sm { height: var(--control-h-sm); }
  .ft-select:hover { border-color: var(--border-strong); }
  .ft-select:focus-visible { border-color: var(--border-focus); box-shadow: var(--shadow-focus); }
  .ft-select:disabled { opacity: 0.5; cursor: not-allowed; }
  .ft-select__chevron { position: absolute; right: var(--space-3); pointer-events: none; color: var(--text-muted); display: inline-flex; }
  .ft-select option { background: var(--surface-overlay); color: var(--text-primary); }
  `;
  document.head.appendChild(el);
}
function Select({
  label,
  size = "md",
  id,
  className = "",
  children,
  options,
  placeholder,
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("div", {
    className: ["ft-select-field", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ft-select-field__label",
    htmlFor: id
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: "ft-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    className: ["ft-select", size === "sm" ? "ft-select--sm" : ""].filter(Boolean).join(" "),
    id: id
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options ? options.map(o => typeof o === "string" ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), /*#__PURE__*/React.createElement("span", {
    className: "ft-select__chevron"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.5 5.5L7 9l3.5-3.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "ft-switch-styles";
function useStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-switch { display: inline-flex; align-items: center; gap: var(--space-3); cursor: pointer; user-select: none; font-size: var(--fs-body); color: var(--text-body); }
  .ft-switch--disabled { opacity: 0.45; cursor: not-allowed; }
  .ft-switch > input { position: absolute; opacity: 0; width: 0; height: 0; }
  .ft-switch__track {
    position: relative; width: 38px; height: 22px; flex: none;
    background: var(--gray-700); border-radius: var(--radius-pill);
    transition: background var(--dur-base) var(--ease-standard);
  }
  .ft-switch__thumb {
    position: absolute; top: 3px; left: 3px; width: 16px; height: 16px;
    background: var(--white); border-radius: 50%;
    transition: transform var(--dur-base) var(--ease-out);
  }
  .ft-switch > input:checked ~ .ft-switch__track { background: var(--accent); }
  .ft-switch > input:checked ~ .ft-switch__track .ft-switch__thumb { transform: translateX(16px); }
  .ft-switch > input:focus-visible ~ .ft-switch__track { box-shadow: var(--shadow-focus); }
  `;
  document.head.appendChild(el);
}
function Switch({
  label,
  disabled = false,
  className = "",
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ["ft-switch", disabled ? "ft-switch--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ft-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ft-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/choiceStyles.js
try { (() => {
const STYLE_ID = "ft-choice-styles";
function ensureChoiceStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .ft-choice { display: inline-flex; align-items: center; gap: var(--space-2); cursor: pointer; font-size: var(--fs-body); color: var(--text-body); user-select: none; }
  .ft-choice--disabled { opacity: 0.45; cursor: not-allowed; }
  .ft-choice > input { position: absolute; opacity: 0; width: 0; height: 0; }
  .ft-choice__box {
    display: inline-flex; align-items: center; justify-content: center;
    width: 18px; height: 18px; flex: none;
    border: var(--border-width-strong) solid var(--border-strong);
    background: var(--surface-inset);
    transition: border-color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard);
  }
  .ft-choice__box--radio { border-radius: 50%; }
  .ft-choice__box--check { border-radius: var(--radius-xs); }
  .ft-choice:hover > input:not(:disabled) ~ .ft-choice__box { border-color: var(--accent); }
  .ft-choice > input:focus-visible ~ .ft-choice__box { box-shadow: var(--shadow-focus); }
  .ft-choice > input:checked ~ .ft-choice__box--radio { border-color: var(--accent); }
  .ft-choice > input:checked ~ .ft-choice__box--radio::after {
    content: ""; width: 9px; height: 9px; border-radius: 50%; background: var(--accent);
  }
  .ft-choice > input:checked ~ .ft-choice__box--check { background: var(--accent); border-color: var(--accent); }
  .ft-choice__tick { width: 12px; height: 12px; display: none; color: var(--text-on-accent); }
  .ft-choice > input:checked ~ .ft-choice__box--check .ft-choice__tick { display: block; }
  `;
  document.head.appendChild(el);
}
Object.assign(__ds_scope, { ensureChoiceStyles });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/choiceStyles.js", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  disabled = false,
  className = "",
  ...rest
}) {
  __ds_scope.ensureChoiceStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ["ft-choice", disabled ? "ft-choice--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ft-choice__box ft-choice__box--check"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "ft-choice__tick",
    viewBox: "0 0 12 12",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2l2.2 2.3L9.5 3.5",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  disabled = false,
  className = "",
  ...rest
}) {
  __ds_scope.ensureChoiceStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ["ft-choice", disabled ? "ft-choice--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ft-choice__box ft-choice__box--radio"
  }), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppHeader.jsx
try { (() => {
// Fintruck UI kit — top app header chrome.
function AppHeader() {
  const {
    IconButton
  } = window.FintruckDesignSystem_557fba;
  const I = window.FtIcons;
  return /*#__PURE__*/React.createElement("header", {
    style: ftHeaderStyles.bar
  }, /*#__PURE__*/React.createElement("div", {
    style: ftHeaderStyles.left
  }, /*#__PURE__*/React.createElement("span", {
    style: ftHeaderStyles.brandGlyph
  }, /*#__PURE__*/React.createElement(I.Doc, {
    size: 16
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Workspace map"
  }, /*#__PURE__*/React.createElement(I.Sitemap, null))), /*#__PURE__*/React.createElement("div", {
    style: ftHeaderStyles.right
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: ftHeaderStyles.search
  }, /*#__PURE__*/React.createElement("span", {
    style: ftHeaderStyles.searchIcon
  }, /*#__PURE__*/React.createElement(I.Search, {
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: ftHeaderStyles.searchText
  }, "Search"), /*#__PURE__*/React.createElement("span", {
    style: ftHeaderStyles.kbd
  }, "\u2318 K")), /*#__PURE__*/React.createElement(IconButton, {
    label: "Workspace map"
  }, /*#__PURE__*/React.createElement(I.Sitemap, null)), /*#__PURE__*/React.createElement(IconButton, {
    label: "Notifications"
  }, /*#__PURE__*/React.createElement(I.Bell, null)), /*#__PURE__*/React.createElement(IconButton, {
    label: "Toggle theme"
  }, /*#__PURE__*/React.createElement(I.Sun, null)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: ftHeaderStyles.help
  }, /*#__PURE__*/React.createElement(I.Help, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Help"))));
}
const ftHeaderStyles = {
  bar: {
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    background: "var(--surface-overlay)",
    borderBottom: "1px solid var(--border-subtle)",
    position: "sticky",
    top: 0,
    zIndex: 10
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  brandGlyph: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    background: "var(--accent)",
    color: "var(--text-on-accent)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "2px"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  search: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    height: "34px",
    padding: "0 10px 0 12px",
    background: "var(--surface-inset)",
    border: "1px solid var(--border-default)",
    borderRadius: "8px",
    color: "var(--text-muted)",
    cursor: "pointer",
    font: "inherit",
    marginRight: "4px"
  },
  searchIcon: {
    display: "inline-flex",
    color: "var(--text-muted)"
  },
  searchText: {
    fontSize: "13px",
    paddingRight: "60px"
  },
  kbd: {
    fontSize: "11px",
    padding: "2px 6px",
    borderRadius: "4px",
    background: "var(--surface-raised)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-secondary)"
  },
  help: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    height: "34px",
    padding: "0 10px",
    background: "transparent",
    border: "none",
    color: "var(--text-secondary)",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "var(--font-sans)"
  }
};
window.AppHeader = AppHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/MatchTransaction.jsx
try { (() => {
// Fintruck UI kit — Match Transaction screen (interactive recreation).
function MatchTransaction() {
  const NS = window.FintruckDesignSystem_557fba;
  const {
    Button,
    Badge,
    Callout,
    DataTable,
    SummaryRow,
    Radio,
    SearchInput,
    DatePill
  } = NS;
  const I = window.FtIcons;
  const money = window.ftMoney;
  const {
    bill,
    transactions
  } = window.FtData;
  const [selectedId, setSelectedId] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const selected = transactions.find(t => t.id === selectedId) || null;
  const selectedAmt = selected ? selected.amount : 0;
  const difference = +(bill.amount - selectedAmt).toFixed(2);
  const reconciled = selected && Math.abs(difference) < 0.005;
  const shortfall = selected && difference > 0; // transaction LOWER than bill → needs resolving

  const rows = transactions.filter(t => !query || (t.desc + " " + t.acct).toLowerCase().includes(query.toLowerCase()));
  const columns = [{
    key: "_sel",
    header: "",
    width: "48px",
    align: "center",
    render: (_, r) => /*#__PURE__*/React.createElement(Radio, {
      name: "match-txn",
      checked: selectedId === r.id,
      onChange: () => setSelectedId(r.id)
    })
  }, {
    key: "date",
    header: "Date",
    sortable: true,
    muted: true,
    width: "150px"
  }, {
    key: "desc",
    header: "Description"
  }, {
    key: "cat",
    header: "Sub account",
    sortable: true,
    render: v => /*#__PURE__*/React.createElement(Badge, null, v)
  }, {
    key: "by",
    header: "Categorized by",
    sortable: true,
    muted: true,
    width: "150px"
  }, {
    key: "acct",
    header: "Bank Account",
    sortable: true,
    muted: true,
    width: "200px"
  }, {
    key: "amount",
    header: "Amount",
    sortable: true,
    align: "right",
    numeric: true,
    width: "130px",
    render: v => /*#__PURE__*/React.createElement("span", null, money(v))
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: ftMatchStyles.page
  }, /*#__PURE__*/React.createElement("div", {
    style: ftMatchStyles.titleRow
  }, /*#__PURE__*/React.createElement("div", {
    style: ftMatchStyles.titleLeft
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: ftMatchStyles.back,
    "aria-label": "Back"
  }, /*#__PURE__*/React.createElement(I.ArrowLeft, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: ftMatchStyles.title
  }, "Match Transaction"), /*#__PURE__*/React.createElement("div", {
    style: ftMatchStyles.meta
  }, /*#__PURE__*/React.createElement("span", null, "Bill number: ", /*#__PURE__*/React.createElement("b", {
    style: ftMatchStyles.metaStrong
  }, bill.number)), /*#__PURE__*/React.createElement("span", null, "Vendor: ", /*#__PURE__*/React.createElement("b", {
    style: ftMatchStyles.metaStrong
  }, bill.vendor)), /*#__PURE__*/React.createElement("span", null, "Due date: ", /*#__PURE__*/React.createElement("b", {
    style: ftMatchStyles.metaStrong
  }, bill.due))))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    leadingIcon: /*#__PURE__*/React.createElement(I.Doc, {
      size: 16
    }),
    disabled: !reconciled
  }, "Match")), /*#__PURE__*/React.createElement(Callout, {
    tone: "success",
    title: "Select a transaction to match the bill with."
  }, "Pick the bank transaction that pays this bill. If the totals don't reconcile, use the resolving transactions table below to add custom journal entries."), /*#__PURE__*/React.createElement("div", {
    style: ftMatchStyles.toolbar
  }, /*#__PURE__*/React.createElement(DatePill, {
    label: "Custom",
    value: "May 1 \u2013 May 31"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "320px"
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search"
  }))), /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    rows: rows,
    selectedKey: selectedId,
    onRowClick: r => setSelectedId(r.id)
  }), /*#__PURE__*/React.createElement("div", {
    style: ftMatchStyles.summaryWrap
  }, /*#__PURE__*/React.createElement(SummaryRow, {
    items: [{
      label: "Bill amount",
      value: money(bill.amount)
    }, {
      label: "Selected transaction",
      value: selected ? money(selectedAmt) : "—"
    }, {
      divider: true
    }, {
      label: "Difference",
      value: money(Math.abs(difference)),
      delta: true,
      ok: reconciled
    }]
  })), /*#__PURE__*/React.createElement(ResolvingSection, {
    active: shortfall,
    difference: difference
  }));
}
const ftMatchStyles = {
  page: {
    maxWidth: "2400px",
    margin: "0 auto",
    padding: "24px 28px 64px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  titleRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px"
  },
  titleLeft: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px"
  },
  back: {
    background: "transparent",
    border: "none",
    color: "var(--text-secondary)",
    cursor: "pointer",
    padding: "2px",
    marginTop: "2px",
    display: "inline-flex"
  },
  title: {
    margin: 0,
    fontSize: "var(--fs-h1)",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--text-primary)"
  },
  meta: {
    display: "flex",
    gap: "20px",
    marginTop: "6px",
    fontSize: "13px",
    color: "var(--text-muted)"
  },
  metaStrong: {
    color: "var(--text-secondary)",
    fontWeight: 600
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  summaryWrap: {
    display: "flex",
    justifyContent: "flex-end"
  }
};
window.MatchTransaction = MatchTransaction;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/MatchTransaction.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ResolvingSection.jsx
try { (() => {
// Fintruck UI kit — "Add resolving transactions" section.
// Demonstrates the empty vs. active treatment: when the selected transaction is
// LOWER than the bill, a difference remains and this is the place to close it,
// so the section lifts to the accent state. Otherwise it stays quiet.
function ResolvingSection({
  active,
  difference
}) {
  const {
    Button,
    Badge
  } = window.FintruckDesignSystem_557fba;
  const I = window.FtIcons;
  const money = window.ftMoney;
  const cols = ["Transaction date", "Stakeholder", "Sub-category", "Note", "Amount"];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...ftResolveStyles.wrap,
      ...(active ? ftResolveStyles.wrapActive : null)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: ftResolveStyles.head
  }, /*#__PURE__*/React.createElement("div", {
    style: ftResolveStyles.headLeft
  }, /*#__PURE__*/React.createElement("h2", {
    style: ftResolveStyles.title
  }, "Add resolving transactions"), active ? /*#__PURE__*/React.createElement(Badge, {
    tone: "danger",
    dot: true
  }, money(Math.abs(difference)), " to reconcile") : /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Optional")), /*#__PURE__*/React.createElement(Button, {
    variant: active ? "primary" : "secondary",
    size: "sm",
    leadingIcon: /*#__PURE__*/React.createElement(I.Plus, {
      size: 16
    }),
    disabled: !active
  }, "Add row")), /*#__PURE__*/React.createElement("div", {
    style: ftResolveStyles.tableHead
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: ftResolveStyles.th
  }, c, c === "Sub-category" ? /*#__PURE__*/React.createElement("span", {
    style: ftResolveStyles.req
  }, "*") : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...ftResolveStyles.empty,
      ...(active ? ftResolveStyles.emptyActive : null)
    }
  }, active ? "Add a journal entry for the remaining " + money(Math.abs(difference)) + " (e.g. a fee, discount, or partial payment) so the bill fully reconciles." : "No resolving entries needed — select a transaction that doesn't fully cover the bill to add custom journal entries here."));
}
const ftResolveStyles = {
  wrap: {
    marginTop: "12px",
    borderTop: "1px solid var(--border-subtle)",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    opacity: 0.62,
    transition: "opacity 180ms ease"
  },
  wrapActive: {
    opacity: 1
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px"
  },
  headLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  title: {
    margin: 0,
    fontSize: "var(--fs-h2)",
    fontWeight: 600,
    color: "var(--text-primary)"
  },
  tableHead: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr 1.6fr 1fr 0.8fr",
    gap: "0",
    padding: "12px 16px",
    background: "var(--surface-card)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "8px 8px 0 0",
    fontSize: "13px",
    color: "var(--text-secondary)",
    fontWeight: 500
  },
  th: {
    whiteSpace: "nowrap"
  },
  req: {
    color: "var(--danger)",
    marginLeft: "2px"
  },
  empty: {
    padding: "20px 16px",
    border: "1px solid var(--border-subtle)",
    borderTop: "none",
    borderRadius: "0 0 8px 8px",
    background: "var(--surface-page)",
    color: "var(--text-muted)",
    fontSize: "13px",
    lineHeight: 1.5
  },
  emptyActive: {
    background: "var(--accent-fill)",
    color: "var(--text-secondary)"
  }
};
window.ResolvingSection = ResolvingSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ResolvingSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
// Fintruck UI kit — sample matching data.
window.FtData = {
  bill: {
    number: "12221",
    vendor: "Tectra Inc",
    due: "06/24/2026",
    amount: 1000.0
  },
  transactions: [{
    id: 1,
    date: "May 23, 2026",
    desc: "KFC",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid Credit Card 3333",
    amount: 500.0
  }, {
    id: 2,
    date: "May 23, 2026",
    desc: "Madison Bicycle Shop",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid Credit Card 3333",
    amount: 500.0
  }, {
    id: 3,
    date: "May 14, 2026",
    desc: "Uber 063015 SF**POOL**",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid Checking 0000",
    amount: 5.4
  }, {
    id: 4,
    date: "May 13, 2026",
    desc: "ACH Electronic Credit GUSTO PAY 123456",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid Money Market 4444",
    amount: 5850.0
  }, {
    id: 5,
    date: "May 13, 2026",
    desc: "ACH Electronic Credit GUSTO PAY 123456",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid Money Market 4444",
    amount: 5850.0
  }, {
    id: 6,
    date: "May 13, 2026",
    desc: "CD DEPOSIT .INITIAL.",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid CD 2222",
    amount: 1000.0
  }, {
    id: 7,
    date: "May 13, 2026",
    desc: "CD DEPOSIT .INITIAL.",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid CD 2222",
    amount: 1000.0
  }, {
    id: 8,
    date: "May 12, 2026",
    desc: "Touchstone Climbing",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid Credit Card 3333",
    amount: 78.5
  }, {
    id: 9,
    date: "May 12, 2026",
    desc: "Touchstone Climbing",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid Credit Card 3333",
    amount: 78.5
  }, {
    id: 10,
    date: "May 11, 2026",
    desc: "United Airlines",
    cat: "Uncategorized Expense",
    by: "Uncategorized",
    acct: "Plaid Checking 0000",
    amount: 500.0
  }]
};
window.ftMoney = n => "$" + n.toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/app/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Fintruck UI kit — line icons (1.5px, 24px grid). Exposed on window for Babel scripts.
const I = (paths, props = {}) => /*#__PURE__*/React.createElement("svg", _extends({
  viewBox: "0 0 24 24",
  fill: "none",
  width: props.size || 20,
  height: props.size || 20
}, props), paths);
const Icons = {
  Search: p => I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "6.5",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16l4 4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })), p),
  Bell: p => I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M7 9a5 5 0 0110 0c0 5 2 6 2 6H5s2-1 2-6Z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 19a2 2 0 004 0",
    stroke: "currentColor",
    strokeWidth: "1.5"
  })), p),
  Sun: p => I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })), p),
  Help: p => I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.5 9a2.5 2.5 0 014.5 1.5c0 1.5-2 2-2 3",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "16.5",
    r: "0.9",
    fill: "currentColor"
  })), p),
  Sitemap: p => I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "3",
    width: "6",
    height: "4",
    rx: "1",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "17",
    width: "6",
    height: "4",
    rx: "1",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "17",
    width: "6",
    height: "4",
    rx: "1",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v4M6 17v-2a1 1 0 011-1h10a1 1 0 011 1v2",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })), p),
  ArrowLeft: p => I(/*#__PURE__*/React.createElement("path", {
    d: "M15 5l-7 7 7 7M8 12h11",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), p),
  Doc: p => I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 2.5h7L18 7v14.5H6z",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 2.5V7h5M9 12h6M9 15.5h6",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), p),
  Plus: p => I(/*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }), p),
  Calendar: p => I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "16",
    rx: "2",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 9.5h18M8 3v4M16 3v4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })), p)
};
window.FtIcons = Icons;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.SummaryRow = __ds_scope.SummaryRow;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DatePill = __ds_scope.DatePill;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

})();
