import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function User({
  size = 24,
  ...props
}: Omit<SvgProps, "width" | "height"> & { size?: number }): React.JSX.Element {
  return (
    <Svg viewBox="0 0 24 24" {...props} width={size} height={size}>
      <Path d="M15.71 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1 1 0 0 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z" />
    </Svg>
  );
}
