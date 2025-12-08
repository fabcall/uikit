import React, { forwardRef, useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";

import type { PageIndicatorProps } from "./PageIndicator.props";
import { DOT_SIZE, styles } from "./PageIndicator.styles";

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
};

// Internal animated Dot component
interface DotProps {
  active: boolean;
}

function AnimatedDot({ active }: DotProps): React.JSX.Element {
  const { theme } = useUnistyles();
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(active ? 1 : 0, SPRING_CONFIG);
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const width =
      DOT_SIZE.inactive +
      (DOT_SIZE.activeWidth - DOT_SIZE.inactive) * progress.value;

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.border, theme.colors.primary],
    );

    return {
      width,
      height: DOT_SIZE.inactive,
      borderRadius: theme.radii.xl,
      backgroundColor,
    };
  });

  return <Animated.View style={animatedStyle} />;
}

export const PageIndicator = forwardRef<View, PageIndicatorProps>(
  ({ count, currentIndex, onPagePress, ...props }, ref) => {
    const isInteractive = Boolean(onPagePress);

    const renderDot = (index: number): React.JSX.Element => {
      const isActive = index === currentIndex;

      if (isInteractive) {
        return (
          <Pressable
            accessibilityLabel={`Page ${index + 1} of ${count}`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            key={index}
            onPress={() => onPagePress?.(index)}
          >
            <AnimatedDot active={isActive} />
          </Pressable>
        );
      }

      return <AnimatedDot active={isActive} key={index} />;
    };

    return (
      <View
        accessibilityLabel={`Page ${currentIndex + 1} of ${count}`}
        accessibilityRole="tablist"
        ref={ref}
        style={styles.container}
        {...props}
      >
        {Array.from({ length: count }, (_, index) => renderDot(index))}
      </View>
    );
  },
);

PageIndicator.displayName = "PageIndicator";
