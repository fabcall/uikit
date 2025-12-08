import type { ReactElement } from "react";
import type { ViewProps } from "react-native";

export interface TabBarProps extends ViewProps {
  children: React.ReactNode;
  gradientColors?: string[];
  activeTintColor?: string;
  inactiveTintColor?: string;
  activeLabelColor?: string;
  inactiveLabelColor?: string;
}

export interface IconRenderProps {
  color: string;
  size: number;
  focused: boolean;
}

export interface TabBarItemProps extends Omit<ViewProps, "children"> {
  icon: (props: IconRenderProps) => ReactElement;
  label: string;
  focused?: boolean;
  disabled?: boolean;
  badge?: number | string | boolean;
  activeTintColor?: string;
  inactiveTintColor?: string;
  activeLabelColor?: string;
  inactiveLabelColor?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  testID?: string;
}
