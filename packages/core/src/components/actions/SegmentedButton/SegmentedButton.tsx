import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef, useCallback, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";

import { Text } from "../../data-display/Text";
import type {
  SegmentedButtonOption,
  SegmentedButtonProps,
} from "./SegmentedButton.props";
import { styles } from "./SegmentedButton.styles";

const ANIMATION_DURATION = 250;

/**
 * SegmentedButton Component
 *
 * A segmented control for switching between mutually exclusive options.
 * Features a smooth sliding animation when switching between segments.
 *
 * @example
 * ```tsx
 * const [view, setView] = useState('upcoming');
 *
 * <SegmentedButton
 *   options={[
 *     { value: 'upcoming', label: 'Upcoming' },
 *     { value: 'history', label: 'History' },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 * ```
 */
function SegmentedButtonInner<T extends string>(
  {
    options,
    value,
    onChange,
    isDisabled = false,
    ...props
  }: SegmentedButtonProps<T>,
  ref: React.ForwardedRef<View>,
): React.JSX.Element {
  const { theme } = useUnistyles();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const translateX = useSharedValue(0);

  // Find selected index
  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const segmentWidth = dimensions.width / options.length;

  // Update animation when selection changes
  React.useEffect(() => {
    if (segmentWidth > 0) {
      translateX.value = withTiming(selectedIndex * segmentWidth, {
        duration: ANIMATION_DURATION,
      });
    }
  }, [selectedIndex, segmentWidth, translateX]);

  styles.useVariants({ disabled: isDisabled });

  const handleLayout = useCallback(
    (event: LayoutChangeEvent): void => {
      const { width, height } = event.nativeEvent.layout;
      setDimensions({ width, height });
      // Set initial position without animation
      const newSegmentWidth = width / options.length;
      translateX.value = selectedIndex * newSegmentWidth;
    },
    [options.length, selectedIndex, translateX],
  );

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: segmentWidth,
  }));

  // Gradient colors
  const gradientColors = [
    theme.colors.primaryContainer,
    `${theme.colors.primary}20`,
  ] as const;

  return (
    <View onLayout={handleLayout} ref={ref} style={styles.container} {...props}>
      {/* Gradient Background */}
      <LinearGradient
        colors={gradientColors}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={styles.gradient}
      />

      {/* Animated Sliding Indicator */}
      <Animated.View
        style={[
          styles.indicator,
          animatedIndicatorStyle,
          { height: dimensions.height },
        ]}
      />

      {/* Segment Labels */}
      {options.map((option: SegmentedButtonOption<T>, index: number) => {
        const isSelected = index === selectedIndex;

        return (
          <Pressable
            disabled={isDisabled}
            key={option.value}
            onPress={() => {
              onChange(option.value);
            }}
            style={({ pressed }) => [
              styles.segment,
              pressed && !isDisabled && { opacity: 0.7 },
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                isSelected ? styles.labelSelected : styles.labelUnselected,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export const SegmentedButton = forwardRef(SegmentedButtonInner) as <
  T extends string,
>(
  props: SegmentedButtonProps<T> & { ref?: React.ForwardedRef<View> },
) => React.JSX.Element;
