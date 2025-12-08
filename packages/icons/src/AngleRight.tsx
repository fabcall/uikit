import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function AngleRight(props: SvgProps): React.JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path d="m14.83 11.29-4.24-4.24a1 1 0 0 0-1.42 0 1 1 0 0 0 0 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.24-4.24a1 1 0 0 0 0-1.42Z" />
    </Svg>
  );
}
