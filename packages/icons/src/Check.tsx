import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function Check(props: SvgProps): React.JSX.Element {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path d="M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47Z" />
    </Svg>
  );
}
