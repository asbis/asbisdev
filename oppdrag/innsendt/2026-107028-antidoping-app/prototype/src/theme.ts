export type Theme = typeof lightTheme;

export const lightTheme = {
  bg: '#F5F3EE',
  surface: '#FBFAF6',
  ink: '#0B2545',
  ink2: '#1F3A60',
  muted: '#525E75', // Darkened from #6B7890 for better contrast
  line: '#E4DFD4',
  line2: '#EFEAE0',
  accent: '#1C3D72',
  ok: '#24543D', // Slightly darker for contrast
  okBg: '#E6EFE9',
  warn: '#945F15', // Darkened for contrast
  warnBg: '#F7EDD6',
  bad: '#913122', // Darkened for contrast
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
  muted: '#AAB6CC', // Lightened for dark mode contrast
  line: '#1F3354',
  line2: '#192B48',
  accent: '#6FA3E8',
  ok: '#4CAF50',
  okBg: '#17332A',
  warn: '#FFB74D',
  warnBg: '#3A2E17',
  bad: '#FF5252',
  badBg: '#3A1E18',
  onInk: '#0A1628',
};
