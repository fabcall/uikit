import React, { memo } from "react";
import { useUnistyles } from "react-native-unistyles";

import { type IconProps, SIZE_MAP } from "./Icon.props";

function IconComponent({
  icon: IconSvg,
  color = "textPrimary",
  customColor,
  size = "md",
  svgProps,
  testID,
}: IconProps): React.JSX.Element {
  const { theme } = useUnistyles();

  const resolvedColor = customColor ?? theme.colors[color];
  const resolvedSize = typeof size === "number" ? size : SIZE_MAP[size];

  return (
    <IconSvg
      fill={resolvedColor}
      height={resolvedSize}
      testID={testID}
      width={resolvedSize}
      {...svgProps}
    />
  );
}

export const Icon = memo(IconComponent);
