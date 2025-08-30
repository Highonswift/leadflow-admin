import { createTheme } from '@mui/material/styles';

// Define your custom color palette
const colors = {
  primary: {
    main: '#4f46e5', // Indigo
    light: '#6366f1',
    dark: '#3730a3',
    contrastText: '#fff',
  },
  secondary: {
    main: '#06b6d4', // Cyan
    light: '#22d3ee',
    dark: '#0e7490',
    contrastText: '#fff',
  },
  background: {
    default: '#f9fafb', // Light gray
    paper: '#ffffff',
  },
  text: {
    primary: '#111827', // Dark text
    secondary: '#6b7280',
  },
  success: { main: '#10b981' },
  warning: { main: '#f59e0b' },
  error: { main: '#ef4444' },
};

// Define custom typography
const typography = {
  fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  h1: { fontWeight: 700, fontSize: '2.5rem' },
  h2: { fontWeight: 600, fontSize: '2rem' },
  h3: { fontWeight: 600, fontSize: '1.75rem' },
  body1: { fontSize: '1rem', lineHeight: 1.5 },
  button: { textTransform: 'none', fontWeight: 600 },
};

// Define animations
const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
};

export const lightTheme = createTheme({
  palette: { ...colors, mode: 'light' },
  typography,
  transitions,
  shape: { borderRadius: 12 },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    background: { default: '#1f2937', paper: '#111827' },
    text: { primary: '#f9fafb', secondary: '#9ca3af' },
  },
  typography,
  transitions,
  shape: { borderRadius: 12 },
});


export default lightTheme;
