// Design tokens for Kord — keep all theming values here so Tweaks can flip them.

const KORD_PALETTES = {
  A: { // Varm stein — warm brown/rust/sage
    name: 'Varm stein',
    base: '#F6F2EC',
    surface: '#FFFFFF',
    surfaceAlt: '#EFE8DE',
    text: '#231F1C',
    textMuted: '#6B5E52',
    textFaint: '#A89B8D',
    hairline: 'rgba(35,31,28,0.08)',
    primary: '#6B5544',
    primaryInk: '#FFFFFF',
    accent1: '#B86B4A', // rust
    accent2: '#8BA78F', // sage
    crisis: '#9E4F4F',
    glow: 'rgba(184,107,74,0.14)',
  },
  B: { // Stille vann
    name: 'Stille vann',
    base: '#FAFAF7',
    surface: '#FFFFFF',
    surfaceAlt: '#EEF1F1',
    text: '#1E2A33',
    textMuted: '#566872',
    textFaint: '#98A6AE',
    hairline: 'rgba(30,42,51,0.08)',
    primary: '#4A5F6E',
    primaryInk: '#FFFFFF',
    accent1: '#7FA8A4',
    accent2: '#D4C4A8',
    crisis: '#C97B7B',
    glow: 'rgba(127,168,164,0.16)',
  },
  C: { // Nordlys
    name: 'Nordlys',
    base: '#F3F1F5',
    surface: '#FFFFFF',
    surfaceAlt: '#EAE5EF',
    text: '#2A2231',
    textMuted: '#6B607A',
    textFaint: '#A59DB0',
    hairline: 'rgba(42,34,49,0.08)',
    primary: '#4B3F5C',
    primaryInk: '#FFFFFF',
    accent1: '#8B7BA4',
    accent2: '#D4A574',
    crisis: '#C97060',
    glow: 'rgba(139,123,164,0.16)',
  },
};

// Dark variants — true OLED, not grey
const KORD_PALETTES_DARK = {
  A: {
    name: 'Varm stein · mørk',
    base: '#0A0807',
    surface: '#171310',
    surfaceAlt: '#1F1A15',
    text: '#F1EADF',
    textMuted: '#A89B8D',
    textFaint: '#6B5E52',
    hairline: 'rgba(241,234,223,0.08)',
    primary: '#C9A88F',
    primaryInk: '#1A130E',
    accent1: '#D48866',
    accent2: '#9DBFA1',
    crisis: '#C97676',
    glow: 'rgba(212,136,102,0.18)',
  },
  B: {
    name: 'Stille vann · mørk',
    base: '#030507',
    surface: '#0F1518',
    surfaceAlt: '#181F23',
    text: '#E8EEF1',
    textMuted: '#98A6AE',
    textFaint: '#566872',
    hairline: 'rgba(232,238,241,0.08)',
    primary: '#9BB8C3',
    primaryInk: '#0B1114',
    accent1: '#A7CCC8',
    accent2: '#E5D6B8',
    crisis: '#E19E9E',
    glow: 'rgba(167,204,200,0.2)',
  },
  C: {
    name: 'Nordlys · mørk',
    base: '#060309',
    surface: '#140F1B',
    surfaceAlt: '#1C1625',
    text: '#EDE6F3',
    textMuted: '#A59DB0',
    textFaint: '#6B607A',
    hairline: 'rgba(237,230,243,0.08)',
    primary: '#B8A9D1',
    primaryInk: '#170F20',
    accent1: '#A899C0',
    accent2: '#E2BC8F',
    crisis: '#E29082',
    glow: 'rgba(184,169,209,0.2)',
  },
};

// Fonts — head pairings
const KORD_FONTS = {
  'Instrument Serif': { head: '"Instrument Serif", "Iowan Old Style", Georgia, serif', italic: true },
  'Lora': { head: '"Lora", Georgia, serif', italic: false },
  'Source Serif Pro': { head: '"Source Serif 4", "Source Serif Pro", Georgia, serif', italic: false },
  'IBM Plex Serif': { head: '"IBM Plex Serif", Georgia, serif', italic: false },
};
const KORD_BODY = '"IBM Plex Sans", -apple-system, system-ui, sans-serif';
const KORD_MONO = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

function kordTheme({ palette = 'A', dark = false, grayscale = false, font = 'Instrument Serif' } = {}) {
  const src = dark ? KORD_PALETTES_DARK[palette] : KORD_PALETTES[palette];
  if (!grayscale) return { ...src, font: KORD_FONTS[font], bodyFont: KORD_BODY, monoFont: KORD_MONO };
  // grayscale: desaturate by collapsing accents into neutrals derived from text/base
  const gs = dark
    ? { primary: '#CDCCCB', accent1: '#A5A4A3', accent2: '#868685', crisis: '#E0B7B7' }
    : { primary: '#3E3B38', accent1: '#6B6A68', accent2: '#8E8D8B', crisis: '#8A5252' };
  return {
    ...src, ...gs, glow: 'rgba(0,0,0,0.06)',
    font: KORD_FONTS[font], bodyFont: KORD_BODY, monoFont: KORD_MONO,
  };
}

Object.assign(window, { KORD_PALETTES, KORD_PALETTES_DARK, KORD_FONTS, kordTheme });
