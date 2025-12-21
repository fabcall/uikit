
export type Side = "top" | "right" | "bottom" | "left";
export type Alignment = "start" | "center" | "end";

export type Placement =
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "left-start"
  | "left"
  | "left-end";

export interface Coords {
  x: number;
  y: number;
}

export interface Dimensions2D {
  width: number;
  height: number;
}

export interface Rect extends Coords, Dimensions2D {}

export interface CollisionBoundary {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface AvailableSpace {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface PlacementParts {
  side: Side;
  alignment: Alignment;
}

export interface TriggerMeasurements {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export interface PositioningConfig {
  placement?: Placement;
  offset?: number;
  matchTriggerWidth?: boolean;
  maxHeight?: number;
  minHeight?: number;
  collisionDetection?: boolean;
  collisionBoundary?: Partial<CollisionBoundary>;
  screenPadding?: number;
}

export interface ComputedPosition {
  top: number | undefined;
  bottom: number | undefined;
  left: number | undefined;
  right: number | undefined;
  width?: number;
  maxHeight?: number;
  placement: Placement;
  adjusted: boolean;
}

/**
 * Middleware state that flows through the positioning pipeline
 */
export interface MiddlewareState {
  // Input
  trigger: TriggerMeasurements;
  config: Required<PositioningConfig>;
  boundary: CollisionBoundary;
  contentDimensions?: Dimensions2D;
  
  // Computed values
  placement: Placement;
  availableSpace: AvailableSpace;
  maxHeight: number;
  finalDimensions: Dimensions2D;
  
  // Position output
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  
  // Metadata
  adjusted: boolean;
  needsMeasurement: boolean;
}

/**
 * Middleware function type
 */
export type Middleware = (state: MiddlewareState) => MiddlewareState;
