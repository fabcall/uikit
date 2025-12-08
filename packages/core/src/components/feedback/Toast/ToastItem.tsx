import React, { useCallback, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

import { ANIMATION_CONFIG, TOAST_CONFIG } from "./helpers/constants";
import type { ToastItemProps } from "./Toast.props";
import { styles } from "./Toast.styles";
import { ToastIcon } from "./ToastIcon";

export function ToastItem({
  toast,
  stackIndex,
  isTopmost,
  onDismiss,
  onPauseTimer,
  onResumeTimer,
}: ToastItemProps): React.JSX.Element {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const dragY = useSharedValue(0);
  const isPressed = useSharedValue(0);
  const animatedStackIndex = useSharedValue(stackIndex);
  const hasTriggeredExit = useRef(false);

  styles.useVariants({ variant: toast.variant });

  // Enter animation
  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: ANIMATION_CONFIG.APPEAR_DURATION,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: ANIMATION_CONFIG.APPEAR_DURATION,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- shared values are stable refs
  }, []);

  // Animate stack index changes smoothly
  useEffect(() => {
    animatedStackIndex.value = withTiming(stackIndex, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- shared values are stable refs
  }, [stackIndex]);

  // Exit animation when isExiting changes
  useEffect(() => {
    if (toast.isExiting && !hasTriggeredExit.current) {
      hasTriggeredExit.current = true;
      translateY.value = withTiming(-80, {
        duration: ANIMATION_CONFIG.DISMISS_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      scale.value = withTiming(0.9, {
        duration: ANIMATION_CONFIG.DISMISS_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(0, {
        duration: ANIMATION_CONFIG.DISMISS_DURATION,
        easing: Easing.out(Easing.cubic),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- shared values are stable refs
  }, [toast.isExiting]);

  const handleDismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  const handleTap = useCallback(() => {
    toast.onTap();
  }, [toast]);

  const handlePauseTimer = useCallback(() => {
    onPauseTimer(toast.id);
  }, [onPauseTimer, toast.id]);

  const handleResumeTimer = useCallback(() => {
    onResumeTimer(toast.id);
  }, [onResumeTimer, toast.id]);

  const animateDismiss = useCallback(() => {
    translateY.value = withTiming(-80, {
      duration: ANIMATION_CONFIG.DISMISS_DURATION,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withTiming(0.9, {
      duration: ANIMATION_CONFIG.DISMISS_DURATION,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(
      0,
      {
        duration: ANIMATION_CONFIG.DISMISS_DURATION,
        easing: Easing.out(Easing.cubic),
      },
      () => {
        runOnJS(handleDismiss)();
      },
    );
  }, [handleDismiss, opacity, scale, translateY]);

  const tapGesture = Gesture.Tap()
    .enabled(isTopmost)
    .onBegin(() => {
      isPressed.value = withSpring(1);
    })
    .onFinalize(() => {
      isPressed.value = withSpring(0);
    })
    .onEnd(() => {
      runOnJS(handleTap)();
    });

  const panGesture = Gesture.Pan()
    .enabled(isTopmost && toast.dismissible)
    .onStart(() => {
      runOnJS(handlePauseTimer)();
    })
    .onUpdate((e) => {
      const clampedDy = Math.min(
        e.translationY,
        TOAST_CONFIG.MAX_DOWNWARD_DRAG,
      );
      dragY.value = clampedDy;
    })
    .onEnd((e) => {
      const shouldDismiss =
        e.translationY < -TOAST_CONFIG.DISMISS_THRESHOLD ||
        e.velocityY < TOAST_CONFIG.DISMISS_VELOCITY_THRESHOLD;

      if (shouldDismiss) {
        runOnJS(animateDismiss)();
      } else {
        dragY.value = withSpring(0, ANIMATION_CONFIG.SPRING_CONFIG);
        runOnJS(handleResumeTimer)();
      }
    });

  const composedGesture = Gesture.Race(tapGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const stackScale = 1 - animatedStackIndex.value * 0.05;
    const pressScale = interpolate(
      isPressed.value,
      [0, 1],
      [1, TOAST_CONFIG.PRESS_SCALE_FACTOR],
    );
    const finalScale = stackScale * pressScale * scale.value;
    const topOffset =
      TOAST_CONFIG.BASE_TOP_PADDING +
      animatedStackIndex.value * TOAST_CONFIG.STACK_GAP;

    return {
      opacity: opacity.value,
      top: topOffset,
      transform: [
        { translateY: translateY.value + dragY.value },
        { scale: finalScale },
      ],
    };
  });

  const renderIcon = (): React.ReactNode => {
    if (toast.icon) {
      const IconComponent = toast.icon;
      return <IconComponent height={24} width={24} />;
    }

    if (toast.variant !== "none") {
      return <ToastIcon variant={toast.variant} />;
    }

    return null;
  };

  const icon = renderIcon();

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.toastWrapper, animatedStyle]}>
        <View style={styles.toast}>
          {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          <View style={styles.contentContainer}>
            <Text
              style={[styles.title, toast.message && styles.titleWithMessage]}
            >
              {toast.title}
            </Text>
            {toast.message ? (
              <Text numberOfLines={2} style={styles.message}>
                {toast.message}
              </Text>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

ToastItem.displayName = "ToastItem";
