// A tiny, dependency-free replacement for the small slice of the "recharts" API
// this app actually uses (a donut/pie chart with colored slices and a hover label).
// Loading recharts itself from a CDN as a plain <script> turned out to be unreliable
// (its published UMD bundle isn't consistently browser-ready), so this shim avoids
// that dependency entirely while keeping the exact same component names/props the
// app already expects: PieChart, Pie, Cell, Tooltip, ResponsiveContainer.
(function () {
  const { useState, useRef, useEffect, Children, createElement: h } = React;

  function ResponsiveContainer({ width, height, children }) {
    const ref = useRef(null);
    const [size, setSize] = useState({ w: 300, h: 240 });

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const update = () => setSize({ w: el.clientWidth || 300, h: el.clientHeight || 240 });
      update();
      if (typeof ResizeObserver !== "undefined") {
        const obs = new ResizeObserver(update);
        obs.observe(el);
        return () => obs.disconnect();
      }
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);

    return h(
      "div",
      { ref, style: { width: width || "100%", height: height || "100%" } },
      React.cloneElement(children, { width: size.w, height: size.h })
    );
  }

  function toXY(cx, cy, r, angleDeg) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }

  function PieChart({ width = 300, height = 240, children }) {
    const [hoverIdx, setHoverIdx] = useState(null);
    const kids = Children.toArray(children);
    const pieEl = kids.find((k) => k && k.type === Pie);
    const tooltipEl = kids.find((k) => k && k.type === Tooltip);
    if (!pieEl) return h("svg", { width, height });

    const {
      data = [], dataKey, innerRadius = 0,
      outerRadius = Math.min(width, height) / 2 - 4,
      paddingAngle = 0, children: pieChildren,
    } = pieEl.props;

    const cells = Children.toArray(pieChildren).filter((c) => c && c.type === Cell);
    const total = data.reduce((s, d) => s + (Number(d[dataKey]) || 0), 0) || 1;
    const cx = width / 2;
    const cy = height / 2;
    let angle = 0;

    const paths = data.map((d, i) => {
      const value = Number(d[dataKey]) || 0;
      const frac = value / total;
      const start = angle + paddingAngle / 2;
      const end = angle + frac * 360 - paddingAngle / 2;
      angle += frac * 360;
      const large = end - start > 180 ? 1 : 0;
      const [x1, y1] = toXY(cx, cy, outerRadius, start);
      const [x2, y2] = toXY(cx, cy, outerRadius, end);
      const fill = (cells[i] && cells[i].props.fill) || "#999";
      let d2;
      if (innerRadius > 0) {
        const [x3, y3] = toXY(cx, cy, innerRadius, end);
        const [x4, y4] = toXY(cx, cy, innerRadius, start);
        d2 = `M${x1},${y1} A${outerRadius},${outerRadius} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${innerRadius},${innerRadius} 0 ${large} 0 ${x4},${y4} Z`;
      } else {
        d2 = `M${cx},${cy} L${x1},${y1} A${outerRadius},${outerRadius} 0 ${large} 1 ${x2},${y2} Z`;
      }
      return h("path", {
        key: i, d: d2, fill,
        onMouseEnter: () => setHoverIdx(i),
        onMouseLeave: () => setHoverIdx(null),
        onClick: () => setHoverIdx(hoverIdx === i ? null : i),
        style: { cursor: "pointer" },
      });
    });

    let label = null;
    if (hoverIdx != null && data[hoverIdx]) {
      const raw = data[hoverIdx][dataKey];
      const text = tooltipEl && tooltipEl.props.formatter ? tooltipEl.props.formatter(raw) : String(raw);
      label = h(
        "text",
        { x: cx, y: cy, textAnchor: "middle", dominantBaseline: "middle", fontSize: 13, fontWeight: 700, fill: "#1E2530" },
        text
      );
    }

    return h("svg", { width, height, viewBox: `0 0 ${width} ${height}` }, paths, label);
  }

  // Marker components: their props are read directly by PieChart above, they
  // don't render anything themselves.
  function Pie() { return null; }
  function Cell() { return null; }
  function Tooltip() { return null; }

  window.Recharts = { PieChart, Pie, Cell, Tooltip, ResponsiveContainer };
})();
