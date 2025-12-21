import type { Middleware } from "../types";
import {
  getOppositePlacement,
  getOppositeSide,
  getScreenDimensions,
  isHorizontalPlacement,
  isVerticalPlacement,
  parsePlacement,
} from "../utils";

/**
 * Middleware: Flip placement if needed based on available space
 */
export const flip: Middleware = (state) => {
  if (!state.config.collisionDetection) {
    return state;
  }

  const { side } = parsePlacement(state.placement);
  const isExplicitPlacement = state.config.placement !== undefined;

  // Strategy 1: Explicit placement with minHeight constraint
  if (isExplicitPlacement) {
    const screen = getScreenDimensions();
    const { trigger, boundary, config } = state;
    const { offset, minHeight, screenPadding } = config;

    let preferredAvailableHeight = 0;
    if (side === "top") {
      preferredAvailableHeight =
        trigger.y - boundary.top - offset - screenPadding;
    } else if (side === "bottom") {
      preferredAvailableHeight =
        screen.height -
        boundary.bottom -
        (trigger.y + trigger.height) -
        offset -
        screenPadding;
    } else {
      return state;
    }

    const preferredMaxHeight = Math.min(
      config.maxHeight,
      preferredAvailableHeight
    );

    if (preferredMaxHeight < minHeight) {
      const oppositeSide = getOppositeSide(side);

      let oppositeAvailableHeight = 0;
      if (oppositeSide === "top") {
        oppositeAvailableHeight =
          trigger.y - boundary.top - offset - screenPadding;
      } else if (oppositeSide === "bottom") {
        oppositeAvailableHeight =
          screen.height -
          boundary.bottom -
          (trigger.y + trigger.height) -
          offset -
          screenPadding;
      }

      const oppositeMaxHeight = Math.min(
        config.maxHeight,
        oppositeAvailableHeight
      );

      if (oppositeMaxHeight >= minHeight) {
        return {
          ...state,
          placement: getOppositePlacement(state.placement),
          adjusted: true,
        };
      }
    }

    return state;
  }

  // Strategy 2: Automatic placement based on available space
  if (isVerticalPlacement(side)) {
    const currentSpace = state.availableSpace[side];
    const oppositeSpace = state.availableSpace[getOppositeSide(side)];

    if (oppositeSpace > currentSpace * 1.2) {
      return {
        ...state,
        placement: getOppositePlacement(state.placement),
        adjusted: true,
      };
    }
  } else if (isHorizontalPlacement(side)) {
    const contentWidth = state.contentDimensions?.width ?? 200;
    const currentSpace = state.availableSpace[side];
    const oppositeSpace = state.availableSpace[getOppositeSide(side)];

    if (currentSpace < contentWidth && oppositeSpace >= contentWidth) {
      return {
        ...state,
        placement: getOppositePlacement(state.placement),
        adjusted: true,
      };
    }
  }

  return state;
};
