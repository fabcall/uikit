import { DEFAULT_BOUNDARY, DEFAULT_CONFIG } from "./constants";
import { applyMiddleware } from "./core";
import * as middlewares from "./middlewares";
import type {
  CollisionBoundary,
  ComputedPosition,
  Dimensions2D,
  MiddlewareState,
  PositioningConfig,
  TriggerMeasurements,
} from "./types";

/**
 * Calculate position using middleware-based pipeline
 *
 * Inspired by Floating UI's middleware architecture:
 * 1. computeAvailableSpace - Calculate available space
 * 2. computeMaxHeight - Calculate height constraints
 * 3. flip - Flip placement if needed
 * 4. computeFinalDimensions - Calculate final dimensions
 * 5. computePosition - Calculate coordinates
 * 6. shift - Resolve collisions
 */
export function calculatePosition(
  trigger: TriggerMeasurements,
  config: PositioningConfig,
  boundary?: Partial<CollisionBoundary>,
  contentDimensions?: Dimensions2D
): ComputedPosition & { needsMeasurement?: boolean } {
  // Normalize configuration
  const fullConfig: Required<PositioningConfig> = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const fullBoundary: CollisionBoundary = {
    ...DEFAULT_BOUNDARY,
    ...boundary,
  };

  // Initialize state
  const initialState: MiddlewareState = {
    trigger,
    config: fullConfig,
    boundary: fullBoundary,
    contentDimensions,
    placement: fullConfig.placement,
    availableSpace: { top: 0, right: 0, bottom: 0, left: 0 },
    maxHeight: 300,
    finalDimensions: { width: 0, height: 0 },
    position: {},
    adjusted: false,
    needsMeasurement: false,
  };

  // Execute middleware pipeline
  const finalState = applyMiddleware(initialState, [
    middlewares.computeAvailableSpace,
    middlewares.computeMaxHeight,
    middlewares.flip,
    middlewares.computeMaxHeight, // Recalculate after potential flip
    middlewares.computeFinalDimensions,
    middlewares.computePosition,
    middlewares.shift,
  ]);

  // Return computed position
  return {
    top: finalState.position.top,
    bottom: finalState.position.bottom,
    left: finalState.position.left,
    right: finalState.position.right,
    width: fullConfig.matchTriggerWidth ? trigger.width : undefined,
    maxHeight: finalState.maxHeight,
    placement: finalState.placement,
    adjusted: finalState.adjusted,
    needsMeasurement: finalState.needsMeasurement,
  };
}
