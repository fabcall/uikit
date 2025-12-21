import type { Middleware } from "../types";
import { getScreenDimensions } from "../utils";

/**
 * Middleware: Calculate available space in all directions
 */
export const computeAvailableSpace: Middleware = (state) => {
  const screen = getScreenDimensions();
  const { trigger, boundary, config } = state;
  
  const availableSpace = {
    top: trigger.y - boundary.top - config.screenPadding,
    right: screen.width - boundary.right - (trigger.x + trigger.width) - config.screenPadding,
    bottom: screen.height - boundary.bottom - (trigger.y + trigger.height) - config.screenPadding,
    left: trigger.x - boundary.left - config.screenPadding,
  };
  
  return { ...state, availableSpace };
};