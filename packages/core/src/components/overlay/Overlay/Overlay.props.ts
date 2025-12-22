import { type StyleProp, type View, type ViewStyle } from "react-native";

import { type Placement } from "./FloatingEngine";

export interface OverlayProps {
  anchorRef: React.RefObject<View>;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  visible?: boolean;

  placement?: Placement;
  gap?: number;
  screenPadding?: number;

  minHeight?: number;
  maxHeight?: number;
  matchAnchorWidth?: boolean;

  disableFlip?: boolean;
  disableShift?: boolean;
  disableResize?: boolean;
}

export interface OverlayRef {
  show: () => void;
  hide: () => void;
  update: () => void;
}