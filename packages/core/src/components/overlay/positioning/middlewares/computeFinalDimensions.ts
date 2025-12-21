import type { Middleware } from "../types";

/**
 * Middleware: Calculate final content dimensions
 */
export const computeFinalDimensions: Middleware = (state) => {
  const { config, trigger, contentDimensions, maxHeight } = state;
  
  const contentWidth = config.matchTriggerWidth 
    ? trigger.width 
    : (contentDimensions?.width ?? 200);
  
  const estimatedHeight = contentDimensions?.height ?? maxHeight;
  
  const finalDimensions = {
    width: contentWidth,
    height: Math.min(estimatedHeight, maxHeight),
  };
  
  return { ...state, finalDimensions };
};