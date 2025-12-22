import type { StyleProp, TextStyle, ViewStyle } from "react-native";

import type { OverlayProps } from "../Overlay/Overlay.props";

export interface TooltipProps extends Partial<OverlayProps> {
  children: React.ReactElement;
  content: string | React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
