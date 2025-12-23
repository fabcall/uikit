import { AngleDown } from "@readykit/icons";
import React, { forwardRef, useEffect } from "react";
import { Pressable, type View as ViewType } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { DropdownTriggerProps } from "./Dropdown.props";
import { styles } from "./Dropdown.styles";

const ROTATION_DURATION = 200;

export const DropdownTrigger = forwardRef<ViewType, DropdownTriggerProps>(
  (
    {
      children,
      isOpen = false,
      disabled = false,
      hasError = false,
      onPress,
      ...props
    },
    ref,
  ) => {
    const rotation = useSharedValue(0);

    styles.useVariants({
      disabled,
      error: hasError,
      open: isOpen,
    });

    useEffect(() => {
      rotation.value = withTiming(isOpen ? 180 : 0, {
        duration: ROTATION_DURATION,
      });
    }, [isOpen, rotation]);

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled, expanded: isOpen }}
        disabled={disabled}
        onPress={onPress}
        ref={ref}
        style={styles.trigger}
        {...props}
      >
        {children}
        <Animated.View style={[styles.triggerIcon, animatedIconStyle]}>
          <AngleDown fill={disabled ? "#9ca3af" : "#6b7280"} />
        </Animated.View>
      </Pressable>
      );
  },
);

DropdownTrigger.displayName = "Dropdown.Trigger";