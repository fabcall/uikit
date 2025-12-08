import { breakpoints } from './foundations/breakpoints';
import { lightTheme } from './themes';

export const appThemes = {
  light: lightTheme,
}

export { lightTheme };
export { breakpoints };

export type AppThemes = typeof appThemes;
export type AppBreakpoints = typeof breakpoints;
