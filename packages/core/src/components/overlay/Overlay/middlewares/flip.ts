import type { Middleware } from "../FloatingEngine";
import { getAvailableHeight } from "./getAvailableHeight";

/**
 * Vira o elemento para o lado oposto se não houver espaço suficiente
 */
export const flip = (options?: {
  minHeight?: number;
  gap?: number;
  screenPadding?: number;
}): Middleware => ({
  name: "flip",
  fn: (state) => {
    const { placement, initialPlacement } = state;
    const { minHeight = 0, gap = 0, screenPadding = 0 } = options || {};

    if (placement === initialPlacement) {
      const isVertical = placement === "top" || placement === "bottom";

      if (isVertical) {
        const availableSpace = getAvailableHeight(state, placement) - gap - screenPadding;

        if (availableSpace < minHeight) {
          const opposites: Record<string, string> = {
            top: "bottom",
            bottom: "top",
          };
          return {
            reset: true,
            placement: opposites[placement] as "top" | "bottom",
          };
        }
      }
    }
    return {};
  },
});
