import { AngleDown } from "@readykit/icons";
import React, { forwardRef } from "react";
import { Pressable, type View as ViewType } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Icon } from "../../data-display/Icon";
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

    React.useEffect(() => {
      rotation.value = withTiming(isOpen ? 180 : 0, {
        duration: ROTATION_DURATION,
      });
    }, [isOpen, rotation]);

    styles.useVariants({
      disabled,
      error: hasError,
      focused: isOpen,
    });

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
          <Icon
            color={disabled ? "textDisabled" : "textSecondary"}
            icon={AngleDown}
            size="sm"
          />
        </Animated.View>
      </Pressable>
    );
  },
);

DropdownTrigger.displayName = "Dropdown.Trigger";
