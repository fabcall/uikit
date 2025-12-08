import React, { forwardRef } from "react";
import { View, type View as ViewType } from "react-native";

import { Text } from "../Text";
import type { DividerProps } from "./Divider.props";
import { styles } from "./Divider.styles";

export const Divider = forwardRef<ViewType, DividerProps>(
  (
    {
      text,
      orientation = "horizontal",
      thickness = "md",
      color = "divider",
      ...props
    },
    ref,
  ) => {
    styles.useVariants({
      orientation,
      thickness,
      color,
    });

    const hasText = Boolean(text);

    if (hasText && orientation === "horizontal") {
      return (
        <View
          ref={ref}
          style={[
            styles.container,
            styles.containerWithText,
            { height: "auto", backgroundColor: "transparent" },
          ]}
          {...props}
        >
          <View style={styles.line} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.line} />
        </View>
      );
    }

    if (hasText && orientation === "vertical") {
      return (
        <View
          ref={ref}
          style={[
            styles.container,
            styles.containerWithText,
            { width: "auto", backgroundColor: "transparent" },
          ]}
          {...props}
        >
          <View style={styles.line} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.line} />
        </View>
      );
    }

    // When there's no text, render a simple divider line
    return <View ref={ref} style={styles.container} {...props} />;
  },
);

Divider.displayName = "Divider";
