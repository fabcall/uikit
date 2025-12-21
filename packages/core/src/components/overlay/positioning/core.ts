import type { Middleware, MiddlewareState } from "./types";

/**
 * Execute middleware pipeline
 */
export function applyMiddleware(
  initialState: MiddlewareState, 
  middlewares: Middleware[]
): MiddlewareState {
  return middlewares.reduce((state, middleware) => middleware(state), initialState);
}