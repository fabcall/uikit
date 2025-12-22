import type { Middleware } from "../FloatingEngine";

/**
 * Mantém o elemento dentro da tela horizontalmente
 */
export const shift = (padding = 10): Middleware => ({
  name: "shift",
  fn: (state) => {
    const { x, visualViewport, elements } = state;
    const { width: floatingW } = elements.floating;
    const { width: screenW, insets } = visualViewport;

    let newX = x;

    if (x < insets.left + padding) {
      newX = insets.left + padding;
    } else if (x + floatingW > screenW - insets.right - padding) {
      newX = screenW - insets.right - padding - floatingW;
    }

    return { x: newX };
  },
});
