import type { Middleware } from "../FloatingEngine";

/**
 * Adiciona espaçamento (gap) entre o trigger e o elemento flutuante
 */
export const offset = (value: number): Middleware => ({
  name: "offset",
  fn: ({ placement, x, y }) => {
    let newX = x;
    let newY = y;

    if (placement === "top") newY -= value;
    if (placement === "bottom") newY += value;
    if (placement === "left") newX -= value;
    if (placement === "right") newX += value;

    return { x: newX, y: newY };
  },
});
