import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function AngleUp(props: SvgProps): React.JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path d="m17 13.41-4.29-4.24a1 1 0 0 0-1.42 0l-4.24 4.24a1 1 0 0 0 0 1.42 1 1 0 0 0 1.41 0L12 11.29l3.54 3.54a1 1 0 0 0 .7.29 1 1 0 0 0 .71-.29 1 1 0 0 0 .05-1.42Z" />
    </Svg>
  );
}
