import type { CollisionBoundary } from "./types";

export const DEFAULT_BOUNDARY: CollisionBoundary = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const DEFAULT_CONFIG = {
  placement: "bottom-start" as const,
  offset: 4,
  matchTriggerWidth: false,
  maxHeight: 300,
  minHeight: 100,
  collisionDetection: true,
  collisionBoundary: {},
  screenPadding: 8,
};