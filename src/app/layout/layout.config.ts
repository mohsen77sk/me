import { LayoutConfig } from './layout.types';

/**
 * Default configuration for the entire application. This object is used by
 * ConfigService to set the default configuration.
 */
export const layoutConfig: LayoutConfig = {
  language: 'en',
  direction: 'ltr',
  screens: {
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1440px',
  },
  scheme: 'light',
  theme: 'theme-default',
};
