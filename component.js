const { useState, useEffect, useMemo, useRef } = React;
const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } = Recharts;
const CATEGORIES = [
  { id: "food", ar: "\u0623\u0643\u0644", en: "Food", icon: "\u{1F37D}\uFE0F", color: "#7CB342" },
  { id: "transport", ar: "\u0645\u0648\u0627\u0635\u0644\u0627\u062A", en: "Transport", icon: "\u{1F697}", color: "#455A64" },
  { id: "bills", ar: "\u0641\u0648\u0627\u062A\u064A\u0631", en: "Bills", icon: "\u{1F3E0}", color: "#8D6E63" },
  { id: "grocery", ar: "\u062E\u0636\u0627\u0631 \u0648\u0641\u0627\u0643\u0647\u0629", en: "Groceries", icon: "\u{1F6D2}", color: "#7CB342" },
  { id: "meat", ar: "\u0644\u062D\u0648\u0645 \u0648\u0641\u0631\u0627\u062E", en: "Meat & Poultry", icon: "\u{1F357}", color: "#E64A3B" },
  { id: "health", ar: "\u0635\u062D\u0629", en: "Health", icon: "\u{1F48A}", color: "#7E57C2" },
  { id: "fun", ar: "\u062A\u0631\u0641\u064A\u0647", en: "Fun", icon: "\u{1F389}", color: "#26A69A" },
  { id: "edu", ar: "\u062A\u0639\u0644\u064A\u0645", en: "Education", icon: "\u{1F4DA}", color: "#5C6BC0" },
  { id: "shopping", ar: "\u062A\u0633\u0648\u0642", en: "Shopping", icon: "\u{1F6CD}\uFE0F", color: "#EC407A" },
  { id: "car", ar: "\u0633\u064A\u0627\u0631\u0629", en: "Car", icon: "\u{1F699}", color: "#546E7A" },
  { id: "fuel", ar: "\u0628\u0646\u0632\u064A\u0646", en: "Fuel", icon: "\u26FD", color: "#F57C00" },
  { id: "maintenance", ar: "\u0635\u064A\u0627\u0646\u0629", en: "Maintenance", icon: "\u{1F527}", color: "#6D4C41" },
  { id: "other", ar: "\u0645\u0635\u0627\u0631\u064A\u0641 \u0623\u062E\u0631\u0649", en: "Other", icon: "\u25A6", color: "#9E9E9E" }
];
const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
const LINE_ICON_IDS = /* @__PURE__ */ new Set([
  "food",
  "transport",
  "bills",
  "grocery",
  "meat",
  "health",
  "fun",
  "edu",
  "shopping",
  "car",
  "fuel",
  "maintenance",
  "other"
]);
function CategoryIcon({ id, size = 18, color = "currentColor", strokeWidth = 1.7 }) {
  const p = { fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const body = (() => {
    switch (id) {
      case "food":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M6 2v6a2 2 0 0 0 4 0V2" }), /* @__PURE__ */ React.createElement("path", { d: "M8 2v20" }), /* @__PURE__ */ React.createElement("path", { d: "M18 2c-2 0-3 2-3 5s1 4 3 4v11" }));
      case "transport":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "6", width: "18", height: "10", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 11h18" }), /* @__PURE__ */ React.createElement("circle", { cx: "7.5", cy: "18", r: "1.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "16.5", cy: "18", r: "1.4" }));
      case "bills":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 11 12 4l8 7" }), /* @__PURE__ */ React.createElement("path", { d: "M6 10v9h12v-9" }), /* @__PURE__ */ React.createElement("path", { d: "M10 19v-5h4v5" }));
      case "grocery":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "20", r: "1.3" }), /* @__PURE__ */ React.createElement("circle", { cx: "17", cy: "20", r: "1.3" }), /* @__PURE__ */ React.createElement("path", { d: "M3 4h2l2.2 11.6a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" }));
      case "meat":
        return /* @__PURE__ */ React.createElement("path", { d: "M13 4c-3 0-5.5 2.5-6.5 5.5C5.5 12.5 3 14 3 17a3 3 0 0 0 3 3c1.8 0 2.6-1 3.5-2.3C11 19 13 18.5 15 16.5c3-3 5-8 2-11-1-1-2.5-1.5-4-1.5Z" });
      case "health":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M6.5 17.5a5 5 0 0 1 0-7l4-4a5 5 0 0 1 7 7l-4 4a5 5 0 0 1-7 0Z" }), /* @__PURE__ */ React.createElement("path", { d: "M10 8 16 14" }));
      case "fun":
        return /* @__PURE__ */ React.createElement("path", { d: "M12 2l2.4 6.9L21 11l-6.6 2.1L12 20l-2.4-6.9L3 11l6.6-2.1z" });
      case "edu":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 5c2-1 5-1 8 0v14c-3-1-6-1-8 0V5Z" }), /* @__PURE__ */ React.createElement("path", { d: "M20 5c-2-1-5-1-8 0v14c3-1 6-1 8 0V5Z" }));
      case "shopping":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M6 8h12l-1 12H7L6 8Z" }), /* @__PURE__ */ React.createElement("path", { d: "M9 8V6a3 3 0 0 1 6 0v2" }));
      case "car":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 16v-3l2-4a2 2 0 0 1 2-1.3h10a2 2 0 0 1 2 1.3l2 4v3" }), /* @__PURE__ */ React.createElement("path", { d: "M3 16h18" }), /* @__PURE__ */ React.createElement("circle", { cx: "7", cy: "17", r: "1.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "17", cy: "17", r: "1.5" }));
      case "fuel":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 21V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15" }), /* @__PURE__ */ React.createElement("path", { d: "M4 21h9" }), /* @__PURE__ */ React.createElement("path", { d: "M7 6h4" }), /* @__PURE__ */ React.createElement("path", { d: "M13 9h2l2 2v6a1.5 1.5 0 0 0 3 0v-5l-2-2" }));
      case "maintenance":
        return /* @__PURE__ */ React.createElement("path", { d: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z" });
      case "other":
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "4", y: "4", width: "6", height: "6", rx: "1.2" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "4", width: "6", height: "6", rx: "1.2" }), /* @__PURE__ */ React.createElement("rect", { x: "4", y: "14", width: "6", height: "6", rx: "1.2" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "14", width: "6", height: "6", rx: "1.2" }));
      default:
        return null;
    }
  })();
  if (!body) return null;
  return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", ...p, style: { flexShrink: 0 } }, body);
}
function CatIconOrEmoji({ c, size, color }) {
  return /* @__PURE__ */ React.createElement("span", { style: { fontSize: size } }, c.icon);
}
const CUSTOM_ICON_CHOICES = ["\u{1F37D}\uFE0F", "\u{1F697}", "\u{1F3E0}", "\u{1F6D2}", "\u{1F357}", "\u{1F48A}", "\u{1F389}", "\u{1F4DA}", "\u{1F6CD}\uFE0F", "\u25A6", "\u26FD", "\u{1FA7A}", "\u{1F354}", "\u{1F58A}\uFE0F", "\u{1FA99}"];
function PatternPad({ onComplete, accentColor, errorColor, errorPulse }) {
  const [path, setPath] = useState([]);
  const [pos, setPos] = useState(null);
  const padRef = useRef(null);
  const draggingRef = useRef(false);
  const SIZE = 260;
  const PAD = 40;
  const STEP = (SIZE - PAD * 2) / 2;
  function dotCenter(i) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    return { x: PAD + col * STEP, y: PAD + row * STEP };
  }
  function pointFromEvent(e) {
    const rect = padRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) / rect.width * SIZE, y: (clientY - rect.top) / rect.height * SIZE };
  }
  function nearestDot(pt) {
    for (let i = 0; i < 9; i++) {
      const c = dotCenter(i);
      if (Math.hypot(c.x - pt.x, c.y - pt.y) < 26) return i;
    }
    return null;
  }
  function handleStart(e) {
    e.preventDefault();
    draggingRef.current = true;
    const pt = pointFromEvent(e);
    const hit = nearestDot(pt);
    setPath(hit != null ? [hit] : []);
    setPos(pt);
  }
  function handleMove(e) {
    if (!draggingRef.current) return;
    e.preventDefault();
    const pt = pointFromEvent(e);
    setPos(pt);
    const hit = nearestDot(pt);
    setPath((prev) => hit != null && !prev.includes(hit) ? [...prev, hit] : prev);
  }
  function handleEnd() {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setPos(null);
    onComplete(path);
    setPath([]);
  }
  const color = errorPulse ? errorColor : accentColor;
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      ref: padRef,
      width: SIZE,
      height: SIZE,
      viewBox: `0 0 ${SIZE} ${SIZE}`,
      style: { touchAction: "none", userSelect: "none" },
      onMouseDown: handleStart,
      onMouseMove: handleMove,
      onMouseUp: handleEnd,
      onMouseLeave: handleEnd,
      onTouchStart: handleStart,
      onTouchMove: handleMove,
      onTouchEnd: handleEnd
    },
    path.length > 1 && /* @__PURE__ */ React.createElement(
      "polyline",
      {
        points: path.map((i) => {
          const c = dotCenter(i);
          return `${c.x},${c.y}`;
        }).join(" "),
        fill: "none",
        stroke: color,
        strokeWidth: "4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    path.length > 0 && pos && /* @__PURE__ */ React.createElement(
      "line",
      {
        x1: dotCenter(path[path.length - 1]).x,
        y1: dotCenter(path[path.length - 1]).y,
        x2: pos.x,
        y2: pos.y,
        stroke: color,
        strokeWidth: "4",
        strokeLinecap: "round"
      }
    ),
    Array.from({ length: 9 }).map((_, i) => {
      const c = dotCenter(i);
      const active = path.includes(i);
      return /* @__PURE__ */ React.createElement("g", { key: i }, /* @__PURE__ */ React.createElement("circle", { cx: c.x, cy: c.y, r: "22", fill: "none", stroke: active ? color : "#D8DCE3", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: c.x, cy: c.y, r: active ? 9 : 6, fill: active ? color : "#C7CCD6" }));
    })
  );
}
const CUSTOM_COLOR_PALETTE = ["#EF6C00", "#00897B", "#5E35B1", "#3949AB", "#C0CA33", "#D81B60", "#00ACC1", "#6D4C41"];
const MONTH_NAMES = {
  ar: ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
const ADSENSE_CLIENT = "";
const ADSENSE_SLOT = "";
const CURRENCIES = [
  { code: "EGP", ar: "\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A", en: "Egyptian Pound" },
  { code: "USD", ar: "\u062F\u0648\u0644\u0627\u0631 \u0623\u0645\u0631\u064A\u0643\u064A", en: "US Dollar" },
  { code: "SAR", ar: "\u0631\u064A\u0627\u0644 \u0633\u0639\u0648\u062F\u064A", en: "Saudi Riyal" },
  { code: "KWD", ar: "\u062F\u064A\u0646\u0627\u0631 \u0643\u0648\u064A\u062A\u064A", en: "Kuwaiti Dinar" },
  { code: "AED", ar: "\u062F\u0631\u0647\u0645 \u0625\u0645\u0627\u0631\u0627\u062A\u064A", en: "UAE Dirham" }
];
const THEME_COLORS = {
  blue: { name: { ar: "\u0623\u0632\u0631\u0642", en: "Blue" }, from: "#3A7BF2", to: "#2159C7", accent: "#2F6FEB", soft: "rgba(47,111,235,0.4)", gaugeDark: "#123E8F" },
  green: { name: { ar: "\u0623\u062E\u0636\u0631", en: "Green" }, from: "#4CAF50", to: "#1B5E20", accent: "#2E9E5B", soft: "rgba(46,158,91,0.4)", gaugeDark: "#0F3D12" },
  orange: { name: { ar: "\u0628\u0631\u062A\u0642\u0627\u0644\u064A", en: "Orange" }, from: "#FB8C00", to: "#D84315", accent: "#F4791F", soft: "rgba(244,121,31,0.4)", gaugeDark: "#C1440E" },
  gray: { name: { ar: "\u0631\u0635\u0627\u0635\u064A", en: "Gray" }, from: "#78909C", to: "#37474F", accent: "#607D8B", soft: "rgba(96,125,139,0.4)", gaugeDark: "#22292D" },
  purple: { name: { ar: "\u0628\u0646\u0641\u0633\u062C\u064A", en: "Purple" }, from: "#8E5FE8", to: "#5B2C9E", accent: "#7C4DDC", soft: "rgba(124,77,220,0.4)", gaugeDark: "#4A1F7A" }
};
const TXT = {
  ar: {
    totalBalance: "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0628\u0642\u064A",
    expense: "\u0645\u0635\u0631\u0648\u0641",
    income: "\u062F\u062E\u0644",
    search: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A",
    noTxBefore: "\u0644\u0625\u0636\u0627\u0641\u0629 \u0645\u0639\u0627\u0645\u0644\u0629 \u0627\u0636\u063A\u0637",
    noTxAfter: "",
    resetAll: "\u0627\u0645\u0633\u062D \u0643\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A",
    resetConfirm: "\u0645\u062A\u0623\u0643\u062F\u061F \u0627\u0644\u062D\u0631\u0643\u0629 \u062F\u064A \u0645\u0634 \u0647\u062A\u0631\u062C\u0639.",
    yesReset: "\u0622\u0647\u060C \u0627\u0645\u0633\u062D",
    noReset: "\u0644\u0623",
    planner: "\u0627\u0644\u0645\u062E\u0637\u0637",
    schedule: "\u062C\u062F\u0648\u0644",
    debt: "\u062F\u064A\u0646",
    home: "\u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
    plannerTitle: "\u0645\u062E\u0637\u0637 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A",
    noExpensesMonth: "\u0644\u0633\u0647 \u0645\u0641\u064A\u0634 \u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0641\u064A \u0627\u0644\u0634\u0647\u0631 \u062F\u0647.",
    addExpense: "\u0623\u0636\u0641 \u0627\u0644\u0645\u0635\u0631\u0648\u0641",
    addIncome: "\u0623\u0636\u0641 \u0627\u0644\u062F\u062E\u0644",
    saving: "\u0628\u064A\u062D\u0641\u0638...",
    amountPlaceholder: "\u0627\u0644\u0645\u0628\u0644\u063A",
    notePlaceholder: "\u0645\u0644\u0627\u062D\u0638\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",
    amountErr: "\u0627\u0643\u062A\u0628 \u0645\u0628\u0644\u063A \u0635\u062D\u064A\u062D \u0623\u0643\u0628\u0631 \u0645\u0646 \u0635\u0641\u0631",
    loading: "\u0628\u064A\u062A\u062D\u0645\u0651\u0644...",
    loadErr: "\u0645\u0634 \u0642\u0627\u062F\u0631 \u0623\u0641\u062A\u062D \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629",
    language: "\u0627\u0644\u0644\u063A\u0629",
    settings: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",
    appColor: "\u0644\u0648\u0646 \u0627\u0644\u062A\u0637\u0628\u064A\u0642",
    arabic: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    english: "English",
    backup: "\u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629",
    backupHint: "\u0646\u0632\u0651\u0644 \u0646\u0633\u062E\u0629 \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0639\u0644\u0649 \u062C\u0647\u0627\u0632\u0643",
    restoreBackup: "\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629",
    restoreHint: "\u0631\u062C\u0651\u0639 \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0645\u0646 \u0645\u0644\u0641 \u0646\u0632\u0651\u0644\u062A\u0647 \u0642\u0628\u0644 \u0643\u062F\u0647",
    restoreSuccess: "\u062A\u0645 \u0627\u0633\u062A\u0631\u062C\u0627\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D",
    restoreError: "\u0627\u0644\u0645\u0644\u0641 \u062F\u0647 \u0645\u0634 \u0646\u0633\u062E\u0629 \u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0635\u062D\u064A\u062D\u0629",
    incomeListTitle: "\u0627\u0644\u062F\u062E\u0644",
    noIncomeMonth: "\u0644\u0633\u0647 \u0645\u0641\u064A\u0634 \u062F\u062E\u0644 \u0645\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u0634\u0647\u0631 \u062F\u0647.",
    lowBalanceWarning: "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0628\u0642\u064A \u0623\u0642\u0644 \u0645\u0646 \u0661\u0660\u0660\u0660",
    currency: "\u0627\u0644\u0639\u0645\u0644\u0629",
    newCategory: "\u0641\u0626\u0629 \u062C\u062F\u064A\u062F\u0629",
    newCategoryName: "\u0627\u0633\u0645 \u0627\u0644\u0641\u0626\u0629",
    newCategorySave: "\u0625\u0636\u0627\u0641\u0629",
    cancel: "\u0625\u0644\u063A\u0627\u0621",
    detailCategory: "\u0641\u0626\u0629",
    detailAmount: "\u0645\u0642\u062F\u0627\u0631",
    detailDate: "\u062A\u0627\u0631\u064A\u062E",
    detailNote: "\u0645\u0644\u0627\u062D\u0638\u0629",
    edit: "\u064A\u062D\u0631\u0631",
    saveChanges: "\u0627\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644",
    noNote: "\u0628\u062F\u0648\u0646 \u0645\u0644\u0627\u062D\u0638\u0629",
    monthStart: "\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0634\u0647\u0631 (\u064A\u0648\u0645)",
    monthStartHint: "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0628\u0642\u064A \u0628\u064A\u062A\u0631\u062D\u0651\u0644 \u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0644\u0634\u0647\u0631 \u0627\u0644\u062C\u062F\u064A\u062F",
    notifications: "\u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A",
    appLock: "\u0642\u0641\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642",
    appLockHint: "\u0627\u0637\u0644\u0628 \u0646\u0645\u0637 \u0623\u0648 \u0628\u0635\u0645\u0629 \u0643\u0644 \u0645\u0627 \u062A\u0641\u062A\u062D \u0627\u0644\u062A\u0637\u0628\u064A\u0642",
    setPatternTitle: "\u0627\u0631\u0633\u0645 \u0646\u0645\u0637 \u0627\u0644\u0642\u0641\u0644",
    confirmPatternTitle: "\u0623\u0639\u062F \u0631\u0633\u0645 \u0627\u0644\u0646\u0645\u0637 \u0644\u0644\u062A\u0623\u0643\u064A\u062F",
    patternTooShort: "\u0644\u0627\u0632\u0645 \u062A\u0648\u0635\u0644 \u0664 \u0646\u0642\u0637 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",
    patternMismatch: "\u0627\u0644\u0646\u0645\u0637 \u0645\u0634 \u0645\u062A\u0637\u0627\u0628\u0642\u060C \u062D\u0627\u0648\u0644 \u062A\u0627\u0646\u064A",
    unlockTitle: "\u0627\u0631\u0633\u0645 \u0627\u0644\u0646\u0645\u0637 \u0644\u0641\u062A\u062D \u0627\u0644\u062A\u0637\u0628\u064A\u0642",
    wrongPattern: "\u0646\u0645\u0637 \u063A\u0644\u0637\u060C \u062D\u0627\u0648\u0644 \u062A\u0627\u0646\u064A",
    useFingerprint: "\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0628\u0635\u0645\u0629",
    addFingerprintQ: "\u062A\u062D\u0628 \u062A\u0636\u064A\u0641 \u0641\u062A\u062D \u0628\u0627\u0644\u0628\u0635\u0645\u0629 \u0643\u0645\u0627\u0646\u061F",
    fingerprintAdded: "\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0628\u0635\u0645\u0629",
    skip: "\u062A\u062E\u0637\u064A",
    tryAgain: "\u062D\u0627\u0648\u0644 \u062A\u0627\u0646\u064A",
    disableLockConfirm: "\u0645\u062A\u0623\u0643\u062F \u0639\u0627\u064A\u0632 \u062A\u0634\u064A\u0644 \u0642\u0641\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u061F",
    more: "\u0627\u0644\u0645\u0632\u064A\u062F",
    schedules: "\u062C\u062F\u0627\u0648\u0644",
    tabCurrent: "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u062D\u0627\u0644\u064A",
    tabPast: "\u0627\u0644\u0634\u0647\u0648\u0631 \u0627\u0644\u0645\u0627\u0636\u064A\u0629",
    tabYears: "\u0627\u0644\u0633\u0646\u0648\u0627\u062A",
    tabCustom: "\u0645\u062E\u0635\u0635",
    tabFacts: "\u062D\u0642\u0627\u0626\u0642 \u0645\u0627\u0644\u064A\u0629",
    fromDate: "\u0645\u0646",
    toDate: "\u0625\u0644\u0649",
    factAllExpense: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A",
    factAllIncome: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u062E\u0644",
    factAvgMonthly: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u0634\u0647\u0631\u064A",
    factTopCategory: "\u0623\u0643\u062A\u0631 \u0641\u0626\u0629 \u0635\u0631\u0641 \u0639\u0644\u064A\u0647\u0627",
    factTxCount: "\u0639\u062F\u062F \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A"
  },
  en: {
    totalBalance: "Remaining Balance",
    expense: "Expense",
    income: "Income",
    search: "Search transactions",
    noTxBefore: "Tap",
    noTxAfter: "to add a transaction",
    resetAll: "Clear all data",
    resetConfirm: "Are you sure? This can't be undone.",
    yesReset: "Yes, clear",
    noReset: "No",
    planner: "Planner",
    schedule: "Schedule",
    debt: "Debts",
    home: "Home",
    plannerTitle: "Expense Breakdown",
    noExpensesMonth: "No expenses this month yet.",
    addExpense: "Add Expense",
    addIncome: "Add Income",
    saving: "Saving...",
    amountPlaceholder: "Amount",
    notePlaceholder: "Note (optional)",
    amountErr: "Enter a valid amount greater than zero",
    loading: "Loading...",
    loadErr: "Couldn't load saved data",
    language: "Language",
    settings: "Settings",
    appColor: "App Color",
    arabic: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    english: "English",
    backup: "Backup",
    backupHint: "Download a copy of your data to your device",
    restoreBackup: "Restore backup",
    restoreHint: "Bring back your data from a file you downloaded before",
    restoreSuccess: "Data restored successfully",
    restoreError: "This isn't a valid backup file",
    incomeListTitle: "Income",
    noIncomeMonth: "No income recorded this month yet.",
    lowBalanceWarning: "Your remaining balance is below 1000",
    currency: "Currency",
    newCategory: "New category",
    newCategoryName: "Category name",
    newCategorySave: "Add",
    cancel: "Cancel",
    detailCategory: "Category",
    detailAmount: "Amount",
    detailDate: "Date",
    detailNote: "Note",
    edit: "Edit",
    saveChanges: "Save changes",
    noNote: "No note",
    monthStart: "Month start day",
    monthStartHint: "Remaining balance rolls over automatically",
    notifications: "Notifications",
    appLock: "App Lock",
    appLockHint: "Require a pattern or fingerprint every time you open the app",
    setPatternTitle: "Draw a lock pattern",
    confirmPatternTitle: "Redraw the pattern to confirm",
    patternTooShort: "Connect at least 4 dots",
    patternMismatch: "Pattern doesn't match, try again",
    unlockTitle: "Draw your pattern to unlock",
    wrongPattern: "Wrong pattern, try again",
    useFingerprint: "Use fingerprint",
    addFingerprintQ: "Also add fingerprint unlock?",
    fingerprintAdded: "Fingerprint enabled",
    skip: "Skip",
    tryAgain: "Try again",
    disableLockConfirm: "Are you sure you want to remove the app lock?",
    more: "More",
    schedules: "Schedules",
    tabCurrent: "Current month",
    tabPast: "Past months",
    tabYears: "Years",
    tabCustom: "Custom",
    tabFacts: "Financial facts",
    fromDate: "From",
    toDate: "To",
    factAllExpense: "Total expenses",
    factAllIncome: "Total income",
    factAvgMonthly: "Avg. monthly spend",
    factTopCategory: "Top spending category",
    factTxCount: "Transactions count"
  }
};
function lerpColor(hexA, hexB, t) {
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const ar = a >> 16 & 255, ag = a >> 8 & 255, ab = a & 255;
  const br = b >> 16 & 255, bg = b >> 8 & 255, bb = b & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}
function fmt(n) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(n));
}
function todayStr() {
  const d = /* @__PURE__ */ new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function parseDateStr(str) {
  const [y, m, d] = String(str).split("-").map(Number);
  return { year: y, month: (m || 1) - 1, day: d || 1 };
}
function toWesternDigits(str) {
  return String(str).replace(/[٠-٩۰-۹]/g, (d) => {
    const arabicIndic = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
    const extArabicIndic = "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9";
    let i = arabicIndic.indexOf(d);
    if (i > -1) return String(i);
    i = extArabicIndic.indexOf(d);
    if (i > -1) return String(i);
    return d;
  });
}
function parseAmount(str) {
  return parseFloat(toWesternDigits(str).replace(/,/g, "."));
}
function HomeExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState("ar");
  const [themeColor, setThemeColor] = useState("orange");
  const [showMenu, setShowMenu] = useState(false);
  const [monthStartDay, setMonthStartDay] = useState(1);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState("EGP");
  const [customCategories, setCustomCategories] = useState([]);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState(CUSTOM_ICON_CHOICES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appLockEnabled, setAppLockEnabled] = useState(false);
  const [appLockPattern, setAppLockPattern] = useState(null);
  const [biometricCredentialId, setBiometricCredentialId] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lockSetupStep, setLockSetupStep] = useState(null);
  const [firstPatternDraw, setFirstPatternDraw] = useState(null);
  const [lockError, setLockError] = useState("");
  const [showDisableLockConfirm, setShowDisableLockConfirm] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState("");
  const restoreInputRef = useRef(null);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingExpenseId, setViewingExpenseId] = useState(null);
  const [viewingIncomeId, setViewingIncomeId] = useState(null);
  const [showPlanner, setShowPlanner] = useState(false);
  const [showIncomeSheet, setShowIncomeSheet] = useState(false);
  const [showLowBalanceWarning, setShowLowBalanceWarning] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [addTab, setAddTab] = useState("expense");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(todayStr());
  const now = /* @__PURE__ */ new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [confirmReset, setConfirmReset] = useState(false);
  const t = TXT[language];
  const theme = THEME_COLORS[themeColor];
  const isRtl = language === "ar";
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "#F3F5F9");
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("expenses", false);
        if (res && res.value) setExpenses(JSON.parse(res.value));
      } catch (e) {
      }
      try {
        const res2 = await window.storage.get("incomes", false);
        if (res2 && res2.value) setIncomes(JSON.parse(res2.value));
      } catch (e) {
      }
      try {
        const res4 = await window.storage.get("customCategories", false);
        if (res4 && res4.value) setCustomCategories(JSON.parse(res4.value));
      } catch (e) {
      }
      try {
        const res3 = await window.storage.get("settings", false);
        if (res3 && res3.value) {
          const s = JSON.parse(res3.value);
          if (s.language) setLanguage(s.language);
          if (s.themeColor) setThemeColor(s.themeColor);
          if (s.monthStartDay) setMonthStartDay(s.monthStartDay);
          if (typeof s.notificationsEnabled === "boolean") setNotificationsEnabled(s.notificationsEnabled);
          if (s.currency) setCurrency(s.currency);
          if (s.appLockEnabled && s.appLockPattern) {
            setAppLockEnabled(true);
            setAppLockPattern(s.appLockPattern);
            setBiometricCredentialId(s.biometricCredentialId || null);
            setIsLocked(true);
          }
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    if (!ADSENSE_CLIENT) return;
    if (document.querySelector("script[data-adsbygoogle-loaded]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-adsbygoogle-loaded", "true");
    document.head.appendChild(script);
  }, []);
  useEffect(() => {
    if (!ADSENSE_CLIENT || !ADSENSE_SLOT) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
    }
  }, [language]);
  async function persistSettings(next) {
    try {
      await window.storage.set("settings", JSON.stringify(next), false);
    } catch (e) {
    }
  }
  function currentSettingsBase() {
    return {
      language,
      themeColor,
      monthStartDay,
      notificationsEnabled,
      currency,
      appLockEnabled,
      appLockPattern,
      biometricCredentialId
    };
  }
  function changeLanguage(lang) {
    setLanguage(lang);
    persistSettings({ ...currentSettingsBase(), language: lang });
  }
  function changeTheme(color) {
    setThemeColor(color);
    persistSettings({ ...currentSettingsBase(), themeColor: color });
  }
  function changeMonthStartDay(day) {
    const clamped = Math.min(31, Math.max(1, day));
    setMonthStartDay(clamped);
    persistSettings({ ...currentSettingsBase(), monthStartDay: clamped });
  }
  function toggleNotifications() {
    const next = !notificationsEnabled;
    setNotificationsEnabled(next);
    if (!next) setShowLowBalanceWarning(false);
    persistSettings({ ...currentSettingsBase(), notificationsEnabled: next });
  }
  function changeCurrency(code) {
    setCurrency(code);
    persistSettings({ ...currentSettingsBase(), currency: code });
  }
  function startEnableAppLock() {
    setFirstPatternDraw(null);
    setLockError("");
    setLockSetupStep("draw");
  }
  function requestDisableAppLock() {
    setShowDisableLockConfirm(true);
  }
  function confirmDisableAppLock() {
    setAppLockEnabled(false);
    setAppLockPattern(null);
    setBiometricCredentialId(null);
    setShowDisableLockConfirm(false);
    persistSettings({ ...currentSettingsBase(), appLockEnabled: false, appLockPattern: null, biometricCredentialId: null });
  }
  function handlePatternDrawn(sequence) {
    if (sequence.length < 4) {
      setLockError(t.patternTooShort);
      return;
    }
    setLockError("");
    if (lockSetupStep === "draw") {
      setFirstPatternDraw(sequence);
      setLockSetupStep("confirm");
    } else if (lockSetupStep === "confirm") {
      if (JSON.stringify(sequence) !== JSON.stringify(firstPatternDraw)) {
        setLockError(t.patternMismatch);
        setLockSetupStep("draw");
        setFirstPatternDraw(null);
        return;
      }
      setAppLockPattern(sequence);
      setAppLockEnabled(true);
      persistSettings({ ...currentSettingsBase(), appLockEnabled: true, appLockPattern: sequence });
      setLockSetupStep("askBiometric");
    }
  }
  async function enrollFingerprint() {
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      const userId = new Uint8Array(16);
      crypto.getRandomValues(userId);
      const cred = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: "\u0645\u0635\u0627\u0631\u064A\u0641" },
          user: { id: userId, name: "user", displayName: "\u0645\u0635\u0627\u0631\u064A\u0641" },
          pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
          authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
          timeout: 6e4
        }
      });
      if (cred) {
        const idB64 = btoa(String.fromCharCode(...new Uint8Array(cred.rawId)));
        setBiometricCredentialId(idB64);
        persistSettings({ ...currentSettingsBase(), appLockEnabled: true, appLockPattern, biometricCredentialId: idB64 });
      }
    } catch (e) {
    }
    setLockSetupStep(null);
  }
  async function tryUnlockWithFingerprint() {
    if (!biometricCredentialId) return;
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      const idBytes = Uint8Array.from(atob(biometricCredentialId), (c) => c.charCodeAt(0));
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [{ id: idBytes, type: "public-key" }],
          userVerification: "required",
          timeout: 6e4
        }
      });
      if (assertion) {
        setIsLocked(false);
        setLockError("");
      }
    } catch (e) {
    }
  }
  function attemptUnlock(sequence) {
    if (appLockPattern && JSON.stringify(sequence) === JSON.stringify(appLockPattern)) {
      setIsLocked(false);
      setLockError("");
    } else {
      setLockError(t.wrongPattern);
    }
  }
  async function persistExpenses(next) {
    setExpenses(next);
    setSaving(true);
    try {
      await window.storage.set("expenses", JSON.stringify(next), false);
    } catch (e) {
    } finally {
      setSaving(false);
    }
  }
  async function persistIncomes(next) {
    setIncomes(next);
    setSaving(true);
    try {
      await window.storage.set("incomes", JSON.stringify(next), false);
    } catch (e) {
    } finally {
      setSaving(false);
    }
  }
  async function persistCustomCategories(next) {
    setCustomCategories(next);
    try {
      await window.storage.set("customCategories", JSON.stringify(next), false);
    } catch (e) {
    }
  }
  function addCustomCategory() {
    const name = newCatName.trim();
    if (!name) return;
    const color = CUSTOM_COLOR_PALETTE[customCategories.length % CUSTOM_COLOR_PALETTE.length];
    const cat = { id: `custom_${Date.now().toString(36)}`, label: name, icon: newCatIcon, color };
    persistCustomCategories([...customCategories, cat]);
    setCategory(cat.id);
    setNewCatName("");
    setNewCatIcon(CUSTOM_ICON_CHOICES[0]);
    setShowNewCategoryForm(false);
  }
  function addEntry() {
    const val = parseAmount(amount);
    if (!val || val <= 0) {
      setAmountError(true);
      return;
    }
    setAmountError(false);
    if (editingId) {
      if (addTab === "expense") {
        persistExpenses(expenses.map((x) => x.id === editingId ? { ...x, amount: val, category, note: note.trim(), date } : x));
      } else {
        persistIncomes(incomes.map((x) => x.id === editingId ? { ...x, amount: val, note: note.trim(), date } : x));
      }
      setEditingId(null);
    } else {
      const entry = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        amount: val,
        category: addTab === "expense" ? category : void 0,
        note: note.trim(),
        date
      };
      if (addTab === "expense") {
        persistExpenses([entry, ...expenses]);
      } else {
        persistIncomes([entry, ...incomes]);
      }
    }
    setAmount("");
    setNote("");
    setShowAddSheet(false);
  }
  function startEditExpense(x) {
    setEditingId(x.id);
    setAddTab("expense");
    setAmount(String(x.amount));
    setCategory(x.category);
    setNote(x.note || "");
    setDate(x.date);
    setAmountError(false);
    setViewingExpenseId(null);
    setShowAddSheet(true);
  }
  function startEditIncome(x) {
    setEditingId(x.id);
    setAddTab("income");
    setAmount(String(x.amount));
    setNote(x.note || "");
    setDate(x.date);
    setAmountError(false);
    setViewingIncomeId(null);
    setShowAddSheet(true);
  }
  function closeAddSheet() {
    setShowAddSheet(false);
    setEditingId(null);
  }
  function removeExpense(id) {
    persistExpenses(expenses.filter((x) => x.id !== id));
  }
  function removeIncome(id) {
    persistIncomes(incomes.filter((x) => x.id !== id));
  }
  function resetAll() {
    persistExpenses([]);
    persistIncomes([]);
    setConfirmReset(false);
  }
  function exportBackup() {
    const payload = {
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      expenses,
      incomes
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `masroufat-backup-${todayStr()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  function triggerRestoreBackup() {
    if (restoreInputRef.current) restoreInputRef.current.click();
  }
  function handleRestoreFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const restoredExpenses = Array.isArray(data.expenses) ? data.expenses : [];
        const restoredIncomes = Array.isArray(data.incomes) ? data.incomes : [];
        persistExpenses(restoredExpenses);
        persistIncomes(restoredIncomes);
        setRestoreMessage(t.restoreSuccess);
      } catch (err) {
        setRestoreMessage(t.restoreError);
      }
      setTimeout(() => setRestoreMessage(""), 4e3);
    };
    reader.readAsText(file);
  }
  function getPeriodRange(year, month, startDay) {
    const pad = (n) => String(n).padStart(2, "0");
    const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
    const clampedDay = (y, m) => Math.min(startDay, daysInMonth(y, m));
    const startStr = `${year}-${pad(month + 1)}-${pad(clampedDay(year, month))}`;
    let endMonth = month + 1;
    let endYear = year;
    if (endMonth > 11) {
      endMonth = 0;
      endYear += 1;
    }
    const endStr = `${endYear}-${pad(endMonth + 1)}-${pad(clampedDay(endYear, endMonth))}`;
    return { startStr, endStr };
  }
  const periodRange = useMemo(
    () => getPeriodRange(viewYear, viewMonth, monthStartDay),
    [viewMonth, viewYear, monthStartDay]
  );
  const allCategories = useMemo(() => [...CATEGORIES, ...customCategories], [customCategories]);
  const dynCatById = useMemo(() => Object.fromEntries(allCategories.map((c) => [c.id, c])), [allCategories]);
  function catLabel(c) {
    return c.label || c[language] || "";
  }
  const monthExpenses = useMemo(() => {
    return expenses.filter((x) => x.date >= periodRange.startStr && x.date < periodRange.endStr);
  }, [expenses, periodRange]);
  const monthIncomes = useMemo(() => {
    return incomes.filter((x) => x.date >= periodRange.startStr && x.date < periodRange.endStr);
  }, [incomes, periodRange]);
  const monthExpenseTotal = useMemo(
    () => monthExpenses.reduce((s, x) => s + x.amount, 0),
    [monthExpenses]
  );
  const monthIncomeTotal = useMemo(
    () => monthIncomes.reduce((s, x) => s + x.amount, 0),
    [monthIncomes]
  );
  const carriedBalance = useMemo(() => {
    const priorIncomes = incomes.filter((x) => x.date < periodRange.startStr).reduce((s, x) => s + x.amount, 0);
    const priorExpenses = expenses.filter((x) => x.date < periodRange.startStr).reduce((s, x) => s + x.amount, 0);
    return priorIncomes - priorExpenses;
  }, [incomes, expenses, periodRange]);
  const balance = carriedBalance + monthIncomeTotal - monthExpenseTotal;
  const balanceGaugeBase = carriedBalance + monthIncomeTotal;
  const balancePct = balanceGaugeBase > 0 ? Math.min(1, Math.max(0, balance / balanceGaugeBase)) : balance > 0 ? 1 : 0;
  const GAUGE_R = 64;
  const GAUGE_CIRC = 2 * Math.PI * GAUGE_R;
  const gaugeDashOffset = GAUGE_CIRC * (1 - balancePct);
  useEffect(() => {
    if (!loading && notificationsEnabled && balance <= 999) {
      setShowLowBalanceWarning(true);
      const timer = setTimeout(() => setShowLowBalanceWarning(false), 5e3);
      return () => clearTimeout(timer);
    }
  }, [balance, notificationsEnabled, loading]);
  const [plannerMonth, setPlannerMonth] = useState(viewMonth);
  const [plannerYear, setPlannerYear] = useState(viewYear);
  const [plannerTab, setPlannerTab] = useState("current");
  const [plannerMode, setPlannerMode] = useState("planner");
  const [plannerYearOnly, setPlannerYearOnly] = useState(now.getFullYear());
  const [customStart, setCustomStart] = useState(todayStr());
  const [customEnd, setCustomEnd] = useState(todayStr());
  function openPlanner() {
    setPlannerMonth(viewMonth);
    setPlannerYear(viewYear);
    setPlannerTab("current");
    setPlannerMode("planner");
    setShowPlanner(true);
  }
  function openSchedules() {
    setPlannerYearOnly(now.getFullYear());
    setPlannerTab("years");
    setPlannerMode("schedules");
    setShowPlanner(true);
  }
  function shiftPlannerMonth(delta) {
    let m = plannerMonth + delta;
    let y = plannerYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setPlannerMonth(m);
    setPlannerYear(y);
  }
  const currentPeriodRange = useMemo(
    () => getPeriodRange(now.getFullYear(), now.getMonth(), monthStartDay),
    [monthStartDay]
  );
  const plannerPeriodRange = useMemo(
    () => getPeriodRange(plannerYear, plannerMonth, monthStartDay),
    [plannerYear, plannerMonth, monthStartDay]
  );
  const plannerExpenses = useMemo(() => {
    if (plannerTab === "current") {
      return expenses.filter((x) => x.date >= currentPeriodRange.startStr && x.date < currentPeriodRange.endStr);
    }
    if (plannerTab === "years") {
      return expenses.filter((x) => parseDateStr(x.date).year === plannerYearOnly);
    }
    if (plannerTab === "custom") {
      return expenses.filter((x) => x.date >= customStart && x.date <= customEnd);
    }
    return expenses.filter((x) => x.date >= plannerPeriodRange.startStr && x.date < plannerPeriodRange.endStr);
  }, [expenses, plannerTab, currentPeriodRange, plannerPeriodRange, plannerYearOnly, customStart, customEnd]);
  const plannerExpenseTotal = useMemo(
    () => plannerExpenses.reduce((s, x) => s + x.amount, 0),
    [plannerExpenses]
  );
  const plannerCategoryBreakdown = useMemo(() => {
    const map = {};
    for (const x of plannerExpenses) {
      map[x.category] = (map[x.category] || 0) + x.amount;
    }
    return allCategories.map((c) => ({ ...c, total: map[c.id] || 0 })).filter((c) => c.total > 0).sort((a, b) => b.total - a.total);
  }, [plannerExpenses, allCategories]);
  const financialFacts = useMemo(() => {
    const allTimeExpenseTotal = expenses.reduce((s, x) => s + x.amount, 0);
    const allTimeIncomeTotal = incomes.reduce((s, x) => s + x.amount, 0);
    const monthsSet = new Set(expenses.map((x) => x.date.slice(0, 7)));
    const monthsCount = Math.max(1, monthsSet.size);
    const avgMonthly = allTimeExpenseTotal / monthsCount;
    const map = {};
    for (const x of expenses) map[x.category] = (map[x.category] || 0) + x.amount;
    const topEntries = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const topCategory = topEntries.length > 0 ? dynCatById[topEntries[0][0]] || catById.other : null;
    const topCategoryTotal = topEntries.length > 0 ? topEntries[0][1] : 0;
    return {
      allTimeExpenseTotal,
      allTimeIncomeTotal,
      avgMonthly,
      transactionsCount: expenses.length + incomes.length,
      topCategory,
      topCategoryTotal
    };
  }, [expenses, incomes, dynCatById]);
  const groupedByDay = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const groups = {};
    for (const x of monthExpenses) {
      const c = dynCatById[x.category] || catById.other;
      const label = catLabel(c).toLowerCase();
      const noteText = (x.note || "").toLowerCase();
      if (q && !label.includes(q) && !noteText.includes(q)) continue;
      groups[x.date] = groups[x.date] || [];
      groups[x.date].push({ ...x, kind: "expense" });
    }
    return Object.entries(groups).sort((a, b) => a[0] < b[0] ? 1 : -1);
  }, [monthExpenses, searchQuery, language]);
  const [incomeMonth, setIncomeMonth] = useState(viewMonth);
  const [incomeYear, setIncomeYear] = useState(viewYear);
  function openIncomeSheet() {
    setIncomeMonth(viewMonth);
    setIncomeYear(viewYear);
    setShowIncomeSheet(true);
  }
  function shiftIncomeMonth(delta) {
    let m = incomeMonth + delta;
    let y = incomeYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setIncomeMonth(m);
    setIncomeYear(y);
  }
  const incomeSheetPeriodRange = useMemo(
    () => getPeriodRange(incomeYear, incomeMonth, monthStartDay),
    [incomeYear, incomeMonth, monthStartDay]
  );
  const incomeSheetIncomes = useMemo(
    () => incomes.filter((x) => x.date >= incomeSheetPeriodRange.startStr && x.date < incomeSheetPeriodRange.endStr),
    [incomes, incomeSheetPeriodRange]
  );
  const incomeSheetTotal = useMemo(
    () => incomeSheetIncomes.reduce((s, x) => s + x.amount, 0),
    [incomeSheetIncomes]
  );
  const sortedIncomeSheetIncomes = useMemo(
    () => [...incomeSheetIncomes].sort((a, b) => a.date < b.date ? 1 : -1),
    [incomeSheetIncomes]
  );
  function shiftMonth(delta) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  }
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      dir: isRtl ? "rtl" : "ltr",
      style: {
        fontFamily: "'Cairo', sans-serif",
        background: "#F3F5F9",
        minHeight: "100vh",
        color: "#1E2530",
        paddingBottom: 96
      }
    },
    /* @__PURE__ */ React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap');
        .amount-num { font-variant-numeric: tabular-nums; direction: ltr; unicode-bidi: plaintext; }
        button:focus-visible, input:focus-visible { outline: 2px solid ${theme.accent}; outline-offset: 2px; }
        @keyframes lowBalancePop {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.4) translateY(12px); }
          12% { opacity: 1; transform: translate(-50%, -50%) scale(1.12) translateY(0); }
          20% { transform: translate(-50%, -50%) scale(1) translateY(0); }
          85% { opacity: 1; transform: translate(-50%, -50%) scale(1) translateY(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.85) translateY(-6px); }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `),
    isLocked && /* @__PURE__ */ React.createElement("div", { style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 10 } }, "\u{1F512}"), /* @__PURE__ */ React.createElement("div", { style: { color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 18, textAlign: "center" } }, t.unlockTitle), /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 20, padding: 20 } }, /* @__PURE__ */ React.createElement(
      PatternPad,
      {
        onComplete: attemptUnlock,
        accentColor: theme.accent,
        errorColor: "#E64A3B",
        errorPulse: !!lockError
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { height: 20, marginTop: 10 } }, lockError && /* @__PURE__ */ React.createElement("div", { style: { color: "#fff", background: "rgba(230,74,59,0.9)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700 } }, lockError)), biometricCredentialId && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: tryUnlockWithFingerprint,
        style: {
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.16)",
          border: "none",
          borderRadius: 14,
          padding: "10px 18px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer"
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "\u{1F513}"),
      t.useFingerprint
    )),
    lockSetupStep && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,26,38,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 20, padding: 24, width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center" } }, lockSetupStep === "askBiometric" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 10 } }, "\u{1F446}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 18, textAlign: "center" } }, t.addFingerprintQ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, width: "100%" } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setLockSetupStep(null),
        style: { flex: 1, padding: "12px", borderRadius: 12, border: "1px solid #E4E7ED", background: "#fff", color: "#4a4f5a", fontWeight: 700, fontSize: 14, cursor: "pointer" }
      },
      t.skip
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: enrollFingerprint,
        style: { flex: 1, padding: "12px", borderRadius: 12, border: "none", background: theme.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }
      },
      t.useFingerprint
    ))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 16, textAlign: "center" } }, lockSetupStep === "draw" ? t.setPatternTitle : t.confirmPatternTitle), /* @__PURE__ */ React.createElement(
      PatternPad,
      {
        onComplete: handlePatternDrawn,
        accentColor: theme.accent,
        errorColor: "#E64A3B",
        errorPulse: !!lockError
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { height: 20, marginTop: 8 } }, lockError && /* @__PURE__ */ React.createElement("div", { style: { color: "#E64A3B", fontSize: 12, fontWeight: 700 } }, lockError)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setLockSetupStep(null);
          setLockError("");
          setFirstPatternDraw(null);
        },
        style: { marginTop: 4, background: "none", border: "none", color: "#9AA3B2", fontSize: 13, cursor: "pointer", textDecoration: "underline" }
      },
      t.cancel
    )))),
    /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 460, margin: "0 auto", padding: "16px 16px 0", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => shiftMonth(1),
        "aria-label": isRtl ? "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u062C\u0627\u064A" : "Next month",
        style: { background: "#fff", border: "none", borderRadius: 10, width: 34, height: 34, fontSize: 16, cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
      },
      isRtl ? "\u2039" : "\u203A"
    ), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, fontSize: 15 } }, MONTH_NAMES[language][viewMonth], " ", viewYear), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => shiftMonth(-1),
        "aria-label": isRtl ? "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0644\u064A \u0641\u0627\u062A" : "Previous month",
        style: { background: "#fff", border: "none", borderRadius: 10, width: 34, height: 34, fontSize: 16, cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
      },
      isRtl ? "\u203A" : "\u2039"
    )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" } }, "\u{1F451}"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowMenu((v) => !v),
        "aria-label": "settings",
        style: { width: 40, height: 40, borderRadius: 12, background: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", cursor: "pointer", fontSize: 18 }
      },
      "\u2699\uFE0F"
    ))), showLowBalanceWarning && /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          position: "fixed",
          top: "58%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 40,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "lowBalancePop 5s ease forwards"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: {
        width: 92,
        height: 92,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 60,
        filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.35))"
      } }, "\u{1F631}"),
      /* @__PURE__ */ React.createElement("div", { style: {
        marginTop: 10,
        background: "#fff",
        color: "#E64A3B",
        fontWeight: 700,
        fontSize: 13,
        padding: "8px 14px",
        borderRadius: 12,
        boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
        maxWidth: 220,
        textAlign: "center"
      } }, t.lowBalanceWarning, " ", currency, "!")
    ), showMenu && /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: () => setShowMenu(false),
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 25,
          background: "rgba(20,26,38,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          onClick: (e) => e.stopPropagation(),
          style: {
            position: "relative",
            width: "100%",
            maxWidth: 320,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
            padding: 18
          }
        },
        /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setShowMenu(false),
            "aria-label": "close",
            style: {
              position: "absolute",
              top: 10,
              [isRtl ? "left" : "right"]: 10,
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "none",
              background: "#F3F5F9",
              color: "#8A93A6",
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          },
          "\u2715"
        ),
        /* @__PURE__ */ React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              padding: "8px 4px",
              marginTop: 16,
              color: "#4a4f5a",
              fontSize: 13,
              fontWeight: 600
            }
          },
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16 } }, "\u2699\uFE0F"),
          t.settings
        ),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9AA3B2", margin: "10px 0 6px", fontWeight: 600 } }, t.language),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 12, background: "#F3F5F9", borderRadius: 10, padding: 3 } }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => changeLanguage("ar"),
            style: { flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: language === "ar" ? "#fff" : "transparent", color: language === "ar" ? theme.accent : "#8A93A6", boxShadow: language === "ar" ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }
          },
          t.arabic
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => changeLanguage("en"),
            style: { flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: language === "en" ? "#fff" : "transparent", color: language === "en" ? theme.accent : "#8A93A6", boxShadow: language === "en" ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }
          },
          t.english
        )),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9AA3B2", margin: "10px 0 4px", fontWeight: 600 } }, t.monthStart),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => changeMonthStartDay(monthStartDay - 1),
            style: { width: 26, height: 26, borderRadius: 8, border: "1px solid #E4E7ED", background: "#fff", cursor: "pointer", fontSize: 15, lineHeight: 1 }
          },
          "\u2212"
        ), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 700, fontSize: 14 } }, monthStartDay), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => changeMonthStartDay(monthStartDay + 1),
            style: { width: 26, height: 26, borderRadius: 8, border: "1px solid #E4E7ED", background: "#fff", cursor: "pointer", fontSize: 15, lineHeight: 1 }
          },
          "+"
        )),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#B0B6C2", marginTop: 4 } }, t.monthStartHint),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9AA3B2", margin: "12px 0 6px", fontWeight: 600 } }, t.currency),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, CURRENCIES.map((cur) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: cur.code,
            onClick: () => changeCurrency(cur.code),
            title: cur[language],
            style: {
              padding: "5px 10px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              border: currency === cur.code ? `2px solid ${theme.accent}` : "1px solid #E4E7ED",
              background: currency === cur.code ? `${theme.accent}1a` : "#fff",
              color: currency === cur.code ? theme.accent : "#4a4f5a"
            }
          },
          cur.code
        ))),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 10, borderTop: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#4a4f5a" } }, t.notifications), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: toggleNotifications,
            "aria-label": "toggle notifications",
            style: {
              width: 40,
              height: 22,
              borderRadius: 11,
              border: "none",
              cursor: "pointer",
              background: notificationsEnabled ? theme.accent : "#D8DCE3",
              position: "relative",
              padding: 0,
              transition: "background 0.15s"
            }
          },
          /* @__PURE__ */ React.createElement("span", { style: {
            position: "absolute",
            top: 2,
            [notificationsEnabled ? isRtl ? "left" : "right" : isRtl ? "right" : "left"]: 2,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            transition: "left 0.15s, right 0.15s"
          } })
        )),
        /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, paddingTop: 10, borderTop: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#4a4f5a" } }, t.appLock), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => appLockEnabled ? requestDisableAppLock() : startEnableAppLock(),
            "aria-label": "toggle app lock",
            style: {
              width: 40,
              height: 22,
              borderRadius: 11,
              border: "none",
              cursor: "pointer",
              background: appLockEnabled ? theme.accent : "#D8DCE3",
              position: "relative",
              padding: 0,
              transition: "background 0.15s"
            }
          },
          /* @__PURE__ */ React.createElement("span", { style: {
            position: "absolute",
            top: 2,
            [appLockEnabled ? isRtl ? "left" : "right" : isRtl ? "right" : "left"]: 2,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            transition: "left 0.15s, right 0.15s"
          } })
        )), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#B0B6C2", marginTop: 4 } }, t.appLockHint), showDisableLockConfirm && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#4a463d", flex: 1 } }, t.disableLockConfirm), /* @__PURE__ */ React.createElement("button", { onClick: confirmDisableAppLock, style: { padding: "5px 10px", borderRadius: 8, border: "none", background: "#E64A3B", color: "#fff", fontWeight: 700, fontSize: 11, cursor: "pointer" } }, t.yesReset), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowDisableLockConfirm(false), style: { padding: "5px 10px", borderRadius: 8, border: "1px solid #E4E7ED", background: "#fff", color: "#4a4f5a", fontWeight: 700, fontSize: 11, cursor: "pointer" } }, t.noReset))),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9AA3B2", margin: "10px 0 8px", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, "\u{1F3A8}"), t.appColor),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, padding: "0 2px" } }, Object.entries(THEME_COLORS).map(([key, c]) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key,
            onClick: () => changeTheme(key),
            "aria-label": c.name[language],
            title: c.name[language],
            style: {
              width: 28,
              height: 28,
              borderRadius: "50%",
              cursor: "pointer",
              background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
              border: themeColor === key ? "3px solid #1E2530" : "3px solid transparent",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
            }
          }
        ))),
        /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: exportBackup,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              marginTop: 14,
              paddingTop: 10,
              borderTop: "1px solid #F0F1F5",
              border: "none",
              borderTopStyle: "solid",
              background: "none",
              cursor: "pointer",
              textAlign: isRtl ? "right" : "left"
            }
          },
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16 } }, "\u{1F4BE}"),
          /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E2530" } }, t.backup), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#9AA3B2" } }, t.backupHint))
        ),
        /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: triggerRestoreBackup,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              marginTop: 10,
              paddingTop: 10,
              borderTop: "1px solid #F0F1F5",
              border: "none",
              borderTopStyle: "solid",
              background: "none",
              cursor: "pointer",
              textAlign: isRtl ? "right" : "left"
            }
          },
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16 } }, "\u{1F4E5}"),
          /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E2530" } }, t.restoreBackup), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#9AA3B2" } }, t.restoreHint))
        ),
        /* @__PURE__ */ React.createElement(
          "input",
          {
            ref: restoreInputRef,
            type: "file",
            accept: "application/json,.json",
            onChange: handleRestoreFile,
            style: {
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              border: 0
            }
          }
        ),
        restoreMessage && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: restoreMessage === t.restoreSuccess ? "#2E9E5B" : "#E64A3B", marginTop: 6, textAlign: "center" } }, restoreMessage),
        !confirmReset ? /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setConfirmReset(true),
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              marginTop: 10,
              paddingTop: 10,
              borderTop: "1px solid #F0F1F5",
              border: "none",
              borderTopStyle: "solid",
              background: "none",
              cursor: "pointer",
              textAlign: isRtl ? "right" : "left"
            }
          },
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16 } }, "\u{1F5D1}\uFE0F"),
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#E64A3B" } }, t.resetAll)
        ) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#4a463d", marginBottom: 8 } }, t.resetConfirm), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: resetAll,
            style: {
              flex: 1,
              padding: "8px 0",
              borderRadius: 9,
              border: "1.5px solid #E64A3B",
              background: "#E64A3B",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer"
            }
          },
          t.yesReset
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setConfirmReset(false),
            style: {
              flex: 1,
              padding: "8px 0",
              borderRadius: 9,
              border: "1.5px solid #E4E7ED",
              background: "#fff",
              color: "#4a4f5a",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer"
            }
          },
          t.noReset
        )))
      )
    ), /* @__PURE__ */ React.createElement("div", { style: {
      background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
      borderRadius: 20,
      padding: "20px 20px 22px",
      color: "#fff",
      boxShadow: `0 8px 20px ${theme.soft}`
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "stretch", gap: 16 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowBalance((v) => !v),
        "aria-label": showBalance ? "hide balance" : "show balance",
        style: {
          flex: "0 0 auto",
          width: 148,
          height: 148,
          borderRadius: "50%",
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
          margin: "auto 0",
          position: "relative",
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))"
        }
      },
      /* @__PURE__ */ React.createElement("svg", { width: 148, height: 148, viewBox: "0 0 148 148", style: { transform: "rotate(-90deg)", position: "absolute", inset: 0 } }, /* @__PURE__ */ React.createElement("circle", { cx: "74", cy: "74", r: GAUGE_R, fill: "none", stroke: "rgba(255,255,255,0.28)", strokeWidth: "10" }), /* @__PURE__ */ React.createElement(
        "circle",
        {
          cx: "74",
          cy: "74",
          r: GAUGE_R,
          fill: "none",
          stroke: theme.gaugeDark,
          strokeWidth: "10",
          strokeDasharray: GAUGE_CIRC,
          strokeDashoffset: gaugeDashOffset,
          strokeLinecap: "round",
          style: { transition: "stroke-dashoffset 0.4s ease" }
        }
      )),
      /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        inset: 14,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.16)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: "0 8px"
      } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 600, color: "#fff", textAlign: "center" } }, t.totalBalance), /* @__PURE__ */ React.createElement("div", { className: "amount-num", style: { fontSize: 21, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 4 } }, showBalance ? `${balance < 0 ? "-" : ""}${fmt(Math.abs(balance))} ${currency}` : "\u2605\u2605\u2605\u2605"))
    ), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", minWidth: 0 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: openIncomeSheet,
        style: {
          textAlign: "left",
          background: "rgba(255,255,255,0.16)",
          border: "none",
          cursor: "pointer",
          padding: "10px 14px",
          color: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          width: "100%"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.35)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "\u2193"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, fontWeight: 600 } }, t.income)),
      /* @__PURE__ */ React.createElement("div", { className: "amount-num", style: { fontSize: 17, fontWeight: 700, marginTop: 4 } }, currency, " ", fmt(monthIncomeTotal))
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          textAlign: "left",
          background: "rgba(255,255,255,0.16)",
          padding: "10px 14px",
          color: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          width: "100%",
          boxSizing: "border-box"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.35)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#fff", flexShrink: 0 } }, "\u2191"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16, fontWeight: 600 } }, t.expense)),
      /* @__PURE__ */ React.createElement("div", { className: "amount-num", style: { fontSize: 17, fontWeight: 700, marginTop: 4 } }, currency, " ", fmt(monthExpenseTotal))
    )))), loading && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#8A93A6", marginTop: 10, textAlign: "center" } }, t.loading), loadError && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#E64A3B", marginTop: 10, textAlign: "center" } }, t.loadErr), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18 } }, ADSENSE_CLIENT && ADSENSE_SLOT ? /* @__PURE__ */ React.createElement(
      "ins",
      {
        className: "adsbygoogle",
        style: { display: "block", minHeight: 60 },
        "data-ad-client": ADSENSE_CLIENT,
        "data-ad-slot": ADSENSE_SLOT,
        "data-ad-format": "auto",
        "data-full-width-responsive": "true"
      }
    ) : /* @__PURE__ */ React.createElement("div", { style: {
      border: "1.5px dashed #D8DCE3",
      borderRadius: 12,
      padding: "14px",
      textAlign: "center",
      color: "#B0B6C2",
      fontSize: 12,
      background: "#FAFBFC"
    } }, "\u0645\u0633\u0627\u062D\u0629 \u0625\u0639\u0644\u0627\u0646\u064A\u0629 \u2014 \u0647\u062A\u0638\u0647\u0631 \u0647\u0646\u0627 \u0628\u0639\u062F \u0636\u0628\u0637 \u062D\u0633\u0627\u0628 AdSense")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "#fff",
      borderRadius: 14,
      padding: "10px 14px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
    } }, /* @__PURE__ */ React.createElement("span", { style: { color: theme.accent, fontSize: 15 } }, "\u{1F50D}"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        placeholder: t.search,
        style: {
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: 14,
          color: "#1E2530",
          fontFamily: "inherit"
        }
      }
    ), searchQuery && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSearchQuery(""),
        "aria-label": "clear search",
        style: { background: "none", border: "none", color: "#C7CCD6", fontSize: 14, cursor: "pointer", padding: 0 }
      },
      "\u2715"
    ))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16 } }, groupedByDay.length === 0 && !loading && /* @__PURE__ */ React.createElement("div", { style: {
      textAlign: "center",
      color: "#9AA3B2",
      fontSize: 14,
      padding: "30px 0",
      background: "#fff",
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      flexWrap: "wrap"
    } }, /* @__PURE__ */ React.createElement("span", null, t.noTxBefore), /* @__PURE__ */ React.createElement("span", { style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: theme.accent,
      color: "#fff",
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1
    } }, "+"), t.noTxAfter && /* @__PURE__ */ React.createElement("span", null, t.noTxAfter)), groupedByDay.map(([day, items]) => {
      const dayTotal = items.reduce((s, x) => s + x.amount, 0);
      return /* @__PURE__ */ React.createElement("div", { key: day, style: { background: "#fff", borderRadius: 16, marginBottom: 14, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#8A93A6" } }, day), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#E64A3B", fontSize: 13 } }, "\u2191"), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { color: "#E64A3B", fontWeight: 700, fontSize: 14 } }, currency, " ", fmt(dayTotal)))), items.map((x, i) => {
        const c = dynCatById[x.category] || catById.other;
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: x.id,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              borderTop: i > 0 ? "1px solid #F5F6F9" : "none"
            }
          },
          /* @__PURE__ */ React.createElement("div", { style: {
            width: 38,
            height: 38,
            borderRadius: "50%",
            flexShrink: 0,
            background: `${c.color}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17
          } }, /* @__PURE__ */ React.createElement(CatIconOrEmoji, { c, size: 19, color: c.color })),
          /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, textAlign: isRtl ? "right" : "left" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600 } }, catLabel(c)), x.note && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9AA3B2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, x.note)),
          /* @__PURE__ */ React.createElement("div", { className: "amount-num", style: { fontSize: 14, fontWeight: 700, minWidth: 64, textAlign: "left", color: "#E64A3B" } }, "-", fmt(x.amount)),
          /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => setViewingExpenseId(x.id),
              "aria-label": "options",
              style: {
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3
              }
            },
            /* @__PURE__ */ React.createElement("span", { style: { width: 15, height: 2, borderRadius: 1, background: "#C7CCD6" } }),
            /* @__PURE__ */ React.createElement("span", { style: { width: 15, height: 2, borderRadius: 1, background: "#C7CCD6" } }),
            /* @__PURE__ */ React.createElement("span", { style: { width: 15, height: 2, borderRadius: 1, background: "#C7CCD6" } })
          )
        );
      }));
    }))),
    /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 460, margin: "0 auto", height: 78 } }, /* @__PURE__ */ React.createElement(
      "svg",
      {
        width: "100%",
        height: "78",
        viewBox: "0 0 460 78",
        preserveAspectRatio: "none",
        style: { display: "block", position: "absolute", inset: 0, filter: "drop-shadow(0 -3px 10px rgba(0,0,0,0.08))" }
      },
      /* @__PURE__ */ React.createElement("path", { d: "M0,0 H148 C174,0 174,52 230,52 C286,52 286,0 312,0 H460 V78 H0 Z", fill: theme.accent })
    ), /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      alignItems: "flex-end",
      paddingBottom: 12
    } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowMenu((v) => !v),
        style: { display: "flex", flexDirection: "column", alignItems: "center", background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0 }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 25, filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.35)) drop-shadow(0 -1px 0 rgba(255,255,255,0.35))" } }, "\u22EF"),
      t.more
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: openPlanner,
        style: { display: "flex", flexDirection: "column", alignItems: "center", background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0 }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 25, filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.35)) drop-shadow(0 -1px 0 rgba(255,255,255,0.35))" } }, "\u{1F4CA}"),
      t.planner
    ), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: openSchedules,
        style: { display: "flex", flexDirection: "column", alignItems: "center", background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0 }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 25, filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.35)) drop-shadow(0 -1px 0 rgba(255,255,255,0.35))" } }, "\u{1F5C2}\uFE0F"),
      t.schedules
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        style: { display: "flex", flexDirection: "column", alignItems: "center", background: "none", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0 }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 25, filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.35)) drop-shadow(0 -1px 0 rgba(255,255,255,0.35))" } }, "\u{1F3E0}"),
      t.home
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setEditingId(null);
          setAmount("");
          setNote("");
          setDate(todayStr());
          setShowAddSheet(true);
          setAddTab("expense");
          setAmountError(false);
        },
        "aria-label": "add",
        style: {
          position: "absolute",
          top: -22,
          left: "50%",
          transform: "translateX(-50%)",
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "4px solid #fff",
          background: theme.accent,
          color: "#fff",
          fontSize: 26,
          fontWeight: 400,
          boxShadow: `0 6px 14px ${theme.soft}`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      },
      "+"
    )),
    showPlanner && /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: () => setShowPlanner(false),
        style: { position: "fixed", inset: 0, background: "rgba(20,26,38,0.45)", display: "flex", alignItems: "flex-end", zIndex: 20 }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          onClick: (e) => e.stopPropagation(),
          style: { position: "relative", width: "100%", maxWidth: 460, margin: "0 auto", background: "#fff", borderRadius: "20px 20px 0 0", padding: "18px 18px 24px", maxHeight: "85vh", overflowY: "auto" }
        },
        /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setShowPlanner(false),
            "aria-label": "close",
            style: {
              position: "absolute",
              top: 14,
              [isRtl ? "left" : "right"]: 14,
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "none",
              background: "#F3F5F9",
              color: "#8A93A6",
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1
            }
          },
          "\u2715"
        ),
        /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 4, background: "#E4E7ED", borderRadius: 2, margin: "0 auto 16px" } }),
        /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 16, marginBottom: 14, textAlign: "center" } }, plannerMode === "planner" ? t.planner : t.schedules),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 16, justifyContent: "center" } }, (plannerMode === "planner" ? [
          { id: "current", icon: "\u{1F5D3}\uFE0F", label: t.tabCurrent },
          { id: "past", icon: "\u{1F4C5}", label: t.tabPast }
        ] : [
          { id: "years", icon: "\u{1F4C1}", label: t.tabYears },
          { id: "custom", icon: "\u{1F39A}\uFE0F", label: t.tabCustom },
          { id: "facts", icon: "\u{1F4B5}", label: t.tabFacts }
        ]).map((tab) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: tab.id,
            onClick: () => setPlannerTab(tab.id),
            style: {
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "8px 12px",
              borderRadius: 12,
              cursor: "pointer",
              whiteSpace: "nowrap",
              border: plannerTab === tab.id ? `2px solid ${theme.accent}` : "1px solid #E4E7ED",
              background: plannerTab === tab.id ? `${theme.accent}1a` : "#fff",
              color: plannerTab === tab.id ? theme.accent : "#8A93A6"
            }
          },
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, tab.icon),
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700 } }, tab.label)
        ))),
        plannerTab === "current" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", fontWeight: 600, fontSize: 14, marginBottom: 14 } }, MONTH_NAMES[language][now.getMonth()], " ", now.getFullYear()),
        plannerTab === "past" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => shiftPlannerMonth(1),
            "aria-label": isRtl ? "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u062C\u0627\u064A" : "Next month",
            style: { background: "#F3F5F9", border: "none", borderRadius: 8, width: 28, height: 28, fontSize: 14, cursor: "pointer" }
          },
          isRtl ? "\u2039" : "\u203A"
        ), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, fontSize: 14, minWidth: 110, textAlign: "center" } }, MONTH_NAMES[language][plannerMonth], " ", plannerYear), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => shiftPlannerMonth(-1),
            "aria-label": isRtl ? "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0644\u064A \u0641\u0627\u062A" : "Previous month",
            style: { background: "#F3F5F9", border: "none", borderRadius: 8, width: 28, height: 28, fontSize: 14, cursor: "pointer" }
          },
          isRtl ? "\u203A" : "\u2039"
        )),
        plannerTab === "years" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setPlannerYearOnly((y) => y + 1),
            "aria-label": isRtl ? "\u0627\u0644\u0633\u0646\u0629 \u0627\u0644\u062C\u0627\u064A\u0629" : "Next year",
            style: { background: "#F3F5F9", border: "none", borderRadius: 8, width: 28, height: 28, fontSize: 14, cursor: "pointer" }
          },
          isRtl ? "\u2039" : "\u203A"
        ), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 600, fontSize: 14, minWidth: 60, textAlign: "center" } }, plannerYearOnly), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setPlannerYearOnly((y) => y - 1),
            "aria-label": isRtl ? "\u0627\u0644\u0633\u0646\u0629 \u0627\u0644\u0644\u064A \u0641\u0627\u062A\u062A" : "Previous year",
            style: { background: "#F3F5F9", border: "none", borderRadius: 8, width: 28, height: 28, fontSize: 14, cursor: "pointer" }
          },
          isRtl ? "\u203A" : "\u2039"
        )),
        plannerTab === "custom" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#8A93A6" } }, t.fromDate), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "date",
            value: customStart,
            onChange: (e) => setCustomStart(e.target.value),
            style: { padding: "6px 8px", borderRadius: 8, border: "1px solid #E4E7ED", fontSize: 12, color: "#4a463d" }
          }
        ), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#8A93A6" } }, t.toDate), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "date",
            value: customEnd,
            onChange: (e) => setCustomEnd(e.target.value),
            style: { padding: "6px 8px", borderRadius: 8, border: "1px solid #E4E7ED", fontSize: 12, color: "#4a463d" }
          }
        )),
        plannerTab === "facts" ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#8A93A6" } }, t.factAllExpense), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 700, color: "#E64A3B" } }, currency, " ", fmt(financialFacts.allTimeExpenseTotal))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#8A93A6" } }, t.factAllIncome), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 700, color: "#2E9E5B" } }, currency, " ", fmt(financialFacts.allTimeIncomeTotal))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#8A93A6" } }, t.factAvgMonthly), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 700 } }, currency, " ", fmt(financialFacts.avgMonthly))), financialFacts.topCategory && /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#8A93A6" } }, t.factTopCategory), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, display: "flex", alignItems: "center", gap: 6 } }, financialFacts.topCategory.icon, " ", catLabel(financialFacts.topCategory), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { color: "#8A93A6", fontWeight: 400 } }, "(", currency, " ", fmt(financialFacts.topCategoryTotal), ")"))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "#8A93A6" } }, t.factTxCount), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 700 } }, financialFacts.transactionsCount))) : plannerCategoryBreakdown.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "#9AA3B2", fontSize: 14, padding: "20px 0" } }, t.noExpensesMonth) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 240 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(
          Pie,
          {
            data: plannerCategoryBreakdown,
            dataKey: "total",
            nameKey: language,
            innerRadius: 55,
            outerRadius: 90,
            paddingAngle: 2
          },
          plannerCategoryBreakdown.map((c) => /* @__PURE__ */ React.createElement(Cell, { key: c.id, fill: c.color }))
        ), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => `${currency} ${fmt(v)}` })))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, plannerCategoryBreakdown.map((c) => /* @__PURE__ */ React.createElement("div", { key: c.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 4px" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 12, height: 12, borderRadius: "50%", background: c.color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 14, display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement(CatIconOrEmoji, { c, size: 16, color: c.color }), " ", catLabel(c)), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontSize: 14, fontWeight: 700 } }, currency, " ", fmt(c.total), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "#9AA3B2", fontWeight: 400 } }, "(", Math.round(c.total / plannerExpenseTotal * 100), "%)"))))))
      )
    ),
    showIncomeSheet && /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: () => setShowIncomeSheet(false),
        style: { position: "fixed", inset: 0, background: "rgba(20,26,38,0.45)", display: "flex", alignItems: "flex-end", zIndex: 20 }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          onClick: (e) => e.stopPropagation(),
          style: { width: "100%", maxWidth: 460, margin: "0 auto", background: "#fff", borderRadius: "20px 20px 0 0", padding: "18px 18px 24px", maxHeight: "85vh", overflowY: "auto" }
        },
        /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 4, background: "#E4E7ED", borderRadius: 2, margin: "0 auto 16px" } }),
        /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 16, marginBottom: 4, textAlign: "center" } }, t.incomeListTitle),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 } }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => shiftIncomeMonth(1),
            "aria-label": isRtl ? "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u062C\u0627\u064A" : "Next month",
            style: { background: "#F3F5F9", border: "none", borderRadius: 8, width: 28, height: 28, fontSize: 14, cursor: "pointer" }
          },
          isRtl ? "\u2039" : "\u203A"
        ), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, fontSize: 14, minWidth: 110, textAlign: "center" } }, MONTH_NAMES[language][incomeMonth], " ", incomeYear), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => shiftIncomeMonth(-1),
            "aria-label": isRtl ? "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0644\u064A \u0641\u0627\u062A" : "Previous month",
            style: { background: "#F3F5F9", border: "none", borderRadius: 8, width: 28, height: 28, fontSize: 14, cursor: "pointer" }
          },
          isRtl ? "\u203A" : "\u2039"
        )),
        /* @__PURE__ */ React.createElement("div", { className: "amount-num", style: { textAlign: "center", color: "#2E9E5B", fontWeight: 700, fontSize: 22, marginBottom: 14 } }, currency, " ", fmt(incomeSheetTotal)),
        sortedIncomeSheetIncomes.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "#9AA3B2", fontSize: 14, padding: "20px 0" } }, t.noIncomeMonth) : /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 16, border: "1px solid #F0F1F5", overflow: "hidden" } }, sortedIncomeSheetIncomes.map((x, i) => /* @__PURE__ */ React.createElement("div", { key: x.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderTop: i > 0 ? "1px solid #F5F6F9" : "none" } }, /* @__PURE__ */ React.createElement("div", { className: "amount-num", style: { fontSize: 14, fontWeight: 700, minWidth: 64, color: "#2E9E5B" } }, "+", fmt(x.amount)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, textAlign: isRtl ? "right" : "left" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600 } }, x.date), x.note && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#9AA3B2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, x.note)), /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: "#E3F6EA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 } }, "\u{1F4B0}"), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setViewingIncomeId(x.id),
            "aria-label": "options",
            style: {
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3
            }
          },
          /* @__PURE__ */ React.createElement("span", { style: { width: 15, height: 2, borderRadius: 1, background: "#C7CCD6" } }),
          /* @__PURE__ */ React.createElement("span", { style: { width: 15, height: 2, borderRadius: 1, background: "#C7CCD6" } }),
          /* @__PURE__ */ React.createElement("span", { style: { width: 15, height: 2, borderRadius: 1, background: "#C7CCD6" } })
        ))))
      )
    ),
    viewingExpenseId && (() => {
      const x = expenses.find((e) => e.id === viewingExpenseId);
      if (!x) return null;
      const c = dynCatById[x.category] || catById.other;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          onClick: () => setViewingExpenseId(null),
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(20,26,38,0.45)",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }
        },
        /* @__PURE__ */ React.createElement(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            style: { position: "relative", width: "100%", maxWidth: 340, background: "#fff", borderRadius: 18, boxShadow: "0 12px 32px rgba(0,0,0,0.25)", padding: 18 }
          },
          /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => setViewingExpenseId(null),
              "aria-label": "close",
              style: {
                position: "absolute",
                top: 10,
                [isRtl ? "left" : "right"]: 10,
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "none",
                background: "#F3F5F9",
                color: "#8A93A6",
                fontSize: 15,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }
            },
            "\u2715"
          ),
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 72, height: 72, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 } }, /* @__PURE__ */ React.createElement(CatIconOrEmoji, { c, size: 34, color: "#fff" })), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 18, marginTop: 10 } }, catLabel(c))),
          /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "14px 4px", borderBottom: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#9AA3B2", fontSize: 13 } }, t.detailCategory), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, fontSize: 14 } }, t.expense)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "14px 4px", borderBottom: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#9AA3B2", fontSize: 13 } }, t.detailAmount), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 600, fontSize: 14 } }, currency, " ", fmt(x.amount))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "14px 4px", borderBottom: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#9AA3B2", fontSize: 13 } }, t.detailDate), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 600, fontSize: 14 } }, x.date)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "14px 4px" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#9AA3B2", fontSize: 13 } }, t.detailNote), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, fontSize: 14 } }, x.note || t.noNote))),
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 18 } }, /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => startEditExpense(x),
              style: { flex: 1, padding: "13px", borderRadius: 12, border: "none", background: theme.accent, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }
            },
            t.edit
          ), /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => {
                removeExpense(x.id);
                setViewingExpenseId(null);
              },
              "aria-label": "delete",
              style: { width: 52, borderRadius: 12, border: "none", background: "#E64A3B", color: "#fff", fontSize: 20, cursor: "pointer" }
            },
            "\u{1F5D1}"
          ))
        )
      );
    })(),
    viewingIncomeId && (() => {
      const x = incomes.find((e) => e.id === viewingIncomeId);
      if (!x) return null;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          onClick: () => setViewingIncomeId(null),
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(20,26,38,0.45)",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }
        },
        /* @__PURE__ */ React.createElement(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            style: { position: "relative", width: "100%", maxWidth: 340, background: "#fff", borderRadius: 18, boxShadow: "0 12px 32px rgba(0,0,0,0.25)", padding: 18 }
          },
          /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => setViewingIncomeId(null),
              "aria-label": "close",
              style: {
                position: "absolute",
                top: 10,
                [isRtl ? "left" : "right"]: 10,
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "none",
                background: "#F3F5F9",
                color: "#8A93A6",
                fontSize: 15,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }
            },
            "\u2715"
          ),
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 72, height: 72, borderRadius: "50%", background: "#2E9E5B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 } }, "\u{1F4B0}"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 18, marginTop: 10 } }, t.income)),
          /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "14px 4px", borderBottom: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#9AA3B2", fontSize: 13 } }, t.detailCategory), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, fontSize: 14 } }, t.income)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "14px 4px", borderBottom: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#9AA3B2", fontSize: 13 } }, t.detailAmount), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 600, fontSize: 14 } }, currency, " ", fmt(x.amount))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "14px 4px", borderBottom: "1px solid #F0F1F5" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#9AA3B2", fontSize: 13 } }, t.detailDate), /* @__PURE__ */ React.createElement("span", { className: "amount-num", style: { fontWeight: 600, fontSize: 14 } }, x.date)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "14px 4px" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#9AA3B2", fontSize: 13 } }, t.detailNote), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, fontSize: 14 } }, x.note || t.noNote))),
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 18 } }, /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => startEditIncome(x),
              style: { flex: 1, padding: "13px", borderRadius: 12, border: "none", background: theme.accent, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }
            },
            t.edit
          ), /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => {
                removeIncome(x.id);
                setViewingIncomeId(null);
              },
              "aria-label": "delete",
              style: { width: 52, borderRadius: 12, border: "none", background: "#E64A3B", color: "#fff", fontSize: 20, cursor: "pointer" }
            },
            "\u{1F5D1}"
          ))
        )
      );
    })(),
    showAddSheet && /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: closeAddSheet,
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(20,26,38,0.45)",
          display: "flex",
          alignItems: "flex-end",
          zIndex: 20
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          onClick: (e) => e.stopPropagation(),
          style: {
            width: "100%",
            maxWidth: 460,
            margin: "0 auto",
            background: "#fff",
            borderRadius: "20px 20px 0 0",
            padding: "18px 18px 24px",
            maxHeight: "85vh",
            overflowY: "auto"
          }
        },
        /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 4, background: "#E4E7ED", borderRadius: 2, margin: "0 auto 16px" } }),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16, background: "#F3F5F9", borderRadius: 12, padding: 4 } }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setAddTab("expense"),
            style: {
              flex: 1,
              padding: "9px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              background: addTab === "expense" ? "#fff" : "transparent",
              color: addTab === "expense" ? "#E64A3B" : "#8A93A6",
              boxShadow: addTab === "expense" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }
          },
          t.expense
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setAddTab("income"),
            style: {
              flex: 1,
              padding: "9px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              background: addTab === "income" ? "#fff" : "transparent",
              color: addTab === "income" ? "#2E9E5B" : "#8A93A6",
              boxShadow: addTab === "income" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }
          },
          t.income
        )),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 4 } }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "number",
            inputMode: "decimal",
            placeholder: t.amountPlaceholder,
            value: amount,
            onChange: (e) => {
              setAmount(e.target.value);
              setAmountError(false);
            },
            onKeyDown: (e) => {
              if (e.key === "Enter") addEntry();
            },
            className: "amount-num",
            autoFocus: true,
            style: {
              flex: 1,
              minWidth: 0,
              padding: "9px 10px",
              borderRadius: 9,
              fontSize: 14,
              border: amountError ? "1px solid #E64A3B" : "1px solid #E4E7ED"
            }
          }
        ), /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "date",
            value: date,
            onChange: (e) => setDate(e.target.value),
            style: { flex: 1, minWidth: 0, padding: "9px 10px", borderRadius: 9, border: "1px solid #E4E7ED", fontSize: 13, color: "#4a463d" }
          }
        )),
        amountError && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#E64A3B", marginBottom: 8 } }, t.amountErr),
        addTab === "expense" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, margin: "10px 0" } }, allCategories.map((c) => /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            key: c.id,
            onClick: () => setCategory(c.id),
            style: {
              padding: "6px 10px",
              borderRadius: 20,
              border: category === c.id ? `2px solid ${c.color}` : "1px solid #E4E7ED",
              background: category === c.id ? `${c.color}1a` : "#fff",
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4
            }
          },
          /* @__PURE__ */ React.createElement(CatIconOrEmoji, { c, size: 16, color: c.color }),
          /* @__PURE__ */ React.createElement("span", null, catLabel(c))
        )), /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: () => setShowNewCategoryForm((v) => !v),
            style: {
              padding: "6px 10px",
              borderRadius: 20,
              border: "1.5px dashed #C7CCD6",
              background: "#fff",
              fontSize: 13,
              cursor: "pointer",
              color: "#8A93A6",
              display: "flex",
              alignItems: "center",
              gap: 4
            }
          },
          /* @__PURE__ */ React.createElement("span", null, "\u2795"),
          /* @__PURE__ */ React.createElement("span", null, t.newCategory)
        )),
        addTab === "expense" && showNewCategoryForm && /* @__PURE__ */ React.createElement("div", { style: { background: "#F8F9FB", borderRadius: 12, padding: 12, margin: "0 0 10px" } }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            value: newCatName,
            onChange: (e) => setNewCatName(e.target.value),
            placeholder: t.newCategoryName,
            autoFocus: true,
            style: {
              width: "100%",
              padding: "9px 10px",
              borderRadius: 9,
              border: "1px solid #E4E7ED",
              fontSize: 14,
              marginBottom: 10,
              boxSizing: "border-box"
            }
          }
        ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 } }, CUSTOM_ICON_CHOICES.map((icon) => /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            key: icon,
            onClick: () => setNewCatIcon(icon),
            style: {
              width: 34,
              height: 34,
              borderRadius: 9,
              fontSize: 16,
              cursor: "pointer",
              border: newCatIcon === icon ? `2px solid ${theme.accent}` : "1px solid #E4E7ED",
              background: newCatIcon === icon ? `${theme.accent}1a` : "#fff"
            }
          },
          icon
        ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: () => {
              setShowNewCategoryForm(false);
              setNewCatName("");
            },
            style: { flex: 1, padding: "9px", borderRadius: 9, border: "1px solid #E4E7ED", background: "#fff", color: "#8A93A6", fontWeight: 700, fontSize: 13, cursor: "pointer" }
          },
          t.cancel
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: addCustomCategory,
            style: { flex: 1, padding: "9px", borderRadius: 9, border: "none", background: theme.accent, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }
          },
          t.newCategorySave
        ))),
        /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "text",
            placeholder: t.notePlaceholder,
            value: note,
            onChange: (e) => setNote(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") addEntry();
            },
            style: {
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid #E4E7ED",
              fontSize: 14,
              margin: "10px 0",
              boxSizing: "border-box"
            }
          }
        ),
        /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: addEntry,
            disabled: saving,
            style: {
              width: "100%",
              padding: "13px",
              borderRadius: 12,
              border: "none",
              background: addTab === "expense" ? "#E64A3B" : "#2E9E5B",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              opacity: saving ? 0.7 : 1
            }
          },
          saving ? t.saving : editingId ? t.saveChanges : addTab === "expense" ? t.addExpense : t.addIncome
        )
      )
    )
  );
}
