import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function Bell({
  size = 24,
  ...props
}: Omit<SvgProps, "width" | "height"> & { size?: number }): React.JSX.Element {
  return (
    <Svg viewBox="0 0 24 24" {...props} width={size} height={size}>
      <Path d="M18 13.18V10a6 6 0 0 0-5-5.91V3a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 10v3.18A3 3 0 0 0 4 16v2a1 1 0 0 0 1 1h3.14a4 4 0 0 0 7.72 0H19a1 1 0 0 0 1-1v-2a3 3 0 0 0-2-2.82ZM8 10a4 4 0 0 1 8 0v3H8Zm4 10a2 2 0 0 1-1.72-1h3.44A2 2 0 0 1 12 20Zm6-3H6v-1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z" />
    </Svg>
  );
}
