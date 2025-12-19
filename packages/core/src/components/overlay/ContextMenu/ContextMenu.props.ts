import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type TriggerAction = "press" | "longPress" | "hover";

export interface ContextMenuPosition {
  top: number;
  left: number;
  width?: number;
  height?: number;
  placement: Placement;
}

export interface ContextMenuProps {
  children: ReactNode;
  content: ReactNode;
  placement?: Placement;
  offset?: number;
  triggerAction?: TriggerAction;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  disabled?: boolean;
  closeOnSelect?: boolean;
  showArrow?: boolean;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  arrowStyle?: ViewStyle;
  respectSafeArea?: boolean;
}

export interface ContextMenuItemProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

export interface ContextMenuSeparatorProps {
  spacing?: number;
}