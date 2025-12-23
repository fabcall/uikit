import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export function Home({
  size = 24,
  ...props
}: Omit<SvgProps, "width" | "height"> & { size?: number }): React.JSX.Element {
  return (
    <Svg viewBox="0 0 24 24" {...props} width={size} height={size}>
      <Path d="m21.66 10.25-9-8a1 1 0 0 0-1.32 0l-9 8a1 1 0 0 0-.27 1.11A1 1 0 0 0 3 12h1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9h1a1 1 0 0 0 .93-.64 1 1 0 0 0-.27-1.11ZM13 20h-2v-3a1 1 0 0 1 2 0Zm5 0h-3v-3a3 3 0 0 0-6 0v3H6v-8h12ZM5.63 10 12 4.34 18.37 10Z" />
    </Svg>
  );
}
