// Line icons for the benefit bullets. 28px, stroke = currentColor.
const base = { width: 28, height: 28, viewBox: "0 0 28 28", fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const icons = {
  clipboard: (
    <svg {...base}><rect x="6" y="5" width="16" height="20" rx="2" /><path d="M10 5V3.5h8V5M10 12h8M10 16h8M10 20h5" /></svg>
  ),
  inbox: (
    <svg {...base}><path d="M4 16l3-10h14l3 10v6H4z" /><path d="M4 16h6l1.5 3h5L18 16h6" /></svg>
  ),
  funnel: (
    <svg {...base}><path d="M4 5h20l-7.5 9v8l-5 2V14z" /></svg>
  ),
  handshake: (
    <svg {...base}><path d="M3 12l5-5 4 2 4-2 5 2 4 3" /><path d="M7 15l4 4c.8.8 2 .8 2.8 0l5.7-5.7" /><path d="M11 12l3 3M3 12l4 3M25 12l-4 4" /></svg>
  ),
  monitor: (
    <svg {...base}><rect x="3" y="5" width="22" height="14" rx="2" /><path d="M10 24h8M14 19v5" /></svg>
  ),
  bank: (
    <svg {...base}><path d="M3 10l11-6 11 6M5 10v10M10 10v10M18 10v10M23 10v10M3 23h22" /></svg>
  ),
  factory: (
    <svg {...base}><path d="M3 24V12l6 4v-4l6 4v-4l6 4V5h4v19z" /><path d="M8 20h2M13 20h2M18 20h2" /></svg>
  ),
  store: (
    <svg {...base}><path d="M4 11l2-6h16l2 6M4 11h20v13H4zM11 24v-7h6v7" /></svg>
  ),
};
