import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function AngleLeft(props: SvgProps): React.JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path d="m11.29 12 3.54-3.54a1 1 0 0 0 0-1.41 1 1 0 0 0-1.42 0l-4.24 4.24a1 1 0 0 0 0 1.42L13.41 17a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.41Z" />
    </Svg>
  );
}
