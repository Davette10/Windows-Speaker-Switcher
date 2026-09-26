/* Lux Home — premium Home Assistant dashboard cards
 * Tablet + phone layouts, Pool tab with live 3D model.
 * Appearance layer only: services are called exclusively in response to a user's tap.
 */
const LUX_VERSION = '1.3.0';
const LUX_THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.min.js';

/* ───────────────────────── Icons: one family, 24 grid, 1.5 stroke ───────────────────────── */
const I = {
  home: '<path d="M3.5 10.5 12 4l8.5 6.5"/><path d="M5.5 9v10.5h13V9"/><path d="M10 19.5v-5h4v5"/>',
  rooms: '<rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/>',
  camera: '<rect x="2.5" y="7" width="14" height="10" rx="2"/><path d="m16.5 11 5-3v8l-5-3"/>',
  music: '<path d="M9 18V5.5l11-2V16"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  pool: '<path d="M8 14V5.5a2 2 0 0 1 4 0M16 14V5.5a2 2 0 0 1 4 0M8 8.5h8M8 11.5h8"/><path d="M2 17c2 0 2-1.4 4-1.4s2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4 2-1.4 4-1.4"/><path d="M2 20.5c2 0 2-1.4 4-1.4s2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4 2-1.4 4-1.4"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1V16h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/>',
  lamp: '<path d="M8 3h8l3 8H5z"/><path d="M12 11v9M8.5 20.5h7"/>',
  power: '<path d="M12 3.5v7.5"/><path d="M6.6 6.6a7.5 7.5 0 1 0 10.8 0"/>',
  flame: '<path d="M12 21c-3.7 0-6.3-2.5-6.3-6 0-3.2 2.3-5 3.5-8 .4 1.9 1.3 2.9 2.3 3.2.2-3.4 1.6-5.6 3.9-6.7-.4 2.5.6 4.3 2 6 1 1.2 1.6 2.6 1.6 4.4 0 4-2.7 7.1-7 7.1z"/><path d="M12 21c-1.5 0-2.6-1-2.6-2.5 0-1.4 1-2.2 1.6-3.4.5 1 1.3 1.4 2 1.6.6.7 1.1 1.2 1.1 2 0 1.3-.9 2.3-2.1 2.3z"/>',
  snow: '<path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5"/><path d="m9.5 4 2.5 2 2.5-2M9.5 20l2.5-2 2.5 2"/>',
  fan: '<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4c-.6-3.6.4-6.9 3-6.9 2.2 0 3 2.4 1.2 4.3-1.2 1.3-2.8 2-4.2 2.6"/><path d="M13.4 12.8c3.4 1.3 5.6 4 4.3 6.2-1.1 1.9-3.6 1.4-4.3-1.1-.5-1.7-.3-3.4-.2-4.9"/><path d="M10.6 12.8c-2.8 2.3-6.2 2.8-7.5.6-1.1-1.9.6-3.8 3.1-3.2 1.7.4 3.1 1.5 4.3 2.4"/>',
  fountain: '<path d="M12 14V8.5"/><path d="M12 8.5c0-2.6 2-4.2 4.7-4.2M12 8.5c0-2.6-2-4.2-4.7-4.2"/><path d="M4.5 14h15"/><path d="M5.5 14v2.5A3.5 3.5 0 0 0 9 20h6a3.5 3.5 0 0 0 3.5-3.5V14"/>',
  spill: '<rect x="2.5" y="4.5" width="9" height="5" rx="1"/><path d="M11.5 7c2.7 0 3.7 2.2 3.7 6"/><path d="M2 18c2 0 2-1.4 4-1.4s2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4 2-1.4 4-1.4"/>',
  sheer: '<path d="M3 5h18"/><path d="M5 5v3M19 5v3"/><path d="M7 8v7M10.3 8v8M13.7 8v8M17 8v7"/><path d="M2 19c2 0 2-1.4 4-1.4s2 1.4 4 1.4 2-1.4 4-1.4 2 1.4 4 1.4 2-1.4 4-1.4"/>',
  bubbles: '<circle cx="8" cy="16" r="3.2"/><circle cx="15.5" cy="9" r="2.3"/><circle cx="16.5" cy="18" r="1.6"/><circle cx="9" cy="6.5" r="1.3"/>',
  thermo: '<path d="M10 13.6V5a2 2 0 0 1 4 0v8.6a4 4 0 1 1-4 0z"/><path d="M12 9.5v6"/>',
  heat: '<path d="M8 20c-1.6-2 1.6-4 0-6s1.6-4 0-6M12 20c-1.6-2 1.6-4 0-6s1.6-4 0-6M16 20c-1.6-2 1.6-4 0-6s1.6-4 0-6"/>',
  solar: '<path d="M4 18 6.5 9h11L20 18z"/><path d="M5.3 13.5h13.4M9.4 9 8.6 18M14.6 9l.8 9"/><path d="M12 2.5v2.5M5.5 4.5l1.3 1.6M18.5 4.5l-1.3 1.6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  cloud: '<path d="M7 18.5h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 11.6 3.5 3.5 0 0 0 7 18.5z"/>',
  partly: '<path d="M8.5 3.5v1.3M3.2 8.8h1.3M4.9 5.1l.9.9M12.1 5.1l-.9.9"/><path d="M5.6 11.3a3.5 3.5 0 1 1 6.2-3.1"/><path d="M9 20h8.5a3.5 3.5 0 0 0 .5-7 5 5 0 0 0-9.6.9A3.1 3.1 0 0 0 9 20z"/>',
  partlyNight: '<path d="M11.8 7.2A4 4 0 1 1 5 11.7a3 3 0 0 0 6.8-4.5z"/><path d="M9 20h8.5a3.5 3.5 0 0 0 .5-7 5 5 0 0 0-9.6.9A3.1 3.1 0 0 0 9 20z"/>',
  rain: '<path d="M7 15.5h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 8.6 3.5 3.5 0 0 0 7 15.5z"/><path d="m8.5 18-1 2.5M12.5 18l-1 2.5M16.5 18l-1 2.5"/>',
  pour: '<path d="M7 14.5h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 7.6 3.5 3.5 0 0 0 7 14.5z"/><path d="m8 16.5-1.5 4M12 16.5l-1.5 4M16 16.5l-1.5 4"/>',
  snowy: '<path d="M7 15h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 8.1 3.5 3.5 0 0 0 7 15z"/><path d="M8.5 18.5h.01M12 20h.01M15.5 18.5h.01"/>',
  storm: '<path d="M7 15h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 8.1 3.5 3.5 0 0 0 7 15z"/><path d="m12.5 15-2 3.5h3l-2 3.5"/>',
  fog: '<path d="M4 9h16M3 13h18M5 17h14M8 21h8"/>',
  wind: '<path d="M3 9h10.5a2.5 2.5 0 1 0-2.5-2.5M3 13h15a3 3 0 1 1-3 3M3 17h7"/>',
  play: '<path d="M8 5.2v13.6a.6.6 0 0 0 .9.5L19.5 12.5a.6.6 0 0 0 0-1L8.9 4.7a.6.6 0 0 0-.9.5z"/>',
  pause: '<path d="M8.5 5v14M15.5 5v14"/>',
  next: '<path d="M5.5 6.2v11.6L14 12z"/><path d="M18 6v12"/>',
  prev: '<path d="M18.5 6.2v11.6L10 12z"/><path d="M6 6v12"/>',
  volume: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  mute: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
  speaker: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><circle cx="12" cy="14.5" r="3.2"/><path d="M12 7h.01"/>',
  plus: '<path d="M12 5.5v13M5.5 12h13"/>',
  minus: '<path d="M5.5 12h13"/>',
  chevron: '<path d="m9.5 6 6 6-6 6"/>',
  close: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1-3.6 4-5.2 7.5-5.2s6.5 1.6 7.5 5.2"/>',
  shield: '<path d="M12 3l7.5 3v5.5c0 4.5-3.2 8.2-7.5 9.5-4.3-1.3-7.5-5-7.5-9.5V6z"/>',
  wifi: '<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0"/><path d="M12 19.5h.01"/>',
  bolt: '<path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z"/>',
  drop: '<path d="M12 3.5s6 6.4 6 10.9a6 6 0 0 1-12 0c0-4.5 6-10.9 6-10.9z"/>',
  flask: '<path d="M9 3h6M10 3v6l-5.4 9.3A1.8 1.8 0 0 0 6.1 21h11.8a1.8 1.8 0 0 0 1.5-2.7L14 9V3"/><path d="M7.2 15h9.6"/>',
  spa: '<path d="M3 12h18v4.5A3.5 3.5 0 0 1 17.5 20h-11A3.5 3.5 0 0 1 3 16.5z"/><path d="M8 9c-1-1.2 1-2.3 0-3.5M12 9c-1-1.2 1-2.3 0-3.5M16 9c-1-1.2 1-2.3 0-3.5"/>',
  sofa: '<path d="M4.5 11V8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><path d="M3 12a1.5 1.5 0 0 1 3 0v2h12v-2a1.5 1.5 0 0 1 3 0v5H3z"/><path d="M5 17v2M19 17v2"/>',
  bed: '<path d="M3 18.5V6M3 13h18v5.5M21 13v-1.5A3.5 3.5 0 0 0 17.5 8H11v5"/><circle cx="7" cy="10.3" r="1.6"/>',
  kitchen: '<path d="M4 10h16v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M2.5 10h19M9 6.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5"/>',
  terrace: '<path d="M2.5 10 12 4.5l9.5 5.5"/><path d="M4 10h16"/><path d="M6 10v10M18 10v10"/><path d="M3 20h18"/>',
  chandelier: '<path d="M12 2.5v4"/><rect x="4.5" y="6.5" width="15" height="7" rx="1"/><path d="m4.5 6.5 7.5 7 7.5-7M4.5 13.5l7.5-7 7.5 7"/><path d="M8 13.5v2.5M16 13.5v2.5"/>',
  downlight: '<path d="M6.5 4.5h11"/><path d="M8.5 4.5v1.5a3.5 3.5 0 0 0 7 0V4.5"/><path d="M12 12.5v2.5M7.2 11.3l-1.7 1.7M16.8 11.3l1.7 1.7M12 18.5v2.5M6 17.5l-2 1.2M18 17.5l2 1.2"/>',
  tv: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20.5h7M12 16.5v4"/>',
  gym: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
  bath: '<path d="M4 12h16v3a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 4 15z"/><path d="M6 12V5.5a1.5 1.5 0 0 1 3 0"/><path d="m7 19.5-1 1.5M17 19.5l1 1.5"/>',
  garage: '<path d="M3 20V9l9-5 9 5v11"/><path d="M7 20v-8h10v8M7 15h10"/>',
  stairs: '<path d="M3 20h5v-5h5v-5h5V5h3"/>',
  desk: '<path d="M3 9h18M5 9v11M19 9v11M13 9v6h6"/>',
  door: '<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21M3.5 21h17"/><path d="M14.5 12.5h.01"/>',
  tree: '<path d="M12 21v-4M6.5 17h11L12 3.5z"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 16.5l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6z"/>',
  cube: '<path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
  top: '<rect x="4" y="4" width="16" height="16" rx="3"/><rect x="8" y="8" width="8" height="8" rx="1.5"/>',
  grid: '<circle cx="6" cy="6" r="1.2"/><circle cx="12" cy="6" r="1.2"/><circle cx="18" cy="6" r="1.2"/><circle cx="6" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  dot: '<circle cx="12" cy="12" r="3"/>',
  motion: '<circle cx="13" cy="4.5" r="1.8"/><path d="m9 21 2.5-6.5 3 2.5v4.5M8 11.5l2.5-3.5h3.5l2 3.5 2.5 1M11.5 14.5 12.5 8"/>',
  gauge: '<path d="M4.2 17a9 9 0 1 1 15.6 0"/><path d="m12 13 4-4"/><circle cx="12" cy="13.5" r="1.3"/>',
};
const icon = (name, cls = '') =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || I.dot}</svg>`;

const WEATHER_ICON = {
  'clear-night': 'moon', cloudy: 'cloud', exceptional: 'sparkle', fog: 'fog', hail: 'snowy', lightning: 'storm',
  'lightning-rainy': 'storm', partlycloudy: 'partly', pouring: 'pour', rainy: 'rain', snowy: 'snowy',
  'snowy-rainy': 'snowy', sunny: 'sun', windy: 'wind', 'windy-variant': 'wind',
};
const WEATHER_LABEL = {
  'clear-night': 'Clear', cloudy: 'Cloudy', exceptional: 'Unusual', fog: 'Fog', hail: 'Hail', lightning: 'Thunderstorms',
  'lightning-rainy': 'Storms', partlycloudy: 'Partly Cloudy', pouring: 'Heavy Rain', rainy: 'Rain', snowy: 'Snow',
  'snowy-rainy': 'Sleet', sunny: 'Sunny', windy: 'Windy', 'windy-variant': 'Windy',
};

/* Room icon guess from the area name */
function roomIcon(name = '') {
  const n = name.toLowerCase();
  if (/bed|sleep/.test(n)) return 'bed';
  if (/bath|shower/.test(n)) return 'bath';
  if (/kitchen|dining|pantry/.test(n)) return 'kitchen';
  if (/theater|movie|tv|media|gaming|playroom|bonus/.test(n)) return 'tv';
  if (/gym|fitness/.test(n)) return 'gym';
  if (/garage/.test(n)) return 'garage';
  if (/stair|upstairs|downstairs|hall|foyer/.test(n)) return 'stairs';
  if (/office|study|desk/.test(n)) return 'desk';
  if (/pool|spa|tub/.test(n)) return 'pool';
  if (/out|patio|yard|porch|garden/.test(n)) return 'tree';
  if (/laundry/.test(n)) return 'door';
  return 'sofa';
}

/* ───────────────────────── helpers ───────────────────────── */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };
const isOn = (st) => !!st && ['on', 'playing', 'heat', 'open', 'home'].includes(st.state);
const avail = (st) => !!st && st.state !== 'unavailable';
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const reduceMotion = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

function relTime(iso) {
  if (!iso) return '';
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} hr ago`;
  return `${Math.round(s / 86400)} d ago`;
}
function clockTime(d = new Date()) {
  let h = d.getHours(); const m = d.getMinutes(); const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12; return { t: `${h}:${String(m).padStart(2, '0')}`, ap };
}
function greeting(d = new Date()) {
  const h = d.getHours();
  return h < 5 ? 'Good evening' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}
function sinceTime(iso) {
  if (!iso) return '';
  const d = new Date(iso); const today = new Date();
  const { t, ap } = clockTime(d);
  if (d.toDateString() === today.toDateString()) return `Since ${t} ${ap}`;
  return `Since ${d.toLocaleDateString(undefined, { weekday: 'short' })} ${t} ${ap}`;
}
function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function fireMoreInfo(node, entityId) {
  node.dispatchEvent(new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId } }));
}
function lightRGB(st) {
  const c = st && st.attributes && st.attributes.rgb_color;
  if (c && c.length === 3) {
    // keep tints soft: pull saturated colors a little toward warm white
    return c.map((v, i) => Math.round(v * 0.85 + [255, 214, 150][i] * 0.15));
  }
  return [255, 196, 110];
}

/* Pool light show palette (iAquaLink effects) */
const POOL_EFFECTS = {
  'Alpine White': ['#eef4ff'], 'Sky Blue': ['#76c6ff'], 'Cobalt Blue': ['#2f5dff'], 'Caribbean Blue': ['#12c9d6'],
  'Spring Green': ['#66f08c'], 'Emerald Green': ['#10b76a'], 'Emerald Rose': ['#10b76a', '#ff5fa2'], Magenta: ['#ff3ccb'],
  Violet: ['#8b5cff'], 'Slow Splash': ['#2f5dff', '#12c9d6', '#8b5cff', '#10b76a'], 'Fast Splash': ['#ff3ccb', '#12c9d6', '#66f08c', '#2f5dff'],
  'USA!': ['#ff3b30', '#eef4ff', '#2f5dff'], 'Fat Tuesday': ['#8b5cff', '#ffd23f', '#10b76a'], 'Disco Tech': ['#ff3ccb', '#12c9d6', '#ffd23f', '#8b5cff'],
};
/* ───────────────────────── Design tokens + styles ───────────────────────── */
const LUX_CSS = `
:host{
  --r-xl:30px; --r-l:24px; --r-m:18px; --r-s:13px; --r-pill:999px;
  --gap:12px; --pad:20px;
  --ease: cubic-bezier(.2,.8,.2,1);
  --spring: cubic-bezier(.34,1.18,.64,1);
  --font: "Inter var","Inter",-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text","Helvetica Neue",system-ui,sans-serif;
  --accent:#0a84ff; --heat:#ff9f0a; --cool:#64d2ff; --ok:#30d158; --warn:#ffd60a; --alert:#ff453a; --fire:#ff7a1a;
  display:block; position:relative; overflow:hidden; font-family:var(--font);
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; font-feature-settings:"cv11","ss01","tnum" 0;
  color:var(--t1); background:var(--bg); border-radius:0;
  -webkit-tap-highlight-color:transparent; user-select:none; -webkit-user-select:none;
  transition: background .6s var(--ease), color .6s var(--ease);
}
:host([theme=dark]){
  --bg: radial-gradient(1100px 700px at 12% -8%, #1a2130 0%, rgba(26,33,48,0) 62%),
        radial-gradient(900px 640px at 105% 108%, #171d19 0%, rgba(23,29,25,0) 60%), #060708;
  --glass: rgba(30,32,37,.56); --glass-2: rgba(44,47,54,.62); --glass-3: rgba(255,255,255,.07);
  --edge: rgba(255,255,255,.075); --edge-hi: rgba(255,255,255,.12);
  --t1:#f5f5f7; --t2:rgba(235,235,245,.62); --t3:rgba(235,235,245,.36); --t4:rgba(235,235,245,.14);
  --btn: rgba(255,255,255,.08); --btn-hi: rgba(255,255,255,.14); --btn-on:#f5f5f7; --btn-on-t:#0b0b0c;
  --shadow: 0 1px 0 rgba(255,255,255,.04) inset, 0 20px 50px rgba(0,0,0,.35);
  --scrim: rgba(0,0,0,.45); --sheet: rgba(28,29,33,.86);
}
:host([theme=light]){
  --bg: radial-gradient(1100px 700px at 10% -10%, #ffffff 0%, rgba(255,255,255,0) 60%),
        radial-gradient(900px 700px at 110% 110%, #dfe6ee 0%, rgba(223,230,238,0) 60%), #eceef2;
  --glass: rgba(255,255,255,.64); --glass-2: rgba(255,255,255,.82); --glass-3: rgba(0,0,0,.04);
  --edge: rgba(0,0,0,.05); --edge-hi: rgba(255,255,255,.9);
  --t1:#1d1d1f; --t2:rgba(60,60,67,.66); --t3:rgba(60,60,67,.4); --t4:rgba(60,60,67,.12);
  --btn: rgba(0,0,0,.05); --btn-hi: rgba(0,0,0,.09); --btn-on:#1d1d1f; --btn-on-t:#ffffff;
  --shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 1px 2px rgba(0,0,0,.04), 0 12px 34px rgba(30,40,60,.08);
  --scrim: rgba(20,24,30,.22); --sheet: rgba(250,250,252,.9);
}
*{box-sizing:border-box}
.ic{width:22px;height:22px;flex:none;display:block}
button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-tap-highlight-color:transparent}
.press{transition:transform .18s var(--ease), background .25s var(--ease), opacity .25s}
.press:active{transform:scale(.965)}

/* shell */
.shell{position:absolute;inset:0;display:flex;flex-direction:column}
.top{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:18px 26px 12px;gap:16px;flex:none}
.hello .g{font-size:26px;font-weight:650;letter-spacing:-.022em;line-height:1.1}
.hello .d{font-size:13px;color:var(--t2);margin-top:3px;letter-spacing:.005em}
.clock{justify-self:end;text-align:right;cursor:default}
.clock .t{font-size:26px;font-weight:600;letter-spacing:-.02em;line-height:1.1;font-variant-numeric:tabular-nums}
.clock .t small{font-size:12px;font-weight:600;color:var(--t2);margin-left:3px;letter-spacing:.02em}
.clock .s{font-size:11.5px;color:var(--t2);margin-top:4px;display:flex;gap:6px;justify-content:flex-end;align-items:center}
.dotline{width:6px;height:6px;border-radius:50%;background:var(--ok);box-shadow:0 0 8px var(--ok)}
.dotline.off{background:var(--alert);box-shadow:0 0 8px var(--alert)}

.nav{position:relative;display:flex;gap:2px;padding:5px;border-radius:20px;background:var(--glass);
  backdrop-filter:blur(30px) saturate(170%);-webkit-backdrop-filter:blur(30px) saturate(170%);
  border:1px solid var(--edge);box-shadow:var(--shadow)}
.nav .ind{position:absolute;top:5px;left:0;height:calc(100% - 10px);border-radius:15px;background:var(--btn-hi);
  transition:transform .5s var(--spring), width .5s var(--spring);will-change:transform}
.nav button{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:3px;
  min-width:68px;padding:7px 10px 6px;border-radius:15px;color:var(--t2);transition:color .25s}
.nav button .ic{width:19px;height:19px}
.nav button span{font-size:10.5px;font-weight:550;letter-spacing:.01em}
.nav button.on{color:var(--t1)}

.pages{position:relative;flex:1;min-height:0}
.page{position:absolute;inset:0;padding:4px 26px 22px;opacity:0;pointer-events:none;
  transform:scale(.985) translateY(6px);transition:opacity .38s var(--ease), transform .5s var(--ease);overflow:hidden}
.page.on{opacity:1;pointer-events:auto;transform:none}
.page.scroll{overflow-y:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.page.scroll::-webkit-scrollbar{display:none}

/* glass card */
.card{position:relative;border-radius:var(--r-l);background:var(--glass);border:1px solid var(--edge);
  backdrop-filter:blur(34px) saturate(170%);-webkit-backdrop-filter:blur(34px) saturate(170%);
  box-shadow:var(--shadow);padding:18px 20px;overflow:hidden;min-width:0;min-height:0}
.card.tap{cursor:pointer}
.hd{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:12px}
.hd .tt{font-size:19px;font-weight:650;letter-spacing:-.018em}
.hd .tt small{font-size:13px;font-weight:500;color:var(--t2);margin-left:8px;letter-spacing:0}
.link{font-size:13.5px;font-weight:550;color:var(--accent);display:flex;align-items:center;gap:1px}
.link .ic{width:15px;height:15px;stroke-width:2}
.sub{font-size:12.5px;color:var(--t2)}
.muted{color:var(--t3)}
.pill{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 13px;border-radius:var(--r-pill);
  background:var(--btn);font-size:12.5px;font-weight:600;color:var(--t1);white-space:nowrap}
.pill .ic{width:15px;height:15px}
.pill.solid{background:var(--btn-on);color:var(--btn-on-t)}
.pill.confirm{background:var(--alert);color:#fff}
.round{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:var(--btn);color:var(--t1);flex:none}
.round .ic{width:19px;height:19px}
.round.on{background:var(--btn-on);color:var(--btn-on-t)}
.round.heat.on{background:var(--heat);color:#fff}
.round.cool.on{background:var(--accent);color:#fff}
.round.sm{width:34px;height:34px}
.round.sm .ic{width:17px;height:17px}

/* ── Home (tablet) ── */
.home-grid{height:100%;display:grid;gap:var(--gap);
  grid-template-columns:minmax(0,1fr) minmax(0,1.24fr) minmax(0,1fr);
  grid-template-rows:minmax(0,1fr) minmax(0,1fr) auto;
  grid-template-areas:"wx cam1 ppl" "pool cam2 lights" "c1 media c2"}
.a-wx{grid-area:wx}.a-cam1{grid-area:cam1}.a-ppl{grid-area:ppl}.a-pool{grid-area:pool}.a-cam2{grid-area:cam2}
.a-lights{grid-area:lights}.a-c1{grid-area:c1}.a-media{grid-area:media}.a-c2{grid-area:c2}

/* weather */
.wx{display:flex;flex-direction:column}
.wx .row1{display:flex;justify-content:space-between;align-items:flex-start}
.wx .temp{font-size:60px;font-weight:250;letter-spacing:-.045em;line-height:.95;margin-left:-3px}
.wx .temp sup{font-size:.55em;font-weight:250;vertical-align:.42em;margin-left:1px}
.wx .cond{font-size:15px;font-weight:600;margin-top:8px;letter-spacing:-.01em}
.wx .meta{font-size:12px;color:var(--t2);margin-top:2px}
.wx .big-ic .ic{width:38px;height:38px;stroke-width:1.3;color:var(--warn)}
.wx .fc{margin-top:auto;display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid var(--t4);padding-top:12px;gap:4px}
.wx .fc div{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px}
.wx .fc .dn{color:var(--t2);font-weight:550}
.wx .fc .ic{width:18px;height:18px;color:var(--t1);opacity:.85}
.wx .fc .hi{font-weight:600;font-variant-numeric:tabular-nums}
.wx .fc .lo{color:var(--t3);font-variant-numeric:tabular-nums;margin-top:-3px}

/* camera */
.cam{padding:0;background:#000;border-color:rgba(255,255,255,.06)}
.cam .feed{position:absolute;inset:0;overflow:hidden;border-radius:inherit}
.cam .feed img,.cam .feed video{width:100%;height:100%;object-fit:cover;display:block}
.cam .feed > *{width:100%;height:100%}
.cam .ph{position:absolute;inset:0;background:linear-gradient(135deg,#1c2129,#0d0f13);display:grid;place-items:center;color:rgba(255,255,255,.3)}
.cam .ph .ic{width:34px;height:34px;stroke-width:1.2}
.cam .shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.28) 0%,rgba(0,0,0,0) 26%,rgba(0,0,0,0) 70%,rgba(0,0,0,.4) 100%)}
.chip{position:absolute;display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 11px;border-radius:999px;
  background:rgba(20,20,22,.5);backdrop-filter:blur(20px) saturate(160%);-webkit-backdrop-filter:blur(20px) saturate(160%);
  color:#fff;font-size:11.5px;font-weight:600;letter-spacing:.01em;border:1px solid rgba(255,255,255,.1);pointer-events:none}
.chip.tl{top:12px;left:12px}.chip.bl{bottom:12px;left:12px}.chip.br{bottom:12px;right:12px}.chip.tr{top:12px;right:12px}
.chip .live{width:6px;height:6px;border-radius:50%;background:var(--alert);box-shadow:0 0 6px var(--alert)}
.chip .ic{width:13px;height:13px}

.slot{position:relative;min-width:0;min-height:0;border-radius:var(--r-l)}
.slot > .cam{position:absolute;inset:0;transition:opacity .55s var(--ease), transform .7s var(--ease), box-shadow .4s var(--ease)}
.slot > .cam.out{opacity:0;transform:scale(.985)}
.slot.alert > .cam{box-shadow:0 0 0 2px rgba(255,69,58,.85),0 0 34px rgba(255,69,58,.28)}
.duo .slot{aspect-ratio:4/3}
.house-grid{height:100%;display:grid;gap:var(--gap);grid-template-columns:minmax(0,1fr) minmax(0,340px);grid-template-rows:minmax(0,1fr)}
.hpanel{display:flex;flex-direction:column;min-height:0}
.hlist{overflow-y:auto;scrollbar-width:none;display:flex;flex-direction:column;gap:6px;min-height:0}
.hlist::-webkit-scrollbar{display:none}
.hroom{display:flex;align-items:center;gap:12px;padding:9px 10px;border-radius:var(--r-m);cursor:pointer;transition:background .25s var(--ease)}
.hroom:hover{background:var(--btn)}
.hroom .ri{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;background:var(--btn);color:var(--t2);flex:none;transition:all .3s}
.hroom .ri .ic{width:18px;height:18px}
.hroom.lit .ri{background:rgba(255,196,110,.95);color:#1a1206;box-shadow:0 0 18px rgba(255,196,110,.35)}
.hroom .tx{flex:1;min-width:0}
.hroom .rn{font-size:14px;font-weight:620;letter-spacing:-.005em}
.hroom .rs{font-size:11.5px;color:var(--t2);margin-top:1px}
.hroom .chev{width:15px;height:15px;color:var(--t3)}
:host([layout=phone]) .hstage{height:min(52vh,420px);flex:none}
:host([layout=phone]) .hpanel{min-height:auto}
/* people */
.ppl-list{display:flex;flex-direction:column;gap:2px;overflow:hidden}
.pp{display:flex;align-items:center;gap:12px;padding:7px 0}
.av{width:36px;height:36px;border-radius:50%;flex:none;display:grid;place-items:center;font-weight:650;font-size:14px;
  background:var(--btn);border:1.5px solid var(--edge-hi);overflow:hidden;color:var(--t1)}
.av img{width:100%;height:100%;object-fit:cover}
.pp .nm{font-size:14.5px;font-weight:600;letter-spacing:-.005em}
.pp .since{font-size:11.5px;color:var(--t3);margin-top:1px}
.pp .z{margin-left:auto}
.zone{display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 11px;border-radius:999px;font-size:12px;font-weight:600;
  background:var(--btn);color:var(--t2)}
.zone.home{background:var(--btn-on);color:var(--btn-on-t)}
.zone .ic{width:13px;height:13px}

/* pool summary */
.poolsum{display:flex;flex-direction:column}
.poolsum .body{display:flex;gap:16px;flex:1;min-height:0;align-items:center}
.poolsum svg.map{flex:1.1;min-width:0;height:100%;max-height:150px}
.poolsum .stats{flex:1;display:flex;flex-direction:column;gap:10px;min-width:0}
.stat .v{font-size:30px;font-weight:300;letter-spacing:-.03em;line-height:1;font-variant-numeric:tabular-nums}
.stat .v sup{font-size:.5em;vertical-align:.5em}
.stat .l{font-size:12px;color:var(--t2);margin-top:3px;display:flex;align-items:center;gap:5px}
.stat .l .ic{width:13px;height:13px}
.feat{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.feat .pill{height:26px;padding:0 10px;font-size:11.5px}
.feat .pill.hot{background:rgba(255,122,26,.16);color:var(--fire)}
.feat .pill.cool{background:rgba(10,132,255,.14);color:var(--accent)}

/* lights */
.lt-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;overflow:hidden;align-content:start}
.lt{position:relative;border-radius:var(--r-m);padding:11px 12px;display:flex;align-items:center;gap:10px;overflow:hidden;
  background:var(--btn);border:1px solid transparent;cursor:pointer;touch-action:pan-y;min-height:62px;
  transition:background .3s var(--ease), border-color .3s, transform .18s var(--ease)}
.lt.on{background:rgba(var(--rgb),.15);border-color:rgba(var(--rgb),.22)}
.lt .bub{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--btn-hi);color:var(--t2);flex:none;transition:all .3s}
.lt.on .bub{background:rgba(var(--rgb),.95);color:#1a1206;box-shadow:0 0 18px rgba(var(--rgb),.45)}
.lt .bub .ic{width:18px;height:18px}
.lt .n{font-size:13.5px;font-weight:600;line-height:1.2;letter-spacing:-.005em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.lt .b{font-size:11.5px;color:var(--t2);margin-top:2px;font-variant-numeric:tabular-nums}
.lt .bar{position:absolute;left:12px;right:12px;bottom:6px;height:3px;border-radius:3px;background:var(--t4);overflow:hidden;opacity:0;transition:opacity .3s}
.lt.on .bar{opacity:1}
.lt .bar i{display:block;height:100%;background:rgba(var(--rgb),1);border-radius:3px;transition:width .25s var(--ease)}
.lt.dragging .bar i{transition:none}
.lt.dragging{transform:scale(1.015)}
.lt.na{opacity:.4}
.hint{font-size:11px;color:var(--t3);margin-top:10px;text-align:left}
.empty{height:100%;display:grid;place-items:center;text-align:center;color:var(--t3);font-size:13px;gap:8px;align-content:center}
.empty .ic{width:28px;height:28px;margin:0 auto;stroke-width:1.2}

/* climate */
.clim{display:flex;align-items:center;gap:12px;padding:14px 16px}
.clim .nm{font-size:16px;font-weight:650;letter-spacing:-.012em}
.clim .st{font-size:12px;color:var(--t2);margin-top:2px}
.clim .left{min-width:0;flex:1}
.clim .modes{display:flex;gap:7px}
.clim .sp{display:flex;align-items:center;gap:9px;margin-top:10px}
.clim .spv{font-size:30px;font-weight:300;letter-spacing:-.03em;font-variant-numeric:tabular-nums;min-width:62px;text-align:center;transition:color .3s}
.clim .spv sup{font-size:.5em;vertical-align:.55em}
.clim.heat .spv{color:var(--heat)}
.clim.off .spv{color:var(--t3)}
.clim .lbl{font-size:12px;color:var(--t2);font-weight:550}
.clim.spa{background:linear-gradient(135deg,rgba(255,159,10,.10),rgba(255,159,10,0) 55%),var(--glass)}
.clim.poolc{background:linear-gradient(135deg,rgba(10,132,255,.12),rgba(10,132,255,0) 55%),var(--glass)}

/* mini media */
.mm{display:flex;align-items:center;gap:14px;padding:12px 16px}
.art{width:52px;height:52px;border-radius:12px;background:var(--btn) center/cover no-repeat;flex:none;display:grid;place-items:center;color:var(--t3);box-shadow:0 6px 18px rgba(0,0,0,.25)}
.art .ic{width:22px;height:22px}
.mm .ti{font-size:14.5px;font-weight:620;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.008em}
.mm .ar{font-size:12px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
.mm .txt{flex:1;min-width:0}
.eq{display:inline-flex;gap:2px;align-items:flex-end;height:11px;margin-right:5px;vertical-align:-1px}
.eq i{width:2.5px;background:var(--accent);border-radius:2px;animation:eq 1s ease-in-out infinite}
.eq i:nth-child(2){animation-delay:-.35s}.eq i:nth-child(3){animation-delay:-.7s}
@keyframes eq{0%,100%{height:3px}50%{height:11px}}

/* rooms */
.room-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:var(--gap);padding-bottom:10px}
.room{padding:16px;min-height:118px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer}
.room .ri{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;background:var(--btn);color:var(--t2)}
.room.lit .ri{background:rgba(255,196,110,.95);color:#1a1206;box-shadow:0 0 22px rgba(255,196,110,.35)}
.room .rn{font-size:15px;font-weight:620;letter-spacing:-.01em;margin-top:14px}
.room .rs{font-size:12px;color:var(--t2);margin-top:2px}
.sec-t{font-size:13px;font-weight:600;color:var(--t2);letter-spacing:.02em;text-transform:uppercase;margin:6px 4px 10px}

/* cameras page */
.cam-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap);padding-bottom:10px}
.cam-grid .cam{aspect-ratio:16/9;cursor:pointer}
.cam-grid .cam.hero{grid-column:span 2;grid-row:span 2;aspect-ratio:auto}

/* media page */
.media-wrap{height:100%;display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:var(--gap)}
.np{display:flex;align-items:center;gap:34px;padding:34px;isolation:isolate}
.np .bgart{position:absolute;inset:-40px;background:center/cover no-repeat;filter:blur(60px) saturate(160%);opacity:.5;z-index:-1;transform:scale(1.2);transition:background-image .6s}
.np .bigart{width:min(44%,300px);aspect-ratio:1;border-radius:22px;background:var(--btn) center/cover no-repeat;flex:none;
  box-shadow:0 30px 60px rgba(0,0,0,.35);display:grid;place-items:center;color:var(--t3);transition:transform .5s var(--spring)}
.np .bigart.paused{transform:scale(.92)}
.np .bigart .ic{width:64px;height:64px;stroke-width:1}
.np .info{flex:1;min-width:0}
.np .src{font-size:12px;font-weight:650;color:var(--t2);letter-spacing:.06em;text-transform:uppercase;display:flex;align-items:center;gap:6px}
.np .src .ic{width:14px;height:14px}
.np .ttl{font-size:30px;font-weight:700;letter-spacing:-.025em;line-height:1.1;margin-top:10px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.np .art2{font-size:17px;color:var(--t2);margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ctl{display:flex;align-items:center;gap:22px;margin-top:28px}
.ctl .round{width:48px;height:48px;background:transparent}
.ctl .round .ic{width:26px;height:26px}
.ctl .round.main{width:66px;height:66px;background:var(--btn-on);color:var(--btn-on-t)}
.ctl .round.main .ic{width:28px;height:28px;fill:currentColor}
.vol{display:flex;align-items:center;gap:12px;margin-top:26px;color:var(--t2)}
.slider{position:relative;flex:1;height:8px;border-radius:8px;background:var(--t4);touch-action:none;cursor:pointer;transition:height .2s var(--ease)}
.slider.active{height:12px}
.slider i{position:absolute;left:0;top:0;bottom:0;border-radius:8px;background:var(--t1)}
.slider::after{content:"";position:absolute;inset:-14px 0}
.srcs{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.spk-list{display:flex;flex-direction:column;gap:6px;overflow-y:auto;scrollbar-width:none}
.spk{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:var(--r-m);cursor:pointer;transition:background .25s}
.spk.sel{background:var(--btn-hi)}
.spk .si{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--btn);color:var(--t2);flex:none;background-size:cover;background-position:center}
.spk .sn{font-size:14px;font-weight:600}
.spk .ss{font-size:12px;color:var(--t2);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.spk .tx{min-width:0;flex:1}

/* pool page */
.pool-grid{height:100%;display:grid;gap:var(--gap);grid-template-columns:minmax(0,270px) minmax(0,1fr) minmax(0,326px);grid-template-rows:minmax(0,1fr)}
.col{display:flex;flex-direction:column;gap:var(--gap);min-height:0;overflow-y:auto;scrollbar-width:none}
.col::-webkit-scrollbar{display:none}
.col>*{flex-shrink:0}
.stage{padding:0;background:transparent}
.stage canvas{position:absolute;inset:0;width:100%!important;height:100%!important;display:block;touch-action:none;cursor:grab}
.stage canvas:active{cursor:grabbing}
.stage .lbls{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.tag{position:absolute;left:0;top:0;transform:translate(-50%,-100%);display:flex;align-items:center;gap:6px;height:26px;padding:0 10px;border-radius:999px;
  background:var(--glass-2);backdrop-filter:blur(20px) saturate(170%);-webkit-backdrop-filter:blur(20px) saturate(170%);
  border:1px solid var(--edge);font-size:11.5px;font-weight:650;white-space:nowrap;transition:opacity .35s;box-shadow:0 6px 16px rgba(0,0,0,.15)}
.tag .ic{width:13px;height:13px}
.tag.hot{color:var(--fire)} .tag.cool{color:var(--accent)}
.stage .ov{position:absolute;left:14px;right:14px;bottom:14px;display:flex;justify-content:space-between;align-items:flex-end;gap:10px;pointer-events:none}
.stage .ov > *{pointer-events:auto}
.seg{display:flex;gap:2px;padding:4px;border-radius:16px;background:var(--glass-2);border:1px solid var(--edge);
  backdrop-filter:blur(24px) saturate(170%);-webkit-backdrop-filter:blur(24px) saturate(170%)}
.seg button{height:32px;padding:0 12px;border-radius:12px;font-size:12px;font-weight:600;color:var(--t2);display:flex;align-items:center;gap:6px;transition:background .25s,color .25s}
.seg button .ic{width:15px;height:15px}
.seg button.on{background:var(--btn-hi);color:var(--t1)}
.swatches{display:flex;gap:7px;padding:7px;border-radius:18px;background:var(--glass-2);border:1px solid var(--edge);
  backdrop-filter:blur(24px) saturate(170%);-webkit-backdrop-filter:blur(24px) saturate(170%);transition:opacity .35s, transform .45s var(--spring)}
.swatches.hide{opacity:0;transform:translateY(10px);pointer-events:none}
.sw{width:26px;height:26px;border-radius:50%;border:2px solid transparent;box-shadow:0 0 0 1px var(--edge) inset;transition:transform .2s var(--ease)}
.sw.on{border-color:var(--t1);transform:scale(1.08)}
.stage .load{position:absolute;inset:0;display:grid;place-items:center;color:var(--t3);font-size:13px}
.stage .ttl3{position:absolute;left:18px;top:16px;pointer-events:none}
.stage .ttl3 .a{font-size:20px;font-weight:650;letter-spacing:-.02em}
.stage .ttl3 .b{font-size:12.5px;color:var(--t2);margin-top:2px}

.water .big{display:flex;align-items:flex-start;gap:6px}
.water .big .v{font-size:64px;font-weight:200;letter-spacing:-.05em;line-height:.9}
.water .big .v sup{font-size:.45em;font-weight:250;vertical-align:.6em}
.water .row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}
.mini{border-radius:var(--r-m);background:var(--btn);padding:11px 12px}
.terr .hd{align-items:center}
.terr .hd .rt{display:flex;align-items:center;gap:10px}
.trow{display:flex;align-items:center;gap:12px;padding:9px 10px 9px 9px;border-radius:var(--r-m);background:var(--btn);cursor:pointer;transition:background .3s var(--ease),opacity .3s}
.trow:active{transform:scale(.985)}
.trow .tic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--btn-hi);color:var(--t2);flex:none;transition:all .35s var(--ease)}
.trow .tic .ic{width:21px;height:21px}
.trow.on .tic{background:var(--c,var(--accent));color:#fff;box-shadow:0 0 16px color-mix(in srgb,var(--c,var(--accent)) 45%,transparent)}
.trow .art{width:40px;height:40px;border-radius:12px;box-shadow:none;background-color:var(--btn-hi)}
.trow .art .ic{width:20px;height:20px}
.trow .txt{flex:1;min-width:0}
.trow .ti{font-size:14px;font-weight:620;letter-spacing:-.006em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.trow .ar{font-size:12px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.trow .round{width:36px;height:36px;background:var(--btn-hi)}
.trow .round.on{background:var(--btn-on);color:var(--btn-on-t)}
.trow .round .ic{width:17px;height:17px}
.trow.na{opacity:.4;pointer-events:none}
.terr{flex:none}
.terr .hd{margin-bottom:10px}
.terr{container-type:inline-size}
.terr .tb{display:grid;grid-template-columns:minmax(0,1fr);gap:9px}
@container (min-width: 500px){.terr .tb{grid-template-columns:minmax(0,1.2fr) minmax(0,1fr)}}
.terr .tiles .tile{min-height:0;height:100%;gap:8px}
.terr .trs{display:flex;flex-direction:column;gap:9px}
.terr .tile{padding:12px 9px 10px}
.terr .tile .tn{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px;letter-spacing:-.012em}
.stage{container-type:inline-size}
@container (max-width: 700px){.stage .ov{flex-direction:column-reverse;align-items:flex-start}}
@container (max-width: 430px){.stage .seg button{padding:0 8px;gap:4px}}
.trow{margin-top:0}
.terr .vol{margin-top:12px;padding:0 4px}
:host(:not([layout=phone])) .terr .vol{display:none}
.mini .l{font-size:11.5px;color:var(--t2);display:flex;align-items:center;gap:5px}
.mini .l .ic{width:13px;height:13px}
.mini .v{font-size:21px;font-weight:450;letter-spacing:-.02em;margin-top:5px;font-variant-numeric:tabular-nums}
.mini .v small{font-size:12px;color:var(--t2);font-weight:500;margin-left:2px}
.chem{display:grid;grid-template-columns:1fr 1fr;gap:10px}

.tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
.tile{position:relative;border-radius:var(--r-m);background:var(--btn);padding:12px 11px 11px;min-height:92px;display:flex;flex-direction:column;justify-content:space-between;
  cursor:pointer;transition:background .3s var(--ease), transform .18s var(--ease), color .3s;text-align:left;overflow:hidden}
.tile:active{transform:scale(.96)}
.tile .ti{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:var(--btn-hi);color:var(--t2);transition:all .3s}
.tile .ti .ic{width:18px;height:18px}
.tile .tn{font-size:12.5px;font-weight:620;line-height:1.2;letter-spacing:-.005em}
.tile .ts{font-size:11px;color:var(--t2);margin-top:1px}
.tile.on{background:var(--btn-on);color:var(--btn-on-t)}
.tile.on .ts{color:inherit;opacity:.6}
.tile.on .ti{background:var(--c,var(--accent));color:#fff;box-shadow:0 0 16px color-mix(in srgb,var(--c,var(--accent)) 50%,transparent)}
.tile.arm{background:var(--alert);color:#fff}
.tile.arm .ts{opacity:.85;color:#fff}
.tile.na{opacity:.38;pointer-events:none}

.hrow{display:flex;align-items:center;gap:10px;padding:10px 0}
.hrow + .hrow{border-top:1px solid var(--t4)}
.hrow .hn{font-size:14.5px;font-weight:620}
.hrow .hs{font-size:11.5px;color:var(--t2);margin-top:2px}
.hrow .grow{flex:1;min-width:0}
.hrow .spv{font-size:24px;font-weight:300;letter-spacing:-.03em;min-width:50px;text-align:center;font-variant-numeric:tabular-nums}
.hrow .spv sup{font-size:.5em;vertical-align:.55em}
.hrow.heat .spv{color:var(--heat)}
.hrow.off .spv{color:var(--t3)}

/* sheet */
.scrim{position:absolute;inset:0;background:var(--scrim);opacity:0;pointer-events:none;transition:opacity .35s var(--ease);z-index:20}
.scrim.on{opacity:1;pointer-events:auto}
.sheet{position:absolute;z-index:21;left:50%;top:50%;width:min(620px,calc(100% - 40px));max-height:calc(100% - 80px);
  transform:translate(-50%,-46%) scale(.96);opacity:0;pointer-events:none;border-radius:var(--r-xl);
  background:var(--sheet);backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%);
  border:1px solid var(--edge);box-shadow:0 40px 90px rgba(0,0,0,.4);padding:22px;display:flex;flex-direction:column;
  transition:opacity .3s var(--ease), transform .5s var(--spring)}
.sheet.on{opacity:1;transform:translate(-50%,-50%);pointer-events:auto}
.sheet .sh-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.sheet .sh-hd .tt{font-size:22px;font-weight:700;letter-spacing:-.02em}
.sheet .sh-body{overflow-y:auto;scrollbar-width:none;min-height:0}
.fx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:9px}
.fx{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:var(--r-m);background:var(--btn);font-size:13px;font-weight:600;cursor:pointer}
.fx.on{background:var(--btn-on);color:var(--btn-on-t)}
.fx i{width:22px;height:22px;border-radius:50%;flex:none;box-shadow:0 0 0 1px var(--edge) inset}

/* ── Phone ── */
:host([layout=phone]) .top{grid-template-columns:1fr auto;padding:14px 18px 8px}
:host([layout=phone]) .top .nav{display:none}
:host([layout=phone]) .hello .g{font-size:28px}
:host([layout=phone]) .clock .t{font-size:17px}
:host([layout=phone]) .page{padding:4px 16px calc(100px + env(safe-area-inset-bottom));overflow-y:auto;scrollbar-width:none}
:host([layout=phone]) .page::-webkit-scrollbar{display:none}
.stack{display:flex;flex-direction:column;gap:var(--gap)}
.duo{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap)}
.duo .cam{aspect-ratio:4/3}
.phone-wx{display:flex;align-items:center;gap:14px;padding:14px 16px}
.phone-wx .temp{font-size:44px;font-weight:250;letter-spacing:-.045em;line-height:1}
.phone-wx .ic{width:30px;height:30px;color:var(--warn);stroke-width:1.3}
.phone-wx .fcs{margin-left:auto;display:flex;gap:12px}
.phone-wx .fcs div{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px}
.phone-wx .fcs .ic{width:16px;height:16px;color:var(--t1)}
.climv{padding:14px}
.climv .nm{font-size:14px;font-weight:650}
.climv .st{font-size:11.5px;color:var(--t2);margin-top:1px}
.climv .spv{font-size:34px;font-weight:300;letter-spacing:-.035em;margin:10px 0 10px;font-variant-numeric:tabular-nums}
.climv .spv sup{font-size:.5em;vertical-align:.6em}
.climv.heat .spv{color:var(--heat)} .climv.off .spv{color:var(--t3)}
.climv .btns{display:flex;justify-content:space-between;gap:6px}
.ppl-row{display:flex;gap:14px;overflow-x:auto;scrollbar-width:none;padding:2px}
.ppl-row .pv{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:64px}
.ppl-row .av{width:52px;height:52px;font-size:18px;position:relative;overflow:visible}
.ppl-row .av img{border-radius:50%}
.ppl-row .av .dotz{position:absolute;right:0;bottom:1px;width:14px;height:14px;border-radius:50%;background:var(--t3);border:2.5px solid var(--glass-2)}
.ppl-row .av .dotz.home{background:var(--ok)}
.ppl-row .pn{font-size:12px;font-weight:600}
.ppl-row .pz{font-size:11px;color:var(--t2);margin-top:-4px}
.tabbar{position:absolute;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));height:66px;border-radius:24px;display:none;z-index:10;
  background:var(--glass-2);backdrop-filter:blur(30px) saturate(180%);-webkit-backdrop-filter:blur(30px) saturate(180%);
  border:1px solid var(--edge);box-shadow:0 12px 40px rgba(0,0,0,.28);padding:6px}
:host([layout=phone]) .tabbar{display:flex}
.tabbar .ind{position:absolute;top:6px;left:0;height:54px;border-radius:18px;background:var(--btn-hi);transition:transform .5s var(--spring),width .5s var(--spring)}
.tabbar button{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:var(--t2);border-radius:18px;transition:color .25s}
.tabbar button .ic{width:22px;height:22px}
.tabbar button span{font-size:10px;font-weight:600;letter-spacing:.01em}
.tabbar button.on{color:var(--t1)}
:host([layout=phone]) .room-grid{grid-template-columns:1fr 1fr}
:host([layout=phone]) .room{min-height:108px;padding:14px}
:host([layout=phone]) .cam-grid{grid-template-columns:1fr}
:host([layout=phone]) .cam-grid .cam.hero{grid-column:auto;grid-row:auto;aspect-ratio:16/9}
:host([layout=phone]) .media-wrap{display:flex;flex-direction:column;height:auto}
:host([layout=phone]) .np{flex-direction:column;align-items:stretch;padding:22px;gap:20px}
:host([layout=phone]) .np .bigart{width:100%;max-width:none}
:host([layout=phone]) .np .ttl{font-size:24px}
:host([layout=phone]) .pool-grid{display:flex;flex-direction:column;height:auto}
:host([layout=phone]) .pool-grid .col{overflow:visible}
:host([layout=phone]) .stage{height:min(58vh,460px);flex:none}
:host([layout=phone]) .stage .ov{flex-direction:column-reverse;align-items:flex-start}
:host([layout=phone]) .stage .seg button{padding:0 9px;gap:5px}
:host([layout=phone]) .sheet{left:0;right:0;top:auto;bottom:0;width:auto;transform:translateY(100%);border-radius:28px 28px 0 0;max-height:82%;padding-bottom:calc(22px + env(safe-area-inset-bottom))}
:host([layout=phone]) .sheet.on{transform:none}
:host([layout=phone]) .lt-grid{grid-template-columns:1fr 1fr}

@media (prefers-reduced-motion: reduce){
  .page,.sheet,.nav .ind,.tabbar .ind{transition:opacity .2s ease !important;transform:none !important}
  .eq i{animation:none;height:7px}
}
@media (prefers-reduced-transparency: reduce){
  .card,.nav,.tabbar,.sheet,.seg,.swatches,.tag{backdrop-filter:none;-webkit-backdrop-filter:none;background:var(--glass-2)}
}
`;
/* ───────────────────────── Reusable pieces ───────────────────────── */

/* A light / switch / fan tile: tap = toggle, horizontal slide = dim, hold = details */
class LuxLightTile {
  constructor(card, entityId, opts = {}) {
    this.card = card; this.id = entityId; this.opts = opts;
    this.el = h(`<div class="lt" role="button" tabindex="0">
      <div class="bub">${icon(opts.icon || 'bulb')}</div>
      <div style="min-width:0"><div class="n"></div><div class="b"></div></div>
      <div class="bar"><i></i></div></div>`);
    this.n = this.el.querySelector('.n'); this.b = this.el.querySelector('.b'); this.bar = this.el.querySelector('.bar i');
    this._bind();
  }
  get st() { return this.card._hass && this.card._hass.states[this.id]; }
  dimmable(st = this.st) {
    if (!st || this.id.split('.')[0] !== 'light') return false;
    const m = st.attributes.supported_color_modes || [];
    return m.some((x) => x !== 'onoff');
  }
  _bind() {
    const el = this.el; let s = null;
    const down = (e) => {
      if (e.button !== undefined && e.button > 0) return;
      const st = this.st; if (!avail(st)) return;
      s = { x: e.clientX, y: e.clientY, id: e.pointerId, drag: false, cancel: false, long: false,
        w: el.getBoundingClientRect().width, b0: isOn(st) ? Math.round((st.attributes.brightness || 255) / 2.55) : 0 };
      s.timer = setTimeout(() => { if (s && !s.drag && !s.cancel) { s.long = true; fireMoreInfo(el, this.id); } }, 560);
    };
    const move = (e) => {
      if (!s || e.pointerId !== s.id) return;
      const dx = e.clientX - s.x, dy = e.clientY - s.y;
      if (!s.drag && !s.cancel) {
        if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { s.cancel = true; clearTimeout(s.timer); return; }
        if (Math.abs(dx) > 10 && this.dimmable()) {
          s.drag = true; clearTimeout(s.timer); el.classList.add('dragging');
          try { el.setPointerCapture(e.pointerId); } catch (_) {}
        } else if (Math.abs(dx) > 10) { s.cancel = true; clearTimeout(s.timer); }
      }
      if (s.drag) {
        s.val = Math.round(clamp(s.b0 + (dx / s.w) * 110, 1, 100));
        el.classList.add('on'); this.bar.style.width = s.val + '%'; this.b.textContent = s.val + '%';
      }
    };
    const up = (e) => {
      if (!s || e.pointerId !== s.id) return;
      clearTimeout(s.timer); el.classList.remove('dragging');
      const st = this.st;
      if (s.drag && s.val) {
        this.card._call('light', 'turn_on', { entity_id: this.id, brightness_pct: s.val });
        this._pend = { on: true, until: Date.now() + 2500 };
      } else if (!s.cancel && !s.long && avail(st)) {
        const d = this.id.split('.')[0];
        const on = !isOn(st);
        this._pend = { on, until: Date.now() + 2500 };
        this.render();
        this.card._call(d === 'light' || d === 'switch' || d === 'fan' ? d : 'homeassistant', 'toggle', { entity_id: this.id });
      }
      s = null;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', () => { if (s) clearTimeout(s.timer); s = null; el.classList.remove('dragging'); });
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  render() {
    const st = this.st;
    if (!st) { this.el.classList.add('na'); this.n.textContent = this.id; return; }
    let on = isOn(st);
    if (this._pend && Date.now() < this._pend.until) { if (this._pend.on === on) this._pend = null; else on = this._pend.on; }
    const [r, g, b] = lightRGB(st);
    this.el.style.setProperty('--rgb', `${r},${g},${b}`);
    this.el.classList.toggle('on', on);
    this.el.classList.toggle('na', !avail(st));
    this.n.textContent = this.opts.name || st.attributes.friendly_name || this.id;
    const br = st.attributes.brightness;
    const pct = on ? (br ? Math.max(1, Math.round(br / 2.55)) : 100) : 0;
    this.b.textContent = !avail(st) ? 'Unavailable' : on ? (this.dimmable(st) ? pct + '%' : 'On') : 'Off';
    this.bar.style.width = pct + '%';
  }
}

/* Thermostat-style control for a climate entity (pool / spa set points) */
class LuxClimate {
  constructor(card, entityId, opts = {}) {
    this.card = card; this.id = entityId; this.opts = opts;
    const v = opts.variant || 'bar';
    if (v === 'bar') {
      this.el = h(`<div class="card clim ${opts.cls || ''}">
        <div class="left"><div class="nm"></div><div class="st"></div>
          <div class="sp"><span class="lbl"></span><button class="round sm press dn">${icon('minus')}</button><div class="spv"></div><button class="round sm press upb">${icon('plus')}</button></div></div>
        <div class="modes"><button class="round press m-off" aria-label="Off">${icon('power')}</button><button class="round heat press m-heat" aria-label="Heat">${icon('flame')}</button></div></div>`);
    } else if (v === 'row') {
      this.el = h(`<div class="hrow"><button class="round heat press m-heat" aria-label="Heat">${icon(opts.icon || 'flame')}</button>
        <div class="grow"><div class="hn"></div><div class="hs"></div></div>
        <button class="round sm press dn">${icon('minus')}</button><div class="spv"></div><button class="round sm press upb">${icon('plus')}</button></div>`);
    } else {
      this.el = h(`<div class="card climv ${opts.cls || ''}"><div class="nm"></div><div class="st"></div><div class="spv"></div>
        <div class="btns"><button class="round sm press dn">${icon('minus')}</button><button class="round sm heat press m-heat">${icon('flame')}</button><button class="round sm press upb">${icon('plus')}</button></div></div>`);
    }
    this.$ = (s) => this.el.querySelector(s);
    const step = opts.step || 1;
    this.$('.dn').addEventListener('click', () => this._nudge(-step));
    this.$('.upb').addEventListener('click', () => this._nudge(step));
    this.$('.m-heat').addEventListener('click', () => {
      const st = this.st; if (!avail(st)) return;
      const next = st.state === 'heat' ? 'off' : 'heat';
      this._pmode = { m: next, until: Date.now() + 3000 }; this.render();
      this.card._call('climate', 'set_hvac_mode', { entity_id: this.id, hvac_mode: next });
    });
    const off = this.$('.m-off');
    if (off) off.addEventListener('click', () => {
      const st = this.st; if (!avail(st) || st.state === 'off') return;
      this._pmode = { m: 'off', until: Date.now() + 3000 }; this.render();
      this.card._call('climate', 'set_hvac_mode', { entity_id: this.id, hvac_mode: 'off' });
    });
  }
  get st() { return this.card._hass && this.card._hass.states[this.id]; }
  _nudge(d) {
    const st = this.st; if (!avail(st)) return;
    const a = st.attributes;
    const cur = this._target != null ? this._target : num(a.temperature);
    if (cur == null) return;
    this._target = clamp(cur + d, num(a.min_temp) ?? 40, num(a.max_temp) ?? 104);
    this.render();
    clearTimeout(this._t);
    this._t = setTimeout(() => {
      const t = this._target;
      this.card._call('climate', 'set_temperature', { entity_id: this.id, temperature: t });
      setTimeout(() => { if (this._target === t) { this._target = null; this.render(); } }, 4000);
    }, 900);
  }
  render() {
    const st = this.st; const o = this.opts; const hs = this.card._hass;
    const name = o.name || (st && st.attributes.friendly_name) || this.id;
    if (!st) { this.el.style.opacity = .4; return; }
    let mode = st.state;
    if (this._pmode && Date.now() < this._pmode.until) { if (this._pmode.m === mode) this._pmode = null; else mode = this._pmode.m; }
    const a = st.attributes;
    const curS = o.sensor && hs.states[o.sensor];
    const cur = num(curS ? curS.state : a.current_temperature);
    const tgt = this._target != null ? this._target : num(a.temperature);
    const action = a.hvac_action;
    const heating = mode === 'heat' && action === 'heating';
    const status = !avail(st) ? 'Unavailable' : mode === 'off' ? 'Off' : heating ? 'Heating' : 'Idle';
    const curTxt = cur != null ? `${Math.round(cur)}°` : '—';
    this.el.classList.toggle('heat', mode === 'heat'); this.el.classList.toggle('off', mode !== 'heat');
    const set = (s, v) => { const n = this.$(s); if (n) n.innerHTML = v; };
    set('.nm', esc(name)); set('.hn', esc(name));
    set('.st', `${curTxt} &nbsp;·&nbsp; ${status}`); set('.hs', `Water ${curTxt} · ${status}`);
    set('.lbl', mode === 'heat' ? 'Heat to' : 'Set');
    set('.spv', tgt != null ? `${Math.round(tgt)}<sup>°</sup>` : '—');
    this.$('.m-heat').classList.toggle('on', mode === 'heat');
    const off = this.$('.m-off'); if (off) off.classList.toggle('on', mode === 'off');
  }
}

/* Camera: live (ha-camera-stream when HA provides it) or refreshed snapshot */
class LuxCamera {
  constructor(card, entityId, opts = {}) {
    this.card = card; this.id = entityId; this.opts = opts;
    this.el = h(`<div class="card cam ${opts.cls || ''}"><div class="feed"></div><div class="ph">${icon('camera')}</div><div class="shade"></div>
      <div class="chip tl"><span class="live"></span><span class="cn"></span></div><div class="chip bl act" style="display:none"></div></div>`);
    this.feed = this.el.querySelector('.feed'); this.ph = this.el.querySelector('.ph');
    this.el.addEventListener('click', () => fireMoreInfo(this.el, this.id));
    this.el.style.cursor = 'pointer';
    this._mode = null;
  }
  get st() { return this.card._hass && this.card._hass.states[this.id]; }
  async _ensureLive() {
    if (this._mode) return;
    this._mode = 'pending';
    const ok = this.opts.live && await LuxHomeCard.streamReady(this.card._hass, this.id);
    if (ok) {
      const s = document.createElement('ha-camera-stream');
      s.muted = true; s.controls = false; s.setAttribute('muted', ''); s.setAttribute('fit-mode', 'cover'); s.fitMode = 'cover';
      s.hass = this.card._hass; s.stateObj = this.st;
      this.feed.appendChild(s); this.stream = s; this._mode = 'live';
      this._fixN = 0; clearInterval(this._fix);
      this._fix = setInterval(() => { LuxCamera.fit(this.feed); if (++this._fixN > 30) { clearInterval(this._fix); this._fix = setInterval(() => LuxCamera.fit(this.feed), 10000); } }, 700);
    } else {
      this.img = document.createElement('img'); this.img.alt = ''; this.img.decoding = 'async';
      this.img.onload = () => { this.ph.style.display = 'none'; };
      this.feed.appendChild(this.img); this._mode = 'snap'; this._refresh();
    }
  }
  _refresh() {
    const st = this.st; if (!this.img || !st) return;
    const p = st.attributes.entity_picture; if (!p) return;
    const url = p + (p.includes('?') ? '&' : '?') + 't=' + Date.now();
    const pre = new Image(); pre.onload = () => { this.img.src = url; }; pre.src = url;
  }
  static fit(root) {
    const walk = (n) => {
      if (!n) return;
      const list = n.querySelectorAll ? n.querySelectorAll('*') : [];
      for (const e of list) {
        const t = e.tagName;
        if (t === 'VIDEO' || t === 'IMG') { e.style.cssText += ';width:100%;height:100%;object-fit:cover;max-height:none;'; }
        else if (/^(HA-|HUI-)/.test(t)) { e.style.cssText += ';display:block;width:100%;height:100%;'; }
        if (e.shadowRoot) walk(e.shadowRoot);
      }
    };
    walk(root);
  }
  setActive(on) {
    this.active = on;
    clearInterval(this._snapT);
    if (on) {
      this._ensureLive();
      if (this._mode === 'snap' || !this.opts.live) this._snapT = setInterval(() => this._refresh(), (this.opts.refresh || 8) * 1000);
      if (this.stream) this.stream.style.display = '';
    } else if (this.stream && this.opts.pauseHidden !== false) {
      // keep element (fast resume) but let HA tear down when detached
    }
  }
  render() {
    const st = this.st; const hs = this.card._hass;
    this.el.querySelector('.cn').textContent = this.opts.name || (st ? st.attributes.friendly_name.replace(/\s*(Fluent|Clear)$/i, '') : this.id);
    if (this.stream) { this.stream.hass = hs; if (st && this.stream.stateObj !== st) this.stream.stateObj = st; this.ph.style.display = 'none'; }
    const act = this.el.querySelector('.act');
    const ms = (this.opts.motion || []).map((m) => hs.states[m]).filter(Boolean);
    if (ms.length) {
      const active = ms.find((m) => m.state === 'on');
      const last = ms.reduce((a, b) => (new Date(b.last_changed) > new Date(a.last_changed) ? b : a));
      act.style.display = '';
      act.innerHTML = active ? `${icon('motion')} ${esc(/person/.test(active.entity_id) ? 'Person' : 'Motion')}` : `Activity ${esc(relTime(last.last_changed))}`;
      act.style.background = active ? 'rgba(255,69,58,.75)' : '';
    }
  }
}

/* Momentary slider (volume) */
function makeSlider(onCommit, onLive) {
  const el = h('<div class="slider"><i></i></div>'); const fill = el.firstElementChild;
  let drag = null;
  const set = (v) => { fill.style.width = Math.round(clamp(v, 0, 1) * 100) + '%'; };
  const pos = (e) => { const r = el.getBoundingClientRect(); return clamp((e.clientX - r.left) / r.width, 0, 1); };
  el.addEventListener('pointerdown', (e) => { drag = { id: e.pointerId }; el.setPointerCapture(e.pointerId); el.classList.add('active'); const v = pos(e); set(v); drag.v = v; onLive && onLive(v); });
  el.addEventListener('pointermove', (e) => { if (!drag) return; const v = pos(e); set(v); drag.v = v; onLive && onLive(v); });
  const end = () => { if (!drag) return; el.classList.remove('active'); onCommit(drag.v); drag = null; el._hold = Date.now() + 2000; };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  el.set = (v) => { if (!drag && !(el._hold > Date.now())) set(v); };
  return el;
}

/* Two live-camera slots that temporarily show whichever camera has motion.
 * First motion camera → bottom slot; a second simultaneous one → top slot.
 * A slot returns to its default camera `hold` seconds after that camera's motion ends. */
class LuxMotionSlots {
  constructor(card, defaults, opts = {}) {
    this.card = card; this.opts = opts; this.hold = (opts.hold || 60) * 1000;
    this.cache = {}; this.last = {}; this.active = false;
    this.slots = defaults.map((id, i) => ({ def: id, cur: null, cam: null, el: h(`<div class="slot ${(opts.cls || [])[i] || ''}"></div>`) }));
    this.slots.forEach((s) => this._show(s, s.def, true));
    this._t = setInterval(() => { if (this.card.isConnected) this.render(); }, 5000);
  }
  camFor(id) {
    return this.cache[id] || (this.cache[id] = new LuxCamera(this.card, id, { live: true, motion: camMotion(id), name: /rlc_843a|pool/.test(id) ? 'Pool' : undefined }));
  }
  _show(slot, id, instant) {
    const next = this.camFor(id); const prev = slot.cam;
    if (prev === next) return;
    clearTimeout(next._rm);
    if (!instant && !reduceMotion()) {
      next.el.classList.add('out'); slot.el.appendChild(next.el);
      void next.el.offsetWidth; next.el.classList.remove('out');
    } else { next.el.classList.remove('out'); slot.el.appendChild(next.el); }
    if (this.active) next.setActive(true);
    next.render();
    if (prev) {
      prev.el.classList.add('out');
      prev._rm = setTimeout(() => { if (!this.slots.some((x) => x.cam === prev)) { prev.el.remove(); prev.setActive(false); } }, 650);
    }
    slot.cam = next; slot.cur = id;
    slot.el.classList.toggle('alert', id !== slot.def);
  }
  _motion(id) { const hs = this.card._hass; return camMotion(id).some((m) => hs.states[m] && hs.states[m].state === 'on'); }
  setActive(on) { this.active = on; this.slots.forEach((s) => s.cam && s.cam.setActive(on)); }
  render() {
    const hs = this.card._hass; if (!hs) return;
    const now = Date.now();
    const watch = (this.opts.watch || []).filter((id) => avail(hs.states[id]));
    const active = watch.filter((id) => this._motion(id));
    active.forEach((id) => { this.last[id] = now; });
    // return slots to their defaults once the swapped-in camera has been quiet for `hold`
    for (const s of this.slots) {
      if (s.cur !== s.def && !active.includes(s.cur) && now - (this.last[s.cur] || 0) > this.hold) this._show(s, s.def);
    }
    // newest motion first
    active.sort((a, b) => (this._onset(b) - this._onset(a)));
    const [top, bottom] = this.slots;
    for (const id of active) {
      if (this.slots.some((s) => s.cur === id)) continue;
      const free = (s) => s && !active.includes(s.cur);
      let target = free(bottom) ? bottom : free(top) ? top : null;
      if (!target) target = (this.last[top.cur] || 0) <= (this.last[bottom.cur] || 0) ? top : bottom;
      if (target) this._show(target, id);
    }
    this.slots.forEach((s) => s.cam && s.cam.render());
  }
  _onset(id) {
    const hs = this.card._hass;
    return Math.max(0, ...camMotion(id).map((m) => hs.states[m] && hs.states[m].state === 'on' ? new Date(hs.states[m].last_changed).getTime() : 0));
  }
}
/* ───────────────────────── Main card ───────────────────────── */
const LUX_DEFAULTS = {
  layout: 'auto',           // tablet | phone | auto
  theme: 'auto',            // auto (follow HA) | dark | light
  kiosk: false,             // hide HA header/sidebar on this dashboard (long-press the clock to toggle)
  weather: 'weather.forecast_home',
  wan: null,
  people: null,
  cameras: null,            // list for the Cameras page
  home_cameras: null,       // two live feeds on Home
  speakers: null,
  media_default: 'media_player.pool',
  exclude_lights: [],
  exclude_areas: [],
  pages: ['home', 'rooms', 'cameras', 'media', 'pool'],
  pool: {},
  terrace: {},
  three_url: LUX_THREE_URL,
};
/* Covered terrace next to the spa. Lights left null are found by name (patio/terrace + fan/chandelier/can) once they exist in HA. */
const LUX_TERRACE_DEFAULTS = { name: 'Terrace', tv: 'media_player.outdoor_tv', sonos: 'media_player.outside', fan: null, chandelier: null, cans: null };
const LUX_POOL_DEFAULTS = {
  pool_temp: 'sensor.pool_temp', spa_temp: 'sensor.spa_temp', air_temp: 'sensor.air_temp',
  pool_heat: 'climate.pool_set_point', spa_heat: 'climate.spa_set_point',
  pool_pump: 'switch.pool_pump', spa_mode: 'switch.spa_pump', solar: null, // Solar hidden (Owen); set pool.solar to show it again
  pool_heater: 'switch.pool_heater', spa_heater: 'switch.spa_heater',
  pool_light: 'light.pool_light', floor: 'light.floor_system',
  spillover: 'switch.spillover', sheer: 'switch.sheer_dscnt', blower: 'switch.air_blower', fire: 'switch.fire_bowls',
  ph: 'sensor.ph', orp: 'sensor.orp', salt: 'sensor.pool_salinity', freeze: 'binary_sensor.freeze_protection',
  speaker: 'media_player.pool', bubblers: 'switch.pool_pump', camera: null,
};
const PAGE_META = {
  home: { label: 'Home', icon: 'home' }, rooms: { label: 'Rooms', icon: 'rooms' }, cameras: { label: 'Cameras', icon: 'camera' },
  media: { label: 'Media', icon: 'music' }, pool: { label: 'Pool', icon: 'pool' },
};

class LuxHomeCard extends HTMLElement {
  static getStubConfig() { return { layout: 'auto' }; }
  static streamReady(hass, camId) {
    if (customElements.get('ha-camera-stream')) return Promise.resolve(true);
    if (!LuxHomeCard._sr) {
      LuxHomeCard._sr = (async () => {
        try {
          if (!window.loadCardHelpers) return false;
          const hp = await window.loadCardHelpers();
          const c = await hp.createCardElement({ type: 'picture-entity', entity: camId, camera_view: 'live', show_name: false, show_state: false });
          c.hass = hass;
          await Promise.race([customElements.whenDefined('ha-camera-stream'), new Promise((r) => setTimeout(r, 5000))]);
          return !!customElements.get('ha-camera-stream');
        } catch (e) { return false; }
      })();
    }
    return LuxHomeCard._sr;
  }

  setConfig(config) {
    this._c = { ...LUX_DEFAULTS, ...config };
    this._c.pool = { ...LUX_POOL_DEFAULTS, ...(config.pool || {}) };
    this._c.terrace = { ...LUX_TERRACE_DEFAULTS, ...(config.terrace || {}) };
    if (this._built) { this._teardown(); this._built = false; if (this._hass) this._build(); }
  }
  getCardSize() { return 12; }
  getGridOptions() { return { columns: 'full', rows: 'auto' }; }

  set hass(h) {
    const first = !this._hass; this._hass = h;
    if (!this._c) return;
    if (!this._built && this.isConnected) this._build();
    if (first) this._subscribeWeather();
    if (!this._raf) this._raf = requestAnimationFrame(() => { this._raf = null; this._update(); });
  }
  get hass() { return this._hass; }

  connectedCallback() {
    if (this._c && this._hass && !this._built) this._build();
    this._fit(); this._ro = new ResizeObserver(() => this._fit()); this._ro.observe(document.documentElement);
    this._onWin = () => this._fit(); window.addEventListener('resize', this._onWin);
    this._tick = setInterval(() => this._clock(), 5000);
    if (this._c && this._c.kiosk) this._kiosk(true);
    setTimeout(() => this._fit(), 300); setTimeout(() => this._fit(), 1200);
    this._subscribeWeather();
    if (this._pages && this._cur) this._activate(this._cur, true);
  }
  disconnectedCallback() {
    clearInterval(this._tick); this._ro && this._ro.disconnect(); window.removeEventListener('resize', this._onWin);
    if (this._unsubWx) { this._unsubWx.then((u) => u && u()).catch(() => {}); this._unsubWx = null; }
    if (this._pool3d) this._pool3d.setActive(false);
    Object.values(this._cams || {}).forEach((c) => c.setActive(false));
    this._kiosk(false);
  }
  _teardown() { if (this._pool3d) { this._pool3d.dispose(); this._pool3d = null; } this.shadowRoot && (this.shadowRoot.innerHTML = ''); }

  _call(domain, service, data) {
    // Only ever invoked from a user gesture on a control.
    if (!this._hass) return;
    return this._hass.callService(domain, service, data);
  }

  /* size the card to exactly fill the viewport under whatever chrome is above it */
  _fit() {
    const top = Math.max(0, this.getBoundingClientRect().top + (window.scrollY || 0));
    const hgt = Math.max(420, window.innerHeight - top);
    this.style.height = hgt + 'px';
    const w = this.getBoundingClientRect().width || window.innerWidth;
    const lay = this._c && this._c.layout !== 'auto' ? this._c.layout : (w < 720 ? 'phone' : 'tablet');
    if (this.getAttribute('layout') !== lay) { this.setAttribute('layout', lay); if (this._built && this._navBtns) { this._rebuildPages(); } }
    if (this._pool3d) this._pool3d.resize(); if (this._house3d) this._house3d.resize();
  }

  _kiosk(on) {
    try {
      const qs = new URLSearchParams(location.search);
      if (on && (qs.get('kiosk') === 'off' || qs.has('edit'))) on = false;
      const ha = document.querySelector('home-assistant');
      const main = ha && ha.shadowRoot && ha.shadowRoot.querySelector('home-assistant-main');
      const mr = main && main.shadowRoot;
      const panel = mr && mr.querySelector('ha-panel-lovelace');
      const root = panel && panel.shadowRoot && panel.shadowRoot.querySelector('hui-root');
      const rr = root && root.shadowRoot;
      const put = (sr, id, css) => { if (!sr) return; let s = sr.getElementById(id); if (on) { if (!s) { s = document.createElement('style'); s.id = id; sr.appendChild(s); } s.textContent = css; } else if (s) s.remove(); };
      put(rr, 'lux-kiosk', `.header,.toolbar,app-header,ha-top-app-bar-fixed>*[slot=title]{display:none!important} #view,hui-view-container{padding-top:0!important;min-height:100vh!important;margin-top:0!important}`);
      if (root) root.style.setProperty('--header-height', on ? '0px' : '');
      put(mr, 'lux-kiosk', `ha-sidebar{display:none!important}`);
      const drawer = mr && mr.querySelector('ha-drawer');
      if (drawer && drawer.shadowRoot) put(drawer.shadowRoot, 'lux-kiosk', `.mdc-drawer,.sidebar-shell{display:none!important}.mdc-drawer-app-content,.app-content{margin-left:0!important;padding-left:0!important;padding-inline-start:0!important}`);
      if (drawer) { drawer.style.setProperty('--mdc-drawer-width', on ? '0px' : ''); drawer.style.setProperty('--ha-sidebar-width', on ? '0px' : ''); }
      this._kioskOn = on;
      setTimeout(() => this._fit(), 60); setTimeout(() => this._fit(), 400);
    } catch (e) { /* best effort */ }
  }

  _subscribeWeather() {
    const hs = this._hass; if (!hs || this._unsubWx || !this.isConnected) return;
    const id = this._c && this._c.weather; if (!id || !hs.states[id]) return;
    try {
      this._unsubWx = hs.connection.subscribeMessage((m) => { this._fc = m.forecast || []; this._dirty = true; this._update(); },
        { type: 'weather/subscribe_forecast', forecast_type: 'daily', entity_id: id });
      this._unsubWx.catch(() => { this._unsubWx = null; });
    } catch (e) { this._unsubWx = null; }
  }

  /* ── build ── */
  _build() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    LuxHomeCard._fonts();
    const sr = this.shadowRoot;
    sr.innerHTML = `<style>${LUX_CSS}</style>
      <div class="shell">
        <div class="top">
          <div class="hello"><div class="g"></div><div class="d"></div></div>
          <div class="nav"><div class="ind"></div></div>
          <div class="clock"><div class="t"></div><div class="s"><span class="dotline"></span><span class="st">Online</span></div></div>
        </div>
        <div class="pages"></div>
      </div>
      <div class="tabbar"><div class="ind"></div></div>
      <div class="scrim"></div><div class="sheet"><div class="sh-hd"><div class="tt"></div><button class="round sm press x">${icon('close')}</button></div><div class="sh-body"></div></div>`;
    this.$ = (s) => sr.querySelector(s);
    this._fit();
    this._built = true;
    const nav = this.$('.nav'), tab = this.$('.tabbar');
    this._navBtns = {}; this._tabBtns = {};
    for (const p of this._c.pages) {
      const m = PAGE_META[p]; if (!m) continue;
      const b = h(`<button class="press" data-p="${p}">${icon(m.icon)}<span>${m.label}</span></button>`);
      b.addEventListener('click', () => this._go(p)); nav.appendChild(b); this._navBtns[p] = b;
      const t = h(`<button data-p="${p}">${icon(m.icon)}<span>${m.label}</span></button>`);
      t.addEventListener('click', () => this._go(p)); tab.appendChild(t); this._tabBtns[p] = t;
    }
    this.$('.scrim').addEventListener('click', () => this._closeSheet());
    this.$('.sheet .x').addEventListener('click', () => this._closeSheet());
    // hidden escape hatch: long-press the clock to toggle the HA chrome
    const ck = this.$('.clock'); let lt;
    ck.addEventListener('pointerdown', () => { lt = setTimeout(() => this._kiosk(!this._kioskOn), 1500); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((e) => ck.addEventListener(e, () => clearTimeout(lt)));
    this._applyTheme();
    this._rebuildPages();
    this._clock();
  }
  _rebuildPages() {
    const box = this.$('.pages'); if (!box) return;
    if (this._pool3d) { this._pool3d.dispose(); this._pool3d = null; }
    if (this._house3d) { this._house3d.dispose(); this._house3d = null; }
    Object.values(this._cams || {}).forEach((c) => c.setActive(false));
    box.innerHTML = ''; this._pages = {}; this._cams = {};
    for (const p of this._c.pages) {
      const el = h(`<div class="page" data-p="${p}"></div>`); box.appendChild(el);
      this._pages[p] = { el, built: false };
    }
    const start = this._cur && this._pages[this._cur] ? this._cur : (this._startPage() || this._c.pages[0]);
    this._cur = null; this._go(start, true);
  }
  _startPage() { const hsh = (location.hash || '').replace('#', ''); return this._c.pages.includes(hsh) ? hsh : null; }
  static _fonts() {
    if (document.getElementById('lux-fonts')) return;
    const l = document.createElement('link'); l.id = 'lux-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@200..800&display=swap'; document.head.appendChild(l);
  }

  _go(p, instant) {
    if (!this._pages[p]) return;
    if (this._cur === p && !instant) { const el = this._pages[p].el; el.scrollTo && el.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const prev = this._cur; this._cur = p;
    for (const [k, pg] of Object.entries(this._pages)) pg.el.classList.toggle('on', k === p);
    for (const [k, b] of Object.entries(this._navBtns)) b.classList.toggle('on', k === p);
    for (const [k, b] of Object.entries(this._tabBtns)) b.classList.toggle('on', k === p);
    this._moveInd();
    if (prev && prev !== p) this._deactivate(prev);
    this._activate(p);
    this._update(true);
  }
  _moveInd() {
    requestAnimationFrame(() => {
      for (const [sel, btns] of [['.nav .ind', this._navBtns], ['.tabbar .ind', this._tabBtns]]) {
        const ind = this.$(sel); const b = btns[this._cur]; if (!ind || !b || !b.offsetWidth) continue;
        ind.style.width = b.offsetWidth + 'px'; ind.style.transform = `translateX(${b.offsetLeft}px)`;
      }
    });
  }
  _activate(p) {
    const pg = this._pages[p]; if (!pg) return;
    if (!pg.built) { this['_build_' + p](pg); pg.built = true; }
    (pg.cams || []).forEach((c) => c.setActive(true));
    if (p === 'pool' && this._pool3d) this._pool3d.setActive(true);
    if (p === 'rooms' && this._house3d) this._house3d.setActive(true);
  }
  _deactivate(p) {
    const pg = this._pages[p]; if (!pg) return;
    (pg.cams || []).forEach((c) => c.setActive(false));
    if (p === 'pool' && this._pool3d) this._pool3d.setActive(false);
    if (p === 'rooms' && this._house3d) this._house3d.setActive(false);
  }

  _applyTheme() {
    const t = this._c.theme === 'auto' ? ((this._hass && this._hass.themes && this._hass.themes.darkMode) ? 'dark' : (this._hass && this._hass.themes && this._hass.themes.darkMode === false ? 'light' : 'dark')) : this._c.theme;
    if (this.getAttribute('theme') !== t) { this.setAttribute('theme', t); if (this._pool3d) this._pool3d.setTheme(t === 'dark'); if (this._house3d) this._house3d.setTheme(t === 'dark'); }
  }
  _clock() {
    if (!this._built) return;
    const d = new Date(); const { t, ap } = clockTime(d);
    this.$('.clock .t').innerHTML = `${t}<small>${ap}</small>`;
    this.$('.hello .g').textContent = greeting(d);
    this.$('.hello .d').textContent = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  _update(force) {
    if (!this._built || !this._hass) return;
    this._applyTheme();
    const hs = this._hass;
    const wan = this._c.wan ? hs.states[this._c.wan] : null;
    const online = hs.connected !== false && (!wan || wan.state === 'on');
    this.$('.clock .dotline').classList.toggle('off', !online);
    this.$('.clock .st').textContent = online ? 'Online' : (hs.connected === false ? 'Reconnecting' : 'Internet down');
    const pg = this._pages[this._cur];
    if (pg && pg.update) pg.update();
    if (this._sheetUpdate) this._sheetUpdate();
  }

  /* ── sheet ── */
  _openSheet(title, body, update) {
    this.$('.sheet .tt').textContent = title;
    const b = this.$('.sheet .sh-body'); b.innerHTML = ''; b.appendChild(body);
    this._sheetUpdate = update || null; if (update) update();
    this.$('.scrim').classList.add('on'); this.$('.sheet').classList.add('on');
  }
  _closeSheet() { this.$('.scrim').classList.remove('on'); this.$('.sheet').classList.remove('on'); this._sheetUpdate = null; if (this._onSheetClose) { const f = this._onSheetClose; this._onSheetClose = null; f(); } }

  /* ── data helpers ── */
  _people() {
    const hs = this._hass;
    if (this._c.people) return this._c.people.filter((p) => hs.states[p]);
    return Object.keys(hs.states).filter((e) => e.startsWith('person.') && !/family/i.test(e));
  }
  _lightsOn() {
    const hs = this._hass; const ex = this._c.exclude_lights || [];
    const defEx = /(b650|g502|gaming_x|chamber_light|p1s_|_floodlight)/;
    return Object.keys(hs.states).filter((e) => e.startsWith('light.') && hs.states[e].state === 'on' && !ex.includes(e) && !defEx.test(e)
      && !(hs.entities && hs.entities[e] && (hs.entities[e].hidden || hs.entities[e].entity_category)))
      .sort((a, b) => (hs.states[a].attributes.friendly_name || a).localeCompare(hs.states[b].attributes.friendly_name || b));
  }
  _speakers() {
    const hs = this._hass;
    if (this._c.speakers) return this._c.speakers.filter((s) => hs.states[s] && avail(hs.states[s]));
    const ents = hs.entities || {};
    let list = Object.keys(hs.states).filter((e) => e.startsWith('media_player.') && avail(hs.states[e]) && ents[e] && ents[e].platform === 'sonos');
    if (!list.length) list = Object.keys(hs.states).filter((e) => e.startsWith('media_player.') && avail(hs.states[e]) && hs.states[e].attributes.device_class === 'speaker');
    return list.sort((a, b) => (hs.states[a].attributes.friendly_name || '').localeCompare(hs.states[b].attributes.friendly_name || ''));
  }
  _activeSpeaker() {
    const hs = this._hass; const list = this._speakers();
    if (this._spk && hs.states[this._spk]) return this._spk;
    return list.find((s) => hs.states[s].state === 'playing') || (hs.states[this._c.media_default] ? this._c.media_default : list[0]);
  }
  _areas() {
    const hs = this._hass; const out = {};
    const ents = hs.entities || {}, devs = hs.devices || {}, areas = hs.areas || {};
    const ex = ['unnamed_room', 'nas', ...(this._c.exclude_areas || [])];
    const defEx = /(b650|g502|gaming_x|_led$|auto_|child_lock|socket_1_2)/;
    for (const [id, e] of Object.entries(ents)) {
      const d = id.split('.')[0]; if (!['light', 'switch', 'fan'].includes(d)) continue;
      if (e.entity_category || e.hidden || defEx.test(id) || !hs.states[id]) continue;
      const area = e.area_id || (e.device_id && devs[e.device_id] && devs[e.device_id].area_id);
      if (!area || ex.includes(area) || !areas[area]) continue;
      (out[area] ||= { id: area, name: areas[area].name, icon: areas[area].icon, list: [] }).list.push(id);
    }
    return Object.values(out).sort((a, b) => a.name.localeCompare(b.name));
  }
  _cameraList() {
    const hs = this._hass;
    if (this._c.cameras) return this._c.cameras.filter((c) => hs.states[c]);
    return Object.keys(hs.states).filter((e) => e.startsWith('camera.') && avail(hs.states[e]) && !/snapshot|p1s|_clear$/.test(e));
  }
}
/* ───────────────────────── Pages ───────────────────────── */
function pressable(el, onTap, onHold) {
  let t = null, long = false, sx = 0, sy = 0, live = false;
  el.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return; live = true; long = false; sx = e.clientX; sy = e.clientY;
    clearTimeout(t); if (onHold) t = setTimeout(() => { long = true; onHold(e); }, 560);
  });
  el.addEventListener('pointermove', (e) => { if (live && Math.hypot(e.clientX - sx, e.clientY - sy) > 12) { live = false; clearTimeout(t); } });
  el.addEventListener('pointerup', (e) => { clearTimeout(t); if (live && !long) onTap(e); live = false; });
  el.addEventListener('pointercancel', () => { clearTimeout(t); live = false; });
  el.addEventListener('contextmenu', (e) => e.preventDefault());
}
function camMotion(id) {
  const m = id.replace('camera.', '').match(/^(.*?)_(fluent|clear)(_\d+)?$/);
  if (!m) return [];
  const base = m[1], suf = m[3] || '';
  return [`binary_sensor.${base}_person${suf}`, `binary_sensor.${base}_motion${suf}`, `binary_sensor.${base}_visitor${suf}`];
}
function poolMapSVG() {
  return `<svg class="map" viewBox="-8.4 -5.2 18.6 12" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="lxw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3fb7c9"/><stop offset="1" stop-color="#1b5f86"/></linearGradient>
      <filter id="lxg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.1"/></filter>
    </defs>
    <path d="M-8.2 -4.6 H7.7 V-0.5 H10 V6.8 H-8.2 Z" fill="var(--glass-3)" rx="1"/>
    <rect x="-3.2" y="-4.5" width="6" height="0.75" rx="0.2" fill="var(--t4)"/>
    <path class="wglow" d="M-7 -3.75 H7 V0.6 H5 V3.75 H-0.6 V6 H-4.6 V3.75 H-7 Z" fill="var(--glow,#12c9d6)" filter="url(#lxg)" opacity="0"/>
    <path d="M-7 -3.75 H7 V0.6 H5 V3.75 H-0.6 V6 H-4.6 V3.75 H-7 Z" fill="url(#lxw)" stroke="rgba(255,255,255,.35)" stroke-width="0.06"/>
    <path d="M-4.6 3.75 H-0.6 V6 H-4.6 Z" fill="#7fd3df" opacity=".35"/>
    <rect x="5" y="0.6" width="3.3" height="3.3" rx="0.25" fill="var(--t4)" stroke="rgba(255,255,255,.35)" stroke-width="0.06"/>
    <rect class="spaw" x="5.35" y="0.95" width="2.6" height="2.6" rx="0.2" fill="url(#lxw)"/>
    <circle class="fb1" cx="-3.6" cy="-4.1" r="0.36" fill="var(--t3)"/><circle class="fb2" cx="3.3" cy="-4.1" r="0.36" fill="var(--t3)"/>
  </svg>`;
}

Object.assign(LuxHomeCard.prototype, {
  _isPhone() { return this.getAttribute('layout') === 'phone'; },

  /* ── weather block ── */
  _wxHTML(compact) {
    const hs = this._hass; const w = hs.states[this._c.weather];
    if (!w) return `<div class="empty">${icon('cloud')}Weather unavailable</div>`;
    const a = w.attributes; const t = Math.round(num(a.temperature) ?? 0);
    const sunDown = hs.states['sun.sun'] && hs.states['sun.sun'].state === 'below_horizon';
    let ic = WEATHER_ICON[w.state] || 'cloud'; if (sunDown && ic === 'sun') ic = 'moon'; if (sunDown && ic === 'partly') ic = 'partlyNight';
    const fc = (this._fc || []).slice(0, compact ? 3 : 5);
    const days = fc.map((f, i) => {
      const d = new Date(f.datetime);
      const dn = i === 0 && d.toDateString() === new Date().toDateString() ? 'Today' : d.toLocaleDateString(undefined, { weekday: 'short' });
      return { dn, ic: WEATHER_ICON[f.condition] || 'cloud', hi: Math.round(f.temperature), lo: f.templow != null ? Math.round(f.templow) : '' };
    });
    if (compact) {
      return `<div class="temp">${t}°</div><div><div style="font-size:14px;font-weight:600">${esc(WEATHER_LABEL[w.state] || w.state)}</div>
        <div class="sub">H ${days[0] ? days[0].hi : '–'}° · L ${days[0] ? days[0].lo : '–'}°</div></div>
        <div class="fcs">${days.slice(1).map((d) => `<div><span class="muted">${esc(d.dn)}</span>${icon(d.ic)}<b>${d.hi}°</b></div>`).join('')}</div>`;
    }
    return `<div class="row1"><div><div class="temp">${t}<sup>°</sup></div>
        <div class="cond">${esc(WEATHER_LABEL[w.state] || w.state)}</div>
        <div class="meta">Humidity ${Math.round(a.humidity ?? 0)}% &nbsp;·&nbsp; Wind ${Math.round(a.wind_speed ?? 0)} ${esc(a.wind_speed_unit || 'mph')}</div></div>
        <div class="big-ic">${icon(ic)}</div></div>
      <div class="fc">${days.map((d) => `<div><span class="dn">${esc(d.dn)}</span>${icon(d.ic)}<span class="hi">${d.hi}°</span><span class="lo">${d.lo}°</span></div>`).join('')}</div>`;
  },

  _peopleHTML(row) {
    const hs = this._hass; const ids = this._people();
    const home = ids.filter((p) => hs.states[p].state === 'home').length;
    const items = ids.map((p) => {
      const st = hs.states[p]; const nm = st.attributes.friendly_name || p; const pic = st.attributes.entity_picture;
      const zone = st.state === 'home' ? 'Home' : st.state === 'not_home' ? 'Away' : st.state === 'unknown' ? 'Unknown' : st.state;
      const av = `<div class="av">${pic ? `<img src="${esc(pic)}" alt="">` : esc(nm[0])}${row ? `<span class="dotz ${st.state === 'home' ? 'home' : ''}"></span>` : ''}</div>`;
      if (row) return `<div class="pv" data-e="${p}">${av}<div class="pn">${esc(nm)}</div><div class="pz">${esc(zone)}</div></div>`;
      return `<div class="pp" data-e="${p}">${av}<div><div class="nm">${esc(nm)}</div><div class="since">${esc(sinceTime(st.last_changed))}</div></div>
        <div class="z"><span class="zone ${st.state === 'home' ? 'home' : ''}">${icon(st.state === 'home' ? 'home' : 'person')}${esc(zone)}</span></div></div>`;
    }).join('');
    return { home, total: ids.length, items };
  },

  _poolSummaryRender(el) {
    const hs = this._hass; const P = this._c.pool; const S = (k) => hs.states[P[k]];
    const pt = num(S('pool_temp') && S('pool_temp').state), stp = num(S('spa_temp') && S('spa_temp').state);
    const spaH = S('spa_heat'); const poolH = S('pool_heat');
    const spaTarget = spaH && num(spaH.attributes.temperature);
    const f = [];
    if (isOn(S('pool_pump'))) f.push(`<span class="pill cool">${icon('fan')}Filter</span>`);
    if (isOn(S('spa_mode'))) f.push(`<span class="pill hot">${icon('spa')}Spa</span>`);
    if (isOn(S('pool_light'))) f.push(`<span class="pill">${icon('bulb')}Light</span>`);
    if (isOn(S('fire'))) f.push(`<span class="pill hot">${icon('flame')}Fire</span>`);
    if (isOn(S('spillover'))) f.push(`<span class="pill cool">${icon('spill')}Spillover</span>`);
    if (isOn(S('sheer'))) f.push(`<span class="pill cool">${icon('sheer')}Sheer</span>`);
    if (spaH && spaH.state === 'heat') f.push(`<span class="pill hot">${icon('heat')}Spa ${spaTarget ?? ''}°</span>`);
    if (poolH && poolH.state === 'heat') f.push(`<span class="pill hot">${icon('heat')}Pool ${Math.round(num(poolH.attributes.temperature) || 0)}°</span>`);
    el.querySelector('.stats').innerHTML = `
      <div class="stat"><div class="v">${pt != null ? Math.round(pt) : '—'}<sup>°</sup></div><div class="l">${icon('pool')}Pool</div></div>
      <div class="stat"><div class="v">${stp != null ? Math.round(stp) : (spaTarget != null ? spaTarget : '—')}<sup>°</sup></div><div class="l">${icon('spa')}${stp != null ? 'Spa' : 'Spa set point'}</div></div>`;
    el.querySelector('.feat').innerHTML = f.length ? f.slice(0, 4).join('') : `<span class="sub">Everything off</span>`;
    const lt = S('pool_light'); const svg = el.querySelector('svg.map');
    if (svg) {
      const on = isOn(lt); const cols = POOL_EFFECTS[(lt && lt.attributes.effect) || ''] || ['#12c9d6'];
      svg.style.setProperty('--glow', cols[0]);
      svg.querySelector('.wglow').setAttribute('opacity', on ? '0.9' : '0');
      const fire = isOn(S('fire'));
      svg.querySelector('.fb1').setAttribute('fill', fire ? '#ff7a1a' : 'var(--t3)'); svg.querySelector('.fb2').setAttribute('fill', fire ? '#ff7a1a' : 'var(--t3)');
    }
  },

  _miniMediaRender(el) {
    const hs = this._hass; const id = this._activeSpeaker(); const st = id && hs.states[id];
    const art = el.querySelector('.art'); const ti = el.querySelector('.ti'); const ar = el.querySelector('.ar'); const pb = el.querySelector('.pp-btn');
    if (!st) { ti.textContent = 'No speakers'; ar.textContent = ''; return; }
    const a = st.attributes; const playing = st.state === 'playing';
    const pic = a.entity_picture;
    art.style.backgroundImage = pic ? `url("${pic}")` : ''; art.innerHTML = pic ? '' : icon('music');
    ti.innerHTML = (playing ? '<span class="eq"><i></i><i></i><i></i></span>' : '') + esc(a.media_title || a.friendly_name);
    ar.textContent = a.media_title ? `${a.media_artist || ''}${a.media_artist ? ' · ' : ''}${a.friendly_name}` : (st.state === 'paused' ? 'Paused' : 'Not playing');
    pb.innerHTML = icon(playing ? 'pause' : 'play'); pb.dataset.e = id;
  },

  _lightsCard(pg, el, max) {
    const grid = el.querySelector('.lt-grid'); const hdr = el.querySelector('.hd .tt small'); const btn = el.querySelector('.alloff');
    pg.lt = pg.lt || {};
    btn.addEventListener('click', () => {
      const ids = this._lightsOn(); if (!ids.length) return;
      if (!btn.classList.contains('confirm')) {
        btn.classList.add('confirm'); btn.innerHTML = `${icon('power')}Turn off ${ids.length}?`;
        clearTimeout(btn._t); btn._t = setTimeout(() => { btn.classList.remove('confirm'); btn.innerHTML = `${icon('power')}All Off`; }, 3200);
        return;
      }
      clearTimeout(btn._t); btn.classList.remove('confirm'); btn.innerHTML = `${icon('power')}All Off`;
      this._call('light', 'turn_off', { entity_id: ids });
    });
    const more = el.querySelector('.more');
    if (more) more.addEventListener('click', () => this._openLightsSheet());
    return () => {
      const ids = this._lightsOn(); const show = ids.slice(0, max);
      hdr.textContent = ids.length ? `${ids.length} on` : '';
      if (more) more.style.display = ids.length > max ? '' : 'none';
      if (more) more.innerHTML = `All ${ids.length}${icon('chevron')}`;
      btn.style.display = ids.length ? '' : 'none';
      const key = show.join('|');
      if (grid._key !== key) {
        grid._key = key; grid.innerHTML = '';
        if (!show.length) grid.innerHTML = `<div class="empty" style="grid-column:1/-1;min-height:110px">${icon('moon')}All lights are off</div>`;
        for (const id of show) { const t = pg.lt[id] || (pg.lt[id] = new LuxLightTile(this, id, { name: this._entName(id) })); grid.appendChild(t.el); }
      }
      show.forEach((id) => pg.lt[id].render());
      if (this._isPhone()) el.style.display = ids.length ? '' : 'none';
    };
  },
  _openLightsSheet() {
    const body = h('<div class="lt-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))"></div>'); const tiles = {};
    this._openSheet('Lights On', body, () => {
      const ids = this._lightsOn(); const key = ids.join('|');
      if (body._key !== key) { body._key = key; body.innerHTML = ''; for (const id of ids) { const t = tiles[id] || (tiles[id] = new LuxLightTile(this, id, { name: this._entName(id) })); body.appendChild(t.el); } if (!ids.length) body.innerHTML = `<div class="empty" style="grid-column:1/-1">${icon('moon')}All lights are off</div>`; }
      ids.forEach((id) => tiles[id].render());
    });
  },

  /* ── HOME ── */
  _build_home(pg) {
    const hs = this._hass; const phone = this._isPhone(); const P = this._c.pool;
    const camIds = (this._c.home_cameras || ['camera.front_doorbell_fluent', 'camera.rlc_843a_fluent']).filter((c) => hs.states[c]);
    while (camIds.length < 2) { const n = this._cameraList().find((c) => !camIds.includes(c)); if (!n) break; camIds.push(n); }
    const slots = new LuxMotionSlots(this, camIds.slice(0, 2), { cls: phone ? [] : ['a-cam1', 'a-cam2'],
      watch: this._c.motion_cameras || this._cameraList(), hold: this._c.motion_hold || 60 });
    pg.cams = [slots];
    const spa = new LuxClimate(this, P.spa_heat, { name: 'Spa', sensor: P.spa_temp, variant: phone ? 'v' : 'bar', cls: phone ? 'heatc' : 'a-c1 spa' });
    const pool = new LuxClimate(this, P.pool_heat, { name: 'Pool', sensor: P.pool_temp, variant: phone ? 'v' : 'bar', cls: phone ? '' : 'a-c2 poolc' });
    const mm = h(`<div class="card mm tap ${phone ? '' : 'a-media'}"><div class="art"></div><div class="txt"><div class="ti"></div><div class="ar"></div></div>
      <button class="round press pp-btn"></button></div>`);
    mm.addEventListener('click', (e) => { if (e.target.closest('.pp-btn')) return; this._go('media'); });
    mm.querySelector('.pp-btn').addEventListener('click', (e) => { const id = e.currentTarget.dataset.e; if (id) this._call('media_player', 'media_play_pause', { entity_id: id }); });
    const lights = h(`<div class="card ${phone ? '' : 'a-lights'}" style="display:flex;flex-direction:column">
      <div class="hd"><div class="tt">Lights<small></small></div><div style="display:flex;gap:8px;align-items:center"><button class="link more press"></button><button class="pill press alloff">${icon('power')}All Off</button></div></div>
      <div class="lt-grid" style="flex:1"></div>${phone ? '' : '<div class="hint">Tap to toggle · Slide to dim · Hold for more</div>'}</div>`);
    const upLights = this._lightsCard(pg, lights, phone ? 6 : 4);
    const psum = h(`<div class="card poolsum tap ${phone ? '' : 'a-pool'}"><div class="hd"><div class="tt">Pool &amp; Spa</div><span class="link">Open${icon('chevron')}</span></div>
      <div class="body">${poolMapSVG()}<div class="stats"></div></div><div class="feat"></div></div>`);
    psum.addEventListener('click', () => this._go('pool'));
    const ppl = h(`<div class="card ${phone ? '' : 'a-ppl'}"><div class="hd"><div class="tt">Family<small></small></div></div><div class="${phone ? 'ppl-row' : 'ppl-list'}"></div></div>`);
    ppl.addEventListener('click', (e) => { const r = e.target.closest('[data-e]'); if (r) fireMoreInfo(this, r.dataset.e); });

    if (phone) {
      const wx = h('<div class="card phone-wx"></div>');
      const root = h('<div class="stack"></div>');
      const duoC = h('<div class="duo"></div>'); slots.slots.forEach((c) => duoC.appendChild(c.el));
      const duoH = h('<div class="duo"></div>'); duoH.append(spa.el, pool.el);
      root.append(wx, duoC, duoH, lights, psum, mm, ppl);
      pg.el.appendChild(root);
      pg.update = () => {
        wx.innerHTML = this._wxHTML(true);
        slots.render(); spa.render(); pool.render(); upLights();
        this._poolSummaryRender(psum); this._miniMediaRender(mm);
        const p = this._peopleHTML(true); ppl.querySelector('small').textContent = `${p.home} of ${p.total} home`; ppl.querySelector('.ppl-row').innerHTML = p.items;
      };
    } else {
      const wx = h('<div class="card wx a-wx"></div>');
      const grid = h('<div class="home-grid"></div>');
      grid.append(wx, slots.slots[0] ? slots.slots[0].el : h('<div class="a-cam1"></div>'), ppl, psum, slots.slots[1] ? slots.slots[1].el : h('<div class="a-cam2"></div>'), lights, spa.el, mm, pool.el);
      pg.el.appendChild(grid);
      pg.update = () => {
        wx.innerHTML = this._wxHTML(false);
        slots.render(); spa.render(); pool.render(); upLights();
        this._poolSummaryRender(psum); this._miniMediaRender(mm);
        const p = this._peopleHTML(false); ppl.querySelector('small').textContent = `${p.home} of ${p.total} home`; ppl.querySelector('.ppl-list').innerHTML = p.items;
      };
    }
  },

  /* ── ROOMS ── */
  _build_rooms(pg) { return this._c.house && this._c.house.lights ? this._build_house(pg) : this._build_rooms_areas(pg); },
  _build_rooms_areas(pg) {
    pg.el.classList.add('scroll');
    const wrap = h(`<div><div class="sec-t">Rooms</div><div class="room-grid"></div></div>`);
    const grid = wrap.querySelector('.room-grid'); pg.el.appendChild(wrap);
    grid.addEventListener('click', (e) => { const r = e.target.closest('[data-a]'); if (r) this._openRoom(r.dataset.a); });
    pg.update = () => {
      const hs = this._hass; const areas = this._areas();
      areas.sort((a, b) => (b.list.some((i) => isOn(hs.states[i])) - a.list.some((i) => isOn(hs.states[i]))) || a.name.localeCompare(b.name));
      grid.innerHTML = areas.map((a) => {
        const on = a.list.filter((i) => isOn(hs.states[i])).length;
        const ic = roomIcon(a.name);
        return `<div class="card room press ${on ? 'lit' : ''}" data-a="${a.id}"><div class="ri">${icon(ic)}</div>
          <div><div class="rn">${esc(a.name)}</div><div class="rs">${on ? `${on} of ${a.list.length} on` : `${a.list.length} ${a.list.length === 1 ? 'device' : 'devices'} · Off`}</div></div></div>`;
      }).join('');
    };
  },
  _openRoom(areaId) {
    const a = this._areas().find((x) => x.id === areaId); if (!a) return;
    const body = h('<div class="lt-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))"></div>');
    const tiles = a.list.map((id) => new LuxLightTile(this, id, { icon: id.startsWith('fan.') ? 'fan' : id.startsWith('switch.') ? 'power' : 'bulb' }));
    tiles.forEach((t) => body.appendChild(t.el));
    this._openSheet(a.name, body, () => tiles.forEach((t) => t.render()));
  },

  /* ── HOUSE (3D dollhouse + rooms) ── */
  _houseRooms() {
    const H = this._c.house; const hs = this._hass; const out = {};
    const names = { ...HOUSE.labels, ...(H.rooms || {}) };
    HOUSE.floors.forEach((f, i) => Object.keys(f.rooms).forEach((id) => { out[id] = { id, floor: i, name: names[id] || id, list: [] }; }));
    for (const [e, r] of Object.entries(H.lights || {})) { if (out[r] && hs.states[e]) out[r].list.push(e); }
    return out;
  },
  _entName(id) { const n = this._c.house && this._c.house.names; return (n && n[id]) || undefined; },
  _build_house(pg) {
    const phone = this._isPhone();
    const wrap = h(`<div class="${phone ? 'stack' : 'house-grid'}">
      <div class="card stage hstage"><div class="load">Loading 3D house…</div><div class="lbls"></div>
        <div class="ttl3"><div class="a">Home</div><div class="b"></div></div>
        <div class="ov"><div class="seg fseg"><button class="on" data-f="all">${icon('cube')}All</button><button data-f="f1">1st Floor</button><button data-f="f2">2nd Floor</button></div></div></div>
      <div class="card hpanel"><div class="hd"><div class="tt">Rooms<small></small></div></div><div class="hlist"></div></div></div>`);
    pg.el.appendChild(wrap); if (phone) pg.el.classList.add('scroll');
    const stage = wrap.querySelector('.hstage'), list = wrap.querySelector('.hlist');
    let floor = 'all';
    const open = (id) => {
      const R = this._houseRooms()[id]; if (!R) return;
      this._house3d && this._house3d.select(id);
      const body = h('<div class="lt-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))"></div>');
      const tiles = R.list.map((e) => new LuxLightTile(this, e, { name: this._entName(e), icon: e.startsWith('fan.') ? 'fan' : e.startsWith('switch.') ? 'power' : 'bulb' }));
      tiles.forEach((t) => body.appendChild(t.el));
      if (!tiles.length) body.innerHTML = `<div class="empty" style="grid-column:1/-1">${icon('bulb')}No smart lights mapped to this room yet</div>`;
      this._openSheet(R.name, body, () => tiles.forEach((t) => t.render()));
      this._onSheetClose = () => this._house3d && this._house3d.select(null);
    };
    list.addEventListener('click', (e) => { const r = e.target.closest('[data-r]'); if (r) open(r.dataset.r); });
    wrap.querySelector('.fseg').addEventListener('click', (e) => {
      const b = e.target.closest('[data-f]'); if (!b) return; floor = b.dataset.f;
      wrap.querySelectorAll('.fseg button').forEach((x) => x.classList.toggle('on', x === b));
      this._house3d && this._house3d.setFloor(floor); pg.update();
    });
    this._house3d = new LuxHouse3D(stage, { threeUrl: this._c.three_url, dark: this.getAttribute('theme') === 'dark',
      names: { ...HOUSE.labels, ...(this._c.house.rooms || {}) },
      onReady: () => { stage.querySelector('.load').style.display = 'none'; pg.update(); },
      onError: (m) => { stage.querySelector('.load').textContent = m; },
      onPick: (id) => { if (id) open(id); } });
    this._house3d.setActive(true);
    pg.house = this._house3d;
    pg.update = () => {
      const hs = this._hass; const rooms = this._houseRooms(); const state = {};
      let lit = 0, onTotal = 0;
      for (const R of Object.values(rooms)) {
        const onIds = R.list.filter((e) => isOn(hs.states[e]));
        R.on = onIds.length; if (R.on) { lit++; onTotal += R.on; }
        const firstLight = onIds.find((e) => e.startsWith('light.'));
        state[R.id] = { on: R.on, total: R.list.length, rgb: firstLight ? lightRGB(hs.states[firstLight]) : [255, 196, 110] };
      }
      this._house3d.setState({ rooms: state, night: hs.states['sun.sun'] ? hs.states['sun.sun'].state === 'below_horizon' : false });
      stage.querySelector('.ttl3 .b').textContent = onTotal ? `${onTotal} ${onTotal === 1 ? 'light' : 'lights'} on in ${lit} ${lit === 1 ? 'room' : 'rooms'}` : 'All lights off';
      const shown = Object.values(rooms).filter((R) => R.list.length && (floor === 'all' || R.floor === (floor === 'f1' ? 0 : 1)))
        .sort((a, b) => (a.floor - b.floor) || ((b.on > 0) - (a.on > 0)) || a.name.localeCompare(b.name));
      wrap.querySelector('.hpanel small').textContent = `${shown.length}`;
      let lastFloor = -1;
      list.innerHTML = shown.map((R) => {
        const head = floor === 'all' && R.floor !== lastFloor ? `<div class="sec-t" style="margin:${lastFloor < 0 ? 0 : 12}px 4px 6px">${R.floor ? '2nd Floor' : '1st Floor'}</div>` : '';
        lastFloor = R.floor;
        return `${head}<div class="hroom press ${R.on ? 'lit' : ''}" data-r="${R.id}"><div class="ri">${icon(roomIcon(R.name))}</div>
          <div class="tx"><div class="rn">${esc(R.name)}</div><div class="rs">${R.on ? `${R.on} of ${R.list.length} on` : `${R.list.length} ${R.list.length === 1 ? 'device' : 'devices'} · Off`}</div></div>${icon('chevron', 'chev')}</div>`;
      }).join('');
    };
  },

  /* ── CAMERAS ── */
  _build_cameras(pg) {
    pg.el.classList.add('scroll');
    const wrap = h(`<div><div class="sec-t">Cameras</div><div class="cam-grid"></div></div>`); pg.el.appendChild(wrap);
    const grid = wrap.querySelector('.cam-grid');
    const ids = this._cameraList();
    pg.cams = ids.map((id, i) => new LuxCamera(this, id, { live: i === 0, motion: camMotion(id), cls: i === 0 ? 'hero' : '', refresh: 6,
      name: /rlc_843a/.test(id) ? 'Pool' : undefined }));
    pg.cams.forEach((c) => grid.appendChild(c.el));
    if (!ids.length) grid.innerHTML = `<div class="empty">${icon('camera')}No cameras</div>`;
    pg.update = () => pg.cams.forEach((c) => c.render());
  },

  /* ── MEDIA ── */
  _build_media(pg) {
    const wrap = h(`<div class="media-wrap">
      <div class="card np"><div class="bgart"></div><div class="bigart"></div>
        <div class="info"><div class="src"></div><div class="ttl"></div><div class="art2"></div>
          <div class="ctl"><button class="round press pv">${icon('prev')}</button><button class="round main press pp">${icon('play')}</button><button class="round press nx">${icon('next')}</button></div>
          <div class="vol"><button class="mutebtn press">${icon('volume')}</button><div class="vs"></div></div>
          <div class="srcs"></div></div></div>
      <div class="card" style="display:flex;flex-direction:column"><div class="hd"><div class="tt">Speakers</div></div><div class="spk-list"></div></div></div>`);
    pg.el.appendChild(wrap);
    const $ = (s) => wrap.querySelector(s);
    const cur = () => this._activeSpeaker();
    $('.pv').addEventListener('click', () => this._call('media_player', 'media_previous_track', { entity_id: cur() }));
    $('.nx').addEventListener('click', () => this._call('media_player', 'media_next_track', { entity_id: cur() }));
    $('.pp').addEventListener('click', () => this._call('media_player', 'media_play_pause', { entity_id: cur() }));
    $('.mutebtn').addEventListener('click', () => { const st = this._hass.states[cur()]; if (st) this._call('media_player', 'volume_mute', { entity_id: cur(), is_volume_muted: !st.attributes.is_volume_muted }); });
    const vs = makeSlider((v) => this._call('media_player', 'volume_set', { entity_id: cur(), volume_level: Math.round(v * 100) / 100 }));
    $('.vs').replaceWith(vs);
    $('.spk-list').addEventListener('click', (e) => { const r = e.target.closest('[data-e]'); if (r) { this._spk = r.dataset.e; this._update(true); } });
    $('.srcs').addEventListener('click', (e) => { const r = e.target.closest('[data-s]'); if (r) this._call('media_player', 'select_source', { entity_id: cur(), source: r.dataset.s }); });
    pg.update = () => {
      const hs = this._hass; const id = cur(); const st = id && hs.states[id];
      const list = this._speakers();
      $('.spk-list').innerHTML = list.map((s) => {
        const x = hs.states[s]; const a = x.attributes; const pic = x.state === 'playing' && a.entity_picture;
        const sub = x.state === 'playing' ? (a.media_title ? `${a.media_title}${a.media_artist ? ' · ' + a.media_artist : ''}` : 'Playing') : x.state === 'paused' ? 'Paused' : 'Idle';
        return `<div class="spk ${s === id ? 'sel' : ''}" data-e="${s}"><div class="si" ${pic ? `style="background-image:url('${esc(pic)}')"` : ''}>${pic ? '' : icon('speaker')}</div>
          <div class="tx"><div class="sn">${esc(a.friendly_name || s)}</div><div class="ss">${x.state === 'playing' ? '<span class="eq"><i></i><i></i><i></i></span>' : ''}${esc(sub)}</div></div>
          ${(a.group_members || []).length > 1 && a.group_members[0] === s ? `<span class="pill" style="height:24px;font-size:11px">+${a.group_members.length - 1}</span>` : ''}</div>`;
      }).join('') || `<div class="empty">${icon('speaker')}No speakers found</div>`;
      if (!st) return;
      const a = st.attributes; const playing = st.state === 'playing'; const pic = a.entity_picture;
      $('.bgart').style.backgroundImage = pic ? `url("${pic}")` : 'none';
      const big = $('.bigart'); big.style.backgroundImage = pic ? `url("${pic}")` : ''; big.innerHTML = pic ? '' : icon('music'); big.classList.toggle('paused', !playing);
      $('.src').innerHTML = `${icon('speaker')}${esc(a.friendly_name || id)}${(a.group_members || []).length > 1 ? ` + ${a.group_members.length - 1}` : ''}`;
      $('.ttl').textContent = a.media_title || (playing ? 'Playing' : 'Nothing Playing');
      $('.art2').textContent = [a.media_artist, a.media_album_name].filter(Boolean).join(' — ') || (a.source ? `Source: ${a.source}` : 'Choose a station below');
      $('.pp').innerHTML = icon(playing ? 'pause' : 'play');
      $('.mutebtn').innerHTML = icon(a.is_volume_muted ? 'mute' : 'volume');
      vs.set(num(a.volume_level) ?? 0);
      const srcs = (a.source_list || []).filter((s) => !/^(tv|line-in)$/i.test(s)).slice(0, 8);
      $('.srcs').innerHTML = srcs.map((s) => `<button class="pill press ${a.source === s ? 'solid' : ''}" data-s="${esc(s)}">${esc(s)}</button>`).join('');
    };
  },

  /* ── POOL ── */
  _build_pool(pg) {
    const hs = this._hass; const P = this._c.pool; const phone = this._isPhone();
    const stage = h(`<div class="card stage"><div class="load">Loading 3D model…</div><div class="lbls"></div>
      <div class="ttl3"><div class="a">Backyard</div><div class="b"></div></div>
      <div class="ov"><div class="seg"><button class="on" data-v="overview">${icon('cube')}Overview</button><button data-v="spa">${icon('spa')}Spa</button><button data-v="terrace">${icon('terrace')}Terrace</button><button data-v="top">${icon('top')}Top</button></div>
        <div class="swatches hide"></div></div></div>`);
    const water = h(`<div class="card water"><div class="hd"><div class="tt">Water</div><span class="sub pst"></span></div>
      <div class="big"><div class="v"></div></div><div class="sub pool-sub" style="margin-top:6px"></div>
      <div class="row"><div class="mini"><div class="l">${icon('spa')}Spa</div><div class="v spa-v"></div></div><div class="mini"><div class="l">${icon('thermo')}Air</div><div class="v air-v"></div></div></div></div>`);
    const chem = h(`<div class="card"><div class="hd"><div class="tt">Chemistry</div></div><div class="chem"></div></div>`);
    const spk = h(`<div class="card"><div class="hd"><div class="tt">Pool Speakers</div><button class="link press openm">Media${icon('chevron')}</button></div>
      <div class="mm" style="padding:0"><div class="art"></div><div class="txt"><div class="ti"></div><div class="ar"></div></div><button class="round press pp-btn"></button></div>
      <div class="vol" style="margin-top:14px">${icon('volume')}<div class="vs"></div></div></div>`);
    const heat = h(`<div class="card"><div class="hd"><div class="tt">Heat</div><span class="sub hsum"></span></div></div>`);
    const eq = h(`<div class="card"><div class="hd"><div class="tt">Equipment</div><span class="sub eqsum"></span></div><div class="tiles"></div></div>`);
    const poolC = new LuxClimate(this, P.pool_heat, { name: 'Pool', sensor: P.pool_temp, variant: 'row', icon: 'pool' });
    const spaC = new LuxClimate(this, P.spa_heat, { name: 'Spa', sensor: P.spa_temp, variant: 'row', icon: 'spa' });
    heat.append(poolC.el, spaC.el);
    const terr = this._build_terrace(stage);

    // media mini inside pool page (always the pool speaker)
    const spkId = P.speaker;
    spk.querySelector('.openm').addEventListener('click', () => { this._spk = spkId; this._go('media'); });
    spk.querySelector('.pp-btn').addEventListener('click', () => this._call('media_player', 'media_play_pause', { entity_id: spkId }));
    const vs = makeSlider((v) => this._call('media_player', 'volume_set', { entity_id: spkId, volume_level: Math.round(v * 100) / 100 }));
    spk.querySelector('.vs').replaceWith(vs);

    // equipment tiles
    const T = [
      { k: 'pool_pump', n: 'Filter Pump', i: 'fan', c: '#0a84ff' }, { k: 'spa_mode', n: 'Spa Mode', i: 'spa', c: '#ff9f0a' },
      { k: 'solar', n: 'Solar', i: 'solar', c: '#e3b400' }, { k: 'pool_light', n: 'Pool Light', i: 'bulb', c: '#12c9d6', fx: true },
      { k: 'floor', n: 'Floor System', i: 'sparkle', c: '#8b5cff' }, { k: 'spillover', n: 'Spillover', i: 'spill', c: '#32ade6' },
      { k: 'sheer', n: 'Sheer Descent', i: 'sheer', c: '#32ade6' }, { k: 'blower', n: 'Spa Bubbles', i: 'bubbles', c: '#32ade6' },
      { k: 'fire', n: 'Fire Bowls', i: 'flame', c: '#ff7a1a', arm: true },
    ].filter((t) => P[t.k]);
    const tilesBox = eq.querySelector('.tiles');
    const tiles = T.map((t) => {
      const el = h(`<button class="tile" style="--c:${t.c}"><div class="ti">${icon(t.i)}</div><div><div class="tn">${esc(t.n)}</div><div class="ts"></div></div></button>`);
      tilesBox.appendChild(el);
      const id = P[t.k]; const dom = id.split('.')[0];
      pressable(el, () => {
        const st = this._hass.states[id]; if (!avail(st)) return;
        if (t.arm && !isOn(st) && !el._armed) {
          el._armed = true; el.classList.add('arm'); el.querySelector('.ts').textContent = 'Tap again to ignite';
          clearTimeout(el._t); el._t = setTimeout(() => { el._armed = false; el.classList.remove('arm'); renderTile(t, el); }, 3200); return;
        }
        el._armed = false; el.classList.remove('arm'); clearTimeout(el._t);
        el._pend = { on: !isOn(st), until: Date.now() + 3000 }; renderTile(t, el);
        this._call(['light', 'switch', 'fan'].includes(dom) ? dom : 'homeassistant', 'toggle', { entity_id: id });
      }, () => { if (t.fx) this._openFx(); else fireMoreInfo(this, id); });
      return { t, el };
    });
    const renderTile = (t, el) => {
      const st = this._hass.states[P[t.k]];
      let on = isOn(st);
      if (el._pend && Date.now() < el._pend.until) { if (el._pend.on === on) el._pend = null; else on = el._pend.on; }
      if (el._armed) return;
      el.classList.toggle('on', on); el.classList.toggle('na', !avail(st));
      let s = !st ? 'Not found' : !avail(st) ? 'Unavailable' : on ? 'On' : 'Off';
      if (t.fx && on && st.attributes.effect) s = st.attributes.effect;

      el.querySelector('.ts').textContent = s;
      if (t.fx) { const cols = POOL_EFFECTS[(st && st.attributes.effect) || ''] || ['#12c9d6']; el.style.setProperty('--c', cols[0]); }
    };

    // swatches (pool light colors)
    const sw = stage.querySelector('.swatches');
    const lightSt = () => this._hass.states[P.pool_light];
    const fxList = () => ((lightSt() && lightSt().attributes.effect_list) || Object.keys(POOL_EFFECTS)).filter((e) => e !== 'Off');
    sw.innerHTML = fxList().filter((e) => (POOL_EFFECTS[e] || []).length === 1).slice(0, 7)
      .map((e) => `<button class="sw press" data-fx="${esc(e)}" title="${esc(e)}" style="background:${POOL_EFFECTS[e][0]}"></button>`).join('')
      + `<button class="sw press" data-more="1" title="Light shows" style="background:conic-gradient(#ff3ccb,#ffd23f,#66f08c,#12c9d6,#2f5dff,#8b5cff,#ff3ccb)"></button>`;
    sw.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.more) return this._openFx();
      this._call('light', 'turn_on', { entity_id: P.pool_light, effect: b.dataset.fx });
    });
    stage.querySelector('.seg').addEventListener('click', (e) => {
      const b = e.target.closest('[data-v]'); if (!b) return;
      stage.querySelectorAll('.seg button').forEach((x) => x.classList.toggle('on', x === b));
      if (this._pool3d) this._pool3d.view(b.dataset.v);
    });

    if (phone) {
      const root = h('<div class="stack"></div>'); root.append(stage, water, heat, eq, terr.el, chem, spk); pg.el.appendChild(root);
    } else {
      const grid = h('<div class="pool-grid"><div class="col c1"></div><div class="c2" style="display:flex;flex-direction:column;gap:var(--gap);min-height:0"></div><div class="col c3"></div></div>');
      grid.querySelector('.c1').append(water, chem, spk); stage.style.flex = '1'; grid.querySelector('.c2').append(stage, terr.el); grid.querySelector('.c3').append(heat, eq);
      pg.el.appendChild(grid);
      // narrow tablets: keep the 3D stage tall and move the terrace card to the left column
      const c1 = grid.querySelector('.c1'), c2 = grid.querySelector('.c2');
      const place = () => { const w = c2.clientWidth; if (!w) return; const want = w < 520 ? c1 : c2; if (terr.el.parentNode !== want) want.appendChild(terr.el); };
      new ResizeObserver(place).observe(grid);
    }

    // 3D
    this._pool3d = new LuxPool3D(stage, { threeUrl: this._c.three_url, dark: this.getAttribute('theme') === 'dark', onReady: () => { stage.querySelector('.load').style.display = 'none'; this._update(true); },
      onError: (m) => { stage.querySelector('.load').textContent = m; } });
    this._pool3d.setActive(true);

    pg.update = () => {
      const hs2 = this._hass; const S = (k) => P[k] && hs2.states[P[k]];
      const pt = num(S('pool_temp') && S('pool_temp').state); const st = num(S('spa_temp') && S('spa_temp').state); const at = num(S('air_temp') && S('air_temp').state);
      const ph = S('pool_heat'); const sh = S('spa_heat');
      water.querySelector('.big .v').innerHTML = `${pt != null ? Math.round(pt) : '—'}<sup>°</sup>`;
      water.querySelector('.pool-sub').textContent = `Pool water · ${ph && ph.state === 'heat' ? `Heating to ${Math.round(num(ph.attributes.temperature))}°` : 'Heater off'}`;
      water.querySelector('.spa-v').innerHTML = st != null ? `${Math.round(st)}°` : (sh && num(sh.attributes.temperature) != null ? `—<small>set ${Math.round(num(sh.attributes.temperature))}°</small>` : '—');
      water.querySelector('.air-v').innerHTML = at != null ? `${Math.round(at)}°` : '—';
      water.querySelector('.pst').textContent = isOn(S('pool_pump')) ? 'Circulating' : 'Pump off';
      const fz = S('freeze');
      const c = [
        ['pH', 'drop', S('ph'), '', 1], ['ORP', 'bolt', S('orp'), 'mV', 0], ['Salt', 'flask', S('salt'), 'ppm', 0],
      ].map(([l, i, s, u, d]) => { const v = s && num(s.state); return `<div class="mini"><div class="l">${icon(i)}${l}</div><div class="v">${v != null ? v.toFixed(d) : '—'}${v != null && u ? `<small>${u}</small>` : ''}</div></div>`; }).join('')
        + `<div class="mini"><div class="l">${icon('snow')}Freeze</div><div class="v" style="font-size:16px;margin-top:8px">${fz ? (fz.state === 'on' ? 'Protecting' : 'Standby') : '—'}</div></div>`;
      chem.querySelector('.chem').innerHTML = c;
      // no pH / ORP / salt readings → hide the card until the sensors report
      const hasChem = ['ph', 'orp', 'salt'].some((k) => { const x = S(k); return x && num(x.state) != null; });
      chem.style.display = hasChem ? '' : 'none';
      poolC.render(); spaC.render();
      heat.querySelector('.hsum').textContent = [ph, sh].filter((x) => x && x.state === 'heat').length ? 'Heating on' : 'Off';
      tiles.forEach(({ t, el }) => renderTile(t, el));
      const terrState = terr.update();
      eq.querySelector('.eqsum').textContent = `${tiles.filter(({ t }) => isOn(S(t.k))).length} running`;
      // speaker
      const sp = hs2.states[spkId];
      if (sp) {
        const a = sp.attributes; const playing = sp.state === 'playing';
        const art = spk.querySelector('.art'); art.style.backgroundImage = a.entity_picture ? `url("${a.entity_picture}")` : ''; art.innerHTML = a.entity_picture ? '' : icon('music');
        spk.querySelector('.ti').innerHTML = (playing ? '<span class="eq"><i></i><i></i><i></i></span>' : '') + esc(a.media_title || a.friendly_name);
        spk.querySelector('.ar').textContent = a.media_title ? (a.media_artist || '') : (playing ? 'Playing' : sp.state === 'paused' ? 'Paused' : 'Idle');
        spk.querySelector('.pp-btn').innerHTML = icon(playing ? 'pause' : 'play');
        vs.set(num(a.volume_level) ?? 0);
      }
      // swatches
      const lt = lightSt(); const lon = isOn(lt);
      sw.classList.toggle('hide', !lon);
      sw.querySelectorAll('[data-fx]').forEach((b) => b.classList.toggle('on', lon && lt.attributes.effect === b.dataset.fx));
      // title
      const bits = [];
      if (isOn(S('spa_mode'))) bits.push('Spa mode'); else if (isOn(S('pool_pump'))) bits.push('Filtering');
      if (isOn(S('fire'))) bits.push('Fire on'); if (lon) bits.push(lt.attributes.effect || 'Lights on');
      stage.querySelector('.ttl3 .b').textContent = bits.length ? bits.join(' · ') : 'All equipment off';
      // 3D
      if (this._pool3d) {
        const eff = lt && lt.attributes.effect;
        this._pool3d.setState({
          poolTemp: pt, spaTemp: st ?? (sh ? num(sh.attributes.temperature) : null), air: at,
          light: lon, lightColors: POOL_EFFECTS[eff] || ['#dfeeff'], floor: isOn(S('floor')),
          fire: isOn(S('fire')), spill: isOn(S('spillover')), sheer: isOn(S('sheer')), blower: isOn(S('blower')),
          spaJets: isOn(S('spa_mode')), pump: isOn(S('pool_pump')), bubblers: isOn(S('bubblers')),
          spaHeat: sh && sh.state === 'heat', poolHeat: ph && ph.state === 'heat',
          terrace: terrState,
          music: sp && sp.state === 'playing', night: hs2.states['sun.sun'] ? hs2.states['sun.sun'].state === 'below_horizon' : false,
        });
      }
    };
  },
  /* ── TERRACE (covered patio next to the spa) ── */
  _terrEnt(k) {
    const T = this._c.terrace; if (T[k] === false) return null; if (T[k]) return T[k];
    const kw = { fan: /\bfan\b/, chandelier: /chandelier|pendant/, cans: /\bcans?\b|recessed|downlight|can light/ }[k]; if (!kw) return null;
    const now = Date.now(); this._tAuto = this._tAuto || {}; const c = this._tAuto[k]; if (c && now - c.t < 15000) return c.id;
    const where = /\b(patio|terrace|loggia|covered porch|outdoor living|pavilion)\b/; let id = null;
    for (const e in this._hass.states) {
      const d = e.split('.')[0]; if (!['light', 'switch', 'fan'].includes(d) || (k === 'fan' && d === 'light') || (k !== 'fan' && d === 'fan')) continue;
      const n = `${e.replace(/[._]/g, ' ')} ${this._hass.states[e].attributes.friendly_name || ''}`.toLowerCase();
      if (/flood|socket|auto ?play|ungroup|\bled\b/.test(n)) continue;
      if (where.test(n) && kw.test(n)) { id = e; break; }
    }
    this._tAuto[k] = { t: now, id }; return id;
  },
  _build_terrace(stage) {
    const C = this._c.terrace;
    const el = h(`<div class="card terr"><div class="hd"><div class="tt">${esc(C.name)}</div><div class="rt"><span class="sub tsum"></span><button class="link press tview">View${icon('chevron')}</button></div></div>
      <div class="tb"><div class="tiles"></div><div class="trs">
      <div class="trow ttv" style="--c:#5e8bff"><div class="tic">${icon('tv')}</div><div class="txt"><div class="ti">TV</div><div class="ar"></div></div><button class="round press tpow">${icon('power')}</button></div>
      <div class="trow tsn"><div class="art"></div><div class="txt"><div class="ti"></div><div class="ar"></div></div><button class="round press tpp"></button></div></div></div>
      <div class="vol">${icon('volume')}<div class="vs"></div></div></div>`);
    const $ = (q) => el.querySelector(q); const hs = () => this._hass.states;
    $('.tview').addEventListener('click', () => {
      stage.querySelectorAll('.seg button').forEach((x) => x.classList.toggle('on', x.dataset.v === 'terrace'));
      if (this._pool3d) this._pool3d.view('terrace');
      if (this._isPhone()) stage.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' });
    });
    // lights: fan, chandelier, cans (tap toggles, hold for details)
    const L = [{ k: 'fan', n: 'Fan', i: 'fan', c: '#64d2ff' }, { k: 'chandelier', n: 'Chandelier', i: 'chandelier', c: '#ffb04a' }, { k: 'cans', n: 'Can Lights', i: 'downlight', c: '#ffc96b' }];
    const tiles = L.map((t) => {
      const b = h(`<button class="tile" style="--c:${t.c}"><div class="ti">${icon(t.i)}</div><div><div class="tn">${t.n}</div><div class="ts"></div></div></button>`); $('.tiles').appendChild(b);
      pressable(b, () => {
        const id = this._terrEnt(t.k); const st = id && hs()[id]; if (!avail(st)) return;
        b._pend = { on: !isOn(st), until: Date.now() + 3000 }; paint(t, b);
        this._call(id.split('.')[0], 'toggle', { entity_id: id });
      }, () => { const id = this._terrEnt(t.k); if (id) fireMoreInfo(this, id); });
      return { t, b };
    });
    const paint = (t, b) => {
      const id = this._terrEnt(t.k); const st = id && hs()[id]; let on = isOn(st);
      if (b._pend && Date.now() < b._pend.until) { if (b._pend.on === on) b._pend = null; else on = b._pend.on; }
      b.classList.toggle('on', on); b.classList.toggle('na', !avail(st));
      const br = st && num(st.attributes.brightness); const pc = st && num(st.attributes.percentage);
      b.querySelector('.ts').textContent = !st ? 'Not added' : !avail(st) ? 'Unavailable' : !on ? 'Off' : br != null ? `${Math.round(br / 2.55)}%` : pc != null ? `${Math.round(pc)}%` : 'On';
      return { on, level: br != null ? 0.35 + 0.65 * (br / 255) : pc != null ? 0.3 + 0.7 * (pc / 100) : 1 };
    };
    // TV power
    const tvOn = (st) => avail(st) && !['off', 'standby', 'unknown'].includes(st.state);
    const tv = $('.ttv');
    $('.tpow').addEventListener('click', (e) => {
      e.stopPropagation(); const st = hs()[C.tv]; if (!avail(st)) return;
      tv._pend = { on: !tvOn(st), until: Date.now() + 6000 }; this._update(true);
      this._call('media_player', tvOn(st) ? 'turn_off' : 'turn_on', { entity_id: C.tv });
    });
    tv.addEventListener('click', () => { if (hs()[C.tv]) fireMoreInfo(this, C.tv); });
    // Patio Sonos
    const sn = $('.tsn');
    $('.tpp').addEventListener('click', (e) => { e.stopPropagation(); if (avail(hs()[C.sonos])) this._call('media_player', 'media_play_pause', { entity_id: C.sonos }); });
    sn.addEventListener('click', () => { if (hs()[C.sonos]) { this._spk = C.sonos; this._go('media'); } });
    const vs = makeSlider((v) => this._call('media_player', 'volume_set', { entity_id: C.sonos, volume_level: Math.round(v * 100) / 100 }));
    $('.vs').replaceWith(vs);

    const update = () => {
      const out = {}; const bits = [];
      tiles.forEach(({ t, b }) => { const r = paint(t, b); out[t.k] = r.on; if (t.k === 'cans') out.cansLevel = r.level; if (t.k === 'chandelier') out.chandLevel = r.level; if (t.k === 'fan') out.fanSpeed = r.level; });
      const lit = tiles.filter(({ b }) => b.classList.contains('on')).length; if (lit) bits.push(`${lit} on`);
      // TV
      const ts = hs()[C.tv]; let on = tvOn(ts);
      if (tv._pend && Date.now() < tv._pend.until) { if (tv._pend.on === on) tv._pend = null; else on = tv._pend.on; }
      const ta = (ts && ts.attributes) || {};
      tv.classList.toggle('on', on); tv.classList.toggle('na', !ts);
      tv.querySelector('.ti').textContent = ta.friendly_name && !/^outdoor tv$/i.test(ta.friendly_name) ? ta.friendly_name : 'Outdoor TV';
      tv.querySelector('.ar').textContent = !ts ? 'Not connected' : !avail(ts) ? 'Unavailable' : on ? (ta.media_title || ta.app_name || ta.source || 'On') : 'Off';
      $('.tpow').classList.toggle('on', on); $('.tpow').disabled = !avail(ts);
      Object.assign(out, { tv: on, tvSource: on ? (ta.app_name || ta.source || '') : '', tvPic: on && ta.entity_picture ? ta.entity_picture : null });
      if (on) bits.push('TV on');
      // Sonos
      const ss = hs()[C.sonos]; const sa = (ss && ss.attributes) || {}; const playing = !!ss && ss.state === 'playing';
      sn.classList.toggle('na', !ss);
      const art = sn.querySelector('.art'); const pic = playing && sa.entity_picture;
      art.style.backgroundImage = pic ? `url("${pic}")` : ''; art.innerHTML = pic ? '' : icon('speaker');
      sn.querySelector('.ti').innerHTML = (playing ? '<span class="eq"><i></i><i></i><i></i></span>' : '') + esc(playing && sa.media_title ? sa.media_title : (sa.friendly_name || 'Patio'));
      sn.querySelector('.ar').textContent = !ss ? 'Not connected' : !avail(ss) ? 'Unavailable' : playing ? (sa.source === 'TV' ? 'TV audio' : (sa.media_artist || 'Playing')) : ss.state === 'paused' ? 'Paused' : 'Idle';
      $('.tpp').innerHTML = icon(playing ? 'pause' : 'play'); vs.set(num(sa.volume_level) ?? 0);
      Object.assign(out, { music: playing, musicTitle: sa.media_title || '' });
      if (playing) bits.push('Music');
      $('.tsum').textContent = bits.join(' · ') || 'All off';
      return out;
    };
    return { el, update };
  },
  _openFx() {
    const P = this._c.pool; const body = h('<div class="fx-grid"></div>');
    const lt = () => this._hass.states[P.pool_light];
    const list = ((lt() && lt().attributes.effect_list) || Object.keys(POOL_EFFECTS)).filter((e) => e !== 'Off');
    body.innerHTML = `<button class="fx press" data-off="1"><i style="background:var(--btn)"></i>Off</button>` + list.map((e) => {
      const c = POOL_EFFECTS[e] || ['#ccc'];
      const bg = c.length > 1 ? `conic-gradient(${c.concat(c[0]).join(',')})` : c[0];
      return `<button class="fx press" data-fx="${esc(e)}"><i style="background:${bg}"></i>${esc(e)}</button>`;
    }).join('');
    body.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.off) this._call('light', 'turn_off', { entity_id: P.pool_light });
      else this._call('light', 'turn_on', { entity_id: P.pool_light, effect: b.dataset.fx });
    });
    this._openSheet('Pool Light', body, () => {
      const s = lt(); const on = isOn(s);
      body.querySelectorAll('.fx').forEach((b) => b.classList.toggle('on', b.dataset.off ? !on : (on && s.attributes.effect === b.dataset.fx)));
    });
  },
});
/* ───────────────────────── Live 3D pool (three.js) ─────────────────────────
 * World units = meters. x runs along the pool's length (left end → spa end),
 * z points toward the house (near side), y is up. Deck top is y≈0.
 */
const POOL = {
  outline: [[-7, -3.75], [7, -3.75], [7, 0.6], [5, 0.6], [5, 3.75], [-0.6, 3.75], [-0.6, 6.0], [-4.6, 6.0], [-4.6, 3.75], [-7, 3.75]],
  deck: [[-9.9, -4.45], [7.7, -4.45], [7.7, -0.6], [8.6, -0.6], [8.6, -4.3], [15.6, -4.3], [15.6, -1.5], [17.2, -1.5], [17.2, 8.6], [-9.9, 8.6]],
  spa: { x0: 5, z0: 0.6, x1: 8.3, z1: 3.9, top: 0.5, inset: 0.3, water: 0.42 },
  water: -0.12,
  lights: [[-6.75, 1.8], [-4.0, 4.7], [-1.5, 5.6], [2.4, 3.5], [-2.5, -3.5], [4.2, -3.5]],
  spaLight: [6.65, 2.25],
  fire: [[-3.6, -4.05], [3.2, -4.05]],
  wall: { x0: -3.2, x1: 2.8, z0: -4.4, z1: -3.75, h: 0.57 },
  sheer: { x: -0.2, w: 1.6 },
  spill: { z0: 1.55, z1: 2.95 },
  bubblers: [[-3.6, 5.1], [-1.6, 5.3]],
  speakers: [[-10.15, -3.2], [-10.15, 0.8]],
};
const VIEWS = {
  overview: { r: 44, pol: 0.95, az: 0.18, tx: 4.2, ty: 0, tz: 1.4 },
  spa: { r: 8.5, pol: 0.92, az: 0.38, tx: 5.8, ty: 0.3, tz: 1.8 },
  terrace: { r: 18, pol: 1.5, az: -1.2, tx: 12.4, ty: 1.2, tz: 1.8 },
  top: { r: 44, pol: 0.03, az: 0, tx: 3.3, ty: 0, tz: 1.4 },
};

const WATER_VS = `
varying vec3 vW;
void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vW = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`;
const WATER_FS = `
uniform float uTime, uNight, uGlow, uSpa, uChurn, uBub, uN, uShow;
uniform vec3 uDeep, uShallow, uSky, uCols[4];
uniform vec2 uLights[7];
varying vec3 vW;
float depthAt(vec2 p){
  if(uSpa > 0.5) return 0.9;
  float d = mix(1.05, 2.45, smoothstep(-5.0, 3.5, p.x));
  if(p.y > 3.72) d = 0.32;
  float r = length(p - vec2(5.0, 3.75));
  if(p.x < 5.0 && p.y < 3.75 && r < 2.1) d = min(d, r < 1.05 ? 0.33 : (r < 1.6 ? 0.62 : 0.92));
  return d;
}
vec3 pal(float t){
  if(uN < 1.5) return uCols[0];
  float i = mod(t, uN); float f = fract(i); f = f*f*(3.0-2.0*f);
  int a = int(floor(i)); int b = int(mod(floor(i)+1.0, uN));
  vec3 ca = uCols[0], cb = uCols[0];
  for(int k=0;k<4;k++){ if(k==a) ca=uCols[k]; if(k==b) cb=uCols[k]; }
  return mix(ca, cb, f);
}
void main(){
  vec2 p = vW.xz;
  float d = depthAt(p);
  float t = clamp(d / 2.45, 0.0, 1.0);
  vec3 col = mix(uShallow, uDeep, pow(t, 0.75));
  vec2 q = p * 1.7;
  float c = sin(q.x*1.3 + uTime*0.8 + sin(q.y*0.9 + uTime*0.55)) + sin(q.y*1.7 - uTime*0.65 + sin(q.x*1.1 - uTime*0.45));
  c = pow(clamp(0.5 + 0.25*c, 0.0, 1.0), 3.0);
  col += c * 0.13 * (1.0 - t*0.55) * (1.0 - uNight*0.75);
  if(uSpa > 0.5){
    vec2 s = p * 6.0;
    float n = sin(s.x*1.7 + uTime*5.0) * sin(s.y*1.9 - uTime*4.3) + sin((s.x+s.y)*1.3 + uTime*6.1);
    float foam = smoothstep(0.9, 1.6, n) * (uChurn*0.35 + uBub*0.7);
    col = mix(col, vec3(0.92,0.97,1.0), foam);
  }
  float g = 0.0;
  for(int i=0;i<7;i++){ float dd = distance(p, uLights[i]); g += exp(-dd*dd*0.16); }
  vec3 lc = pal(uTime*0.35);
  float gi = uGlow * (0.40 + 0.60*uNight);
  float hot = 0.0;
  for(int i=0;i<7;i++){ float dd = distance(p, uLights[i]); hot += exp(-dd*dd*0.9); }
  col = mix(col, lc * (0.45 + 0.75*(1.0-t)), clamp(gi * (0.42 + min(g,1.6)*0.5), 0.0, 0.95));
  col += lc * gi * (c * 0.45 + hot * 0.55);
  vec3 V = normalize(cameraPosition - vW);
  float fres = pow(1.0 - clamp(V.y, 0.0, 1.0), 4.0);
  col = mix(col, uSky, fres * 0.5);
  vec3 L = normalize(vec3(0.45, 0.8, 0.35));
  vec3 N = normalize(vec3(sin(q.x*2.1 + uTime*1.3)*0.05, 1.0, cos(q.y*2.3 - uTime*1.1)*0.05));
  float spec = pow(max(dot(reflect(-L, N), V), 0.0), 90.0) * (1.0 - uNight*0.85);
  col += spec * 0.5;
  gl_FragColor = vec4(col, (0.9 + fres*0.08) * uShow);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;
const SHEET_VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const SHEET_FS = `
uniform float uTime, uOn; uniform vec3 uCol; varying vec2 vUv;
void main(){
  float s = fract(vUv.y*5.0 + uTime*1.9 + sin(vUv.x*37.0)*0.08);
  float streak = 0.55 + 0.45*sin(vUv.x*90.0 + sin(vUv.y*9.0 + uTime*3.0));
  float a = uOn * (0.42 + 0.4*smoothstep(0.2,0.9,s)*streak);
  a *= smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);
  a *= mix(1.0, 0.55, vUv.y);
  gl_FragColor = vec4(uCol, a);
  #include <colorspace_fragment>
}`;
const FLAME_FS = `
uniform float uTime, uOn, uSeed; varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
void main(){
  vec2 uv = vUv; float t = uTime*2.4 + uSeed*10.0;
  float n = noise(vec2(uv.x*4.0, uv.y*3.0 - t)) * 0.6 + noise(vec2(uv.x*9.0, uv.y*7.0 - t*1.7)) * 0.4;
  float w = (1.0 - uv.y) * 0.5 + 0.05;
  float shape = smoothstep(w, w*0.25, abs(uv.x - 0.5 + (n-0.5)*0.18*uv.y));
  shape *= smoothstep(1.0, 0.25, uv.y + (n-0.5)*0.35) * smoothstep(0.0, 0.08, uv.y);
  float f = shape * (0.65 + 0.7*n);
  vec3 col = mix(vec3(1.0,0.28,0.04), vec3(1.0,0.82,0.42), clamp(f*1.2 - uv.y*0.4, 0.0, 1.0));
  gl_FragColor = vec4(col * 1.6, clamp(f*1.4, 0.0, 1.0) * uOn);
  #include <colorspace_fragment>
}`;
const PTS_VS = `
uniform float uTime, uSize, uRise, uMode, uMax; attribute vec4 aSeed; varying float vA;
void main(){
  vec3 p = position;
  float ph = fract(uTime * (0.35 + aSeed.x*0.5) + aSeed.y);
  if(uMode < 0.5){ p.y += ph * uRise; p.x += sin(ph*6.28 + aSeed.z*6.0)*0.04; vA = sin(ph*3.14159); }
  else if(uMode < 1.5){ float h = sin(ph*3.14159); p.y += h * uRise; p.x += (aSeed.z-0.5)*0.35*ph; p.z += (aSeed.w-0.5)*0.35*ph; vA = 1.0 - ph; }
  else { p.y += ph * uRise; p.x += sin(ph*3.0 + aSeed.z*6.0)*0.25*ph; p.z += cos(ph*2.0 + aSeed.w*6.0)*0.2*ph; vA = sin(ph*3.14159)*(1.0-ph); }
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = min(uMax, uSize * (1.0 + aSeed.w) * (60.0 / -mv.z));
  gl_Position = projectionMatrix * mv;
}`;
const PTS_FS = `
uniform float uOn, uSoft; uniform vec3 uCol; varying float vA;
void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); if(d > 0.5) discard;
  float a = uSoft > 0.5 ? smoothstep(0.5, 0.0, d) * 0.35 : smoothstep(0.5, 0.35, d);
  gl_FragColor = vec4(uCol, a * vA * uOn);
  #include <colorspace_fragment>
}`;

class LuxPool3D {
  constructor(host, opts) {
    this.host = host; this.opts = opts; this.lbls = host.querySelector('.lbls');
    this.st = {}; this.active = false; this.dark = !!opts.dark; this.ready = false;
    this.fps = opts.fps || 30;
    this.cam = { ...VIEWS.overview }; this.goal = { ...VIEWS.overview }; this.vel = { r: 0, pol: 0, az: 0, tx: 0, ty: 0, tz: 0 };
    this.fade = { fire: 0, spill: 0, sheer: 0, blower: 0, bubblers: 0, glow: 0, music: 0, steam: 0, night: 0, churn: 0 };
    this._init().catch((e) => { console.error('[lux-pool3d]', e); opts.onError && opts.onError('3D view needs an internet connection to load'); });
  }
  async _init() {
    const T = this.T = await import(this.opts.threeUrl);
    const canvas = document.createElement('canvas'); this.host.prepend(canvas); this.canvas = canvas;
    const R = this.renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
    R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    R.outputColorSpace = T.SRGBColorSpace; R.toneMapping = T.ACESFilmicToneMapping; R.toneMappingExposure = 1.0;
    R.shadowMap.enabled = true; R.shadowMap.type = T.PCFSoftShadowMap; R.shadowMap.autoUpdate = false;
    const S = this.scene = new T.Scene();
    this.camera = new T.PerspectiveCamera(30, 1, 0.5, 220);
    this.clock = new T.Clock();
    this._lights(); this._build(); this._input();
    this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this.host);
    this.io = new IntersectionObserver((e) => { this.visible = e[0].isIntersecting; this._loop(); }, { threshold: 0.01 }); this.io.observe(this.host);
    this._vis = () => this._loop(); document.addEventListener('visibilitychange', this._vis);
    this.resize(); this.ready = true; this._applyState(true);
    R.shadowMap.needsUpdate = true;
    this.opts.onReady && this.opts.onReady();
    this._loop();
  }
  _mat(color, o = {}) { return new this.T.MeshStandardMaterial({ color, roughness: o.r ?? 0.85, metalness: o.m ?? 0, ...o.x }); }
  _shape(pts, holes = []) {
    const T = this.T; const s = new T.Shape(pts.map(([x, z]) => new T.Vector2(x, -z)));
    holes.forEach((hp) => s.holes.push(new T.Path(hp.map(([x, z]) => new T.Vector2(x, -z)))));
    return s;
  }
  _slab(shape, bottom, top, mats) {
    const T = this.T; const g = new T.ExtrudeGeometry(shape, { depth: top - bottom, bevelEnabled: false, curveSegments: 18 });
    g.rotateX(-Math.PI / 2); g.translate(0, bottom, 0);
    const m = new T.Mesh(g, mats); m.receiveShadow = true; return m;
  }
  _box(w, hgt, d, x, y, z, mat, cast = true) {
    const T = this.T; const m = new T.Mesh(new T.BoxGeometry(w, hgt, d), mat); m.position.set(x, y + hgt / 2, z); m.castShadow = cast; m.receiveShadow = true; this.scene.add(m); return m;
  }
  _lights() {
    const T = this.T; const S = this.scene;
    this.hemi = new T.HemisphereLight(0xdfe9f5, 0x5d6b4f, 1.6); S.add(this.hemi);
    const d = this.sun = new T.DirectionalLight(0xfff4e6, 2.6); d.position.set(-11, 22, 12); d.castShadow = true;
    d.shadow.mapSize.set(2048, 2048); const c = d.shadow.camera; c.left = -24; c.right = 24; c.top = 19; c.bottom = -19; c.near = 1; c.far = 80;
    d.shadow.bias = -0.0004; d.shadow.normalBias = 0.02; d.shadow.radius = 4; S.add(d); d.target.position.set(3, 0, 1.5); S.add(d.target);
    this.fireLights = POOL.fire.map(([x, z]) => { const l = new T.PointLight(0xff8a3a, 0, 9, 1.4); l.position.set(x, 1.3, z + 0.1); S.add(l); return l; });
    this.spaGlow = new T.PointLight(0x9fe8ff, 0, 3.2, 2); this.spaGlow.position.set(6.65, 0.7, 2.25); S.add(this.spaGlow);
  }
  _build() {
    const T = this.T; const S = this.scene; const P = POOL;
    const trav = this.mTrav = this._mat(0xe8dfcf, { r: 0.92 });
    const travSide = this._mat(0xd9ccb6, { r: 0.95 });
    const lawn = this.mLawn = this._mat(0x7e9a66, { r: 1 });
    const soil = this._mat(0x5c5040, { r: 1 });
    const plaster = this._mat(0x2e4852, { r: 0.8, x: { side: T.BackSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -6 } });
    const white = this._mat(0xf3f1ec, { r: 0.9 });
    const dark = this._mat(0x1f2125, { r: 0.6 });
    const foliage = this._mat(0x3e5a3b, { r: 1 });
    const foliage2 = this._mat(0x4f6d43, { r: 1 });

    // ground diorama slab + deck (both with the pool cut out)
    const groundPts = []; const gx0 = -12.0, gx1 = 18.6, gz0 = -7.4, gz1 = 10.2, rr = 1.6;
    const corner = (cx, cz, a0) => { for (let i = 0; i <= 6; i++) { const a = a0 + (i / 6) * Math.PI / 2; groundPts.push([cx + Math.cos(a) * rr, cz + Math.sin(a) * rr]); } };
    corner(gx1 - rr, gz1 - rr, 0); corner(gx0 + rr, gz1 - rr, Math.PI / 2); corner(gx0 + rr, gz0 + rr, Math.PI); corner(gx1 - rr, gz0 + rr, Math.PI * 1.5);
    S.add(this._slab(this._shape(groundPts, [P.outline]), -0.55, -0.03, [lawn, this._mat(0x3a3530, { r: 1 })]));
    S.add(this._slab(this._shape(P.deck, [P.outline]), -0.05, 0.02, [trav, travSide]));
    // gravel bed behind pool & mulch bed along wall
    S.add(this._slab(this._shape([[-4.6, -6.4], [8.8, -6.4], [9.4, -5.2], [7.7, -4.45], [-4.6, -4.45]]), -0.05, 0.0, [this._mat(0xb8ad99), soil]));
    S.add(this._slab(this._shape([[-10.55, -7.2], [-9.9, -7.2], [-9.9, 8.6], [-10.55, 8.6]]), -0.05, 0.0, [this._mat(0x4a3b30), soil]));

    // basin: pool solid rendered from inside
    const basin = this._slab(this._shape(P.outline), -1.6, 0.02, plaster); basin.receiveShadow = true; S.add(basin);
    // sun shelf platform + radius steps
    this._box(4.0, 1.25, 2.25, -2.6, -1.6, 4.875, this._mat(0x5f848b), false);
    [[2.05, -0.95], [1.55, -0.65], [1.05, -0.36]].forEach(([r, top]) => {
      const g = new T.CylinderGeometry(r, r, top + 1.6, 28, 1, false, Math.PI, Math.PI / 2);
      const m = new T.Mesh(g, this._mat(0x6a8f96)); m.position.set(5.0, (top - 1.6) / 2, 3.75); m.receiveShadow = true; S.add(m);
    });

    // water
    const cols = [new T.Color('#12c9d6'), new T.Color('#12c9d6'), new T.Color('#12c9d6'), new T.Color('#12c9d6')];
    const lights = P.lights.concat([[99, 99]]).map(([x, z]) => new T.Vector2(x, z));
    const wu = () => ({ uTime: { value: 0 }, uNight: { value: 0 }, uGlow: { value: 0 }, uSpa: { value: 0 }, uChurn: { value: 0 }, uBub: { value: 0 }, uN: { value: 1 }, uShow: { value: 1 },
      uDeep: { value: new T.Color('#0f4f66') }, uShallow: { value: new T.Color('#4fb3bf') }, uSky: { value: new T.Color('#cfe3f2') }, uCols: { value: cols.map((c) => c.clone()) }, uLights: { value: lights.map((v) => v.clone()) } });
    this.water = new T.ShaderMaterial({ uniforms: wu(), vertexShader: WATER_VS, fragmentShader: WATER_FS, transparent: true });
    const wg = new T.ShapeGeometry(this._shape(P.outline), 24); wg.rotateX(-Math.PI / 2);
    const wm = new T.Mesh(wg, this.water); wm.position.y = P.water; wm.renderOrder = 2; S.add(wm);

    // spa: raised travertine box with basin + water
    const sp = P.spa, i = sp.inset;
    const outer = [[sp.x0, sp.z0], [sp.x1, sp.z0], [sp.x1, sp.z1], [sp.x0, sp.z1]];
    const inner = [[sp.x0 + i, sp.z0 + i], [sp.x1 - i, sp.z0 + i], [sp.x1 - i, sp.z1 - i], [sp.x0 + i, sp.z1 - i]];
    const spaWall = this._slab(this._shape(outer, [inner]), -0.9, sp.top, [trav, travSide]); spaWall.castShadow = true; S.add(spaWall);
    S.add(this._slab(this._shape(inner), -0.5, sp.top, plaster));
    // spillover notch (a slightly lower lip on the pool-facing side)
    this._box(0.34, 0.02, P.spill.z1 - P.spill.z0, sp.x0 + 0.15, sp.top - 0.07, (P.spill.z0 + P.spill.z1) / 2, this._mat(0xcfc3ad), false);
    this.spaWater = new T.ShaderMaterial({ uniforms: wu(), vertexShader: WATER_VS, fragmentShader: WATER_FS, transparent: true });
    this.spaWater.uniforms.uSpa.value = 1; this.spaWater.uniforms.uLights.value[0].set(P.spaLight[0], P.spaLight[1]);
    for (let k = 1; k < 7; k++) this.spaWater.uniforms.uLights.value[k].set(99, 99);
    const sg = new T.ShapeGeometry(this._shape(inner)); sg.rotateX(-Math.PI / 2);
    const sm = new T.Mesh(sg, this.spaWater); sm.position.y = sp.water; sm.renderOrder = 2; S.add(sm);

    // raised back wall, pedestals, fire bowls
    const W = P.wall;
    this._box(W.x1 - W.x0, W.h, W.z1 - W.z0, (W.x0 + W.x1) / 2, 0.02, (W.z0 + W.z1) / 2, trav);
    const bowlMat = this._mat(0x3b3029, { r: 0.45, m: 0.55 });
    const lava = this._mat(0x1c1a19, { r: 1 });
    this.flames = [];
    P.fire.forEach(([x, z], k) => {
      this._box(0.8, 0.8, 0.8, x, 0.02, z, trav);
      const prof = [[0.0, 0], [0.22, 0.0], [0.34, 0.06], [0.42, 0.2], [0.44, 0.27], [0.4, 0.27], [0.3, 0.2]].map(([a, b]) => new T.Vector2(a, b));
      const bowl = new T.Mesh(new T.LatheGeometry(prof, 36), bowlMat); bowl.position.set(x, 0.82, z); bowl.castShadow = true; S.add(bowl);
      const rocks = new T.Mesh(new T.CylinderGeometry(0.34, 0.3, 0.05, 28), lava); rocks.position.set(x, 1.04, z); S.add(rocks);
      const fm = new T.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uOn: { value: 0 }, uSeed: { value: k * 0.37 } }, vertexShader: SHEET_VS, fragmentShader: FLAME_FS,
        transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide });
      const fl = new T.Mesh(new T.PlaneGeometry(1.0, 1.45), fm); fl.position.set(x, 1.72, z); fl.renderOrder = 5; S.add(fl);
      const fl2 = fl.clone(); fl2.material = fm.clone(); fl2.material.uniforms.uSeed.value = k * 0.37 + 0.5; fl2.scale.set(0.75, 0.8, 1); fl2.position.y = 1.62; S.add(fl2);
      this.flames.push(fl, fl2);
    });

    // water sheets: sheer descent (wall → pool) and spillover (spa → pool)
    const sheetMat = () => new T.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uOn: { value: 0 }, uCol: { value: new T.Color('#eaf8ff') } },
      vertexShader: SHEET_VS, fragmentShader: SHEET_FS, transparent: true, depthWrite: false, side: T.DoubleSide });
    const curve = (fn, width, segs = 14) => {
      const g = new T.PlaneGeometry(1, 1, 1, segs); const pos = g.attributes.position; const uv = g.attributes.uv;
      for (let k = 0; k < pos.count; k++) { const u = uv.getX(k), v = 1 - uv.getY(k); const p = fn(u, v, width); pos.setXYZ(k, p[0], p[1], p[2]); uv.setXY(k, u, v); }
      g.computeVertexNormals(); return g;
    };
    const sh = P.sheer; this.sheerMat = sheetMat();
    const sheer = new T.Mesh(curve((u, v, w) => [sh.x - w / 2 + u * w, W.h - 0.02 - v * (W.h + 0.12), W.z1 + 0.02 + 0.45 * Math.pow(v, 0.6)], sh.w), this.sheerMat);
    sheer.renderOrder = 4; S.add(sheer);
    this.spillMat = sheetMat();
    const spill = new T.Mesh(curve((u, v, w) => [sp.x0 - 0.02 - 0.32 * Math.pow(v, 0.7), sp.top - 0.07 - v * (sp.top - 0.07 - P.water), P.spill.z0 + u * w], P.spill.z1 - P.spill.z0), this.spillMat);
    spill.renderOrder = 4; S.add(spill);

    // particles: spa bubbles, sun-shelf bubblers, steam
    const pts = (n, spread, mode, col, size, rise, soft) => {
      const g = new T.BufferGeometry(); const p = new Float32Array(n * 3); const s = new Float32Array(n * 4);
      for (let k = 0; k < n; k++) { const [cx, cy, cz, rx, rz] = spread(k); p.set([cx + (Math.random() - 0.5) * rx, cy, cz + (Math.random() - 0.5) * rz], k * 3); s.set([Math.random(), Math.random(), Math.random(), Math.random()], k * 4); }
      g.setAttribute('position', new T.BufferAttribute(p, 3)); g.setAttribute('aSeed', new T.BufferAttribute(s, 4));
      const m = new T.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uOn: { value: 0 }, uSize: { value: size }, uRise: { value: rise }, uMode: { value: mode }, uMax: { value: mode === 2 ? 120 : (mode === 1 ? 4.5 : 3.2) }, uCol: { value: new T.Color(col) }, uSoft: { value: soft ? 1 : 0 } },
        vertexShader: PTS_VS, fragmentShader: PTS_FS, transparent: true, depthWrite: false });
      const o = new T.Points(g, m); o.renderOrder = 6; o.frustumCulled = false; S.add(o); return m;
    };
    const cx = (sp.x0 + sp.x1) / 2, cz = (sp.z0 + sp.z1) / 2, iw = sp.x1 - sp.x0 - 2 * i - 0.2;
    this.bubMat = pts(90, () => [cx, sp.water - 0.35, cz, iw, iw], 0, '#ffffff', 0.6, 0.36, false);
    this.bublrMat = pts(90, (k) => { const b = P.bubblers[k % 2]; return [b[0], P.water, b[1], 0.12, 0.12]; }, 1, '#f4fbff', 1.0, 0.35, false);
    this.steamMat = pts(70, () => [cx, sp.water + 0.02, cz, iw, iw], 2, '#ffffff', 16, 1.2, true);

    // speakers + sound rings
    this.rings = [];
    P.speakers.forEach(([x, z]) => {
      const spk = new T.Mesh(new T.CylinderGeometry(0.17, 0.2, 0.42, 20), dark); spk.position.set(x, 0.21, z); spk.castShadow = true; S.add(spk);
      for (let k = 0; k < 3; k++) {
        const r = new T.Mesh(new T.RingGeometry(0.3, 0.34, 48), new T.MeshBasicMaterial({ color: 0x9fe870, transparent: true, opacity: 0, depthWrite: false, side: T.DoubleSide }));
        r.rotation.x = -Math.PI / 2; r.position.set(x, 0.05, z); r.userData.k = k; S.add(r); this.rings.push(r);
      }
    });

    // white brick wall along the left side, with pillars
    this._box(0.34, 1.75, 17.4, -11.2, -0.03, 1.4, white);
    for (let z = -7.2; z <= 10.0; z += 3.44) this._box(0.58, 2.02, 0.58, -11.2, -0.03, z, white);
    // shrubs & grasses
    const bush = (x, z, r, m = foliage) => { const b = new T.Mesh(new T.SphereGeometry(r, 18, 12), m); b.position.set(x, r * 0.72, z); b.scale.y = 0.85; b.castShadow = true; S.add(b); };
    for (let z = -6.6; z <= 8.2; z += 1.35) bush(-10.25, z, 0.32 + Math.abs((z * 7) % 3) * 0.03);
    [[-3.6, -5.4, 0.5], [-2.2, -5.7, 0.42], [-0.5, -5.5, 0.55], [1.4, -5.8, 0.45], [4.6, -5.5, 0.5], [6.2, -5.9, 0.44], [8.0, -5.6, 0.5]].forEach(([x, z, r], k) => bush(x, z, r, k % 2 ? foliage : foliage2));
    const grassM = this._mat(0xb6b08a, { r: 1 });
    [[2.8, -5.2], [5.6, -4.95], [7.3, -5.0], [-1.4, -5.0]].forEach(([x, z]) => { const g = new T.Mesh(new T.ConeGeometry(0.35, 0.8, 10), grassM); g.position.set(x, 0.4, z); g.castShadow = true; S.add(g); });
    // trees in the far corner (soft, stylised)

    // furniture: sun-shelf loungers (in water), deck chaises, adirondacks, umbrella
    const lounger = (x, z, rot, m, y = 0.02) => {
      const g = new T.Group();
      const base = new T.Mesh(new T.BoxGeometry(1.9, 0.12, 0.62), m); base.position.y = 0.18; g.add(base);
      const back = new T.Mesh(new T.BoxGeometry(0.7, 0.1, 0.62), m); back.position.set(-0.78, 0.38, 0); back.rotation.z = -0.55; g.add(back);
      g.traverse((o) => { o.castShadow = true; }); g.position.set(x, y, z); g.rotation.y = rot; S.add(g);
    };
    lounger(-3.4, 5.0, 0.2, white, P.water - 0.12); lounger(-1.9, 5.3, -0.15, white, P.water - 0.12);
    lounger(-8.6, -2.4, Math.PI / 2, white); lounger(-8.6, -0.9, Math.PI / 2, white);
    const adk = (x, z, rot) => { const g = new T.Group(); const s = new T.Mesh(new T.BoxGeometry(0.75, 0.1, 0.75), dark); s.position.y = 0.38; g.add(s);
      const b = new T.Mesh(new T.BoxGeometry(0.75, 0.8, 0.08), dark); b.position.set(0, 0.72, -0.38); b.rotation.x = -0.3; g.add(b);
      g.traverse((o) => { o.castShadow = true; }); g.position.set(x, 0.02, z); g.rotation.y = rot; S.add(g); };
    adk(6.0, 5.4, Math.PI + 0.2); adk(7.4, 5.4, Math.PI - 0.1); adk(-8.3, 1.8, Math.PI / 2 + 0.2);
    const um = new T.Mesh(new T.CylinderGeometry(0.05, 0.16, 2.3, 12), dark); um.position.set(-8.5, 1.17, -3.7); um.castShadow = true; S.add(um);

    if (this._terrace) this._terrace();
    // everything static casts/receives once
    S.traverse((o) => { if (o.isMesh && !o.material.isShaderMaterial && o.material.side !== T.BackSide) o.receiveShadow = true; });
    this.groundMats = { lawn, trav };
  }

  _input() {
    const c = this.canvas; const ptrs = new Map(); let last = null, hist = [];
    const setGoalNow = () => { Object.assign(this.goal, this.cam); for (const k in this.vel) this.vel[k] = 0; };
    c.addEventListener('pointerdown', (e) => { c.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); last = null; hist = []; this.dragging = true; setGoalNow(); this._kick(); });
    c.addEventListener('pointermove', (e) => {
      if (!ptrs.has(e.pointerId)) return; const prev = ptrs.get(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptrs.size === 1) {
        const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
        this.cam.az -= dx * 0.0065; this.cam.pol = clamp(this.cam.pol - dy * 0.005, 0.03, 1.52);
        hist.push({ t: performance.now(), az: this.cam.az, pol: this.cam.pol }); if (hist.length > 6) hist.shift();
      } else if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (last) this.cam.r = clamp(this.cam.r * (last / d), 7, 50); last = d;
      }
      setGoalNow(); this._kick();
    });
    const up = (e) => {
      ptrs.delete(e.pointerId); if (ptrs.size) return; this.dragging = false; last = null;
      if (hist.length > 1) {
        const a = hist[0], b = hist[hist.length - 1]; const dt = Math.max(16, b.t - a.t) / 1000;
        const vaz = (b.az - a.az) / dt, vpol = (b.pol - a.pol) / dt;
        if (performance.now() - b.t < 80) {
          this.vel.az = vaz; this.vel.pol = vpol;
          this.goal.az = this.cam.az + vaz * 0.32; this.goal.pol = clamp(this.cam.pol + vpol * 0.25, 0.03, 1.52);
        }
      }
      this._kick();
    };
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
    c.addEventListener('wheel', (e) => { e.preventDefault(); this.goal.r = clamp(this.goal.r * (1 + e.deltaY * 0.0012), 7, 50); this._kick(); }, { passive: false });
    c.addEventListener('dblclick', () => this.view('overview'));
  }
  view(name) {
    const v = VIEWS[name] || VIEWS.overview;
    // take the shortest way round
    let az = v.az; while (az - this.cam.az > Math.PI) az -= Math.PI * 2; while (az - this.cam.az < -Math.PI) az += Math.PI * 2;
    Object.assign(this.goal, v, { az }); this._kick();
  }
  setTheme(dark) { this.dark = dark; this._applyState(true); }
  setState(s) { this.st = s || {}; if (this.ready) this._applyState(); this._kick(); }
  _applyState(force) {
    if (!this.ready) return; const T = this.T; const s = this.st;
    const cols = (s.lightColors && s.lightColors.length ? s.lightColors : ['#dfeeff']).slice(0, 4);
    this.water.uniforms.uN.value = cols.length;
    cols.forEach((c, k) => this.water.uniforms.uCols.value[k].set(c));
    this.spaWater.uniforms.uN.value = cols.length; cols.forEach((c, k) => this.spaWater.uniforms.uCols.value[k].set(c));
    const night = !!s.night;
    if (force || this._night !== night || this._darkApplied !== this.dark) {
      this._night = night; this._darkApplied = this.dark;
      this.hemi.color.set(night ? 0x2a3a5c : 0xdfe9f5); this.hemi.groundColor.set(night ? 0x0d1016 : 0x5d6b4f); this.hemi.intensity = night ? 0.55 : 1.6;
      this.sun.color.set(night ? 0x9fb4e0 : 0xfff4e6); this.sun.intensity = night ? 0.45 : 2.6;
      this.sun.position.set(night ? 13 : -11, 22, night ? -8 : 12);
      this.renderer.toneMappingExposure = night ? 1.05 : (this.dark ? 0.92 : 1.0);
      for (const m of [this.water, this.spaWater]) {
        m.uniforms.uSky.value.set(night ? '#1a2638' : (this.dark ? '#aac3d6' : '#d7e8f4'));
        m.uniforms.uDeep.value.set(night ? '#06212e' : '#0f4f66'); m.uniforms.uShallow.value.set(night ? '#1a4c57' : '#4fb3bf');
      }
      if (this._terrNight) this._terrNight(night);
      this.renderer.shadowMap.needsUpdate = true;
    }
  }
  resize() {
    if (!this.renderer) return; const r = this.host.getBoundingClientRect(); if (!r.width || !r.height) return;
    this.renderer.setSize(r.width, r.height, false); this.camera.aspect = r.width / r.height; this.camera.updateProjectionMatrix(); this._kick();
  }
  setActive(on) { this.active = on; this._loop(); }
  _kick() { this._idleUntil = performance.now() + 1500; this._loop(); }
  _loop() {
    const run = this.ready && this.active && this.visible !== false && !document.hidden;
    if (!run) { cancelAnimationFrame(this._raf); this._raf = null; this._last = null; return; }
    if (this._raf) return;
    const step = (now) => {
      this._raf = null;
      if (!(this.ready && this.active && this.visible !== false && !document.hidden)) return;
      this._raf = requestAnimationFrame(step);
      if (this._last && now - this._last < 1000 / this.fps - 2) return;
      const dt = Math.min(0.05, this._last ? (now - this._last) / 1000 : 0.016); this._last = now;
      this._frame(dt, now / 1000);
    };
    this._raf = requestAnimationFrame(step);
  }
  _spring(dt) {
    // critically damped spring toward goal (response ≈ .55s), velocity carried from gestures
    const resp = 0.55, k = Math.pow((2 * Math.PI) / resp, 2), c = (4 * Math.PI) / resp;
    for (const key of ['r', 'pol', 'az', 'tx', 'ty', 'tz']) {
      if (this.dragging && (key === 'az' || key === 'pol' || key === 'r')) continue;
      const x = this.cam[key] - this.goal[key]; const v = this.vel[key];
      const a = -k * x - c * v; this.vel[key] = v + a * dt; this.cam[key] += this.vel[key] * dt;
    }
  }
  _frame(dt, t) {
    const s = this.st; const F = this.fade; const ease = (k, on, sp = 2.2) => { F[k] += ((on ? 1 : 0) - F[k]) * Math.min(1, dt * sp); return F[k]; };
    this._spring(dt);
    const C = this.cam; const cam = this.camera;
    const aspectBoost = Math.max(1, 1.15 / Math.max(0.4, cam.aspect));
    const r = C.r * aspectBoost;
    // low eye-level views keep their height when a narrow frame pushes the camera back
    const fl = clamp((C.pol - 1.2) / 0.2, 0, 1); const ry = r * (1 - fl) + C.r * fl;
    cam.position.set(C.tx + r * Math.sin(C.pol) * Math.sin(C.az), C.ty + ry * Math.cos(C.pol), C.tz + r * Math.sin(C.pol) * Math.cos(C.az));
    cam.lookAt(C.tx, C.ty, C.tz);

    const glow = ease('glow', s.light, 2.5); const fire = ease('fire', s.fire, 1.6);
    const U = this.water.uniforms, SU = this.spaWater.uniforms;
    U.uTime.value = t; SU.uTime.value = t;
    U.uGlow.value = glow; SU.uGlow.value = glow;
    U.uNight.value = SU.uNight.value = ease('night', s.night, 1.2);
    SU.uChurn.value = ease('churn', s.spaJets, 1.5); SU.uBub.value = ease('blower', s.blower, 1.5);
    this.spaGlow.intensity = glow * (s.night ? 2.2 : 0.8);
    this.spaGlow.color.set((s.lightColors && s.lightColors[0]) || '#9fe8ff');
    // fire
    this.flames.forEach((f, k) => {
      f.material.uniforms.uTime.value = t; f.material.uniforms.uOn.value = fire; f.visible = fire > 0.01;
      f.rotation.y = Math.atan2(cam.position.x - f.position.x, cam.position.z - f.position.z);
    });
    this.fireLights.forEach((l, k) => { l.intensity = fire * (s.night ? 14 : 4) * (0.85 + 0.15 * Math.sin(t * 13 + k * 3) * Math.sin(t * 7.3 + k)); });
    // sheets
    this.sheerMat.uniforms.uTime.value = t; this.sheerMat.uniforms.uOn.value = ease('sheer', s.sheer, 2);
    this.spillMat.uniforms.uTime.value = t; this.spillMat.uniforms.uOn.value = ease('spill', s.spill, 2);
    // particles
    this.bubMat.uniforms.uTime.value = t; this.bubMat.uniforms.uOn.value = ease('bub', s.blower || s.spaJets, 2) * (s.blower ? 1 : 0.35);
    this.bublrMat.uniforms.uTime.value = t; this.bublrMat.uniforms.uOn.value = ease('bubblers', s.bubblers, 2);
    const steamy = s.spaHeat && (s.spaTemp == null || s.spaTemp >= 88) && (s.air == null || s.air < (s.spaTemp || 100) - 10);
    this.steamMat.uniforms.uTime.value = t; this.steamMat.uniforms.uOn.value = ease('steam', steamy, 0.8) * (s.night ? 0.9 : 0.6);
    // speaker rings
    const mus = ease('music', s.music, 2);
    this.rings.forEach((rg) => { const ph = ((t * 0.55) + rg.userData.k / 3) % 1; rg.scale.setScalar(1 + ph * 5); rg.material.opacity = mus * (1 - ph) * 0.55; rg.visible = mus > 0.01; });

    if (this._terrFrame) this._terrFrame(dt, t);
    this.renderer.render(this.scene, cam);
    this._labels();
  }
  _labels() {
    const s = this.st; const T = this.T; const cam = this.camera;
    const W = this.host.clientWidth, H = this.host.clientHeight;
    const want = [
      { k: 'pool', p: [-2.2, 0.35, -0.6], html: `${icon('pool')}Pool ${s.poolTemp != null ? Math.round(s.poolTemp) + '°' : '—'}`, cls: '' },
      { k: 'spa', p: [6.8, 1.5, 2.25], html: `${icon('spa')}Spa ${s.spaTemp != null ? Math.round(s.spaTemp) + '°' : '—'}`, cls: s.spaHeat ? 'hot' : '' },
    ];
    const roomy = W > 520;
    if (s.fire && roomy) want.push({ k: 'fire', p: [POOL.fire[1][0], 2.2, POOL.fire[1][1]], html: `${icon('flame')}Fire`, cls: 'hot' });
    if (s.sheer && roomy) want.push({ k: 'sheer', p: [POOL.sheer.x, 1.2, -4.0], html: `${icon('sheer')}Sheer Descent`, cls: 'cool' });
    if (s.spill && roomy) want.push({ k: 'spill', p: [4.3, 0.2, 3.3], html: `${icon('spill')}Spillover`, cls: 'cool' });
    if (this._terrTags) this._terrTags(want, roomy);
    if (s.music && roomy) want.push({ k: 'music', p: [POOL.speakers[0][0], 1.0, -1.2], html: `${icon('music')}Playing`, cls: '' });
    this._tags = this._tags || {};
    const seen = new Set();
    const v = new T.Vector3();
    for (const w of want) {
      seen.add(w.k);
      let el = this._tags[w.k];
      if (!el) { el = this._tags[w.k] = document.createElement('div'); el.className = 'tag'; this.lbls.appendChild(el); }
      if (el._h !== w.html) { el.innerHTML = w.html; el._h = w.html; }
      if (el._c !== w.cls) { el.className = 'tag ' + w.cls; el._c = w.cls; }
      v.set(...w.p).project(cam);
      const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
      const vis = v.z < 1 && x > 50 && x < W - 50 && y > 100 && y < H - 70;
      el.style.opacity = vis ? '1' : '0';
      el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-100%)`;
    }
    for (const k in this._tags) if (!seen.has(k)) { this._tags[k].remove(); delete this._tags[k]; }
  }
  dispose() {
    this.active = false; cancelAnimationFrame(this._raf);
    this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); document.removeEventListener('visibilitychange', this._vis);
    if (this.renderer) { this.scene.traverse((o) => { o.geometry && o.geometry.dispose(); }); this.renderer.dispose(); this.renderer.forceContextLoss && this.renderer.forceContextLoss(); }
    this.canvas && this.canvas.remove();
  }
}
/* ───────────────────────── Covered terrace (right of the spa, against the house) ─────────────────────────
 * Same world frame as the pool: x toward the grill wing, z toward the house, y up.
 * Built from Owen's photos: hip-roofed seating bay (stone fireplace + TV, fan, cans, heaters),
 * dining bay under the chandelier, grill island along the house wing.
 */
const TERR = {
  xa: 9.0, xb: 15.0, zf: -3.4, zm: 3.0, zh: 8.3,
  frame: { x0: 8.72, x1: 15.28, z0: -3.72, z1: 8.6, y0: 2.85, y1: 3.35 },
  trays: [[9.2, -3.2, 14.8, 2.78], [9.2, 3.22, 14.8, 8.3]],
  ceil: 3.3,
  roof: { x0: 8.55, x1: 15.45, z0: -3.9, z1: 8.6, eave: 3.35, ridge: 5.05 },
  cans: [[10.1, -1.9], [13.9, -1.9], [10.1, 0.1], [13.9, 0.1], [10.1, 2.0], [13.9, 2.0], [10.2, 4.25], [13.8, 4.25], [10.2, 7.6], [13.8, 7.6]],
  heaters: [[12, -1.9], [12, 2.0], [12, 4.2]],
  speakers: [[10.95, -0.95], [13.05, -0.95]],
  fan: [12, 0.1], chand: [12, 5.95], tv: [12, -3.04],
};
const POOLSPOT_FS = `
uniform float uOn; uniform vec3 uCol; varying vec2 vUv;
void main(){ float d = length(vUv - 0.5) * 2.0; float a = pow(max(0.0, 1.0 - d), 2.2) * uOn;
  gl_FragColor = vec4(uCol * a, a);
  #include <colorspace_fragment>
}`;
const BEAM_VS = `varying float vH; varying float vF; uniform float uY0, uY1;
void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vH = clamp((wp.y - uY0) / (uY1 - uY0), 0.0, 1.0);
  vec3 n = normalize(mat3(modelMatrix) * normal); vF = abs(dot(n, normalize(cameraPosition - wp.xyz)));
  gl_Position = projectionMatrix * viewMatrix * wp; }`;
const BEAM_FS = `uniform float uOn; uniform vec3 uCol; varying float vH; varying float vF;
void main(){ float a = uOn * pow(vH, 1.6) * pow(vF, 1.5) * 0.16; gl_FragColor = vec4(uCol * a, a);
  #include <colorspace_fragment>
}`;
const TV_FS = `uniform float uOn, uTime, uTex; uniform sampler2D tMap; uniform vec2 uCover; varying vec2 vUv;
void main(){
  vec3 off = vec3(0.012, 0.014, 0.018) + vec3(0.05, 0.06, 0.07) * smoothstep(0.35, 1.0, vUv.y - vUv.x * 0.25);
  vec3 a = mix(vec3(0.05, 0.10, 0.32), vec3(0.36, 0.14, 0.46), 0.5 + 0.5 * sin(uTime * 0.23 + vUv.x * 2.4));
  a = mix(a, vec3(0.06, 0.38, 0.52), 0.5 + 0.5 * sin(uTime * 0.17 - vUv.y * 2.8 + 1.3));
  vec3 on = a * (0.85 + 0.25 * vUv.y);
  if (uTex > 0.5) on = texture2D(tMap, (vUv - 0.5) * uCover + 0.5).rgb;
  gl_FragColor = vec4(mix(off, on, uOn), 1.0);
  #include <colorspace_fragment>
}`;

Object.assign(LuxPool3D.prototype, {
  _terrace() {
    const T = this.T; const S = this.scene; const X = TERR;
    const M = (c, o) => this._mat(c, o);
    const white = M(0xf4f2ed, { r: 0.85 }), brick = M(0xeeeae2, { r: 0.97 }), stone = M(0xa99f90, { r: 1 });
    const blue = M(0x7b8187, { r: 0.9 }), dark = M(0x1b1c1f, { r: 0.55 }), bronze = M(0x2b2724, { r: 0.45, m: 0.45 });
    const wood = M(0xbab3a7, { r: 0.9 }), cush = M(0xf2efe8, { r: 1 }), pillow = M(0xa5967e, { r: 1 });
    const steel = M(0xc9ccd0, { r: 0.28, m: 0.9 }), granite = M(0x8f8b85, { r: 0.6 }), black = M(0x131314, { r: 0.35 });
    const glass = this.tGlass = M(0x1e2a33, { r: 0.12, m: 0.4, x: { emissive: new T.Color(0xffc98a), emissiveIntensity: 0 } });
    // materials that fade out when looking down into the terrace
    const fm = (c, o = {}) => { const m = M(c, { ...o, x: { transparent: true, side: T.DoubleSide, ...(o.x || {}) } }); this.tFade.push(m); return m; };
    this.tFade = [];
    const roofM = fm(0x4a4e55, { r: 0.8 }), ceilM = this.tCeil = fm(0x6e4327, { r: 0.7, x: { emissive: new T.Color(0x8a4a1e), emissiveIntensity: 0 } }), heatM = fm(0x9ea3a8, { r: 0.4, m: 0.6 }), grilleM = fm(0xefece6, { r: 0.9 });
    const canM = this.tCanMat = fm(0xe9e6df, { r: 0.6, x: { emissive: new T.Color(0xffefd6), emissiveIntensity: 0 } });

    // batched static boxes → one mesh per material
    const B = new Map(); const mtx = new T.Matrix4(); const q = new T.Quaternion(); const e = new T.Euler(); const one = new T.Vector3(1, 1, 1);
    const place = (x, y, z, ry = 0) => mtx.clone().compose(new T.Vector3(x, y, z), q.clone().setFromEuler(e.set(0, ry, 0)), one);
    const put = (mat, g) => { if (!B.has(mat)) B.set(mat, []); B.get(mat).push(g.index ? g.toNonIndexed() : g); };
    const bx = (mat, w, hh, d, x, y, z, P = null, rx = 0, rz = 0) => {
      const g = new T.BoxGeometry(w, hh, d); if (rx || rz) g.applyMatrix4(new T.Matrix4().makeRotationFromEuler(new T.Euler(rx, 0, rz)));
      g.translate(x, y + hh / 2, z); if (P) g.applyMatrix4(P); put(mat, g);
    };
    const flush = () => {
      for (const [mat, gs] of B) {
        let n = 0; gs.forEach((g) => { n += g.attributes.position.count; });
        const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3); let o = 0;
        gs.forEach((g) => { pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; g.dispose(); });
        const G = new T.BufferGeometry(); G.setAttribute('position', new T.BufferAttribute(pos, 3)); G.setAttribute('normal', new T.BufferAttribute(nor, 3));
        const m = new T.Mesh(G, mat); m.castShadow = !mat.transparent || mat === roofM; m.receiveShadow = true; S.add(m);
      }
      B.clear();
    };

    // ── columns (square, with plinth + capital)
    const col = (x, z, w = 0.34) => { bx(white, w + 0.14, 0.24, w + 0.14, x, 0.02, z); bx(white, w, X.frame.y0 - 0.34, w, x, 0.26, z); bx(white, w + 0.1, 0.1, w + 0.1, x, X.frame.y0 - 0.1, z); };
    [[X.xa, X.zf, 0.44], [X.xb, X.zf, 0.44], [X.xa, 2.75], [X.xa, 3.25], [X.xb, 2.75], [X.xb, 3.25], [X.xa, X.zh], [X.xb, X.zh]].forEach(([x, z, w]) => col(x, z, w));
    // ── entablature: a white frame slab with the two tray ceilings cut out, crown lip on top
    const F = X.frame;
    const frame = this._slab(this._shape([[F.x0, F.z0], [F.x1, F.z0], [F.x1, F.z1], [F.x0, F.z1]], X.trays.map(([a, b, c, d]) => [[a, b], [c, b], [c, d], [a, d]])), F.y0, F.y1, [white, white]);
    frame.castShadow = true; S.add(frame);
    bx(white, F.x1 - F.x0 + 0.16, 0.07, 0.16, (F.x0 + F.x1) / 2, F.y1 - 0.07, F.z0);
    bx(white, 0.16, 0.07, F.z1 - F.z0, F.x0, F.y1 - 0.07, (F.z0 + F.z1) / 2); bx(white, 0.16, 0.07, F.z1 - F.z0, F.x1, F.y1 - 0.07, (F.z0 + F.z1) / 2);
    // tray ceilings (stained tongue-and-groove, seen from below)
    X.trays.forEach(([a, b, c, d]) => {
      const g = new T.PlaneGeometry(c - a, d - b); g.rotateX(Math.PI / 2); g.translate((a + c) / 2, X.ceil + 0.02, (b + d) / 2); put(ceilM, g);
      for (let x = a + 0.12; x < c; x += 0.24) bx(ceilM, 0.012, 0.012, d - b, x, X.ceil + 0.005, (b + d) / 2);
    });
    // ceiling fixtures: cans, heaters, speaker grilles
    X.cans.forEach(([x, z]) => { const g = new T.CylinderGeometry(0.1, 0.1, 0.02, 18); g.translate(x, X.ceil - 0.005, z); put(canM, g); });
    X.heaters.forEach(([x, z]) => bx(heatM, 1.25, 0.05, 0.3, x, X.ceil - 0.05, z));
    X.speakers.forEach(([x, z]) => { const g = new T.CylinderGeometry(0.13, 0.13, 0.015, 22); g.translate(x, X.ceil - 0.005, z); put(grilleM, g); });

    // ── hip roof + chimney
    const R = X.roof; const hx = (R.x1 - R.x0) / 2, xc = (R.x0 + R.x1) / 2;
    const A = [R.x0, R.eave, R.z0], Bp = [R.x1, R.eave, R.z0], C = [R.x1, R.eave, R.z1], D = [R.x0, R.eave, R.z1];
    const ra = [xc, R.ridge, R.z0 + hx], rb = [xc, R.ridge, R.z1 - hx];
    const tri = [A, D, rb, A, rb, ra, C, Bp, ra, C, ra, rb, Bp, A, ra, D, C, rb].flat();
    const rg = new T.BufferGeometry(); rg.setAttribute('position', new T.BufferAttribute(new Float32Array(tri), 3)); rg.computeVertexNormals(); put(roofM, rg);
    const fas = M(0x2f3236, { r: 0.7 }); // fascia / gutter line around the eave
    bx(fas, R.x1 - R.x0, 0.12, 0.1, xc, R.eave - 0.06, R.z0); bx(fas, 0.1, 0.12, R.z1 - R.z0, R.x0, R.eave - 0.06, (R.z0 + R.z1) / 2); bx(fas, 0.1, 0.12, R.z1 - R.z0, R.x1, R.eave - 0.06, (R.z0 + R.z1) / 2);
    // stone fireplace + chimney
    bx(stone, 2.6, F.y1, 0.9, 12, 0.02, -3.55);
    bx(stone, 1.45, R.ridge + 0.75 - F.y1, 0.75, 12, F.y1, -3.62);
    bx(black, 1.1, 0.82, 0.08, 12, 0.36, -3.09); // firebox
    bx(blue, 2.7, 0.34, 0.5, 12, 0.02, -2.9); // hearth ledge
    bx(blue, 2.25, 0.11, 0.3, 12, 1.42, -2.98); // mantel
    bx(dark, 1.5, 0.87, 0.06, 12, 1.68, -3.07); // TV bezel
    this.tvMat = new T.ShaderMaterial({ uniforms: { uOn: { value: 0 }, uTime: { value: 0 }, uTex: { value: 0 }, tMap: { value: null }, uCover: { value: new T.Vector2(1, 1) } }, vertexShader: SHEET_VS, fragmentShader: TV_FS });
    const tv = new T.Mesh(new T.PlaneGeometry(1.44, 0.81), this.tvMat); tv.position.set(12, 2.115, -3.035); S.add(tv);

    // ── house: wing wall (full height, windows) + section-cut wall with the French doors
    const WX = 17.35;
    bx(brick, 0.3, 3.5, 10.4, WX, -0.03, 3.7); bx(white, 0.42, 0.1, 10.5, WX, 3.45, 3.7);
    [0.3, 3.1, 5.9].forEach((z) => {
      bx(white, 0.05, 1.86, 1.28, WX - 0.16, 0.9, z);
      const g = new T.PlaneGeometry(1.1, 1.68); g.rotateY(-Math.PI / 2); g.translate(WX - 0.195, 1.83, z); put(glass, g);
      bx(white, 0.04, 1.68, 0.05, WX - 0.2, 0.99, z); bx(white, 0.04, 0.05, 1.1, WX - 0.2, 1.8, z);
    });
    bx(brick, 11.1 - 8.6, 1.1, 0.3, (8.6 + 11.1) / 2, -0.03, 8.75); bx(brick, 17.5 - 12.9, 1.1, 0.3, (12.9 + 17.5) / 2, -0.03, 8.75);
    bx(white, 11.1 - 8.6, 0.05, 0.36, (8.6 + 11.1) / 2, 1.07, 8.75); bx(white, 17.5 - 12.9, 0.05, 0.36, (12.9 + 17.5) / 2, 1.07, 8.75);
    bx(M(0x5b3a26, { r: 0.6 }), 0.08, 1.05, 0.3, 11.14, 0.02, 8.75); bx(M(0x5b3a26, { r: 0.6 }), 0.08, 1.05, 0.3, 12.86, 0.02, 8.75);
    bx(blue, 1.9, 0.1, 0.5, 12, 0.0, 8.55); // threshold

    // ── seating: sofa facing the fireplace, two lounge chairs, coffee table, console
    const chair = (P, w) => {
      bx(wood, w, 0.3, 0.92, 0, 0.08, 0, P); bx(wood, 0.1, 0.62, 0.92, -w / 2 + 0.05, 0.02, 0, P); bx(wood, 0.1, 0.62, 0.92, w / 2 - 0.05, 0.02, 0, P);
      bx(wood, w, 0.62, 0.1, 0, 0.02, 0.41, P); bx(cush, w - 0.24, 0.14, 0.78, 0, 0.38, -0.04, P); bx(cush, w - 0.24, 0.4, 0.16, 0, 0.5, 0.28, P);
    };
    const sofaP = place(12, 0, 1.55); chair(sofaP, 2.45);
    [[-0.7, 0.2], [0.7, -0.15], [0, 0.05]].forEach(([dx, r]) => bx(dx ? pillow : cush, 0.42, 0.34, 0.12, dx, 0.56, 0.2, sofaP, 0.25, r));
    chair(place(10.2, 0, -0.7, -Math.PI / 2), 0.95); chair(place(13.8, 0, -0.7, Math.PI / 2), 0.95);
    bx(wood, 1.3, 0.36, 0.78, 12, 0.02, -0.65); bx(wood, 2.1, 0.74, 0.34, 12, 0.02, 2.22);
    bx(M(0xc9772f, { r: 0.8 }), 0.14, 0.12, 0.14, 11.7, 0.76, 2.22); bx(M(0xc9772f, { r: 0.8 }), 0.12, 0.1, 0.12, 12.3, 0.76, 2.22); // copper lanterns

    // ── dining: black table, eight slat chairs
    const [tx, tz] = X.chand;
    bx(dark, 1.95, 0.06, 1.3, tx, 0.72, tz); bx(dark, 0.1, 0.7, 1.0, tx - 0.7, 0.02, tz); bx(dark, 0.1, 0.7, 1.0, tx + 0.7, 0.02, tz); bx(dark, 1.4, 0.08, 0.08, tx, 0.3, tz);
    const dchair = (P) => {
      bx(dark, 0.48, 0.05, 0.46, 0, 0.44, 0, P); bx(dark, 0.48, 0.58, 0.05, 0, 0.47, 0.21, P);
      [[-0.2, -0.19], [0.2, -0.19], [-0.2, 0.19], [0.2, 0.19]].forEach(([a, b]) => bx(dark, 0.05, 0.44, 0.05, a, 0.0, b, P));
    };
    [[-0.45, -1], [0.45, -1], [-0.45, 1], [0.45, 1]].forEach(([dx, s]) => dchair(place(tx + dx, 0.02, tz + s * 0.92, s < 0 ? Math.PI : 0)));
    [[-0.3, -1], [0.3, -1], [-0.3, 1], [0.3, 1]].forEach(([dz, s]) => dchair(place(tx + s * 1.3, 0.02, tz + dz, s * Math.PI / 2)));

    // ── grill island along the wing wall
    bx(brick, 0.9, 0.88, 3.4, 16.5, 0.02, 0.62); bx(granite, 0.98, 0.05, 3.48, 16.5, 0.9, 0.62);
    bx(steel, 0.7, 0.26, 1.1, 16.5, 0.95, 0.85); bx(steel, 0.02, 0.7, 0.9, 16.07, 0.12, 0.85);
    const hood = new T.CylinderGeometry(0.3, 0.3, 1.1, 20, 1, false, 0, Math.PI); hood.rotateX(Math.PI / 2); hood.rotateZ(Math.PI / 2); hood.translate(16.5, 1.21, 0.85); put(steel, hood);
    const egg = new T.SphereGeometry(0.34, 22, 16); egg.scale(1, 1.18, 1); egg.translate(16.5, 1.34, -0.55); put(black, egg);
    bx(black, 0.55, 0.36, 0.62, 16.5, 0.95, 2.0);
    // planter with red flowers by the fireplace column
    const pot = new T.CylinderGeometry(0.28, 0.22, 0.55, 20); pot.translate(8.72, 0.3, -3.95); put(white, pot);
    const fl = new T.SphereGeometry(0.34, 14, 10); fl.scale(1, 0.7, 1); fl.translate(8.72, 0.72, -3.95); put(M(0xc2334a, { r: 1 }), fl);
    flush();

    // ── moving / lit pieces
    // ceiling fan
    const fan = this.tFan = new T.Group(); fan.position.set(X.fan[0], X.ceil, X.fan[1]);
    const rod = new T.Mesh(new T.CylinderGeometry(0.025, 0.025, 0.4, 8), bronze); rod.position.y = -0.2; fan.add(rod);
    const hub = new T.Mesh(new T.CylinderGeometry(0.17, 0.14, 0.13, 20), bronze); hub.position.y = -0.46; fan.add(hub);
    const blades = this.tBlades = new T.Group(); blades.position.y = -0.47;
    for (let k = 0; k < 8; k++) { const b = new T.Mesh(new T.BoxGeometry(0.82, 0.014, 0.12), bronze); b.position.x = 0.55; b.rotation.x = 0.12; const arm = new T.Group(); arm.rotation.y = (k / 8) * Math.PI * 2; arm.add(b); blades.add(arm); }
    fan.add(blades); fan.traverse((o) => { if (o.isMesh) o.castShadow = true; }); S.add(fan);
    // chandelier: black rectangular lattice cage with Edison bulbs
    const ch = new T.Group(); ch.position.set(tx, 2.2, tz);
    const bar = (w, hh, d, x, y, z, rx = 0, rz = 0) => { const m = new T.Mesh(new T.BoxGeometry(w, hh, d), black); m.position.set(x, y, z); m.rotation.set(rx, 0, rz); ch.add(m); };
    const cw = 1.3, chh = 0.36, cd = 0.42, t2 = 0.018;
    [-1, 1].forEach((sy) => { [-1, 1].forEach((sz) => bar(cw, t2, t2, 0, sy * chh / 2, sz * cd / 2)); [-1, 1].forEach((sx) => bar(t2, t2, cd, sx * cw / 2, sy * chh / 2, 0)); });
    [-1, 1].forEach((sx) => [-1, 1].forEach((sz) => bar(t2, chh, t2, sx * cw / 2, 0, sz * cd / 2)));
    const dl = Math.hypot(cw / 4, chh); const da = Math.atan2(chh, cw / 4);
    [-1, 1].forEach((sz) => [-3, -1, 1, 3].forEach((k) => { bar(dl, 0.012, 0.012, (k * cw) / 8, 0, sz * cd / 2, 0, da); bar(dl, 0.012, 0.012, (k * cw) / 8, 0, sz * cd / 2, 0, -da); }));
    [-0.45, 0.45].forEach((x) => bar(0.012, X.ceil - 2.2 - chh / 2, 0.012, x, chh / 2 + (X.ceil - 2.2 - chh / 2) / 2, 0));
    this.tBulbMat = new T.MeshStandardMaterial({ color: 0xf6e7c8, roughness: 0.3, emissive: new T.Color(0xffb866), emissiveIntensity: 0 });
    [-0.5, -0.25, 0, 0.25, 0.5].forEach((x) => { const b = new T.Mesh(new T.SphereGeometry(0.05, 12, 10), this.tBulbMat); b.scale.y = 1.35; b.position.set(x, -0.02, 0); ch.add(b); });
    ch.traverse((o) => { if (o.isMesh) o.castShadow = true; }); S.add(ch);

    // light pools on the floor, and soft beams under each can
    const warm = new T.Color('#ffd7a3');
    const spotMat = () => new T.ShaderMaterial({ uniforms: { uOn: { value: 0 }, uCol: { value: warm.clone() } }, vertexShader: SHEET_VS, fragmentShader: POOLSPOT_FS,
      transparent: true, depthWrite: false, blending: T.AdditiveBlending });
    const pools = (pts, rad, y) => { const gs = pts.map(([x, z]) => { const g = new T.PlaneGeometry(rad * 2, rad * 2); g.rotateX(-Math.PI / 2); g.translate(x, y, z); return g.toNonIndexed(); });
      const G = new T.BufferGeometry(); const n = gs.reduce((a, g) => a + g.attributes.position.count, 0); const p = new Float32Array(n * 3), uv = new Float32Array(n * 2); let o = 0;
      gs.forEach((g) => { p.set(g.attributes.position.array, o * 3); uv.set(g.attributes.uv.array, o * 2); o += g.attributes.position.count; });
      G.setAttribute('position', new T.BufferAttribute(p, 3)); G.setAttribute('uv', new T.BufferAttribute(uv, 2)); return G; };
    this.tCanPool = spotMat(); const cp = new T.Mesh(pools(X.cans, 1.25, 0.035), this.tCanPool); cp.renderOrder = 3; S.add(cp);
    this.tChPool = spotMat(); this.tChPool.uniforms.uCol.value.set('#ffc07a'); const chp = new T.Mesh(pools([X.chand], 2.6, 0.04), this.tChPool); chp.renderOrder = 3; S.add(chp);
    const chp2 = new T.Mesh(pools([X.chand], 1.2, 0.785), this.tChPool); chp2.renderOrder = 3; S.add(chp2);
    this.tTvPool = spotMat(); this.tTvPool.uniforms.uCol.value.set('#6f9dff'); const tvp = new T.Mesh(pools([[12, -2.2]], 1.9, 0.045), this.tTvPool); tvp.renderOrder = 3; S.add(tvp);
    const cone = (x, z) => { const g = new T.ConeGeometry(0.95, X.ceil - 0.05, 22, 1, true); g.translate(x, (X.ceil - 0.05) / 2 + 0.05, z); return g.toNonIndexed(); };
    const cg = X.cans.map(([x, z]) => cone(x, z)); const CG = new T.BufferGeometry(); const cn = cg.reduce((a, g) => a + g.attributes.position.count, 0);
    const cpos = new Float32Array(cn * 3), cnor = new Float32Array(cn * 3); let co = 0; cg.forEach((g) => { cpos.set(g.attributes.position.array, co * 3); cnor.set(g.attributes.normal.array, co * 3); co += g.attributes.position.count; });
    CG.setAttribute('position', new T.BufferAttribute(cpos, 3)); CG.setAttribute('normal', new T.BufferAttribute(cnor, 3));
    this.tBeam = new T.ShaderMaterial({ uniforms: { uOn: { value: 0 }, uCol: { value: warm.clone() }, uY0: { value: 0.05 }, uY1: { value: X.ceil } }, vertexShader: BEAM_VS, fragmentShader: BEAM_FS,
      transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide });
    const beams = new T.Mesh(CG, this.tBeam); beams.renderOrder = 7; beams.frustumCulled = false; S.add(beams);
    // point lights (no shadows): seating cans, dining (cans + chandelier), TV spill
    this.tL = {
      seat: new T.PointLight(0xffd4a0, 0, 10, 1.5), dine: new T.PointLight(0xffc488, 0, 9, 1.5), tv: new T.PointLight(0x86a8ff, 0, 6, 1.8),
    };
    this.tL.seat.position.set(12, 2.55, 0); this.tL.dine.position.set(tx, 1.95, tz); this.tL.tv.position.set(12, 2.0, -2.4);
    Object.values(this.tL).forEach((l) => S.add(l));
    // Patio Sonos: rings from the in-ceiling speakers
    this.tRings = [];
    X.speakers.forEach(([x, z]) => { for (let k = 0; k < 3; k++) {
      const r = new T.Mesh(new T.RingGeometry(0.3, 0.335, 48), new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, side: T.DoubleSide }));
      r.rotation.x = -Math.PI / 2; r.position.set(x, 0.06, z); r.userData.k = k; r.visible = false; S.add(r); this.tRings.push(r);
    } });
    this.tFanSpin = 0; this.tFadeA = 1; Object.assign(this.fade, { tCans: 0, tChand: 0, tTv: 0, tMus: 0, tFan: 0 });
  },

  _terrNight(night) { if (this.tGlass) this.tGlass.emissiveIntensity = night ? 0.28 : 0; },

  _terrFrame(dt, t) {
    if (!this.tFade) return;
    const s = this.st.terrace || {}; const night = !!this.st.night; const F = this.fade;
    const ease = (k, v, sp = 2.4) => { F[k] += (v - F[k]) * Math.min(1, dt * sp); return F[k]; };
    const cans = ease('tCans', s.cans ? (s.cansLevel ?? 1) : 0), chand = ease('tChand', s.chandelier ? (s.chandLevel ?? 1) : 0);
    const tvOn = ease('tTv', s.tv ? 1 : 0, 3), mus = ease('tMus', s.music ? 1 : 0, 2), fanOn = ease('tFan', s.fan ? (s.fanSpeed ?? 1) : 0, 0.7);
    const nf = night ? 1 : 0.32;
    this.tCanMat.emissiveIntensity = cans * 2.2; this.tCeil.emissiveIntensity = (night ? 0.03 : 0.3) + (cans * 0.6 + chand * 0.4) * (night ? 0.22 : 0.05);
    this.tBulbMat.emissiveIntensity = chand * (night ? 3.2 : 1.6);
    this.tCanPool.uniforms.uOn.value = cans * nf * 0.55;
    this.tChPool.uniforms.uOn.value = chand * nf * 0.5;
    this.tTvPool.uniforms.uOn.value = tvOn * (night ? 0.32 : 0.08);
    this.tBeam.uniforms.uOn.value = cans * (night ? 1 : 0.12);
    this.tL.seat.intensity = cans * (night ? 9 : 2.5);
    this.tL.dine.intensity = cans * (night ? 4 : 1) + chand * (night ? 7 : 2);
    this.tL.tv.intensity = tvOn * (night ? 4 : 0.8);
    this.tvMat.uniforms.uOn.value = tvOn; this.tvMat.uniforms.uTime.value = t;
    // fan spins up / coasts down
    this.tFanSpin += fanOn * 5.5 * dt; this.tBlades.rotation.y = this.tFanSpin;
    // sound rings
    this.tRings.forEach((rg) => { const ph = ((t * 0.55) + rg.userData.k / 3) % 1; rg.scale.setScalar(1 + ph * 4); rg.material.opacity = mus * (1 - ph) * 0.45; rg.visible = mus > 0.01; });
    // roof + ceiling fade as the camera climbs over the terrace (Top view looks straight in)
    const pol = this.cam.pol; const a = pol >= 0.9 ? 1 : pol <= 0.45 ? 0.1 : 0.1 + 0.9 * ((pol - 0.45) / 0.45) ** 2;
    if (Math.abs(a - this.tFadeA) > 0.004) {
      this.tFadeA = a; this.tFade.forEach((m) => { m.opacity = a; m.depthWrite = a > 0.6; });
    }
    // artwork on the TV when it has any
    if (s.tvPic !== this._tvPic) {
      this._tvPic = s.tvPic; const U = this.tvMat.uniforms;
      if (!s.tvPic) { U.uTex.value = 0; } else {
        const want = s.tvPic;
        new this.T.TextureLoader().load(want, (tex) => {
          if (this._tvPic !== want) { tex.dispose(); return; }
          tex.colorSpace = this.T.SRGBColorSpace; const ia = tex.image.width / tex.image.height, sa = 1.44 / 0.81;
          U.uCover.value.set(ia > sa ? sa / ia : 1, ia > sa ? 1 : ia / sa);
          if (U.tMap.value) U.tMap.value.dispose(); U.tMap.value = tex; U.uTex.value = 1; this._kick();
        }, undefined, () => { U.uTex.value = 0; });
      }
    }
    // keep drawing while anything on the terrace is animating
    if (s.fan || fanOn > 0.01 || s.music || s.tv) this._idleUntil = performance.now() + 500;
  },

  _terrTags(want, roomy) {
    const s = this.st.terrace || {}; if (!roomy) return;
    if (s.tv) want.push({ k: 'ttv', p: [12, 2.9, -2.9], html: `${icon('tv')}TV${s.tvSource ? ' · ' + esc(s.tvSource) : ''}`, cls: 'cool' });
    if (s.music) want.push({ k: 'tmus', p: [12, 3.2, 1.2], html: `${icon('music')}${esc((s.musicTitle || 'Patio').slice(0, 26))}`, cls: '' });
    if (!s.music && (s.cans || s.chandelier || s.fan)) want.push({ k: 'tlit', p: [12, 3.6, 3.0], html: `${icon('terrace')}Terrace`, cls: 'hot' });
  },
});
/* House geometry traced from the floor plan (meters; x east, z south). */
const HOUSE = {"scale":0.0412,"floors":[{"outline":[[-4.57,-12.11],[-0.58,-12.11],[-0.58,-10.63],[12.2,-10.63],[12.2,-4.16],[14.26,-4.16],[14.26,2.76],[12.2,2.76],[12.2,7.37],[7.54,7.37],[7.54,5.81],[4.66,5.81],[4.66,7.37],[-0.49,7.37],[-0.49,4.99],[-1.9,4.99],[-1.9,12.11],[-9.15,12.11],[-9.15,4.9],[-14.26,4.9],[-14.26,-2.64],[-9.15,-2.64],[-9.15,-8.69],[-4.57,-8.69]],"walls":[[[[7.66,4.37],[7.62,4.28],[7.54,4.37],[6.63,4.41],[6.59,4.37],[6.59,3.67],[6.55,3.67],[6.51,4.45],[7.5,4.45],[7.54,4.49],[7.54,5.89],[7.5,5.93],[7.0,5.93],[6.96,5.89],[4.86,5.89],[4.7,5.93],[4.66,5.89],[4.66,4.49],[4.7,4.45],[5.85,4.45],[5.85,4.41],[4.7,4.41],[4.66,4.37],[4.66,3.5],[4.61,3.5],[4.57,3.58],[4.57,4.41],[4.53,4.45],[4.53,7.25],[4.49,7.29],[-0.37,7.29],[-0.41,7.25],[-0.41,4.9],[-0.49,4.78],[-0.49,3.83],[-0.54,3.83],[-0.54,4.12],[-0.62,4.33],[-2.43,4.33],[-2.47,4.24],[-2.55,4.33],[-2.68,4.33],[-2.68,4.45],[-2.76,4.53],[-2.88,4.53],[-3.25,4.16],[-3.5,4.16],[-2.76,4.9],[-2.31,4.86],[-2.18,4.99],[-2.02,5.03],[-2.02,12.15],[-2.06,12.2],[-6.92,12.2],[-6.96,12.15],[-6.96,11.66],[-7.05,11.58],[-8.98,11.58],[-9.02,11.54],[-8.98,10.75],[-8.86,10.67],[-8.86,6.14],[-8.9,5.77],[-8.98,5.69],[-8.98,4.99],[-8.94,4.94],[-9.11,4.82],[-10.26,4.86],[-10.26,4.99],[-9.15,4.99],[-9.11,5.03],[-9.11,5.73],[-9.27,5.81],[-9.27,10.67],[-9.11,10.75],[-9.11,11.7],[-9.06,11.78],[-9.02,11.74],[-7.13,11.7],[-7.09,11.74],[-7.09,12.32],[-7.0,12.36],[-1.98,12.36],[-1.85,12.24],[-1.85,5.4],[-1.9,5.36],[-1.85,4.99],[-1.48,5.03],[-1.4,4.99],[-1.07,5.03],[-0.62,4.99],[-0.54,5.11],[-0.54,7.25],[-0.58,7.29],[-0.49,7.42],[4.61,7.42],[4.66,7.37],[4.66,6.1],[4.7,6.06],[7.5,6.06],[7.54,6.18],[7.62,6.18],[7.62,4.45]],[[-9.15,5.89],[-9.02,5.89],[-8.94,6.1],[-8.94,10.51],[-9.02,10.63],[-9.19,10.59],[-9.19,5.93]],[[-1.44,4.53],[-1.11,4.49],[-1.07,4.78],[-1.4,4.82]],[[-0.91,4.41],[-0.58,4.45],[-0.62,4.86],[-0.91,4.86],[-0.99,4.78],[-0.99,4.53]],[[-2.76,4.57],[-2.55,4.37],[-1.61,4.41],[-1.57,4.78],[-1.65,4.86],[-1.98,4.86],[-2.1,4.7],[-2.72,4.7]]],[[[-4.99,2.55],[-4.99,2.68],[-3.58,4.08],[-3.54,3.79],[-3.25,3.79],[-3.21,3.96],[-2.84,3.58],[-2.72,3.63],[-2.76,3.58],[-2.72,3.46],[-2.84,3.42],[-2.84,3.34],[-2.72,3.21],[-2.84,3.34],[-2.93,3.34],[-3.79,2.43],[-4.37,2.97],[-4.49,2.93],[-4.49,2.84],[-3.83,2.18],[-4.53,2.8],[-4.66,2.8],[-4.86,2.6],[-4.86,2.51],[-4.49,2.14],[-4.9,2.55]],[[-3.3,3.21],[-3.09,3.42],[-3.09,3.58],[-3.21,3.71],[-3.34,3.71],[-3.38,3.79],[-3.54,3.79],[-3.71,3.63],[-3.71,3.54],[-3.38,3.21]],[[-3.91,2.55],[-3.79,2.55],[-3.38,2.97],[-3.38,3.05],[-3.5,3.17],[-3.63,3.17],[-3.67,3.25],[-3.79,3.3],[-3.83,3.46],[-3.96,3.46],[-4.33,3.09],[-4.33,2.97]]],[[[-6.43,1.24],[-5.52,2.14],[-5.4,2.06],[-5.44,2.02],[-5.4,1.9],[-4.7,1.9],[-4.74,1.85],[-5.36,1.85],[-5.52,1.94],[-6.22,1.24]]],[[[4.57,-0.54],[4.57,0.87],[4.66,0.87],[4.66,-0.41],[4.74,-0.49]]],[[[12.57,-0.08],[12.15,-0.12],[12.15,-0.7],[12.15,-0.12],[12.11,-0.08],[10.3,-0.08],[10.3,-0.04],[12.57,-0.04]]],[[[-0.87,-0.91],[-0.45,-0.49],[-0.45,-0.37],[0.12,0.21],[0.12,0.33],[-0.33,0.78],[-0.29,0.82],[0.29,0.21]]],[[[10.3,-1.15],[10.38,-1.15],[10.38,-1.61],[10.42,-1.65],[11.17,-1.65],[10.3,-1.77],[10.26,-1.73]]],[[[-12.94,-2.55],[-11.49,-2.55],[-11.49,-2.68],[-12.9,-2.68]]],[[[-14.21,-2.72],[-14.3,-2.64],[-14.3,-1.32],[-14.42,-1.24],[-14.46,-1.03],[-14.46,-0.04],[-14.42,0.0],[-14.46,0.12],[-14.46,3.58],[-14.3,3.67],[-14.3,4.9],[-14.26,4.99],[-10.67,4.94],[-10.67,4.86],[-14.13,4.86],[-14.17,4.82],[-14.17,3.71],[-14.05,3.63],[-14.05,-1.24],[-14.17,-1.32],[-14.17,-2.51],[-14.13,-2.55],[-13.72,-2.55],[-13.68,-2.51],[-13.68,-1.9],[-13.64,-1.9],[-13.6,-2.68],[-13.64,-2.76],[-13.72,-2.68],[-14.17,-2.68]],[[-14.34,-1.19],[-14.13,-1.15],[-14.13,3.5],[-14.17,3.54],[-14.38,3.5],[-14.38,-1.15]]],[[[0.78,-3.01],[0.78,-2.97],[1.28,-2.97],[1.32,-2.68],[1.61,-2.68],[1.65,-2.55],[1.77,-2.68],[2.02,-2.68],[1.36,-2.68],[1.32,-2.72],[1.36,-3.05],[2.02,-3.05],[2.06,-2.8],[2.22,-2.8],[2.27,-2.97],[2.76,-2.97],[2.76,-3.01],[2.39,-3.05]]],[[[4.66,-3.3],[4.61,-3.3],[4.61,-3.09],[4.53,-3.01],[3.87,-3.01],[3.87,0.49],[3.46,0.91],[1.48,0.91],[1.36,0.95],[1.36,1.07],[0.74,1.65],[0.62,1.65],[0.62,1.77],[0.45,1.94],[0.78,1.69],[4.41,1.69],[4.41,1.65],[4.2,1.61],[1.03,1.65],[0.99,1.52],[1.57,0.95],[3.3,0.95],[3.34,1.03],[4.0,0.41],[3.96,0.33],[3.96,-0.62],[4.0,-0.66],[4.2,-0.62],[4.2,-0.74],[4.04,-0.78],[4.04,-1.52],[4.08,-1.57],[4.7,-1.57],[4.66,-1.69],[4.66,-2.93],[4.7,-2.97]],[[4.0,-2.97],[4.53,-2.97],[4.57,-2.93],[4.57,-1.61],[4.53,-1.57],[4.0,-1.57],[3.96,-1.61],[3.96,-2.93]]],[[[-4.04,-3.13],[-4.08,-2.97],[-3.91,-2.97],[-3.79,-2.84],[-3.79,-2.72],[-3.67,-2.64],[-3.67,-2.55],[-3.58,-2.55],[-3.17,-2.18],[-3.01,-2.22],[-2.76,-1.98],[-2.68,-2.02],[-3.05,-2.43],[-3.05,-2.55],[-3.21,-2.55],[-3.5,-2.93],[-3.5,-3.01],[-3.67,-3.09],[-3.67,-3.25],[-3.79,-3.3],[-3.96,-3.13]]],[[[6.22,-3.71],[6.18,-3.3],[6.02,-3.21],[6.18,-3.13],[6.18,-1.44],[6.26,-1.36],[6.39,-1.4],[7.25,-0.54],[7.09,-0.78],[6.26,-1.52],[6.26,-3.13],[6.3,-3.17],[6.76,-3.17],[6.92,-3.25],[6.26,-3.25],[6.22,-3.3]]],[[[10.22,-4.24],[10.01,-4.28],[9.97,-4.24],[8.08,-4.24],[8.03,-4.28],[7.62,-4.24],[7.62,-4.2],[7.95,-4.16],[7.99,-1.44],[8.03,-1.4],[8.03,-3.01],[8.08,-3.05],[8.94,-3.05],[8.9,-3.09],[8.08,-3.09],[8.03,-3.13],[8.08,-3.46],[8.2,-3.46],[8.24,-3.34],[8.36,-3.46],[8.82,-3.46],[8.94,-3.54],[8.57,-3.58],[8.65,-3.75],[8.94,-3.75],[8.86,-3.83],[8.08,-3.83],[8.03,-4.16],[8.08,-4.2],[9.93,-4.2],[9.97,-4.16],[9.97,-3.34],[10.01,-3.34],[10.05,-4.16]],[[8.03,-3.79],[8.28,-3.83],[8.32,-3.75],[8.49,-3.75],[8.53,-3.63],[8.45,-3.54],[8.32,-3.54],[8.28,-3.46],[8.08,-3.46]]],[[[-10.92,-2.68],[-10.92,-2.55],[-9.23,-2.55],[-9.15,-2.31],[-7.66,-2.31],[-7.62,-2.27],[-7.62,0.0],[-7.54,0.16],[-6.92,0.74],[-6.92,0.54],[-7.5,-0.04],[-7.5,-2.31],[-7.46,-2.35],[-7.5,-2.43],[-7.5,-3.54],[-7.46,-3.58],[-6.14,-3.58],[-6.1,-3.38],[-6.22,-3.34],[-5.77,-3.34],[-5.73,-3.05],[-5.64,-2.97],[-5.64,-3.42],[-5.52,-3.46],[-5.48,-3.42],[-5.48,-2.97],[-5.4,-2.93],[-5.4,-2.72],[-5.6,-2.64],[-6.02,-2.68],[-6.02,-1.94],[-5.93,-1.9],[-5.81,-1.94],[-5.77,-1.85],[-5.69,-1.9],[-5.4,-1.85],[-5.4,-1.52],[-5.81,-1.07],[-5.31,-1.52],[-5.23,-1.52],[-4.37,-0.62],[-3.79,-0.12],[-4.28,-0.62],[-4.28,-0.7],[-3.46,-1.52],[-3.34,-1.52],[-2.84,-1.03],[-2.93,-0.82],[-2.72,-0.91],[-2.55,-0.74],[-2.47,-0.74],[-2.68,-0.95],[-2.68,-1.03],[-1.81,-1.9],[-3.5,-3.67],[-4.49,-3.67],[-4.53,-3.71],[-4.53,-4.7],[-4.57,-4.7],[-4.57,-3.71],[-4.61,-3.67],[-7.91,-3.67],[-7.87,-3.58],[-7.58,-3.54],[-7.58,-3.09],[-7.5,-3.05],[-7.5,-2.43],[-7.54,-2.39],[-9.11,-2.39],[-9.15,-2.43],[-9.15,-3.05],[-9.02,-3.09],[-9.02,-3.54],[-8.57,-3.63],[-9.02,-3.71],[-9.02,-5.73],[-9.23,-5.73],[-9.19,-5.56],[-9.19,-2.72],[-9.23,-2.68]],[[-5.93,-2.47],[-5.64,-2.51],[-5.56,-2.43],[-5.56,-2.14],[-5.89,-2.1]],[[-5.31,-3.54],[-5.27,-3.58],[-3.5,-3.58],[-1.9,-1.98],[-1.9,-1.85],[-2.72,-1.07],[-2.8,-1.07],[-3.34,-1.61],[-3.42,-1.61],[-4.33,-0.74],[-4.41,-0.74],[-5.31,-1.69],[-5.31,-2.1],[-5.27,-2.14]]],[[[-1.24,-12.24],[-1.24,-10.59],[-0.62,-10.51],[-0.62,-7.29],[-0.66,-7.25],[-4.49,-7.25],[-4.57,-7.66],[-4.61,-7.25],[-4.57,-5.97],[-4.53,-5.97],[-4.53,-7.09],[-4.49,-7.13],[-0.54,-7.13],[0.0,-6.63],[-0.49,-7.21],[-0.49,-10.51],[-0.45,-10.55],[1.24,-10.55],[1.28,-10.59],[1.48,-10.55],[3.79,-10.55],[3.83,-10.59],[4.08,-10.55],[6.55,-10.55],[6.59,-10.51],[6.59,-8.65],[6.18,-8.61],[6.1,-8.69],[6.1,-8.9],[5.97,-8.57],[6.02,-8.53],[6.02,-5.23],[6.18,-5.15],[6.18,-4.45],[6.22,-4.41],[6.26,-4.45],[6.26,-5.15],[6.3,-5.19],[6.72,-5.19],[6.67,-5.27],[6.67,-7.0],[6.63,-7.0],[6.59,-6.72],[6.59,-5.31],[6.55,-5.27],[6.14,-5.27],[6.06,-5.81],[6.06,-6.67],[6.1,-6.72],[6.1,-7.29],[6.18,-7.33],[6.18,-8.53],[6.22,-8.57],[6.55,-8.53],[6.55,-7.5],[6.63,-7.87],[6.67,-10.51],[6.72,-10.55],[12.07,-10.55],[12.11,-10.51],[12.11,-10.01],[12.07,-9.97],[12.07,-9.27],[12.11,-9.23],[12.07,-8.94],[12.07,-5.52],[12.11,-5.48],[12.07,-4.33],[11.99,-4.24],[11.08,-4.24],[11.0,-4.28],[10.84,-4.2],[10.96,-4.16],[10.96,-3.67],[11.04,-3.58],[12.36,-3.58],[12.4,-3.38],[12.57,-3.3],[13.51,-2.31],[13.6,-2.39],[14.09,-2.39],[14.13,-2.35],[14.09,-2.1],[13.64,-2.1],[13.6,-2.14],[13.55,-2.1],[13.55,-0.12],[13.23,-0.04],[13.6,0.0],[14.09,-0.04],[14.13,0.0],[14.13,2.64],[14.09,2.68],[12.24,2.68],[12.2,2.64],[12.11,2.68],[10.42,2.68],[10.38,2.64],[10.38,1.65],[10.42,1.61],[10.38,1.57],[10.38,0.21],[10.34,0.12],[8.78,0.12],[8.69,0.0],[8.65,-0.37],[8.65,0.08],[8.61,0.12],[8.69,0.25],[8.69,0.37],[8.57,0.41],[8.2,-0.08],[8.16,-0.29],[7.66,-0.91],[7.66,-1.11],[7.37,-1.36],[7.37,-1.52],[7.21,-1.61],[7.21,-1.77],[7.0,-1.81],[7.0,-1.73],[6.84,-1.65],[6.84,-1.52],[7.0,-1.36],[7.0,-1.24],[7.37,-0.91],[7.42,-0.7],[7.66,-0.58],[7.62,-0.41],[7.75,-0.29],[7.83,-0.08],[7.95,0.0],[7.95,0.12],[8.12,0.29],[8.16,0.45],[8.24,0.37],[8.4,0.45],[8.53,0.41],[8.69,0.45],[8.69,1.11],[8.73,0.21],[8.78,0.16],[10.26,0.16],[10.3,0.21],[10.3,1.28],[10.26,1.32],[9.81,1.32],[9.76,1.28],[9.64,1.32],[9.64,2.02],[9.97,2.06],[10.26,2.02],[10.3,2.06],[10.3,2.64],[9.93,2.72],[9.06,2.72],[9.06,2.76],[12.03,2.76],[12.07,2.8],[12.11,4.0],[12.07,4.04],[12.07,7.29],[12.03,7.33],[7.46,7.33],[7.54,7.46],[12.15,7.46],[12.24,7.33],[12.2,7.29],[12.2,2.84],[12.24,2.8],[14.09,2.8],[14.13,2.84],[14.3,2.76],[14.3,-1.57],[14.34,-1.61],[14.3,-1.73],[14.3,-2.35],[14.34,-2.39],[14.3,-2.47],[14.3,-4.28],[14.26,-4.33],[12.24,-4.33],[12.2,-4.37],[12.2,-10.55],[12.24,-10.59],[12.2,-10.71],[-1.03,-10.71],[-1.07,-10.75],[-1.07,-12.2]],[[9.81,1.44],[10.14,1.48],[10.09,1.9],[9.76,1.85]],[[13.68,-1.11],[14.05,-1.15],[14.13,-1.07],[14.13,-0.12],[14.09,-0.08],[13.68,-0.08],[13.64,-0.12],[13.64,-1.07]],[[13.76,-1.57],[14.05,-1.61],[14.09,-1.28],[13.8,-1.24]],[[13.64,-1.98],[13.68,-2.02],[14.09,-2.02],[14.13,-1.73],[14.09,-1.69],[13.68,-1.69]],[[13.6,-2.55],[13.64,-2.6],[14.09,-2.6],[14.13,-2.47],[14.09,-2.43],[13.64,-2.43]],[[12.48,-3.46],[12.61,-3.5],[12.65,-3.38],[12.52,-3.34]],[[12.69,-3.75],[12.81,-3.87],[12.94,-3.83],[12.94,-3.42],[13.06,-3.38],[13.68,-2.8],[12.98,-3.5],[12.98,-3.79],[13.02,-3.83],[13.8,-3.83],[13.84,-3.79],[13.88,-2.88],[13.97,-2.84],[14.01,-2.64],[13.97,-2.6],[13.51,-2.6],[12.69,-3.42]],[[11.49,-4.04],[11.82,-4.08],[11.87,-3.79],[11.54,-3.75]],[[13.88,-4.08],[14.09,-4.12],[14.13,-4.0],[13.93,-3.96]],[[12.52,-4.16],[12.73,-4.08],[12.65,-3.91],[12.69,-3.75],[12.61,-3.67],[12.48,-3.71],[12.48,-4.12]],[[12.03,-4.2],[12.24,-4.2],[12.36,-4.12],[12.36,-3.71],[12.32,-3.67],[11.99,-3.71],[11.95,-4.04]],[[11.08,-4.2],[11.41,-4.16],[11.41,-3.71],[11.37,-3.67],[11.04,-3.71],[11.04,-4.16]]],[[[-2.64,-12.2],[-4.45,-12.2],[-4.49,-12.24],[-4.61,-12.2],[-4.61,-8.82],[-4.66,-8.78],[-9.19,-8.78],[-9.19,-6.96],[-9.31,-6.76],[-9.31,-5.81],[-9.31,-6.72],[-9.02,-6.76],[-9.02,-8.57],[-8.98,-8.61],[-4.66,-8.61],[-4.61,-8.57],[-4.66,-8.4],[-5.27,-8.4],[-5.31,-8.36],[-4.53,-8.32],[-4.49,-8.36],[-4.49,-12.03],[-4.45,-12.07],[-2.76,-12.11],[-2.72,-12.2]]]],"rooms":{"garage":[[-14.26,-2.64],[-7.5,-2.64],[-7.5,-0.04],[-1.9,4.99],[-1.9,12.11],[-9.15,12.11],[-9.15,4.9],[-14.26,4.9]],"gathering":[[-9.15,-8.69],[-4.57,-8.69],[-4.57,-3.75],[-9.15,-3.75]],"patio":[[-4.57,-12.11],[-0.58,-12.11],[-0.58,-7.17],[-4.57,-7.17]],"breakfast":[[-4.57,-7.17],[-0.37,-7.17],[-0.37,-3.34],[-4.57,-3.34]],"family":[[-0.58,-10.63],[6.02,-10.63],[6.02,-4.37],[-0.58,-4.37]],"primary":[[6.02,-10.63],[12.2,-10.63],[12.2,-4.16],[6.02,-4.16]],"primarybath":[[7.66,-4.16],[14.26,-4.16],[14.26,2.76],[7.66,2.76]],"backstairs":[[-5.93,-3.75],[-1.81,-3.75],[-1.81,-0.87],[-5.93,-0.87]],"mud":[[-7.5,-0.87],[-5.11,-0.87],[-2.64,1.81],[-2.64,4.08],[-4.7,3.67],[-7.5,-0.04]],"pantry":[[-2.43,-0.87],[-0.37,-0.87],[-0.37,1.81],[-2.43,1.81]],"kitchen":[[-0.37,-3.34],[4.37,-3.34],[4.37,1.81],[-0.37,1.81]],"laundry1":[[-2.84,1.81],[-0.37,1.81],[-0.37,4.99],[-1.9,4.99],[-2.84,4.08]],"dining":[[-0.49,2.43],[4.66,2.43],[4.66,7.37],[-0.49,7.37]],"foyer":[[4.37,-3.34],[7.66,-3.34],[7.66,2.76],[10.14,2.76],[10.14,3.87],[7.54,3.87],[7.54,5.81],[4.37,5.81]],"office":[[7.54,3.87],[12.2,3.87],[12.2,7.37],[7.54,7.37]],"porch":[[4.66,5.81],[7.54,5.81],[7.54,7.37],[4.66,7.37]]},"fixtures":{"family":[[1.31,-10.23],[3.93,-10.37],[0.29,-9.87],[4.05,-9.73],[0.0,-9.5],[0.39,-9.52],[5.33,-8.16],[0.86,-6.76],[4.12,-6.28]],"patio":[[-3.94,-9.74],[-2.03,-9.78],[-2.88,-9.64],[-1.07,-9.7],[-1.07,-9.21]],"primary":[[11.49,-9.8],[11.55,-5.5]],"gathering":[[-8.47,-6.2],[-6.86,-6.39],[-6.8,-5.91]],"kitchen":[[1.92,-2.36],[2.99,-1.8],[2.04,-1.48],[-0.14,-1.07],[0.72,0.1]],"garage":[[-10.75,-0.48],[-10.76,2.43],[-9.07,2.47],[-12.03,4.51],[-12.24,4.55],[-12.73,4.7],[-4.95,6.08],[-5.24,6.53],[-5.42,9.58]],"mud":[[-5.19,-0.43],[-5.65,0.07],[-5.27,-0.0]],"laundry1":[[-2.22,3.0]],"office":[[11.66,4.28],[10.68,4.87],[9.27,4.89],[10.03,5.47]],"dining":[[1.66,6.45]]},"tvs":[[-2.74,-11.89,2.06,1],[5.94,-9.55,1.57,0],[6.83,-8.12,2.43,0]]},{"outline":[[-2.8,-11.08],[10.05,-11.08],[10.05,1.94],[6.84,1.94],[4.78,-0.04],[4.41,-1.69],[2.39,-1.69],[2.39,6.88],[-2.8,6.88],[-2.8,4.49],[-4.37,4.49],[-4.37,11.49],[-11.41,11.49],[-11.41,4.9],[-10.46,4.9],[-10.46,4.57],[-15.74,4.57],[-15.74,-1.69],[-14.3,-1.69],[-14.3,-3.21],[-9.85,-3.21],[-9.85,-4.24],[-7.05,-4.24],[-7.05,-7.75],[-2.8,-7.75]],"walls":[[[[-10.79,9.02],[-10.79,9.68],[-10.67,9.72],[-10.67,9.02]]],[[[-11.54,8.94],[-11.54,11.17],[-11.49,11.29],[-8.78,11.29],[-8.73,11.33],[-8.73,11.74],[-4.33,11.74],[-4.28,11.66],[-4.33,11.62],[-4.33,11.17],[-4.45,11.17],[-4.45,11.62],[-4.49,11.66],[-5.03,11.66],[-5.07,11.62],[-5.07,11.17],[-5.23,11.17],[-5.23,11.62],[-5.27,11.66],[-8.53,11.66],[-8.57,11.62],[-8.57,9.68],[-8.61,9.6],[-8.73,9.56],[-8.73,11.12],[-8.78,11.17],[-11.33,11.17],[-11.37,11.12],[-11.37,8.94]]],[[[-7.33,6.96],[-7.33,7.13],[-7.42,7.17],[-7.46,7.42],[-7.33,7.46],[-7.33,7.54],[-7.46,7.66],[-7.33,7.7],[-7.37,7.83],[-7.25,7.83],[-7.13,7.7],[-6.84,7.83],[-6.76,7.66],[-6.8,7.37],[-7.17,7.42],[-7.25,7.33],[-7.25,6.92]]],[[[-5.11,5.89],[-5.23,5.97],[-5.23,6.72],[-5.07,6.72],[-5.07,5.93]]],[[[-6.1,3.01],[-6.18,3.09],[-6.18,4.41],[-6.22,4.45],[-6.8,4.45],[-6.88,4.53],[-5.27,4.61],[-5.19,5.36],[-5.07,5.31],[-5.07,4.86],[-5.03,4.82],[-5.07,4.61],[-5.03,4.57],[-4.49,4.57],[-4.45,4.61],[-4.45,6.72],[-4.28,6.72],[-4.28,4.61],[-4.24,4.57],[-3.75,4.57],[-3.71,4.61],[-3.67,4.57],[-3.09,4.57],[-3.09,4.41],[-3.58,4.41],[-3.63,4.37],[-3.63,3.96],[-3.58,3.91],[-3.05,3.91],[-3.05,3.83],[-4.66,3.83],[-4.74,3.87],[-4.74,4.0],[-4.99,4.24],[-5.11,4.24],[-5.11,4.33],[-5.23,4.41],[-5.4,4.41],[-5.85,3.91],[-5.93,3.91],[-6.1,3.75]],[[-4.08,4.08],[-3.75,4.04],[-3.71,4.33],[-3.96,4.37],[-4.08,4.24]],[[-4.99,4.28],[-4.61,3.91],[-4.2,3.96],[-4.16,4.33],[-4.24,4.41],[-4.94,4.41]],[[-6.1,3.96],[-5.97,3.91],[-5.56,4.33],[-5.6,4.45],[-6.06,4.45],[-6.1,4.41]]],[[[-2.8,2.88],[-2.8,3.46],[-2.76,3.5],[-2.76,2.93]]],[[[-12.9,2.88],[-12.77,2.93],[-10.63,2.93],[-10.46,2.84],[-7.91,2.84],[-7.87,2.8],[-7.91,2.76],[-9.89,2.76],[-9.93,2.8],[-12.85,2.76]]],[[[-15.82,0.99],[-15.82,4.53],[-15.7,4.57],[-15.66,4.53],[-15.16,4.53],[-15.12,4.57],[-11.66,4.57],[-11.54,4.53],[-11.49,4.57],[-11.54,4.94],[-11.54,8.49],[-11.37,8.49],[-11.33,8.08],[-10.67,8.08],[-10.71,7.95],[-11.33,7.95],[-11.37,7.91],[-11.37,5.31],[-11.33,5.27],[-10.42,5.27],[-10.26,5.19],[-9.27,5.19],[-8.61,5.27],[-8.16,4.99],[-7.66,4.49],[-7.5,4.49],[-8.08,4.49],[-7.87,4.49],[-7.83,4.61],[-7.99,4.78],[-8.12,4.74],[-8.24,4.78],[-8.32,4.41],[-8.32,4.82],[-8.57,4.86],[-8.69,4.74],[-8.61,4.57],[-10.34,4.57],[-10.38,4.41],[-10.51,4.41],[-10.51,5.07],[-10.55,5.11],[-11.33,5.11],[-11.37,5.07],[-11.37,4.45],[-11.45,4.37],[-11.54,4.41],[-11.78,4.37],[-15.66,4.37],[-15.7,4.33],[-15.7,2.97],[-15.66,2.93],[-13.55,2.93],[-13.51,2.8],[-13.55,2.76],[-15.66,2.76],[-15.7,2.72],[-15.74,0.99]],[[-10.38,4.66],[-10.34,4.61],[-8.9,4.61],[-8.73,4.78],[-8.73,4.86],[-8.65,4.86],[-8.49,5.03],[-8.53,5.15],[-10.3,5.15],[-10.38,5.07]]],[[[-9.19,-0.74],[-9.23,-0.7],[-9.76,-0.7],[-9.23,-0.7],[-9.19,-0.66],[-9.19,-0.21],[-9.31,-0.16],[-9.31,0.41],[-9.19,0.45],[-9.19,0.95],[-9.23,0.99],[-9.76,0.99],[-9.81,0.95],[-9.85,0.04],[-9.85,0.95],[-10.05,0.99],[-9.81,1.07],[-9.76,1.03],[-9.23,1.03],[-9.19,1.07],[-9.06,1.03],[-9.15,0.95],[-9.15,-0.7]]],[[[-1.48,-0.95],[-1.85,-0.62],[-2.14,-0.62],[-2.02,-0.54],[-2.02,-0.41],[-2.14,-0.37],[-2.31,-0.21],[-2.51,-0.21],[-2.6,-0.04],[-2.76,0.0],[-2.72,0.29],[-2.6,0.33],[-2.55,0.45],[-2.43,0.33],[-2.64,0.29],[-2.64,0.0],[-2.55,-0.04],[-2.51,-0.16],[-2.1,-0.21],[-2.06,0.0],[-1.73,-0.33],[-1.65,-0.49],[-1.44,-0.62],[-1.36,-0.78]]],[[[-9.68,-1.03],[-9.52,-1.03],[-9.48,-0.95],[-9.39,-1.03],[-9.02,-1.03],[-8.9,-1.15],[-9.39,-1.15],[-9.43,-1.28],[-9.39,-1.32],[-8.9,-1.32],[-9.39,-1.32],[-9.43,-1.52],[-9.48,-1.52],[-9.48,-1.07]]],[[[4.82,-1.69],[5.03,-1.65],[5.03,-1.32],[5.31,-1.03],[5.31,-0.87],[5.48,-0.74],[5.56,-0.54],[5.73,-0.58],[5.81,-0.49],[5.89,-0.58],[5.89,-0.74],[5.52,-1.19],[5.52,-1.32],[5.23,-1.65],[5.23,-1.77],[5.15,-1.85],[5.11,-1.69]]],[[[0.49,-2.14],[0.45,-2.14],[0.41,-0.74],[0.37,-0.7],[-0.66,-0.7],[-0.7,-0.74],[-0.7,-1.81],[-0.45,-1.85],[-0.45,-1.94],[-1.19,-1.94],[-1.24,-1.77],[-3.3,0.29],[-3.3,0.37],[-3.21,0.37],[-2.55,1.03],[-2.6,1.19],[-2.76,1.15],[-2.84,1.19],[-2.84,2.1],[-2.88,2.14],[-3.96,2.1],[-3.91,2.18],[-2.88,2.18],[-2.84,2.22],[-2.76,2.18],[-2.76,1.4],[-2.6,1.28],[-0.95,1.28],[-0.87,1.24],[-0.91,1.19],[-2.35,1.19],[-2.39,1.07],[-1.57,0.21],[-2.43,1.03],[-2.51,1.03],[-3.17,0.37],[-3.17,0.25],[-2.84,-0.04],[-2.84,-0.12],[-1.07,-1.85],[-0.78,-1.81],[-0.78,-0.74],[-0.82,-0.7],[-0.78,-0.58],[-0.66,-0.7],[0.37,-0.7],[0.41,-0.66],[0.41,1.15],[-0.21,1.24],[-0.16,1.28],[1.07,1.28],[1.11,1.19],[0.54,1.19],[0.49,1.15]]],[[[4.49,-2.88],[4.49,-2.76],[4.45,-2.72],[4.28,-2.76],[4.24,-2.6],[4.45,-2.39],[4.57,-2.02],[4.57,-2.27],[4.86,-2.31],[4.74,-2.39],[4.74,-2.6],[4.61,-2.72],[4.61,-2.84]]],[[[-2.8,-2.93],[-2.93,-2.93],[-3.34,-2.51],[-3.34,-2.43],[-3.05,-2.22],[-3.05,-1.98],[-3.21,-1.81],[-3.3,-1.81],[-3.83,-2.35],[-3.3,-1.81],[-3.34,-1.69],[-3.01,-2.02],[-2.84,-2.06],[-2.39,-2.55],[-2.43,-2.64],[-2.64,-2.64],[-2.76,-2.76]],[[-2.84,-2.76],[-2.76,-2.68],[-2.76,-2.47],[-2.88,-2.35],[-3.09,-2.35],[-3.17,-2.43],[-3.17,-2.55],[-2.97,-2.76]]],[[[10.09,-3.25],[9.97,-3.25],[9.97,1.81],[9.93,1.85],[7.09,1.85],[6.26,0.99],[6.34,-0.7],[6.22,-1.32],[6.14,-1.4],[6.14,-1.61],[5.69,-2.35],[5.07,-2.97],[4.94,-3.01],[4.78,-3.17],[4.74,-3.87],[4.66,-3.91],[4.61,-3.67],[3.5,-3.67],[3.46,-3.71],[3.38,-3.67],[3.38,-1.98],[3.34,-1.94],[2.27,-1.94],[2.22,-1.85],[2.27,-1.77],[2.27,1.15],[2.22,1.19],[1.81,1.19],[1.81,1.24],[2.22,1.24],[2.27,1.28],[2.27,3.05],[2.35,3.58],[2.35,4.61],[2.27,4.66],[2.27,6.8],[2.22,6.84],[-2.68,6.84],[-2.72,6.8],[-2.72,5.07],[-2.84,5.07],[-2.84,6.92],[-2.76,7.0],[2.35,7.0],[2.43,6.92],[2.39,6.8],[2.39,-1.77],[2.43,-1.81],[3.34,-1.81],[3.38,-1.77],[3.79,-1.81],[4.82,-0.66],[4.82,-0.16],[4.94,0.41],[6.06,0.41],[6.14,1.07],[7.05,2.02],[7.29,1.98],[10.05,1.98],[10.09,1.94]],[[3.5,-3.58],[4.61,-3.63],[4.66,-3.58],[4.66,-3.05],[4.74,-2.97],[4.86,-2.97],[6.1,-1.61],[6.1,-0.99],[6.18,-0.66],[6.18,-0.04],[6.1,0.29],[5.03,0.29],[4.94,-0.54],[4.61,-1.15],[3.91,-1.9],[3.46,-1.98],[3.46,-3.54]]],[[[5.64,-3.91],[6.51,-3.91],[6.51,-4.0],[5.93,-4.0],[5.89,-3.91]]],[[[6.59,-4.78],[7.42,-4.78],[7.42,-4.82]]],[[[2.84,-5.44],[2.88,-5.4],[4.61,-5.4],[4.66,-5.36],[4.66,-4.94],[4.57,-4.86],[4.57,-4.7],[3.91,-4.61],[4.7,-4.57],[4.82,-4.78],[5.6,-4.74],[5.56,-4.9],[4.74,-4.9],[4.7,-4.94],[4.74,-5.44],[4.61,-5.48],[2.93,-5.48]]],[[[1.65,-5.44],[1.57,-5.48],[-0.58,-5.48],[-0.7,-5.77],[-2.22,-7.29],[-2.68,-7.29],[-2.72,-7.33],[-2.68,-8.53],[-2.8,-8.69],[-2.84,-8.69],[-2.84,-7.75],[-2.88,-7.7],[-7.09,-7.7],[-7.13,-7.66],[-7.13,-4.37],[-7.17,-4.33],[-9.76,-4.33],[-9.85,-4.24],[-9.85,-3.3],[-9.89,-3.25],[-14.3,-3.25],[-14.38,-3.13],[-14.38,-2.47],[-14.34,-2.43],[-14.38,-1.81],[-14.42,-1.77],[-15.78,-1.77],[-15.82,-1.73],[-15.82,-0.41],[-15.7,-0.41],[-15.7,-1.61],[-15.66,-1.65],[-14.26,-1.65],[-14.21,-1.69],[-14.21,-3.09],[-14.17,-3.13],[-12.4,-3.13],[-12.36,-3.09],[-12.36,-1.69],[-12.32,-1.65],[-11.33,-1.65],[-11.29,-1.69],[-11.33,-1.77],[-12.2,-1.77],[-12.24,-1.81],[-12.24,-3.09],[-12.2,-3.13],[-11.62,-3.13],[-11.58,-3.09],[-9.89,-3.13],[-9.85,-3.09],[-9.85,-1.81],[-9.89,-1.77],[-10.71,-1.77],[-10.75,-1.69],[-10.71,-1.65],[-9.89,-1.65],[-9.76,-1.57],[-9.76,-1.15],[-9.76,-1.61],[-9.68,-1.65],[-9.72,-1.81],[-9.72,-4.12],[-9.68,-4.16],[-8.03,-4.16],[-7.99,-4.12],[-7.99,-3.46],[-8.03,-3.42],[-7.99,-1.77],[-8.61,-1.69],[-8.57,-1.65],[-8.03,-1.65],[-7.95,-1.4],[-7.91,-1.65],[-7.95,-2.22],[-7.83,-2.27],[-6.43,-0.91],[-6.47,-0.74],[-7.25,-0.78],[-7.33,-0.7],[-7.33,0.99],[-7.37,1.03],[-7.99,1.03],[-7.33,1.03],[-7.29,1.07],[-6.47,1.03],[-6.43,1.28],[-6.34,1.15],[-6.34,0.41],[-6.3,0.37],[-6.34,-0.16],[-6.26,-0.21],[-6.34,-0.33],[-6.34,-0.66],[-6.22,-0.7],[-6.14,-0.62],[-7.95,-2.43],[-7.95,-3.21],[-7.0,-4.16],[-5.97,-4.16],[-4.61,-2.8],[-4.61,-2.68],[-5.07,-2.22],[-5.19,-2.22],[-5.27,-2.14],[-5.27,-2.02],[-5.48,-1.81],[-5.48,-1.69],[-5.23,-1.48],[-5.19,-1.32],[-5.85,-0.62],[-5.19,-1.32],[-5.07,-1.32],[-4.45,-0.66],[-4.33,-0.66],[-3.75,-1.19],[-3.71,-1.32],[-3.87,-1.4],[-4.78,-2.31],[-4.78,-2.43],[-3.38,-3.87],[-4.49,-2.84],[-4.61,-2.84],[-5.89,-4.16],[-5.97,-4.2],[-6.8,-4.16],[-7.0,-4.33],[-7.0,-7.54],[-6.96,-7.58],[-2.84,-7.58],[-2.8,-7.54],[-2.8,-4.9],[-2.72,-4.86],[-2.72,-7.17],[-2.68,-7.21],[-2.27,-7.21],[-0.74,-5.69],[-0.74,-3.71],[-0.78,-3.67],[-1.52,-3.67],[-1.73,-3.87],[-1.19,-3.25],[-1.19,-3.17],[-1.03,-3.09],[-0.99,-3.13],[0.37,-3.13],[0.41,-2.88],[0.49,-2.84],[0.49,-3.91],[0.41,-3.87],[0.41,-3.17],[0.37,-3.13],[0.12,-3.17],[0.16,-3.3],[0.12,-3.63],[0.16,-3.67],[0.04,-3.75],[0.0,-3.67],[-0.41,-3.67],[0.0,-3.67],[0.04,-3.63],[0.0,-3.34],[-0.41,-3.34],[-0.45,-3.17],[-0.66,-3.21],[-0.66,-5.36],[-0.62,-5.4],[0.37,-5.4],[0.45,-4.61],[0.54,-5.4],[1.65,-5.4]],[[-7.25,0.87],[-7.17,0.78],[-6.84,0.82],[-6.51,0.78],[-6.43,0.95],[-6.47,0.99],[-7.21,0.99]],[[-7.09,-0.58],[-6.63,-0.58],[-6.59,-0.54],[-6.59,0.58],[-6.63,0.62],[-7.0,0.62],[-7.09,0.54],[-7.09,-0.25],[-7.13,-0.29]],[[-4.86,-2.06],[-4.74,-2.06],[-4.04,-1.36],[-4.04,-1.19],[-4.24,-0.99],[-4.45,-0.99],[-5.15,-1.69],[-5.15,-1.77]],[[-0.41,-3.25],[0.0,-3.3],[0.04,-3.17],[-0.37,-3.13]],[[-1.32,-3.54],[-1.28,-3.58],[-0.78,-3.58],[-0.7,-3.21],[-1.11,-3.17],[-1.24,-3.3]],[[-7.95,-3.46],[-7.95,-4.12],[-7.91,-4.16],[-7.25,-4.16],[-7.21,-4.04],[-7.83,-3.42]]],[[[-2.02,-9.6],[-2.06,-9.6],[-2.06,-8.61]]],[[[3.83,-9.85],[3.79,-9.48],[3.71,-9.31],[3.71,-8.53],[3.75,-8.49],[3.71,-7.25],[3.79,-7.13],[3.79,-6.59],[3.83,-6.63],[3.83,-7.21],[4.41,-7.29],[4.37,-7.37],[4.37,-9.31],[4.33,-9.35],[4.28,-9.31],[3.87,-9.31],[3.83,-9.35]],[[3.87,-8.03],[4.28,-7.99],[4.33,-7.83],[4.33,-7.37],[4.28,-7.33],[3.87,-7.33],[3.83,-7.37],[3.83,-7.99]],[[3.96,-8.53],[4.2,-8.49],[4.16,-8.12],[3.91,-8.16]],[[3.87,-9.27],[4.28,-9.27],[4.33,-9.23],[4.33,-8.82],[4.24,-8.61],[3.83,-8.65],[3.83,-9.23]]],[[[-2.84,-11.08],[-2.8,-11.0],[-2.84,-9.43],[-2.8,-9.76],[-2.68,-10.05],[-2.68,-11.0],[-2.64,-11.04],[3.79,-11.04],[3.83,-11.0],[3.83,-10.59],[3.83,-11.0],[3.87,-11.04],[8.4,-11.04],[8.45,-11.0],[8.45,-5.03],[8.61,-5.03],[8.61,-11.0],[8.65,-11.04],[9.93,-11.04],[9.97,-11.0],[9.97,-4.53],[10.09,-4.53],[10.09,-11.08],[10.05,-11.12],[3.87,-11.12],[3.83,-11.17],[3.79,-11.12],[-2.68,-11.12],[-2.72,-11.17]]]],"rooms":{"bonus":[[-2.8,-11.08],[3.96,-11.08],[3.96,-5.6],[-2.8,-5.6]],"theater":[[3.96,-11.08],[8.57,-11.08],[8.57,-4.9],[3.96,-4.9]],"gym":[[4.7,-4.9],[10.05,-4.9],[10.05,1.94],[6.84,1.94],[4.78,-0.04],[4.7,-1.69]],"bed14":[[-7.05,-7.75],[-2.8,-7.75],[-2.8,-4.24],[-7.05,-4.24]],"owen":[[-15.74,-3.21],[-9.85,-3.21],[-9.85,2.84],[-15.74,2.84]],"bed18":[[-2.8,0.99],[2.39,0.99],[2.39,6.88],[-2.8,6.88]],"game":[[-11.41,4.57],[-4.37,4.57],[-4.37,11.49],[-11.41,11.49]],"laundry2":[[-10.46,2.84],[-6.14,2.84],[-6.14,4.57],[-10.46,4.57]],"jjbath":[[-6.14,-0.87],[-2.84,-0.87],[-2.84,2.22],[-6.14,2.22]],"hallbath":[[-0.78,-5.6],[0.87,-5.6],[0.87,-2.93],[-0.78,-2.93]],"landing":[[1.69,-4.9],[4.7,-4.9],[4.7,0.99],[1.69,0.99]],"upstairshall":[[-9.85,-3.21],[-7.05,-4.24],[-2.8,-4.24],[-2.8,-5.6],[1.69,-5.6],[1.69,0.99],[-2.8,0.99],[-2.8,2.84],[-9.85,2.84]]},"fixtures":{"bonus":[[-0.72,-10.14],[-2.27,-9.39],[-0.88,-9.83],[0.07,-6.32]],"landing":[[1.93,-3.99],[2.57,-3.95],[1.95,-3.31]],"upstairshall":[[-8.85,-2.9],[-3.09,-1.05],[1.26,-0.97],[1.61,-1.01],[1.68,-0.51],[-9.68,-0.06],[-8.31,-0.21],[1.29,-0.24],[-8.99,1.85]],"owen":[[-13.11,-2.3],[-10.12,-0.84],[-15.25,0.56],[-13.25,0.1],[-12.94,0.41],[-13.31,0.66]],"jjbath":[[-3.55,-0.48],[-3.17,-0.39],[-5.44,1.13],[-5.08,1.13],[-5.96,1.61]],"bed18":[[2.06,3.58]],"laundry2":[[-6.75,3.07],[-7.86,3.51],[-7.35,3.7]],"game":[[-7.6,5.43],[-8.31,5.96],[-9.5,7.52],[-9.89,8.08],[-7.28,9.4],[-7.47,9.81]]},"tvs":[[-2.61,-9.29,1.52,0],[6.38,-4.95,1.65,1],[6.37,-4.54,1.9,1],[-6.5,-4.33,0.7,1],[-10.07,0.21,1.36,0],[-2.86,4.27,1.48,0]]}],"labels":{"foyer":"Foyer","family":"Family Room","gathering":"Gathering Room","breakfast":"Breakfast","kitchen":"Kitchen","pantry":"Pantry","mud":"Mud Room","laundry1":"Laundry","dining":"Dining Room","office":"Office","primary":"Primary Bedroom","primarybath":"Primary Bath","backstairs":"Back Stairs","garage":"Garage","porch":"Front Porch","patio":"Patio","landing":"Landing","upstairshall":"Upstairs Hall","bonus":"Bonus Room","theater":"Theater","gym":"Gym","bed14":"Guest Bedroom","owen":"Owen’s Room","bed18":"Haley’s Bedroom","game":"Pool Table Room","laundry2":"Upstairs Laundry","jjbath":"Bathroom","hallbath":"Hall Bath"}};
/* ───────────────────────── Live 3D house (dollhouse) ─────────────────────────
 * Floors, walls and fixture positions come from HOUSE (traced from Owen's plan).
 * Rooms glow when their lights are on. Tapping a room only selects it; nothing here
 * calls a service.
 */
const HOUSE_VIEWS = {
  all: { r: 62, pol: 1.08, az: -0.5, tx: -1.5, ty: 3.6, tz: 2.4 },
  f1: { r: 46, pol: 0.8, az: -0.5, tx: -1.8, ty: 0, tz: 0.6 },
  f2: { r: 42, pol: 0.8, az: -0.5, tx: -1.8, ty: 3.4, tz: 3.8 },
  top: { r: 44, pol: 0.03, az: 0, tx: -1, ty: 0, tz: 1.8 },
};
const HOUSE_FLOOR_Y = [0, 7.5];      // exploded "all" view
const HOUSE_WALL_H = 1.05;           // cut-away wall height
const GLOW_VS = `varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`;
const GLOW_FS = `
uniform float uOn, uSel, uFade, uNight; uniform vec3 uCol, uSelCol; uniform vec2 uC, uH; varying vec3 vW;
void main(){
  vec2 d = (vW.xz - uC) / uH; float r = length(d);
  float g = uOn * (0.55 + 0.75*uNight) * (1.0 - smoothstep(0.05, 1.25, r)) + uOn * (0.10 + 0.12*uNight);
  float e = max(abs(d.x), abs(d.y));
  float edge = uSel * (0.10 + 0.55 * smoothstep(0.86, 0.99, e));
  vec3 col = uCol * g + uSelCol * edge;
  gl_FragColor = vec4(col, clamp(g + edge, 0.0, 1.0) * uFade);
  #include <colorspace_fragment>
}`;
const FIX_VS = `uniform float uSize; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = min(30.0, uSize * (90.0 / -mv.z)); gl_Position = projectionMatrix * mv; }`;
const FIX_FS = `uniform float uOn, uFade; uniform vec3 uCol;
void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); if(d > 0.5) discard;
  float core = smoothstep(0.18, 0.0, d), halo = smoothstep(0.5, 0.0, d) * 0.45;
  vec3 off = vec3(0.55); float a = mix(core * 0.35, core + halo, uOn);
  gl_FragColor = vec4(mix(off, uCol * 1.4, uOn), a * uFade);
  #include <colorspace_fragment>
}`;

class LuxHouse3D {
  constructor(host, opts) {
    this.host = host; this.opts = opts; this.lbls = host.querySelector('.lbls');
    this.active = false; this.ready = false; this.fps = opts.fps || 30; this.dark = !!opts.dark;
    this.mode = 'all'; this.sel = null; this.state = { rooms: {}, night: false };
    this.cam = { ...HOUSE_VIEWS.all }; this.goal = { ...HOUSE_VIEWS.all }; this.vel = { r: 0, pol: 0, az: 0, tx: 0, ty: 0, tz: 0 };
    this.floors = []; this.glow = {}; this.fix = {}; this.fade = {};
    this._init().catch((e) => { console.error('[lux-house3d]', e); opts.onError && opts.onError('3D view needs an internet connection to load'); });
  }
  async _init() {
    const T = this.T = await import(this.opts.threeUrl);
    const canvas = document.createElement('canvas'); this.host.prepend(canvas); this.canvas = canvas;
    const R = this.renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
    R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    R.outputColorSpace = T.SRGBColorSpace; R.toneMapping = T.ACESFilmicToneMapping;
    R.shadowMap.enabled = true; R.shadowMap.type = T.PCFSoftShadowMap; R.shadowMap.autoUpdate = false;
    this.scene = new T.Scene();
    this.camera = new T.PerspectiveCamera(30, 1, 0.5, 260);
    this._lights(); this._build(); this._input();
    this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this.host);
    this.io = new IntersectionObserver((e) => { this.visible = e[0].isIntersecting; this._loop(); }, { threshold: 0.01 }); this.io.observe(this.host);
    this._vis = () => this._loop(); document.addEventListener('visibilitychange', this._vis);
    this.resize(); this.ready = true; this._applyTheme(true); this.setFloor(this.mode, true);
    R.shadowMap.needsUpdate = true;
    this.opts.onReady && this.opts.onReady(); this._loop();
  }
  _shape(pts, holes = []) {
    const T = this.T; const s = new T.Shape(pts.map(([x, z]) => new T.Vector2(x, -z)));
    holes.forEach((hp) => s.holes.push(new T.Path(hp.map(([x, z]) => new T.Vector2(x, -z)))));
    return s;
  }
  _extrude(shape, bottom, top, mat) {
    const T = this.T; const g = new T.ExtrudeGeometry(shape, { depth: top - bottom, bevelEnabled: false, curveSegments: 6 });
    g.rotateX(-Math.PI / 2); g.translate(0, bottom, 0); const m = new T.Mesh(g, mat); m.castShadow = true; m.receiveShadow = true; return m;
  }
  _lights() {
    const T = this.T; const S = this.scene;
    this.hemi = new T.HemisphereLight(0xe6eef8, 0x6b6f66, 1.7); S.add(this.hemi);
    const d = this.sun = new T.DirectionalLight(0xfff5e8, 2.4); d.position.set(-18, 30, 16); d.castShadow = true;
    d.shadow.mapSize.set(2048, 2048); const c = d.shadow.camera; c.left = -24; c.right = 24; c.top = 22; c.bottom = -22; c.near = 1; c.far = 90;
    d.shadow.bias = -0.0004; d.shadow.normalBias = 0.03; d.shadow.radius = 3; S.add(d); d.target.position.set(0, 0, 1); S.add(d.target);
  }
  _build() {
    const T = this.T; const S = this.scene;
    // soft ground plate
    const base = new T.Mesh(new T.CircleGeometry(24, 64), new T.MeshStandardMaterial({ color: 0x8a9580, roughness: 1, transparent: true, opacity: 0.35 }));
    base.rotation.x = -Math.PI / 2; base.position.y = -0.23; base.receiveShadow = true; S.add(base); this.base = base;
    const zoneCol = { garage: 0xc9cbcc, patio: 0xd9d2c3, porch: 0xd9d2c3 };
    HOUSE.floors.forEach((f, i) => {
      const g = new T.Group(); S.add(g); g.userData = { i, fade: 1, y: HOUSE_FLOOR_Y[i] }; g.position.y = HOUSE_FLOOR_Y[i];
      const mats = {
        slab: new T.MeshStandardMaterial({ color: 0xf7f5f1, roughness: 0.95, transparent: true }),
        slabSide: new T.MeshStandardMaterial({ color: 0xd8d3ca, roughness: 1, transparent: true }),
        wall: new T.MeshStandardMaterial({ color: 0xfbfaf7, roughness: 0.85, transparent: true }),
        wallTop: new T.MeshStandardMaterial({ color: 0xcfcac0, roughness: 0.9, transparent: true }),
      };
      g.userData.mats = mats;
      g.add(this._extrude(this._shape(f.outline), -0.22, 0, [mats.slab, mats.slabSide]));
      for (const [id, poly] of Object.entries(f.rooms)) {
        if (!zoneCol[id]) continue;
        const m = new T.MeshStandardMaterial({ color: zoneCol[id], roughness: 1, transparent: true }); mats['z_' + id] = m;
        const zg = new T.ShapeGeometry(this._shape(poly)); zg.rotateX(-Math.PI / 2);
        const z = new T.Mesh(zg, m); z.position.y = 0.004; z.receiveShadow = true; g.add(z);
      }
      for (const shape of f.walls) {
        const [outer, ...holes] = shape;
        g.add(this._extrude(this._shape(outer, holes), 0, HOUSE_WALL_H, [mats.wallTop, mats.wall]));
      }
      // room glow zones
      for (const [id, poly] of Object.entries(f.rooms)) {
        const xs = poly.map((p) => p[0]), zs = poly.map((p) => p[1]);
        const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cz = (Math.min(...zs) + Math.max(...zs)) / 2;
        const hx = (Math.max(...xs) - Math.min(...xs)) / 2, hz = (Math.max(...zs) - Math.min(...zs)) / 2;
        const mat = new T.ShaderMaterial({ vertexShader: GLOW_VS, fragmentShader: GLOW_FS, transparent: true, depthWrite: false, blending: T.AdditiveBlending,
          uniforms: { uOn: { value: 0 }, uSel: { value: 0 }, uFade: { value: 1 }, uNight: { value: 0 }, uCol: { value: new T.Color('#ffc46b') }, uSelCol: { value: new T.Color('#4c9bff') },
            uC: { value: new T.Vector2(cx, cz) }, uH: { value: new T.Vector2(Math.max(0.8, hx), Math.max(0.8, hz)) } } });
        const gg = new T.ShapeGeometry(this._shape(poly)); gg.rotateX(-Math.PI / 2);
        const mesh = new T.Mesh(gg, mat); mesh.position.y = 0.03; mesh.renderOrder = 3; mesh.userData.room = id; g.add(mesh);
        this.glow[id] = { mat, mesh, floor: i, c: [cx, cz], on: 0, sel: 0 };
        // fixtures from the plan's red marks
        const pts = (f.fixtures[id] || []);
        if (pts.length) {
          const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.Float32BufferAttribute(pts.flatMap(([x, z]) => [x, HOUSE_WALL_H + 0.25, z]), 3));
          const fm = new T.ShaderMaterial({ vertexShader: FIX_VS, fragmentShader: FIX_FS, transparent: true, depthWrite: false,
            uniforms: { uOn: { value: 0 }, uFade: { value: 1 }, uSize: { value: 7 }, uCol: { value: new T.Color('#ffc46b') } } });
          const p = new T.Points(geo, fm); p.renderOrder = 4; p.frustumCulled = false; g.add(p); this.fix[id] = fm;
        }
      }
      // TVs (blue marks): dark slim panels standing on the floor
      const tvMat = new T.MeshStandardMaterial({ color: 0x16181c, roughness: 0.4, metalness: 0.2, transparent: true }); mats.tv = tvMat;
      for (const [x, z, len, horiz] of f.tvs) {
        const L = clamp(len, 0.5, 1.8);
        const m = new T.Mesh(new T.BoxGeometry(horiz ? L : 0.07, 0.62, horiz ? 0.07 : L), tvMat); m.position.set(x, 0.62, z); m.castShadow = true; g.add(m);
      }
      this.floors.push(g);
    });
    this._car();
  }
  _car() {
    // a generic grey sports coupe in the garage
    const T = this.T; const g = new T.Group();
    const prof = [[-2.25, 0.34], [-2.28, 0.62], [-2.05, 0.8], [-1.25, 0.9], [-0.55, 1.2], [0.3, 1.24], [1.0, 0.96], [1.85, 0.8], [2.25, 0.66], [2.25, 0.42], [1.8, 0.32], [-1.8, 0.32]];
    const body = new T.ExtrudeGeometry(new T.Shape(prof.map(([a, b]) => new T.Vector2(a, b))), { depth: 1.62, bevelEnabled: true, bevelSize: 0.1, bevelThickness: 0.12, bevelSegments: 3, curveSegments: 6 });
    body.translate(0, 0, -0.81);
    const paint = new T.MeshStandardMaterial({ color: 0x8e9398, metalness: 0.55, roughness: 0.32 });
    const glass = new T.MeshStandardMaterial({ color: 0x1b2027, metalness: 0.3, roughness: 0.15 });
    const dark = new T.MeshStandardMaterial({ color: 0x17181a, roughness: 0.7 });
    const b = new T.Mesh(body, paint); b.castShadow = true; g.add(b);
    const cab = new T.ExtrudeGeometry(new T.Shape([[-1.2, 0.9], [-0.55, 1.17], [0.28, 1.2], [0.95, 0.95]].map(([a, c]) => new T.Vector2(a, c))), { depth: 1.5, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.1, bevelSegments: 2 });
    cab.translate(0, 0.03, -0.75); g.add(new T.Mesh(cab, glass));
    for (const [x, z] of [[1.42, 0.86], [1.42, -0.86], [-1.38, 0.86], [-1.38, -0.86]]) {
      const w = new T.Mesh(new T.CylinderGeometry(0.34, 0.34, 0.26, 24), dark); w.rotation.x = Math.PI / 2; w.position.set(x, 0.34, z); w.castShadow = true; g.add(w);
    }
    const wing = new T.Mesh(new T.BoxGeometry(0.34, 0.04, 1.6), paint); wing.position.set(-2.0, 1.12, 0); g.add(wing);
    for (const z of [-0.45, 0.45]) { const post = new T.Mesh(new T.BoxGeometry(0.06, 0.26, 0.04), dark); post.position.set(-2.0, 0.98, z); g.add(post); }
    g.scale.setScalar(0.95); g.position.set(-11.4, 0, 1.1);
    this.floors[0].add(g); this.carMats = [paint, glass, dark];
  }
  _input() {
    const c = this.canvas; const ptrs = new Map(); let last = null, hist = [], down = null;
    const now = () => performance.now();
    c.addEventListener('pointerdown', (e) => { c.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); last = null; hist = []; this.dragging = true; down = { x: e.clientX, y: e.clientY, t: now() }; Object.assign(this.goal, this.cam); this._kick(); });
    c.addEventListener('pointermove', (e) => {
      if (!ptrs.has(e.pointerId)) return; const prev = ptrs.get(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptrs.size === 1) {
        const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
        this.cam.az -= dx * 0.006; this.cam.pol = clamp(this.cam.pol - dy * 0.005, 0.03, 1.32);
        hist.push({ t: now(), az: this.cam.az }); if (hist.length > 6) hist.shift();
      } else if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (last) this.cam.r = clamp(this.cam.r * (last / d), 14, 70); last = d; down = null;
      }
      Object.assign(this.goal, this.cam); this._kick();
    });
    const up = (e) => {
      ptrs.delete(e.pointerId); if (ptrs.size) return; this.dragging = false;
      if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 7 && now() - down.t < 450) this._pick(e);
      else if (hist.length > 1) {
        const a = hist[0], b = hist[hist.length - 1]; const dt = Math.max(16, b.t - a.t) / 1000; const v = (b.az - a.az) / dt;
        if (now() - b.t < 80) { this.vel.az = v; this.goal.az = this.cam.az + v * 0.3; }
      }
      down = null; this._kick();
    };
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', () => { ptrs.clear(); this.dragging = false; down = null; });
    c.addEventListener('wheel', (e) => { e.preventDefault(); this.goal.r = clamp(this.goal.r * (1 + e.deltaY * 0.0012), 14, 70); this._kick(); }, { passive: false });
  }
  _pick(e) {
    const T = this.T; const r = this.canvas.getBoundingClientRect();
    const v = new T.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    const ray = new T.Raycaster(); ray.setFromCamera(v, this.camera);
    const meshes = Object.values(this.glow).filter((gw) => this.floors[gw.floor].visible && this.floors[gw.floor].userData.fade > 0.5).map((gw) => gw.mesh);
    const hit = ray.intersectObjects(meshes, false);
    // prefer the upper floor when both are visible and hit, and the smallest room under the pointer
    const id = hit.length ? hit[0].object.userData.room : null;
    this.select(id);
    this.opts.onPick && this.opts.onPick(id);
  }
  select(id) { this.sel = id || null; this._kick(); }
  setFloor(mode, instant) {
    this.mode = mode;
    const v = HOUSE_VIEWS[mode] || HOUSE_VIEWS.all;
    Object.assign(this.goal, v, { az: this.cam.az });
    if (instant) Object.assign(this.cam, this.goal);
    this._kick();
  }
  view(name) { const v = HOUSE_VIEWS[name]; if (!v) return; Object.assign(this.goal, v); this._kick(); }
  setTheme(dark) { this.dark = dark; this._applyTheme(true); }
  setState(s) { this.state = s || { rooms: {} }; if (this.ready) this._applyTheme(); this._kick(); }
  _applyTheme(force) {
    if (!this.ready) return; const night = !!this.state.night;
    if (!force && this._night === night) return; this._night = night;
    this.hemi.color.set(night ? 0x2a3550 : 0xe6eef8); this.hemi.groundColor.set(night ? 0x0c0e12 : 0x6b6f66); this.hemi.intensity = night ? 1.0 : 1.7;
    this.sun.color.set(night ? 0x9fb4e0 : 0xfff5e8); this.sun.intensity = night ? 0.45 : 2.4;
    this.renderer.toneMappingExposure = night ? 1.05 : (this.dark ? 0.95 : 1.0);
    this.renderer.shadowMap.needsUpdate = true;
  }
  resize() {
    if (!this.renderer) return; const r = this.host.getBoundingClientRect(); if (!r.width || !r.height) return;
    this.renderer.setSize(r.width, r.height, false); this.camera.aspect = r.width / r.height; this.camera.updateProjectionMatrix(); this._kick();
  }
  setActive(on) { this.active = on; this._loop(); }
  _kick() { this._loop(); }
  _loop() {
    const run = this.ready && this.active && this.visible !== false && !document.hidden;
    if (!run) { cancelAnimationFrame(this._raf); this._raf = null; this._last = null; return; }
    if (this._raf) return;
    const step = (now) => {
      this._raf = null;
      if (!(this.ready && this.active && this.visible !== false && !document.hidden)) return;
      if (this._idle && !this.dragging) { this._last = null; return; }   // nothing moving: stop drawing until the next kick
      this._raf = requestAnimationFrame(step);
      if (this._last && now - this._last < 1000 / this.fps - 2) return;
      const dt = Math.min(0.05, this._last ? (now - this._last) / 1000 : 0.016); this._last = now;
      this._frame(dt);
    };
    this._idle = false; this._raf = requestAnimationFrame(step);
  }
  _frame(dt) {
    let moving = false;
    // camera spring (critically damped, response ≈ .55 s)
    const resp = 0.55, k = Math.pow((2 * Math.PI) / resp, 2), c = (4 * Math.PI) / resp;
    for (const key of ['r', 'pol', 'az', 'tx', 'ty', 'tz']) {
      if (this.dragging && (key === 'az' || key === 'pol' || key === 'r')) continue;
      const x = this.cam[key] - this.goal[key]; const v = this.vel[key];
      this.vel[key] = v + (-k * x - c * v) * dt; this.cam[key] += this.vel[key] * dt;
      if (Math.abs(x) > 0.0005 || Math.abs(this.vel[key]) > 0.0005) moving = true;
    }
    const C = this.cam, cam = this.camera; const r = C.r * Math.max(0.8, 0.95 / Math.max(0.4, cam.aspect));
    cam.position.set(C.tx + r * Math.sin(C.pol) * Math.sin(C.az), C.ty + r * Math.cos(C.pol), C.tz + r * Math.sin(C.pol) * Math.cos(C.az));
    cam.lookAt(C.tx, C.ty, C.tz);
    // floors: fade in/out per mode
    const want = { all: [1, 1], f1: [1, 0], f2: [0.12, 1] }[this.mode] || [1, 1];
    const wantY = this.mode === 'f2' ? [0, 3.4] : HOUSE_FLOOR_Y;
    this.floors.forEach((g, i) => {
      const u = g.userData; const f0 = u.fade; u.fade += (want[i] - u.fade) * Math.min(1, dt * 6);
      const y0 = g.position.y; g.position.y += (wantY[i] - g.position.y) * Math.min(1, dt * 6);
      if (Math.abs(u.fade - f0) > 0.001 || Math.abs(g.position.y - y0) > 0.001) moving = true;
      g.visible = u.fade > 0.02;
      for (const m of Object.values(u.mats)) { m.opacity = u.fade; m.depthWrite = u.fade > 0.9; }
      if (i === 0 && this.carMats) this.carMats.forEach((m) => { m.transparent = u.fade < 0.99; m.opacity = u.fade; });
    });
    // rooms
    const rooms = this.state.rooms || {}; const night = this.state.night ? 1 : 0;
    for (const [id, gw] of Object.entries(this.glow)) {
      const st = rooms[id]; const on = st && st.on ? 1 : 0; const sel = this.sel === id ? 1 : 0;
      const u = gw.mat.uniforms; const fadeF = this.floors[gw.floor].userData.fade;
      const o0 = u.uOn.value, s0 = u.uSel.value;
      u.uOn.value += (on - u.uOn.value) * Math.min(1, dt * 4); u.uSel.value += (sel - u.uSel.value) * Math.min(1, dt * 7);
      u.uFade.value = fadeF; u.uNight.value = night;
      if (st && st.rgb) u.uCol.value.setRGB(st.rgb[0] / 255, st.rgb[1] / 255, st.rgb[2] / 255, this.T.SRGBColorSpace);
      if (Math.abs(u.uOn.value - o0) > 0.002 || Math.abs(u.uSel.value - s0) > 0.002) moving = true;
      const fm = this.fix[id]; if (fm) { fm.uniforms.uOn.value = u.uOn.value; fm.uniforms.uFade.value = fadeF; fm.uniforms.uCol.value.copy(u.uCol.value); }
    }
    this.renderer.render(this.scene, cam);
    this._labels();
    this._idle = !moving;
  }
  _labels() {
    const T = this.T; const cam = this.camera; const W = this.host.clientWidth, H = this.host.clientHeight;
    const rooms = this.state.rooms || {}; const names = this.opts.names || {};
    this._tags = this._tags || {}; const seen = new Set(); const v = new T.Vector3();
    for (const [id, gw] of Object.entries(this.glow)) {
      const st = rooms[id]; const g = this.floors[gw.floor];
      if (!(g.userData.fade > 0.5) || !((st && st.on) || this.sel === id)) continue;
      seen.add(id);
      let el = this._tags[id]; if (!el) { el = this._tags[id] = document.createElement('div'); el.className = 'tag'; this.lbls.appendChild(el); }
      const html = `${esc(names[id] || HOUSE.labels[id] || id)}${st && st.on ? ` <span style="opacity:.6;font-weight:600">${st.on}</span>` : ''}`;
      if (el._h !== html) { el.innerHTML = html; el._h = html; }
      el.classList.toggle('cool', this.sel === id);
      v.set(gw.c[0], g.position.y + HOUSE_WALL_H + 0.7, gw.c[1]).project(cam);
      const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
      el.style.opacity = v.z < 1 && x > 40 && x < W - 40 && y > 90 && y < H - 60 ? '1' : '0';
      el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-100%)`;
    }
    for (const k in this._tags) if (!seen.has(k)) { this._tags[k].remove(); delete this._tags[k]; }
  }
  dispose() {
    this.active = false; cancelAnimationFrame(this._raf);
    this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); document.removeEventListener('visibilitychange', this._vis);
    if (this.renderer) { this.scene.traverse((o) => { o.geometry && o.geometry.dispose(); }); this.renderer.dispose(); this.renderer.forceContextLoss && this.renderer.forceContextLoss(); }
    this.canvas && this.canvas.remove();
  }
}
/* ───────────────────────── Register ───────────────────────── */
if (!customElements.get('lux-home-card')) {
  customElements.define('lux-home-card', LuxHomeCard);
  window.customCards = window.customCards || [];
  window.customCards.push({ type: 'lux-home-card', name: 'Lux Home', description: 'Premium full-screen home dashboard with a live 3D pool.', preview: false });
  console.info(`%c LUX HOME %c ${LUX_VERSION} `, 'background:#111;color:#fff;border-radius:4px 0 0 4px;padding:2px 6px', 'background:#0a84ff;color:#fff;border-radius:0 4px 4px 0;padding:2px 6px');
}
