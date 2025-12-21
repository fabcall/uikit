import type { Middleware } from "../types";
import { getScreenDimensions } from "../utils";

/**
 * Middleware: Adjust position to resolve collisions
 */
export const shift: Middleware = (state) => {
  if (!state.config.collisionDetection) {
    return state;
  }

  const screen = getScreenDimensions();
  const { position, finalDimensions, boundary, config } = state;
  const { screenPadding } = config;

  // Detect collisions
  const actualTop =
    position.top ??
    screen.height - (position.bottom ?? 0) - finalDimensions.height;
  const actualLeft =
    position.left ??
    screen.width - (position.right ?? 0) - finalDimensions.width;

  const collision = {
    top: actualTop < boundary.top + screenPadding,
    right:
      actualLeft + finalDimensions.width >
      screen.width - boundary.right - screenPadding,
    bottom:
      actualTop + finalDimensions.height >
      screen.height - boundary.bottom - screenPadding,
    left: actualLeft < boundary.left + screenPadding,
  };

  // Resolve horizontal collisions
  if (!collision.left && !collision.right) {
    return state;
  }

  let newLeft = actualLeft;
  if (collision.left) {
    newLeft = boundary.left + screenPadding;
  } else if (collision.right) {
    newLeft =
      screen.width - boundary.right - finalDimensions.width - screenPadding;
  }

  const newPosition = { ...position };
  if (position.left !== undefined) {
    newPosition.left = newLeft;
    newPosition.right = undefined;
  } else {
    newPosition.right = screen.width - newLeft - finalDimensions.width;
    newPosition.left = undefined;
  }

  return {
    ...state,
    position: newPosition,
    adjusted: true,
  };
};
