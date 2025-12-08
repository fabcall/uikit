import React, { forwardRef } from "react";
import {
  Pressable,
  type PressableStateCallbackType,
  type StyleProp,
  type View,
  type ViewStyle,
} from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { Spinner } from "../../feedback/Spinner";
import type { IconButtonProps } from "./IconButton.props";
import { styles } from "./IconButton.styles";

/**
 * IconButton Component
 *
 * A button component that displays only an icon. Perfect for actions that don't
 * require text labels, such as close buttons, navigation arrows, or toolbars.
 *
 * @example
 * ```tsx
 * import { Upload } from '@readykit/icons';
 *
 * <IconButton
 *   icon={Upload}
 *   onPress={() => console.log('Upload pressed')}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom variant and size
 * <IconButton
 *   icon={Download}
 *   variant="outline"
 *   size="lg"
 *   color="secondary"
 * />
 * ```
 */
export const IconButton = forwardRef<View, IconButtonProps>(
  (
    {
      icon: IconComponent,
      color = "primary",
      variant = "solid",
      size = "md",
      isLoading = false,
      isDisabled = false,
      accessibilityLabel,
      onPress,
      ...props
    },
    ref,
  ) => {
    const { theme } = useUnistyles();

    styles.useVariants({
      color,
      disabled: isDisabled,
      size,
      variant,
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

    const getIconSize = (): number => {
      const sizeMap = {
        sm: theme.sizes.icon.sm,
        md: theme.sizes.icon.md,
        lg: theme.sizes.icon.lg,
      };

      return sizeMap[size];
    };

    const iconSize = getIconSize();

    const getIconColor = (): string => {
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

    const iconColor = getIconColor();

    return (
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ busy: isLoading, disabled: isDisabled }}
        disabled={isInteractivityDisabled}
        onPress={onPress}
        ref={ref}
        style={getPressableStyle}
        {...props}
      >
        {isLoading ? (
          <Spinner color={spinnerColor} size="md" testID="spinner" />
        ) : (
          <IconComponent fill={iconColor} height={iconSize} width={iconSize} />
        )}
      </Pressable>
    );
  },
);

IconButton.displayName = "IconButton";
