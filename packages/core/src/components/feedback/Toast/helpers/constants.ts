export const ANIMATION_CONFIG = {
  APPEAR_DURATION: 300,
  DISMISS_DURATION: 280,
  SPRING_CONFIG: {
    damping: 20,
    stiffness: 90,
  },
} as const;

export const TOAST_CONFIG = {
  MAX_STACK: 3,
  STACK_GAP: 8,
  DISMISS_THRESHOLD: 80,
  BASE_TOP_PADDING: 16,
  PRESS_SCALE_FACTOR: 0.96,
  DISMISS_VELOCITY_THRESHOLD: -500,
  MAX_DOWNWARD_DRAG: 20,
} as const;

export const DURATIONS = {
  short: 3000,
  long: 5000,
  infinite: Infinity,
} as const;
