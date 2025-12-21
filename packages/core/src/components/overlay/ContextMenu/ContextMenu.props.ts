import type { ReactNode } from "react";
import type { ViewProps } from "react-native";

/**
 * Placement options for the context menu
 * Format: [vertical]-[horizontal]
 */
export type Placement =
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "left-start"
  | "left"
  | "left-end";

/**
 * Strategy for positioning the content
 */
export type PositioningStrategy = "absolute" | "fixed";

/**
 * Collision detection boundaries
 */
export interface CollisionBoundary {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Computed position for the content
 */
export interface ComputedPosition {
  top: number | undefined;
  bottom: number | undefined;
  left: number | undefined;
  right: number | undefined;
  width?: number;
  maxHeight?: number;
  /**
   * The actual placement used after collision detection
   */
  placement: Placement;
  /**
   * Whether the position was adjusted due to collision
   */
  adjusted: boolean;
}

/**
 * Configuration for positioning
 */
export interface PositioningConfig {
  /**
   * Preferred placement
   * @default "bottom-start"
   */
  placement?: Placement;
  /**
   * Offset from the trigger (in pixels)
   * @default 4
   */
  offset?: number;
  /**
   * Whether to match the trigger's width
   * @default false
   */
  matchTriggerWidth?: boolean;
  /**
   * Maximum height for the content
   */
  maxHeight?: number;
  /**
   * Minimum height to ensure usability
   * @default 100
   */
  minHeight?: number;
  /**
   * Enable collision detection and auto-adjustment
   * @default true
   */
  collisionDetection?: boolean;
  /**
   * Custom collision boundary (defaults to safe area insets)
   */
  collisionBoundary?: Partial<CollisionBoundary>;
  /**
   * Padding from screen edges
   * @default 8
   */
  screenPadding?: number;
}

/**
 * Trigger measurements
 */
export interface TriggerMeasurements {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

/**
 * Context menu trigger props
 */
export interface ContextMenuTriggerProps extends Omit<ViewProps, "style"> {
  children: ReactNode;
  /**
   * Whether the menu is currently open
   */
  isOpen?: boolean;
  /**
   * Disable the trigger
   */
  disabled?: boolean;
  /**
   * Callback when trigger is pressed
   */
  onPress?: () => void;
  /**
   * Accessibility label
   */
  accessibilityLabel?: string;
}

/**
 * Context menu content props
 */
export interface ContextMenuContentProps extends Omit<ViewProps, "style"> {
  children: ReactNode;
  /**
   * Whether to show the content
   */
  visible?: boolean;
  /**
   * Callback when content should be dismissed
   */
  onDismiss?: () => void;
  /**
   * Positioning configuration
   */
  positioning?: PositioningConfig;
  /**
   * Animation type for modal
   * @default "fade"
   */
  animationType?: "none" | "slide" | "fade";
  /**
   * Whether to render backdrop overlay
   * @default true
   */
  withBackdrop?: boolean;
  /**
   * Custom backdrop opacity
   * @default 0
   */
  backdropOpacity?: number;
  /**
   * Portal container (for advanced use cases)
   */
  portalHost?: string;
}

/**
 * Root context menu props
 */
export interface ContextMenuProps {
  children: ReactNode;
  /**
   * Whether the menu is open
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Default open state (uncontrolled)
   */
  defaultOpen?: boolean;
  /**
   * Modal mode (prevents interaction with background)
   * @default true
   */
  modal?: boolean;
}

/**
 * Context menu context value
 */
export interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<any>;
  contentRef: React.RefObject<any>;
  positioning: PositioningConfig;
  setPositioning: (config: PositioningConfig) => void;
  measurements: TriggerMeasurements | null;
  computedPosition: ComputedPosition | null;
  measureTrigger: () => void;
}