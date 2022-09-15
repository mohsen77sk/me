export type LayoutDirection = 'ltr' | 'rtl';
export type LayoutScreens = { [key: string]: string };
export type LayoutScheme = 'auto' | 'dark' | 'light';
export type LayoutTheme = 'theme-default' | string;
export type LayoutThemes = { id: string; name: string }[];

/**
 * LayoutConfig interface.
 */
export interface LayoutConfig {
  language: string;
  direction: LayoutDirection;
  screens: LayoutScreens;
  scheme: LayoutScheme;
  themes: LayoutThemes;
  theme: LayoutTheme;
}
