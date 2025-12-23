import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function AngleLeft(
  { size = 24, ...props }: Omit<SvgProps, "width" | "height"> & { size?: number }
): React.JSX.Element {
  return (
    <Svg viewBox="0 0 24 24" {...props} width={size} height={size}>
      <Path d="m11.29 12 3.54-3.54a1 1 0 0 0 0-1.41 1 1 0 0 0-1.42 0l-4.24 4.24a1 1 0 0 0 0 1.42L13.41 17a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.41Z" />
    </Svg>
  );
}
