import { type Middleware } from "../FloatingEngine";
import { getAvailableHeight } from "./getAvailableHeight";

/**
 * Calcula o maxHeight dinâmico baseado no espaço disponível
 * Só aplica para placements verticais (top/bottom)
 */
export const size = (
  padding = 10,
  options?: { maxHeight?: number }
): Middleware => ({
  name: "size",
  fn: (state) => {
    const { placement } = state;
    
    // Só calcula maxHeight para placements verticais
    const isVertical = placement === "top" || placement === "bottom";
    if (!isVertical) {
      return {};
    }
    
    const side = placement === "top" ? "top" : "bottom";
    const available = getAvailableHeight(state, side) - padding;
    const userMaxHeight = options?.maxHeight || Infinity;
    const finalMaxHeight = Math.min(Math.max(0, available), userMaxHeight);

    return {
      data: { maxHeight: finalMaxHeight },
    };
  },
});






































