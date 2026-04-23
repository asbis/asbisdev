export type Theme = typeof lightTheme;

export const lightTheme = {
  bg: '#F5F3EE',
  surface: '#FBFAF6',
  ink: '#0B2545',
  ink2: '#1F3A60',
  muted: '#6B7890',
  line: '#E4DFD4',
  line2: '#EFEAE0',
  accent: '#1C3D72',
  ok: '#2F6B4E',
  okBg: '#E6EFE9',
  warn: '#B4761E',
  warnBg: '#F7EDD6',
  bad: '#A33B2A',
  badBg: '#F4DDD6',
  displayFont: 'serif',
  uiFont: 'System',
  monoFont: 'Courier',
  onAccent: '#FFFFFF',
  onInk: '#FBFAF6',
};

export const darkTheme: Theme = {
  ...lightTheme,
  bg: '#0A1628',
  surface: '#11213A',
  ink: '#F1EDE4',
  ink2: '#C9D3E4',
  muted: '#8B98B2',
  line: '#1F3354',
  line2: '#192B48',
  accent: '#6FA3E8',
  okBg: '#17332A',
  warnBg: '#3A2E17',
  badBg: '#3A1E18',
  onInk: '#0A1628',
};
