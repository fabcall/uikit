import type { Middleware } from "../FloatingEngine";

/**
 * Força a largura do elemento flutuante ser igual à do trigger
 */
export const matchWidth = (): Middleware => ({
  name: "matchWidth",
  fn: ({ elements }) => ({
    data: { width: elements.reference.width },
  }),
});
