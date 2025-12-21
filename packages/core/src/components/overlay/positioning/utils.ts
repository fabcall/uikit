import { Dimensions } from "react-native";

import type { Alignment, Dimensions2D, Placement, PlacementParts, Side } from "./types";

/**
 * Parse placement string into side and alignment
 * @example "top-start" -> { side: "top", alignment: "start" }
 */
export function parsePlacement(placement: Placement): PlacementParts {
  const [side, alignment = "center"] = placement.split("-") as [Side, Alignment?];
  return { side, alignment };
}

/**
 * Combine side and alignment into placement string
 */
export function createPlacement(side: Side, alignment: Alignment): Placement {
  return alignment === "center" 
    ? (side as Placement)
    : `${side}-${alignment}` as Placement;
}

/**
 * Get the opposite side
 */
export function getOppositeSide(side: Side): Side {
  const opposites: Record<Side, Side> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  };
  return opposites[side];
}

/**
 * Get opposite placement while preserving alignment
 */
export function getOppositePlacement(placement: Placement): Placement {
  const { side, alignment } = parsePlacement(placement);
  const oppositeSide = getOppositeSide(side);
  return createPlacement(oppositeSide, alignment);
}

/**
 * Check if placement is vertical (top/bottom)
 */
export function isVerticalPlacement(side: Side): boolean {
  return side === "top" || side === "bottom";
}

/**
 * Check if placement is horizontal (left/right)
 */
export function isHorizontalPlacement(side: Side): boolean {
  return side === "left" || side === "right";
}

/**
 * Get screen dimensions
 */
export function getScreenDimensions(): Dimensions2D {
  const screen = Dimensions.get("window");
  return { width: screen.width, height: screen.height };
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
