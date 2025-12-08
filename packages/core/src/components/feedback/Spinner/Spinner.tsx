import React, { forwardRef, useEffect } from "react";
import { View, type View as ViewType } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Easing,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useUnistyles } from "react-native-unistyles";

import type { SpinnerProps, SpinnerSize } from "./Spinner.props";
import { styles } from "./Spinner.styles";

const DOT_COUNT = 10;

const SIZE_CONFIG: Record<SpinnerSize, { size: number; dotRadius: number }> = {
  sm: { size: 20, dotRadius: 1.5 },
  md: { size: 32, dotRadius: 2.5 },
  lg: { size: 48, dotRadius: 3.5 },
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface DotProps {
  index: number;
  cx: number;
  cy: number;
  baseRadius: number;
  color: string;
  headIndex: SharedValue<number>;
}

function AnimatedDot({
  index,
  cx,
  cy,
  baseRadius,
  color,
  headIndex,
}: DotProps): React.JSX.Element {
  // Calculate distance from the head (wrapping around)
  const distanceFromHead = useDerivedValue(() => {
    const diff = (index - headIndex.value + DOT_COUNT) % DOT_COUNT;
    return diff;
  });

  const animatedProps = useAnimatedProps(() => {
    const distance = distanceFromHead.value;
    // Progress: 0 = at head (largest/most opaque), 1 = farthest (smallest/least opaque)
    const progress = distance / DOT_COUNT;

    const opacity = 1 - progress * 0.8; // 1.0 → 0.2
    const radius = baseRadius * (1 - progress * 0.5); // 100% → 50%

    return {
      opacity,
      r: radius,
    };
  });

  return (
    <AnimatedCircle
      animatedProps={animatedProps}
      cx={cx}
      cy={cy}
      fill={color}
    />
  );
}

/**
 * Spinner Component
 *
 * A loading spinner component with animated dots arranged in a circle.
 * Perfect for showing loading states in buttons, avatars, or any component
 * that needs to indicate an async operation.
 *
 * @example
 * ```tsx
 * // Default spinner
 * <Spinner />
 * ```
 *
 * @example
 * ```tsx
 * // Custom color and size
 * <Spinner color="#FF6B6B" size="lg" />
 * ```
 */
export const Spinner = forwardRef<ViewType, SpinnerProps>(
  ({ color, size = "md", ...props }, ref) => {
    const { theme } = useUnistyles();
    const headIndex = useSharedValue(0);

    const spinnerColor = color ?? theme.colors.primary;
    const { size: svgSize, dotRadius } = SIZE_CONFIG[size];
    const center = svgSize / 2;
    const radius = (svgSize - dotRadius * 2) / 2 - dotRadius;

    useEffect(() => {
      headIndex.value = withRepeat(
        withTiming(DOT_COUNT, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1, // Infinite repeat
        false, // Don't reverse
      );
    }, [headIndex]);

    // Generate dot positions
    const dots = Array.from({ length: DOT_COUNT }, (_, i) => {
      const angle = (i / DOT_COUNT) * 2 * Math.PI - Math.PI / 2; // Start from top
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      return (
        <AnimatedDot
          baseRadius={dotRadius}
          color={spinnerColor}
          cx={x}
          cy={y}
          headIndex={headIndex}
          index={i}
          key={i}
        />
      );
    });

    return (
      <View ref={ref} style={styles.container} {...props}>
        <Svg height={svgSize} width={svgSize}>
          {dots}
        </Svg>
      </View>
    );
  },
);

Spinner.displayName = "Spinner";
