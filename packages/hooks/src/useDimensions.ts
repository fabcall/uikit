import { useEffect, useState } from "react";
import { Dimensions, type ScaledSize } from "react-native";

export interface UseDimensionsReturn {
  /**
   * Current window dimensions
   */
  window: ScaledSize;
  /**
   * Current screen dimensions
   */
  screen: ScaledSize;
  /**
   * Shorthand for window.width
   */
  width: number;
  /**
   * Shorthand for window.height
   */
  height: number;
  /**
   * Whether device is in landscape mode
   */
  isLandscape: boolean;
  /**
   * Whether device is in portrait mode
   */
  isPortrait: boolean;
}

/**
 * Hook for observing screen/window dimensions
 *
 * Automatically updates when device rotates or screen size changes.
 * Useful for responsive layouts and positioning calculations.
 *
 * @example
 * ```tsx
 * const { width, height, isLandscape } = useDimensions();
 *
 * return (
 *   <View>
 *     <Text>Screen: {width}x{height}</Text>
 *     <Text>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</Text>
 *   </View>
 * );
 * ```
 */
export function useDimensions(): UseDimensionsReturn {
  const [dimensions, setDimensions] = useState(() => ({
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
  }));

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );

    return () => subscription?.remove();
  }, []);

  const { window, screen } = dimensions;
  const isLandscape = window.width > window.height;

  return {
    window,
    screen,
    width: window.width,
    height: window.height,
    isLandscape,
    isPortrait: !isLandscape,
  };
}
