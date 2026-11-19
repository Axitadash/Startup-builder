import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Palette, Wand2, PenTool, Download, Save, RefreshCw, RotateCcw, RotateCw,
  Sparkles, Check, ChevronDown, Eye, Lightbulb, X, Rocket, Zap, Leaf,
  ShoppingBag, Heart, BookOpen, Coffee, Music, Camera, Code2, Globe,
  TrendingUp, Shield, Star, Sun, Moon, Triangle, Circle, Square, Hexagon,
  Diamond, Feather, Flame, Droplets, Wind, Award, Layers, Grid3x3
} from 'lucide-react';

// ─────────────────────────────────────────────
// INDUSTRY → DESIGN MAPPING
// ─────────────────────────────────────────────
const INDUSTRY_PALETTES = {
  tech: { primary: '#4f46e5', secondary: '#7c3aed', accent: '#06b6d4', name: 'Tech Indigo' },
  saas: { primary: '#2563eb', secondary: '#7c3aed', accent: '#10b981', name: 'SaaS Blue' },
  ai: { primary: '#6d28d9', secondary: '#db2777', accent: '#f59e0b', name: 'AI Violet' },
  food: { primary: '#dc2626', secondary: '#d97706', accent: '#16a34a', name: 'Food Warm' },
  health: { primary: '#059669', secondary: '#0284c7', accent: '#7c3aed', name: 'Health Green' },
  finance: { primary: '#1e40af', secondary: '#065f46', accent: '#d97706', name: 'Finance Navy' },
  education: { primary: '#7c3aed', secondary: '#db2777', accent: '#059669', name: 'Education Purple' },
  ecommerce: { primary: '#f97316', secondary: '#ec4899', accent: '#4f46e5', name: 'Commerce Orange' },
  agency: { primary: '#0f172a', secondary: '#475569', accent: '#6366f1', name: 'Agency Dark' },
  default: { primary: '#4f46e5', secondary: '#7c3aed', accent: '#06b6d4', name: 'Brand Indigo' },
};

const STYLE_CONFIGS = [
  { id: 'minimalist', label: 'Minimalist', desc: 'Clean lines, negative space', font: 'Inter', iconSize: 36, textWeight: 300, radius: 0 },
  { id: 'modern',     label: 'Modern',     desc: 'Bold, geometric precision',  font: 'Space Grotesk', iconSize: 42, textWeight: 700, radius: 8 },
  { id: 'luxury',     label: 'Luxury',     desc: 'Elegant, premium feel',       font: 'Playfair Display', iconSize: 32, textWeight: 400, radius: 4 },
  { id: 'corporate',  label: 'Corporate',  desc: 'Professional & trustworthy',  font: 'Roboto', iconSize: 38, textWeight: 500, radius: 6 },
  { id: 'creative',   label: 'Creative',   desc: 'Vibrant, expressive energy',  font: 'Poppins', iconSize: 48, textWeight: 800, radius: 20 },
  { id: 'abstract',   label: 'Abstract',   desc: 'Artistic, conceptual form',   font: 'Outfit', iconSize: 44, textWeight: 600, radius: 50 },
];

const COLOR_PALETTES = [
  { name: 'Indigo Pro',    primary: '#4f46e5', secondary: '#7c3aed', bg: '#ffffff' },
  { name: 'Emerald Fresh', primary: '#059669', secondary: '#0284c7', bg: '#ffffff' },
  { name: 'Rose Bold',     primary: '#e11d48', secondary: '#db2777', bg: '#ffffff' },
  { name: 'Amber Warm',    primary: '#d97706', secondary: '#dc2626', bg: '#ffffff' },
  { name: 'Ocean Deep',    primary: '#0284c7', secondary: '#0891b2', bg: '#ffffff' },
  { name: 'Violet Night',  primary: '#7c3aed', secondary: '#db2777', bg: '#0f172a' },
  { name: 'Slate Dark',    primary: '#94a3b8', secondary: '#cbd5e1', bg: '#0f172a' },
  { name: 'Forest Life',   primary: '#16a34a', secondary: '#065f46', bg: '#f0fdf4' },
  { name: 'Coral Warm',    primary: '#f97316', secondary: '#ef4444', bg: '#fff7ed' },
  { name: 'Steel Clean',   primary: '#1e40af', secondary: '#1d4ed8', bg: '#eff6ff' },
  { name: 'Purple Mist',   primary: '#a855f7', secondary: '#ec4899', bg: '#faf5ff' },
  { name: 'Monochrome',    primary: '#0f172a', secondary: '#475569', bg: '#f8fafc' },
];

const FONT_OPTIONS = [
  'Space Grotesk', 'Inter', 'Plus Jakarta Sans', 'Poppins', 'Outfit',
  'Roboto', 'Playfair Display', 'Montserrat',
];

const LAYOUTS = [
  { id: 'icon-left',  label: 'Icon + Text (Horizontal)' },
  { id: 'icon-top',   label: 'Icon + Text (Vertical)' },
  { id: 'text-only',  label: 'Text Only' },
  { id: 'emblem',     label: 'Emblem / Badge' },
];

// All available icons mapped with lucide components
const ICON_OPTIONS = [
  { id: 'rocket',   label: 'Rocket',    Icon: Rocket },
  { id: 'zap',      label: 'Zap',       Icon: Zap },
  { id: 'leaf',     label: 'Leaf',      Icon: Leaf },
  { id: 'bag',      label: 'Shopping',  Icon: ShoppingBag },
  { id: 'heart',    label: 'Heart',     Icon: Heart },
  { id: 'book',     label: 'Education', Icon: BookOpen },
  { id: 'coffee',   label: 'Coffee',    Icon: Coffee },
  { id: 'music',    label: 'Music',     Icon: Music },
  { id: 'camera',   label: 'Camera',    Icon: Camera },
  { id: 'code',     label: 'Tech',      Icon: Code2 },
  { id: 'globe',    label: 'Global',    Icon: Globe },
  { id: 'trend',    label: 'Growth',    Icon: TrendingUp },
  { id: 'shield',   label: 'Security',  Icon: Shield },
  { id: 'star',     label: 'Premium',   Icon: Star },
  { id: 'sun',      label: 'Energy',    Icon: Sun },
  { id: 'moon',     label: 'Night',     Icon: Moon },
  { id: 'triangle', label: 'Triangle',  Icon: Triangle },
  { id: 'circle',   label: 'Circle',    Icon: Circle },
  { id: 'square',   label: 'Square',    Icon: Square },
  { id: 'hex',      label: 'Hexagon',   Icon: Hexagon },
  { id: 'diamond',  label: 'Diamond',   Icon: Diamond },
  { id: 'feather',  label: 'Feather',   Icon: Feather },
  { id: 'flame',    label: 'Flame',     Icon: Flame },
  { id: 'drop',     label: 'Water',     Icon: Droplets },
  { id: 'wind',     label: 'Wind',      Icon: Wind },
  { id: 'award',    label: 'Award',     Icon: Award },
  { id: 'layers',   label: 'Layers',    Icon: Layers },
  { id: 'grid',     label: 'Grid',      Icon: Grid3x3 },
  { id: 'palette',  label: 'Design',    Icon: Palette },
  { id: 'sparkles', label: 'AI Magic',  Icon: Sparkles },
];

// ─────────────────────────────────────────────
// HELPER: Get industry key from domain/industry string
// ─────────────────────────────────────────────
function getIndustryKey(domain = '') {
  const d = domain.toLowerCase();
  if (d.includes('food') || d.includes('kitchen') || d.includes('bakery') || d.includes('cafe')) return 'food';
  if (d.includes('health') || d.includes('wellness') || d.includes('fitness')) return 'health';
  if (d.includes('finance') || d.includes('fintech') || d.includes('bank')) return 'finance';
  if (d.includes('edu') || d.includes('learn') || d.includes('school')) return 'education';
  if (d.includes('shop') || d.includes('ecommerce') || d.includes('store')) return 'ecommerce';
  if (d.includes('agency') || d.includes('service') || d.includes('consult')) return 'agency';
  if (d.includes('ai') || d.includes('saas') || d.includes('platform')) return 'ai';
  if (d.includes('tech') || d.includes('software') || d.includes('app')) return 'tech';
  return 'default';
}

// Generate 5 concept configs deterministically from startup data
function generateConcepts(brandName, domain) {
  const industryKey = getIndustryKey(domain);
  const palette = INDUSTRY_PALETTES[industryKey];
  const altPalettes = COLOR_PALETTES.filter(p => p.primary !== palette.primary);

  const iconPool = {
    tech: ['rocket', 'code', 'zap', 'globe', 'layers'],
    ai: ['sparkles', 'zap', 'hex', 'rocket', 'grid'],
    food: ['coffee', 'leaf', 'flame', 'drop', 'heart'],
    health: ['leaf', 'heart', 'drop', 'sun', 'shield'],
    finance: ['trend', 'shield', 'diamond', 'star', 'award'],
    education: ['book', 'sparkles', 'star', 'globe', 'layers'],
    ecommerce: ['bag', 'star', 'heart', 'award', 'diamond'],
    agency: ['triangle', 'hex', 'layers', 'palette', 'grid'],
    saas: ['grid', 'layers', 'code', 'globe', 'zap'],
    default: ['rocket', 'sparkles', 'star', 'zap', 'globe'],
  };
  const icons = iconPool[industryKey] || iconPool.default;

  return STYLE_CONFIGS.map((style, i) => {
    const pal = i < 3
      ? { primary: palette.primary, secondary: palette.secondary, bg: i === 2 ? '#0f172a' : '#ffffff' }
      : altPalettes[i % altPalettes.length];
    return {
      style: style.id,
      styleLabel: style.label,
      styleDesc: style.desc,
      font: style.font,
      iconType: icons[i % icons.length],
      layout: i === 3 ? 'emblem' : i === 4 ? 'icon-top' : 'icon-left',
      primaryColor: pal.primary,
      secondaryColor: pal.secondary || pal.primary,
      bgColor: pal.bg || '#ffffff',
      iconSize: style.iconSize,
      textWeight: style.textWeight,
      radius: style.radius,
      brandName,
      tagline: '',
    };
  });
}

// ─────────────────────────────────────────────
// SVG LOGO RENDERER
// ─────────────────────────────────────────────
function LogoSVG({ config, size = 300 }) {
  const { brandName = 'Brand', tagline = '', primaryColor = '#4f46e5',
    secondaryColor = '#7c3aed', bgColor = '#ffffff', font = 'Space Grotesk',
    iconType = 'rocket', layout = 'icon-left', iconSize = 42,
    textWeight = 700, radius = 8 } = config;

  const IconComp = ICON_OPTIONS.find(i => i.id === iconType)?.Icon || Rocket;
  const isEmblem = layout === 'emblem';
  const isTop = layout === 'icon-top';
  const isTextOnly = layout === 'text-only';
  const isIconLeft = layout === 'icon-left';

  const scaledIcon = Math.round(iconSize * (size / 300));
  const fontSize = Math.round((size / 300) * (isEmblem ? 20 : 24));
  const taglineFontSize = Math.round((size / 300) * 11);
  const pad = Math.round(size * 0.08);

  // Gradient id must be unique per render
  const gradId = `lg_${primaryColor.replace('#','')}_${secondaryColor.replace('#','')}`;

  if (isEmblem) {
    const r = Math.round(size * 0.12);
    const cx = size / 2, cy = size / 2;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
        <rect width={size} height={size} fill={bgColor} />
        <circle cx={cx} cy={cy} r={size * 0.44} fill={`url(#${gradId})`} opacity="0.12" />
        <circle cx={cx} cy={cy} r={size * 0.4} fill="none" stroke={primaryColor} strokeWidth={size * 0.025} opacity="0.3" />
        <circle cx={cx} cy={cy} r={size * 0.35} fill={`url(#${gradId})`} />
        <foreignObject x={cx - scaledIcon/2} y={cy - scaledIcon/2 - fontSize/1.2} width={scaledIcon} height={scaledIcon}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%' }}>
            <IconComp size={scaledIcon} color="#ffffff" strokeWidth={1.5} />
          </div>
        </foreignObject>
        <text x={cx} y={cy + scaledIcon/2 + fontSize * 0.2} textAnchor="middle" fontFamily={font + ', sans-serif'} fontWeight={textWeight} fontSize={fontSize} fill="#ffffff" letterSpacing="-0.02em">{brandName.toUpperCase()}</text>
      </svg>
    );
  }

  if (isTextOnly) {
    return (
      <svg width={size} height={size/2.5} viewBox={`0 0 ${size} ${size/2.5}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
        <rect width={size} height={size/2.5} fill={bgColor} />
        <text x={size/2} y={size/2.5 * 0.6} textAnchor="middle" fontFamily={font + ', sans-serif'} fontWeight={textWeight} fontSize={fontSize * 1.4} fill={`url(#${gradId})`} letterSpacing="-0.03em">{brandName}</text>
        {tagline && <text x={size/2} y={size/2.5 * 0.88} textAnchor="middle" fontFamily={font + ', sans-serif'} fontWeight={400} fontSize={taglineFontSize} fill={primaryColor} opacity="0.65">{tagline}</text>}
      </svg>
    );
  }

  if (isTop) {
    const h = size * 0.72;
    return (
      <svg width={size} height={h} viewBox={`0 0 ${size} ${h}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
        <rect width={size} height={h} fill={bgColor} />
        <rect x={(size - scaledIcon - pad*0.6)/2} y={pad*0.5} width={scaledIcon + pad*0.6} height={scaledIcon + pad*0.6} rx={radius} fill={`url(#${gradId})`} />
        <foreignObject x={(size - scaledIcon)/2} y={pad*0.5 + pad*0.3} width={scaledIcon} height={scaledIcon}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%' }}>
            <IconComp size={scaledIcon} color="#ffffff" strokeWidth={1.5} />
          </div>
        </foreignObject>
        <text x={size/2} y={pad*0.5 + scaledIcon + pad*0.6 + fontSize*1.1} textAnchor="middle" fontFamily={font + ', sans-serif'} fontWeight={textWeight} fontSize={fontSize} fill={bgColor === '#ffffff' ? '#0f172a' : '#ffffff'} letterSpacing="-0.02em">{brandName}</text>
        {tagline && <text x={size/2} y={pad*0.5 + scaledIcon + pad*0.6 + fontSize*2.1} textAnchor="middle" fontFamily={font + ', sans-serif'} fontWeight={400} fontSize={taglineFontSize} fill={primaryColor} opacity="0.7">{tagline}</text>}
      </svg>
    );
  }

  // Default: icon-left
  const totalH = Math.max(scaledIcon + pad, fontSize * 2.5 + pad);
  const w = size;
  return (
    <svg width={w} height={totalH} viewBox={`0 0 ${w} ${totalH}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      <rect width={w} height={totalH} fill={bgColor} />
      <rect x={pad/2} y={(totalH - scaledIcon - 12)/2} width={scaledIcon + 12} height={scaledIcon + 12} rx={radius} fill={`url(#${gradId})`} />
      <foreignObject x={pad/2 + 6} y={(totalH - scaledIcon)/2} width={scaledIcon} height={scaledIcon}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%' }}>
          <IconComp size={scaledIcon} color="#ffffff" strokeWidth={1.5} />
        </div>
      </foreignObject>
      <text x={pad/2 + scaledIcon + 22} y={totalH/2 - (tagline ? fontSize*0.3 : 0)} dominantBaseline="middle" fontFamily={font + ', sans-serif'} fontWeight={textWeight} fontSize={fontSize} fill={bgColor === '#ffffff' || bgColor === '#f8fafc' || bgColor === '#eff6ff' || bgColor === '#fff7ed' || bgColor === '#f0fdf4' || bgColor === '#faf5ff' ? '#0f172a' : '#ffffff'} letterSpacing="-0.02em">{brandName}</text>
      {tagline && <text x={pad/2 + scaledIcon + 22} y={totalH/2 + fontSize*0.65} fontFamily={font + ', sans-serif'} fontWeight={400} fontSize={taglineFontSize} fill={primaryColor} opacity="0.75">{tagline}</text>}
    </svg>
  );
}

// ─────────────────────────────────────────────
// DOWNLOAD HELPER
// ─────────────────────────────────────────────
function downloadSVGasPNG(svgEl, filename = 'logo.png', scale = 2) {
  if (!svgEl) return;
  const svgData = new XMLSerializer().serializeToString(svgEl);
  const w = svgEl.viewBox.baseVal.width || svgEl.width.baseVal.value;
  const h = svgEl.viewBox.baseVal.height || svgEl.height.baseVal.value;
  const canvas = document.createElement('canvas');
  canvas.width = w * scale; canvas.height = h * scale;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = filename;
    a.click();
  };
  img.src = url;
}

function downloadSVG(svgEl, filename = 'logo.svg') {
  if (!svgEl) return;
  const svgData = new XMLSerializer().serializeToString(svgEl);
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ─────────────────────────────────────────────
// SUGGESTION PANEL
// ─────────────────────────────────────────────
function SmartSuggestions({ domain, onApply }) {
  const industryKey = getIndustryKey(domain);
  const palette = INDUSTRY_PALETTES[industryKey];
  const iconPool = {
    tech: ['rocket','code','layers'], ai: ['sparkles','zap','hex'],
    food: ['coffee','leaf','flame'], health: ['leaf','heart','drop'],
    finance: ['trend','shield','diamond'], education: ['book','sparkles','star'],
    ecommerce: ['bag','star','heart'], agency: ['triangle','hex','layers'],
    default: ['rocket','sparkles','star'],
  };
  const suggestedIcons = (iconPool[industryKey] || iconPool.default).map(id => ICON_OPTIONS.find(i => i.id === id)).filter(Boolean);
  const suggestedFonts = ['Space Grotesk', 'Plus Jakarta Sans', 'Outfit'];

  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.04), rgba(124,58,237,0.04))', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '16px', padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Sparkles size={16} color="#6366f1" />
        <span style={{ fontWeight: 800, color: '#4338ca', fontSize: '0.9rem' }}>Smart AI Suggestions</span>
        <span style={{ fontSize: '0.72rem', color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '0.1rem 0.5rem', borderRadius: '99px', fontWeight: 700 }}>
          {palette.name}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Suggested Palette */}
        <div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Recommended Palette</div>
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: palette.primary }} title={palette.primary} />
            <div style={{ width: 28, height: 28, borderRadius: 8, background: palette.secondary }} title={palette.secondary} />
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#ffffff', border: '1px solid #e2e8f0' }} />
            <button
              onClick={() => onApply({ primaryColor: palette.primary, secondaryColor: palette.secondary, bgColor: '#ffffff' })}
              style={{ marginLeft: '0.25rem', background: 'rgba(79,70,229,0.1)', border: 'none', borderRadius: '8px', padding: '0.3rem 0.7rem', color: '#4338ca', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700 }}
            >Apply →</button>
          </div>
        </div>

        {/* Suggested Icons */}
        <div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Best Icons for {industryKey}</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {suggestedIcons.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => onApply({ iconType: id })} style={{ background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', borderRadius: '10px', padding: '0.45rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', minWidth: '50px' }}>
                <Icon size={18} color="#4f46e5" />
                <span style={{ fontSize: '0.65rem', color: '#4338ca', fontWeight: 700 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Fonts */}
        <div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Top Font Pairings</div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {suggestedFonts.map(f => (
              <button key={f} onClick={() => onApply({ font: f })} style={{ background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.15)', borderRadius: '8px', padding: '0.3rem 0.6rem', fontSize: '0.78rem', color: '#4338ca', cursor: 'pointer', fontFamily: f + ', sans-serif', fontWeight: 700 }}>{f}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function BrandLogoPage() {
  const { selectedIdea, user, saveLogo, showToast, setActivePage, setIsBrandLogoModalOpen } = useAuth();

  const initMode = sessionStorage.getItem('logoInitMode') || 'ai';
  const [activeTab, setActiveTab] = useState(initMode); // 'ai' | 'diy'
  const [selectedConceptIdx, setSelectedConceptIdx] = useState(0);
  const [concepts, setConcepts] = useState([]);
  const [regeneratingIdx, setRegeneratingIdx] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // DIY state
  const [diy, setDiy] = useState({
    brandName: '', tagline: '',
    primaryColor: '#4f46e5', secondaryColor: '#7c3aed', bgColor: '#ffffff',
    font: 'Space Grotesk', iconType: 'rocket', layout: 'icon-left',
    iconSize: 42, textWeight: 700,
  });
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const selectedSvgRef = useRef(null);
  const diyPreviewSvgRef = useRef(null);

  const brandName = selectedIdea?.title || user?.startupName || 'My Brand';
  const domain = selectedIdea?.domain || 'Technology';

  useEffect(() => {
    const generatedConcepts = generateConcepts(brandName, domain);
    setConcepts(generatedConcepts);
    setDiy(prev => ({ ...prev, brandName }));
  }, [brandName, domain]);

  // ─── DIY undo/redo helpers ───
  const pushHistory = useCallback((newState) => {
    setHistory(h => [...h.slice(-29), newState]);
    setFuture([]);
  }, []);

  const updateDiy = useCallback((updates) => {
    setDiy(prev => {
      pushHistory(prev);
      return { ...prev, ...updates };
    });
  }, [pushHistory]);

  const undo = () => {
    if (history.length === 0) return;
    setFuture(f => [diy, ...f]);
    const prev = history[history.length - 1];
    setDiy(prev);
    setHistory(h => h.slice(0, -1));
  };

  const redo = () => {
    if (future.length === 0) return;
    pushHistory(diy);
    setDiy(future[0]);
    setFuture(f => f.slice(1));
  };

  const reset = () => {
    pushHistory(diy);
    setDiy({ brandName, tagline: '', primaryColor: '#4f46e5', secondaryColor: '#7c3aed', bgColor: '#ffffff', font: 'Space Grotesk', iconType: 'rocket', layout: 'icon-left', iconSize: 42, textWeight: 700 });
  };

  // ─── Regenerate a single AI concept ───
  const regenerateConcept = (idx) => {
    setRegeneratingIdx(idx);
    setTimeout(() => {
      const newConcepts = [...concepts];
      const all = generateConcepts(brandName + '_' + Date.now(), domain);
      newConcepts[idx] = { ...all[idx], brandName };
      setConcepts(newConcepts);
      setRegeneratingIdx(null);
    }, 700);
  };

  const handleSave = (config) => {
    saveLogo({
      brand_name: config.brandName || brandName,
      tagline: config.tagline || '',
      style: config.style || config.styleLabel || 'Custom',
      primary_color: config.primaryColor,
      secondary_color: config.secondaryColor,
      bg_color: config.bgColor,
      font_family: config.font,
      icon_type: config.iconType,
      layout: config.layout,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const selectedConcept = concepts[selectedConceptIdx];

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* ── Page Header ── */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #d946ef 100%)',
        borderRadius: '24px', padding: '2rem 2.25rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '99px', padding: '0.25rem 0.8rem', color: '#fff', fontSize: '0.78rem', fontWeight: 700 }}>
              🎨 AI Branding Studio
            </span>
            <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '99px', padding: '0.25rem 0.8rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.78rem', fontWeight: 600 }}>
              {domain}
            </span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, margin: 0 }}>Create Your Brand Logo</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', margin: '0.3rem 0 0' }}>
            Designing for <strong>{brandName}</strong> · Professional brand identity in minutes
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => setIsBrandLogoModalOpen(true)} className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
            <X size={15} /> Change Mode
          </button>
          {isSaved && (
            <div className="btn" style={{ background: 'rgba(5,150,105,0.9)', color: '#fff', border: 'none' }}>
              <Check size={15} /> Logo Saved!
            </div>
          )}
        </div>
      </div>

      {/* ── Tab Switcher ── */}
      <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.4rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
        <button
          id="tab-ai-logos"
          onClick={() => setActiveTab('ai')}
          style={{
            flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: activeTab === 'ai' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'ai' ? '#fff' : '#475569',
            fontWeight: 700, fontSize: '0.92rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transition: 'all 0.2s', fontFamily: 'var(--font-sans)'
          }}
        >
          <Wand2 size={16} /> AI-Generated Logos
        </button>
        <button
          id="tab-diy-designer"
          onClick={() => setActiveTab('diy')}
          style={{
            flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: activeTab === 'diy' ? 'linear-gradient(135deg, #059669 0%, #0284c7 100%)' : 'transparent',
            color: activeTab === 'diy' ? '#fff' : '#475569',
            fontWeight: 700, fontSize: '0.92rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transition: 'all 0.2s', fontFamily: 'var(--font-sans)'
          }}
        >
          <PenTool size={16} /> DIY Logo Designer
        </button>
      </div>

      {/* ══════════════════════════════════════════
          TAB 1 — AI GENERATED LOGOS
      ══════════════════════════════════════════ */}
      {activeTab === 'ai' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>5 AI-Generated Logo Concepts</h2>
              <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '0.2rem' }}>Each tailored to <strong>{brandName}</strong> · Click any logo to select it</p>
            </div>
            <button
              id="btn-regenerate-all"
              onClick={() => { const c = generateConcepts(brandName + '_' + Date.now(), domain); setConcepts(c); setSelectedConceptIdx(0); showToast('All 5 logo concepts regenerated!'); }}
              className="btn btn-secondary"
            >
              <RefreshCw size={15} /> Regenerate All
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {concepts.map((concept, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedConceptIdx(idx)}
                style={{
                  background: '#fff', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
                  border: selectedConceptIdx === idx ? '2.5px solid #6366f1' : '1.5px solid #e2e8f0',
                  boxShadow: selectedConceptIdx === idx ? '0 10px 30px rgba(99,102,241,0.2)' : '0 2px 10px rgba(15,23,42,0.05)',
                  transition: 'all 0.25s ease', transform: selectedConceptIdx === idx ? 'translateY(-3px)' : 'none'
                }}
              >
                {/* Style Badge */}
                <div style={{ padding: '0.9rem 1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4338ca', background: 'rgba(79,70,229,0.1)', padding: '0.2rem 0.6rem', borderRadius: '99px', border: '1px solid rgba(79,70,229,0.2)' }}>
                    {concept.styleLabel}
                  </span>
                  {selectedConceptIdx === idx && (
                    <span style={{ background: '#4f46e5', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={13} color="#fff" />
                    </span>
                  )}
                </div>

                {/* Logo Preview */}
                <div style={{ padding: '1.25rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '110px', background: concept.bgColor, margin: '0.75rem', borderRadius: '14px' }}>
                  {regeneratingIdx === idx ? (
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Generating...</div>
                  ) : (
                    <LogoSVG config={concept} size={240} />
                  )}
                </div>

                {/* Color chips + font */}
                <div style={{ padding: '0 1rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: concept.primaryColor }} />
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: concept.secondaryColor }} />
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: concept.bgColor, border: '1px solid #e2e8f0' }} />
                  <span style={{ fontSize: '0.72rem', color: '#64748b', marginLeft: 'auto', fontStyle: 'italic' }}>{concept.font}</span>
                </div>

                {/* Desc */}
                <p style={{ padding: '0 1rem 0.6rem', fontSize: '0.78rem', color: '#64748b', margin: 0 }}>{concept.styleDesc}</p>

                {/* Actions */}
                <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.5rem' }}>
                  <button
                    id={`btn-select-concept-${idx}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedConceptIdx(idx); }}
                    style={{
                      flex: 1, padding: '0.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', fontFamily: 'var(--font-sans)',
                      background: selectedConceptIdx === idx ? '#4f46e5' : 'rgba(79,70,229,0.08)',
                      color: selectedConceptIdx === idx ? '#fff' : '#4338ca',
                      transition: 'all 0.2s'
                    }}
                  >
                    {selectedConceptIdx === idx ? '✓ Selected' : 'Select'}
                  </button>
                  <button
                    id={`btn-regen-concept-${idx}`}
                    onClick={(e) => { e.stopPropagation(); regenerateConcept(idx); }}
                    style={{ padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer', background: '#fff', color: '#64748b', fontFamily: 'var(--font-sans)' }}
                    title="Regenerate this style"
                  >
                    <RefreshCw size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Preview + Download */}
          {selectedConcept && (
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                  Selected Logo Preview
                </div>
                <div style={{ background: selectedConcept.bgColor, borderRadius: '16px', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #e2e8f0', minHeight: '160px' }}>
                  <div ref={el => { if (el) selectedSvgRef.current = el.querySelector('svg'); }}>
                    <LogoSVG config={{ ...selectedConcept, brandName }} size={320} />
                  </div>
                </div>

                {/* Quick color tweaks */}
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1, minWidth: '90px' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Primary</label>
                    <input type="color" value={selectedConcept.primaryColor} onChange={e => { const c = [...concepts]; c[selectedConceptIdx] = { ...c[selectedConceptIdx], primaryColor: e.target.value }; setConcepts(c); }} style={{ width: '100%', height: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1, minWidth: '90px' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Secondary</label>
                    <input type="color" value={selectedConcept.secondaryColor} onChange={e => { const c = [...concepts]; c[selectedConceptIdx] = { ...c[selectedConceptIdx], secondaryColor: e.target.value }; setConcepts(c); }} style={{ width: '100%', height: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1, minWidth: '90px' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Background</label>
                    <input type="color" value={selectedConcept.bgColor} onChange={e => { const c = [...concepts]; c[selectedConceptIdx] = { ...c[selectedConceptIdx], bgColor: e.target.value }; setConcepts(c); }} style={{ width: '100%', height: '36px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }} />
                  </div>
                </div>

                {/* Font picker for selected */}
                <div style={{ marginTop: '0.75rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Font</label>
                  <select value={selectedConcept.font} onChange={e => { const c = [...concepts]; c[selectedConceptIdx] = { ...c[selectedConceptIdx], font: e.target.value }; setConcepts(c); }} className="form-select" style={{ marginTop: '0.3rem' }}>
                    {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              {/* Right: actions + suggestions */}
              <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                    Download & Save
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <button
                      id="btn-download-png-ai"
                      onClick={() => { if (selectedSvgRef.current) downloadSVGasPNG(selectedSvgRef.current, `${brandName.replace(/\s+/g,'-')}-logo.png`); else showToast('Please select a logo first', 'error'); }}
                      className="btn btn-primary"
                    >
                      <Download size={16} /> Download PNG
                    </button>
                    <button
                      id="btn-download-svg-ai"
                      onClick={() => { if (selectedSvgRef.current) downloadSVG(selectedSvgRef.current, `${brandName.replace(/\s+/g,'-')}-logo.svg`); else showToast('Please select a logo first', 'error'); }}
                      className="btn btn-secondary"
                    >
                      <Download size={16} /> Download SVG
                    </button>
                    <button
                      id="btn-save-logo-ai"
                      onClick={() => handleSave(selectedConcept)}
                      className="btn btn-secondary"
                      style={{ borderColor: '#059669', color: '#047857', background: 'rgba(5,150,105,0.06)' }}
                    >
                      <Save size={16} /> Save to My Profile
                    </button>
                  </div>
                </div>

                <SmartSuggestions domain={domain} onApply={(updates) => {
                  const c = [...concepts];
                  c[selectedConceptIdx] = { ...c[selectedConceptIdx], ...updates };
                  setConcepts(c);
                }} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB 2 — DIY LOGO DESIGNER
      ══════════════════════════════════════════ */}
      {activeTab === 'diy' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="diy-layout">

          {/* LEFT: Controls */}
          <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Undo/Redo/Reset */}
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <button id="btn-undo" onClick={undo} disabled={history.length === 0} className="btn btn-secondary btn-sm" title="Undo">
                <RotateCcw size={14} /> Undo
              </button>
              <button id="btn-redo" onClick={redo} disabled={future.length === 0} className="btn btn-secondary btn-sm" title="Redo">
                <RotateCw size={14} /> Redo
              </button>
              <button id="btn-reset" onClick={reset} className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto', color: '#dc2626' }} title="Reset">
                <X size={14} /> Reset
              </button>
            </div>

            {/* Brand Name & Tagline */}
            <div>
              <label className="form-label">Brand Name</label>
              <input id="diy-brand-name" type="text" value={diy.brandName} onChange={e => updateDiy({ brandName: e.target.value })} className="form-input" placeholder="e.g. VentureForge" />
            </div>
            <div>
              <label className="form-label">Tagline <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span></label>
              <input id="diy-tagline" type="text" value={diy.tagline} onChange={e => updateDiy({ tagline: e.target.value })} className="form-input" placeholder="e.g. Build. Launch. Scale." />
            </div>

            {/* Layout */}
            <div>
              <label className="form-label">Logo Layout</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.3rem' }}>
                {LAYOUTS.map(l => (
                  <button
                    key={l.id}
                    id={`diy-layout-${l.id}`}
                    onClick={() => updateDiy({ layout: l.id })}
                    style={{
                      padding: '0.5rem 0.6rem', borderRadius: '10px', border: '1.5px solid', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700, fontFamily: 'var(--font-sans)', textAlign: 'center',
                      borderColor: diy.layout === l.id ? '#6366f1' : '#e2e8f0',
                      background: diy.layout === l.id ? 'rgba(79,70,229,0.1)' : '#fff',
                      color: diy.layout === l.id ? '#4338ca' : '#475569'
                    }}
                  >{l.label}</button>
                ))}
              </div>
            </div>

            {/* Font */}
            <div>
              <label className="form-label">Typography</label>
              <select id="diy-font" value={diy.font} onChange={e => updateDiy({ font: e.target.value })} className="form-select">
                {FONT_OPTIONS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
              </select>
            </div>

            {/* Color Palettes */}
            <div>
              <label className="form-label">Colour Palettes</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', marginTop: '0.3rem' }}>
                {COLOR_PALETTES.map((p, i) => (
                  <button
                    key={i}
                    id={`diy-palette-${i}`}
                    onClick={() => updateDiy({ primaryColor: p.primary, secondaryColor: p.secondary || p.primary, bgColor: p.bg || '#ffffff' })}
                    title={p.name}
                    style={{
                      border: '1.5px solid', borderRadius: '10px', padding: '0.4rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center',
                      borderColor: diy.primaryColor === p.primary ? '#6366f1' : '#e2e8f0',
                      background: diy.primaryColor === p.primary ? 'rgba(79,70,229,0.08)' : '#fff',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: p.primary }} />
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: p.secondary || p.primary }} />
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: p.bg || '#fff', border: '1px solid #e2e8f0' }} />
                    </div>
                    <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 600, lineHeight: 1 }}>{p.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">Primary</label>
                <input type="color" id="diy-primary-color" value={diy.primaryColor} onChange={e => updateDiy({ primaryColor: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Secondary</label>
                <input type="color" id="diy-secondary-color" value={diy.secondaryColor} onChange={e => updateDiy({ secondaryColor: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Background</label>
                <input type="color" id="diy-bg-color" value={diy.bgColor} onChange={e => updateDiy({ bgColor: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer' }} />
              </div>
            </div>

            {/* Icon Picker */}
            <div>
              <label className="form-label">Icon / Symbol</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.4rem', marginTop: '0.3rem', maxHeight: '160px', overflowY: 'auto', padding: '0.25rem' }}>
                {ICON_OPTIONS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    id={`diy-icon-${id}`}
                    onClick={() => updateDiy({ iconType: id })}
                    title={label}
                    style={{
                      padding: '0.45rem', borderRadius: '10px', border: '1.5px solid', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                      borderColor: diy.iconType === id ? '#6366f1' : '#e2e8f0',
                      background: diy.iconType === id ? 'rgba(79,70,229,0.1)' : '#fff',
                    }}
                  >
                    <Icon size={16} color={diy.iconType === id ? '#4f46e5' : '#64748b'} />
                    <span style={{ fontSize: '0.55rem', color: diy.iconType === id ? '#4338ca' : '#94a3b8', fontWeight: 600 }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Size slider */}
            <div>
              <label className="form-label">Icon Size — {diy.iconSize}px</label>
              <input id="diy-icon-size" type="range" min={20} max={72} value={diy.iconSize} onChange={e => updateDiy({ iconSize: parseInt(e.target.value) })} style={{ width: '100%', accentColor: '#4f46e5' }} />
            </div>
          </div>

          {/* RIGHT: Live Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase' }}>Live Preview</div>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0' }}>Updates in real-time as you edit</p>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <Eye size={16} color="#6366f1" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4338ca' }}>Live</span>
                </div>
              </div>

              {/* Large preview */}
              <div style={{ background: diy.bgColor, borderRadius: '16px', padding: '2.5rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #e2e8f0', minHeight: '200px', marginBottom: '1rem' }}>
                <div ref={el => { if (el) diyPreviewSvgRef.current = el.querySelector('svg'); }}>
                  <LogoSVG config={{ ...diy, font: diy.font, iconSize: diy.iconSize, textWeight: diy.textWeight }} size={340} />
                </div>
              </div>

              {/* Size variants */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LogoSVG config={{ ...diy, font: diy.font, iconSize: 18, textWeight: diy.textWeight }} size={120} />
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>Small</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{ background: '#0f172a', borderRadius: '10px', padding: '0.75rem', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LogoSVG config={{ ...diy, font: diy.font, iconSize: 18, textWeight: diy.textWeight, bgColor: '#0f172a' }} size={120} />
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>Dark BG</span>
                </div>
              </div>
            </div>

            {/* Smart Suggestions */}
            <SmartSuggestions domain={domain} onApply={(updates) => {
              if (updates.primaryColor) updateDiy({ primaryColor: updates.primaryColor, secondaryColor: updates.secondaryColor, bgColor: updates.bgColor });
              if (updates.iconType) updateDiy({ iconType: updates.iconType });
              if (updates.font) updateDiy({ font: updates.font });
            }} />

            {/* Download & Save */}
            <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Download & Save</div>
              <button
                id="btn-download-png-diy"
                onClick={() => { if (diyPreviewSvgRef.current) downloadSVGasPNG(diyPreviewSvgRef.current, `${diy.brandName.replace(/\s+/g,'-') || 'logo'}.png`); else showToast('Preview not ready yet', 'error'); }}
                className="btn btn-primary"
              >
                <Download size={16} /> Download PNG
              </button>
              <button
                id="btn-download-svg-diy"
                onClick={() => { if (diyPreviewSvgRef.current) downloadSVG(diyPreviewSvgRef.current, `${diy.brandName.replace(/\s+/g,'-') || 'logo'}.svg`); else showToast('Preview not ready yet', 'error'); }}
                className="btn btn-secondary"
              >
                <Download size={16} /> Download SVG
              </button>
              <button
                id="btn-save-logo-diy"
                onClick={() => handleSave({ ...diy, style: 'Custom', styleLabel: 'DIY Custom', primaryColor: diy.primaryColor, secondaryColor: diy.secondaryColor, bgColor: diy.bgColor, font: diy.font, iconType: diy.iconType, layout: diy.layout })}
                className="btn btn-secondary"
                style={{ borderColor: '#059669', color: '#047857', background: 'rgba(5,150,105,0.06)' }}
              >
                <Save size={16} /> Save to My Profile
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .diy-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
