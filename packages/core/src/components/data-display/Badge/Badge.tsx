import React, { forwardRef, useMemo } from "react";
import { Text, View } from "react-native";

import type { BadgeProps } from "./Badge.props";
import { styles } from "./Badge.styles";

export const Badge = forwardRef<View, BadgeProps>(
  (
    {
      content,
      color = "error",
      variant = "solid",
      max = 99,
      dot = false,
      visible = true,
      offset,
      children,
      ...props
    },
    ref,
  ) => {
    const hasChildren = Boolean(children);

    styles.useVariants({
      color,
      variant,
      dot,
      positioned: hasChildren,
    });

    const displayContent = useMemo(() => {
      if (dot) return null;
      if (content === undefined || content === null) return null;

      if (typeof content === "number") {
        return content > max ? `${max}+` : String(content);
      }

      return content;
    }, [content, max, dot]);

    if (!visible) {
      return children ? <>{children}</> : null;
    }

    // Aplicar offset customizado se fornecido
    const badgeStyle = [
      styles.badge,
      offset && {
        top: offset.y,
        right: offset.x,
      },
    ];

    const badgeElement = (
      <View style={badgeStyle}>
        {displayContent !== null && (
          <Text style={styles.text}>{displayContent}</Text>
        )}
      </View>
    );

    // Standalone badge (no children)
    if (!hasChildren) {
      return (
        <View ref={ref} {...props}>
          {badgeElement}
        </View>
      );
    }

    // Badge positioned relative to children
    return (
      <View ref={ref} {...props} style={[styles.wrapper, props.style]}>
        {children}
        {badgeElement}
      </View>
    );
  },
);

Badge.displayName = "Badge";
