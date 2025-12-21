import type { Middleware } from "../types";
import { getScreenDimensions, parsePlacement } from "../utils";

/**
 * Middleware: Calculate maximum height constraint
 */
export const computeMaxHeight: Middleware = (state) => {
  const screen = getScreenDimensions();
  const { trigger, boundary, config, placement } = state;
  const { side } = parsePlacement(placement);
  const { offset, maxHeight, screenPadding } = config;
  
  let availableHeight = 0;
  
  if (side === "top") {
    availableHeight = trigger.y - boundary.top - offset - screenPadding;
  } else if (side === "bottom") {
    availableHeight = screen.height - boundary.bottom - (trigger.y + trigger.height) - offset - screenPadding;
  } else {
    availableHeight = screen.height - boundary.top - boundary.bottom - 2 * screenPadding;
  }
  
  const calculatedMaxHeight = Math.min(maxHeight, availableHeight);
  const finalMaxHeight = Math.max(config.minHeight, calculatedMaxHeight);
  
  return { ...state, maxHeight: finalMaxHeight };
};