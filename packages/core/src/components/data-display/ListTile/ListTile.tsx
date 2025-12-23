import React, { forwardRef } from "react";
import {
  Pressable,
  type PressableStateCallbackType,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from "react-native";

import { Divider } from "../Divider";
import type { ListTileProps } from "./ListTile.props";
import { styles } from "./ListTile.styles";

export const ListTile = forwardRef<View, ListTileProps>(
  (
    {
      title,
      subtitle,
      leading,
      trailing,
      size = "md",
      isDisabled = false,
      showDivider = false,
      isSelected = false,
      onPress,
      ...props
    },
    ref,
  ) => {
    styles.useVariants({
      size,
      ...(isDisabled && { disabled: true }),
      ...(isSelected && { selected: true }),
    });

    const getPressableStyle = ({
      pressed,
    }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      if (pressed && !isDisabled) {
        return [
          styles.container,
          isSelected ? styles.selectedPressed : styles.pressed,
        ];
      }
      return styles.container;
    };

    const isInteractive = Boolean(onPress) && !isDisabled;

    return (
      <View style={{ position: "relative" }}>
        <Pressable
          accessibilityRole={isInteractive ? "button" : "text"}
          accessibilityState={{
            disabled: isDisabled,
            selected: isSelected,
          }}
          disabled={isDisabled || !onPress}
          onPress={onPress}
          ref={ref}
          style={getPressableStyle}
          {...props}
        >
          {leading ? <View style={styles.leading}>{leading}</View> : null}

          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            {subtitle ? (
              <Text numberOfLines={2} style={styles.subtitle}>
                {subtitle}
              </Text>
            ) : null}
          </View>

          {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
        </Pressable>

        {showDivider && (
          <View style={styles.dividerContainer}>
            <Divider orientation="horizontal" thickness="sm" />
          </View>
        )}
      </View>
    );
  },
);

ListTile.displayName = "ListTile";
