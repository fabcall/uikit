import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import type { ProgressBarProps } from "./ProgressBar.props";
import { styles } from "./ProgressBar.styles";

const ANIMATION_DURATION = 300;

export function ProgressBar({
  value,
  color = "primary",
  size = "md",
  showLabel = false,
  animated = true,
  indeterminate = false,
  ...props
}: ProgressBarProps): React.JSX.Element {
  const clampedValue = Math.min(100, Math.max(0, value));
  const progress = useSharedValue(animated ? 0 : clampedValue);
  const indeterminatePosition = useSharedValue(0);

  styles.useVariants({ color, size });

  // Animate progress value changes
  useEffect(() => {
    if (!indeterminate) {
      progress.value = withTiming(clampedValue, {
        duration: animated ? ANIMATION_DURATION : 0,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [clampedValue, animated, indeterminate, progress]);

  // Indeterminate animation
  useEffect(() => {
    if (indeterminate) {
      indeterminatePosition.value = withRepeat(
        withSequence(
          withTiming(100, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    } else {
      indeterminatePosition.value = 0;
    }
  }, [indeterminate, indeterminatePosition]);

  const fillStyle = useAnimatedStyle(() => {
    if (indeterminate) {
      return {
        width: "30%",
        position: "absolute",
        left: `${indeterminatePosition.value}%`,
        transform: [{ translateX: -15 }],
      };
    }

    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View style={styles.container} {...props}>
      <View style={styles.trackContainer}>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>
      </View>
      {showLabel && !indeterminate ? (
        <Text style={styles.label}>{Math.round(clampedValue)}%</Text>
      ) : null}
    </View>
  );
}

ProgressBar.displayName = "ProgressBar";
