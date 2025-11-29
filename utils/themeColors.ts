import { ThemeConfig } from '../types';

/**
 * Get theme color with fallback
 */
export const getThemeColor = (theme: ThemeConfig, colorKey: keyof NonNullable<ThemeConfig['colors']>): string => {
  return theme.colors?.[colorKey] || getDefaultColor(colorKey);
};

/**
 * Get default color for a color key
 */
const getDefaultColor = (colorKey: keyof NonNullable<ThemeConfig['colors']>): string => {
  const defaults: Record<string, string> = {
    brand50: '#fbf8f3',
    brand100: '#f5efe4',
    brand200: '#ebdcc4',
    brand500: '#c58550',
    brand600: '#b96b40',
    brand700: '#9a5336',
    brand900: '#67392b',
  };
  return defaults[colorKey] || '#000000';
};

/**
 * Generate CSS variables for theme colors
 */
export const generateThemeCSS = (theme: ThemeConfig): string => {
  const colors = theme.colors || {};
  return `
    :root {
      --brand-50: ${colors.brand50 || getDefaultColor('brand50')};
      --brand-100: ${colors.brand100 || getDefaultColor('brand100')};
      --brand-200: ${colors.brand200 || getDefaultColor('brand200')};
      --brand-500: ${colors.brand500 || getDefaultColor('brand500')};
      --brand-600: ${colors.brand600 || theme.primary || getDefaultColor('brand600')};
      --brand-700: ${colors.brand700 || getDefaultColor('brand700')};
      --brand-900: ${colors.brand900 || getDefaultColor('brand900')};
    }
    
    /* Primary Button Styles */
    .btn-primary {
      background-color: var(--brand-600) !important;
      color: #ffffff !important;
      transition: background-color 0.2s ease;
    }
    .btn-primary:hover {
      background-color: var(--brand-700) !important;
    }
    
    /* Secondary Button Styles */
    .btn-secondary {
      background-color: var(--brand-50) !important;
      color: var(--brand-900) !important;
      border: 1px solid var(--brand-200) !important;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }
    .btn-secondary:hover {
      background-color: var(--brand-100) !important;
      border-color: var(--brand-200) !important;
    }
    
    /* Accent Styles */
    .accent-color {
      color: var(--brand-500) !important;
    }
    .accent-bg {
      background-color: var(--brand-500) !important;
    }
  `;
};

