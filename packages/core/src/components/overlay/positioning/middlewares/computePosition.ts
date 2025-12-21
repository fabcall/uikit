import type { Middleware } from "../types";
import {
  getScreenDimensions,
  isHorizontalPlacement,
  isVerticalPlacement,
  parsePlacement,
} from "../utils";

/**
 * Middleware: Calculate position coordinates
 */
export const computePosition: Middleware = (state) => {
  const screen = getScreenDimensions();
  const { trigger, config, placement, contentDimensions, maxHeight, boundary } =
    state;
  const { side, alignment } = parsePlacement(placement);
  const { offset, matchTriggerWidth, screenPadding } = config;

  const hasReliableHeight = contentDimensions?.height !== undefined;
  const hasReliableWidth = contentDimensions?.width !== undefined;
  const contentHeight = contentDimensions?.height ?? maxHeight ?? 50;

  const position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  } = {};

  let needsMeasurement = false;

  // Main axis (vertical for top/bottom)
  if (side === "top") {
    if (hasReliableHeight) {
      const menuBottom = trigger.y - offset;
      const menuTop = menuBottom - contentHeight;
      const minAllowedTop = boundary.top + screenPadding;
      position.top = Math.max(minAllowedTop, menuTop);
    } else {
      position.bottom = screen.height - (trigger.y - offset);
    }
  } else if (side === "bottom") {
    position.top = trigger.y + trigger.height + offset;
  }

  // Cross axis for vertical placements (horizontal positioning)
  if (isVerticalPlacement(side)) {
    if (alignment === "start") {
      position.left = trigger.x;
    } else if (alignment === "end") {
      position.right = screen.width - (trigger.x + trigger.width);
    } else {
      // Center alignment
      if (matchTriggerWidth) {
        position.left = trigger.x;
      } else {
        const triggerCenterX = trigger.x + trigger.width / 2;
        if (hasReliableWidth && contentDimensions) {
          position.left = triggerCenterX - contentDimensions.width / 2;
        } else {
          position.left = triggerCenterX;
          needsMeasurement = true;
        }
      }
    }
  }

  // For horizontal placements (left/right)
  if (isHorizontalPlacement(side)) {
    // Vertical positioning (cross-axis)
    if (alignment === "start") {
      position.top = trigger.y;
    } else if (alignment === "end") {
      position.bottom = screen.height - (trigger.y + trigger.height);
    } else {
      // Center alignment
      position.top = trigger.y + trigger.height / 2;
    }

    // Horizontal positioning (main axis)
    if (side === "left") {
      position.right = screen.width - trigger.x + offset;
    } else {
      position.left = trigger.x + trigger.width + offset;
    }
  }

  return { ...state, position, needsMeasurement };
};
