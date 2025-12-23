import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function Check({
  size = 24,
  ...props
}: Omit<SvgProps, "width" | "height"> & { size?: number }): React.JSX.Element {
  return (
    <Svg viewBox="0 0 24 24" {...props} width={size} height={size}>
      <Path d="M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47Z" />
    </Svg>
  );
}
