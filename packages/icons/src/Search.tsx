import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function Search(props: SvgProps): React.JSX.Element {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path d="M21.71 20.29 18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7Z" />
    </Svg>
  );
}
