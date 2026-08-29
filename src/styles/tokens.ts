// Design System Tokens - Premium Creative Agency Portfolio
export const colors = {
  light: {
    background: '#F3F2EF',
    surface: '#FFFFFF',
    surfaceSecondary: '#E9E7E2',
    textPrimary: '#111111',
    textSecondary: '#66645F',
    textMuted: '#94918A',
    border: '#D8D5CF',
    accent: '#FF4D1C',
    accentHover: '#E83D0F',
  },
  dark: {
    background: '#0B0B0B',
    surface: '#141414',
    surfaceSecondary: '#1C1C1C',
    textPrimary: '#F5F4F0',
    textSecondary: '#A7A5A0',
    textMuted: '#73716D',
    border: '#292929',
    accent: '#FF5A24',
    accentHover: '#FF7548',
  },
  gradient: {
    orange: '#FF9A5C',
    pink: '#FF5C8A',
    orangeRed: '#FF4D1C',
  },
};

export const typography = {
  // Space Grotesk - Display/Headings
  display: {
    fontFamily: '"Space Grotesk", sans-serif',
    weights: {
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  // Manrope - Body
  body: {
    fontFamily: '"Manrope", sans-serif',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
    baseSize: 16,
    lineHeight: {
      tight: 1.2,
      normal: 1.6,
      relaxed: 1.8,
    },
  },
  // Instrument Serif Italic - Accent
  serif: {
    fontFamily: '"Instrument Serif", serif',
    style: 'italic',
    weights: {
      regular: 400,
    },
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
};

export const borders = {
  thin: '0.5px',
  light: '1px',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
