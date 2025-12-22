import type { MiddlewareState } from "../FloatingEngine";

/**
 * Calcula o espaço vertical disponível em um lado
 */
export const getAvailableHeight = (
  state: MiddlewareState,
  side: "top" | "bottom"
): number => {
  const { visualViewport, elements } = state;
  const { insets, height: screenH } = visualViewport;
  const { reference } = elements;

  if (side === "top") {
    return reference.y - insets.top;
  }
  return screenH - insets.bottom - (reference.y + reference.height);
};
