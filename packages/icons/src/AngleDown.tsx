import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function AngleDown(
  { size = 24, ...props }: Omit<SvgProps, "width" | "height"> & { size?: number }
): React.JSX.Element {
  return (
    <Svg viewBox="0 0 24 24" {...props} width={size} height={size}>
      <Path d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 0 0-1.41 0 1 1 0 0 0 0 1.42l4.24 4.24a1 1 0 0 0 1.42 0L17 10.59a1 1 0 0 0 0-1.42Z" />
    </Svg>
  );
}
