import { DEFAULT_BOUNDARY, DEFAULT_CONFIG } from "./constants";
import { applyMiddleware } from "./core";
import type {
  CollisionBoundary,
  ComputedPosition,
  Dimensions2D,
  Middleware,
  MiddlewareState,
  PositioningConfig,
  TriggerMeasurements,
} from "./types";

/**
 * Create custom positioning function with specific middlewares
 *
 * @example
 * const customCalculate = createPositioning([
 *   middlewares.computeAvailableSpace,
 *   middlewares.computeMaxHeight,
 *   middlewares.computePosition,
 *   // Skip flip and shift for fixed positioning
 * ]);
 */
export function createPositioning(customMiddlewares: Middleware[]) {
  return (
    trigger: TriggerMeasurements,
    config: PositioningConfig,
    boundary?: Partial<CollisionBoundary>,
    contentDimensions?: Dimensions2D
  ): ComputedPosition & { needsMeasurement?: boolean } => {
    const fullConfig: Required<PositioningConfig> = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    const fullBoundary: CollisionBoundary = {
      ...DEFAULT_BOUNDARY,
      ...boundary,
    };

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

    const finalState = applyMiddleware(initialState, customMiddlewares);

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
  };
}
