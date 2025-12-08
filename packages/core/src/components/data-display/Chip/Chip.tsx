import { Check } from "@readykit/icons";
import React, { forwardRef, useMemo } from "react";
import {
  Pressable,
  type PressableStateCallbackType,
  type StyleProp,
  Text,
  TouchableOpacity,
  type View,
  type ViewStyle,
} from "react-native";

import { Icon, type ThemeColor } from "../Icon";
import type { ChipColor, ChipProps, ChipRoundedSide } from "./Chip.props";
import { styles } from "./Chip.styles";

const COLOR_MAP: Record<
  ChipColor,
  { solid: ThemeColor; solidSelected: ThemeColor; outline: ThemeColor }
> = {
  primary: {
    solid: "onPrimaryContainer",
    solidSelected: "onPrimary",
    outline: "primary",
  },
  secondary: {
    solid: "onSecondaryContainer",
    solidSelected: "onSecondary",
    outline: "secondary",
  },
  success: {
    solid: "onSuccessContainer",
    solidSelected: "onSuccess",
    outline: "success",
  },
  error: {
    solid: "onErrorContainer",
    solidSelected: "onError",
    outline: "error",
  },
  warning: {
    solid: "onWarningContainer",
    solidSelected: "onWarning",
    outline: "warning",
  },
  info: { solid: "onInfoContainer", solidSelected: "onInfo", outline: "info" },
};

export const Chip = forwardRef<View, ChipProps>(
  (
    {
      label,
      color,
      variant = "solid",
      size = "md",
      roundedSide = "all",
      isSelected = false,
      isDisabled = false,
      leftIcon,
      isDismissible = false,
      onDismiss,
      onPress,
      ...props
    },
    ref,
  ) => {
    styles.useVariants({
      color,
      variant,
      size,
      ...(isSelected && { selected: true }),
      ...(isDisabled && { disabled: true }),
    });

    const getIconColor = (): ThemeColor => {
      if (variant === "outline") {
        return COLOR_MAP[color].outline;
      }
      return isSelected
        ? COLOR_MAP[color].solidSelected
        : COLOR_MAP[color].solid;
    };

    const iconColor = getIconColor();
    const iconSize = size === "sm" ? 12 : 14;

    const roundedStyle = useMemo((): ViewStyle => {
      const radiusStyles: Record<ChipRoundedSide, ViewStyle> = {
        all: {},
        left: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        right: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        none: {
          borderRadius: 0,
        },
      };

      return radiusStyles[roundedSide];
    }, [roundedSide]);

    const getPressableStyle = ({
      pressed,
    }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      if (pressed && !isDisabled) {
        return [styles.container, roundedStyle, { opacity: 0.7 }];
      }
      return [styles.container, roundedStyle];
    };

    const handleDismiss = (): void => {
      onDismiss?.();
    };

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected, disabled: isDisabled }}
        disabled={isDisabled}
        onPress={onPress}
        ref={ref}
        style={getPressableStyle}
        {...props}
      >
        {leftIcon ? (
          <Icon color={iconColor} icon={leftIcon} size={iconSize} />
        ) : null}

        <Text style={styles.label}>{label}</Text>

        {isDismissible ? (
          <TouchableOpacity
            accessibilityLabel="Dismiss"
            accessibilityRole="button"
            hitSlop={8}
            onPress={handleDismiss}
            style={styles.dismissButton}
          >
            <Icon color={iconColor} icon={Check} size={iconSize} />
          </TouchableOpacity>
        ) : null}
      </Pressable>
    );
  },
);

Chip.displayName = "Chip";
