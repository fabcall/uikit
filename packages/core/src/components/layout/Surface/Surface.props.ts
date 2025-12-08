import type { ViewProps } from "react-native";

export type SurfaceElevation = 0 | 1 | 2 | 3 | 4 | 5;

export interface SurfaceProps extends Omit<ViewProps, "style"> {
  /**
   * Elevation level (MD3 style)
   * Higher values = more primary tint + stronger shadow
   * @defaultValue 1
   */
  elevation?: SurfaceElevation;
}
