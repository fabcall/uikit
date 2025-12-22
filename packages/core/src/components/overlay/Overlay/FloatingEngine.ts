import { type LayoutRectangle } from "react-native";
import { type EdgeInsets } from "react-native-safe-area-context";

export type Placement = "top" | "bottom" | "left" | "right";
export type Axis = "x" | "y";

export interface MiddlewareState {
  x: number;
  y: number;
  placement: Placement;
  initialPlacement: Placement;
  middlewareData: Record<string, unknown>;
  elements: {
    reference: LayoutRectangle;
    floating: LayoutRectangle;
  };
  visualViewport: {
    width: number;
    height: number;
    insets: EdgeInsets;
  };
}

export interface MiddlewareReturn {
  x?: number;
  y?: number;
  data?: Record<string, unknown>;
  reset?: boolean;
  placement?: Placement;
}

export interface Middleware {
  name: string;
  fn: (state: MiddlewareState) => MiddlewareReturn;
}

/**
 * Calcula a posição base para um dado placement
 */
const getBaseCoords = (
  reference: LayoutRectangle,
  floating: LayoutRectangle,
  placement: Placement
): { x: number; y: number } => {
  let x = reference.x;
  let y = reference.y;

  switch (placement) {
    case "top":
      x = reference.x + reference.width / 2 - floating.width / 2;
      y = reference.y - floating.height;
      break;
    case "bottom":
      x = reference.x + reference.width / 2 - floating.width / 2;
      y = reference.y + reference.height;
      break;
    case "left":
      x = reference.x - floating.width;
      y = reference.y + reference.height / 2 - floating.height / 2;
      break;
    case "right":
      x = reference.x + reference.width;
      y = reference.y + reference.height / 2 - floating.height / 2;
      break;
  }

  return { x, y };
};

/**
 * Engine principal que executa a pipeline de middlewares
 */
export const computePosition = (
  reference: LayoutRectangle,
  floating: LayoutRectangle,
  viewport: { width: number; height: number; insets: EdgeInsets },
  placement: Placement,
  middlewares: Middleware[]
): { x: number; y: number; placement: Placement; middlewareData: Record<string, unknown> } => {
  const baseCoords = getBaseCoords(reference, floating, placement);

  const state: MiddlewareState = {
    x: baseCoords.x,
    y: baseCoords.y,
    placement,
    initialPlacement: placement,
    middlewareData: {},
    elements: { reference, floating },
    visualViewport: viewport,
  };

  for (let i = 0; i < middlewares.length; i++) {
    const { name, fn } = middlewares[i];
    const result = fn(state);

    // Se o middleware pedir reset (ex: Flip mudou a posição)
    if (result.reset && result.placement && result.placement !== state.placement) {
      state.placement = result.placement;
      const newCoords = getBaseCoords(reference, floating, result.placement);
      state.x = newCoords.x;
      state.y = newCoords.y;
      state.middlewareData = {};
      i = -1; // Reinicia o loop
      continue;
    }

    if (result.x !== undefined) state.x = result.x;
    if (result.y !== undefined) state.y = result.y;
    if (result.data) {
      state.middlewareData[name] = result.data;
    }
  }

  return {
    x: state.x,
    y: state.y,
    placement: state.placement,
    middlewareData: state.middlewareData,
  };
};
