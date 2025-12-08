import React, { forwardRef } from "react";
import { View, type View as ViewType } from "react-native";

import type { SurfaceProps } from "./Surface.props";
import { styles } from "./Surface.styles";

/**
 * Surface Component
 *
 * A container with MD3-style elevation. Higher elevation levels
 * add more primary color tint and stronger shadows.
 *
 * @example
 * ```tsx
 * <Surface elevation={2}>
 *   <Text>Elevated content</Text>
 * </Surface>
 * ```
 */
export const Surface = forwardRef<ViewType, SurfaceProps>(
  ({ elevation = 1, children, ...props }, ref) => {
    styles.useVariants({
      elevation,
    });

    return (
      <View ref={ref} style={styles.surface} {...props}>
        {children}
      </View>
    );
  },
);

Surface.displayName = "Surface";
