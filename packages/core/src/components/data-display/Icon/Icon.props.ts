import type { lightTheme } from "@readykit/tokens";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

export type ThemeColor = keyof typeof lightTheme.colors;

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export const SIZE_MAP: Record<Exclude<IconSize, number>, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export interface IconProps {
  /** Componente de ícone do @readykit/icons */
  icon: ComponentType<SvgProps>;
  /** Cor do tema */
  color?: ThemeColor;
  /** Cor customizada (sobrescreve color) */
  customColor?: string;
  /** Tamanho do ícone */
  size?: IconSize;
  /** Props adicionais para o SVG */
  svgProps?: Omit<SvgProps, "color" | "width" | "height">;
  /** Test ID para testes */
  testID?: string;
}
