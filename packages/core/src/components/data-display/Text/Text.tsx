import React, { forwardRef } from "react";
import { Text as RNText } from "react-native";

import type { TextProps } from "./Text.props";
import { styles } from "./Text.styles";

export const Text = forwardRef<RNText, TextProps>(
  (
    { variant = "body", color = "primary", align = "left", children, ...props },
    ref,
  ) => {
    styles.useVariants({
      variant,
      color,
      align,
    });

    return (
      <RNText ref={ref} {...props} style={[styles.text, props.style]}>
        {children}
      </RNText>
    );
  },
);

Text.displayName = "Text";
