import React, { forwardRef } from "react";
import {
  Pressable,
  type PressableStateCallbackType,
  type StyleProp,
  Text,
  type View,
  type ViewStyle,
} from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { Spinner } from "../../feedback/Spinner";
import type { ButtonProps } from "./Button.props";
import { styles } from "./Button.styles";

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      title,
      color = "primary",
      variant = "solid",
      size = "md",
      isLoading = false,
      isDisabled = false,
      onPress,
      ...props
    },
    ref,
  ) => {
    const { theme } = useUnistyles();

    styles.useVariants({
      color,
      disabled: isDisabled,
      variant,
      size,
    });

    const isInteractivityDisabled = isDisabled || isLoading;

    const getSpinnerColor = (): string => {
      const colorMap = {
        solid: {
          primary: theme.colors.onPrimary,
          secondary: theme.colors.onSecondary,
        },
        outline: {
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
        },
        ghost: {
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
        },
      };

      return colorMap[variant][color];
    };

    const spinnerColor = getSpinnerColor();

    const getPressableStyle = ({
      pressed,
    }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      if (pressed && !isInteractivityDisabled) {
        return [styles.container, { opacity: 0.7 }];
      }
      return styles.container;
    };

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ busy: isLoading, disabled: isDisabled }}
        disabled={isInteractivityDisabled}
        onPress={onPress}
        ref={ref}
        style={getPressableStyle}
        {...props}
      >
        {isLoading ? (
          <Spinner color={spinnerColor} size="md" testID="activity-indicator" />
        ) : (
          <Text style={styles.label}>{title}</Text>
        )}
      </Pressable>
    );
  },
);

Button.displayName = "Button";
