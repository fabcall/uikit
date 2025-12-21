import { Dimensions } from "react-native";

import type {
  CollisionBoundary,
  ComputedPosition,
  Placement,
  PositioningConfig,
  TriggerMeasurements,
} from "./ContextMenu.props";

const DEFAULT_BOUNDARY: CollisionBoundary = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

function calculatePositionForPlacement(
  placement: Placement,
  trigger: TriggerMeasurements,
  config: Required<PositioningConfig>,
  boundary: CollisionBoundary,
  contentDimensions?: { width: number; height: number },
  calculatedMaxHeight?: number
): { top?: number; bottom?: number; left?: number; right?: number; needsMeasurement?: boolean } {
  const { offset } = config;
  const screen = Dimensions.get("window");
  
  const hasReliableHeight = contentDimensions?.height !== undefined;
  const hasReliableWidth = contentDimensions?.width !== undefined;
  
  let contentHeight: number;
  if (contentDimensions?.height) {
    contentHeight = contentDimensions.height;
  } else if (calculatedMaxHeight !== undefined) {
    contentHeight = calculatedMaxHeight;
  } else {
    contentHeight = 50;
  }

  let top: number | undefined;
  let bottom: number | undefined;
  let left: number | undefined;
  let right: number | undefined;
  let needsMeasurement = false;

  if (placement.startsWith("top")) {
    if (hasReliableHeight) {
      const menuBottom = trigger.y - offset;
      const menuTop = menuBottom - contentHeight;
      const minAllowedTop = boundary.top + config.screenPadding;
      top = Math.max(minAllowedTop, menuTop);
      bottom = undefined;
    } else {
      // Use screen.height - triggerTop + offset to position bottom edge above trigger
      bottom = screen.height - (trigger.y - offset);
      top = undefined;
    }
  } else if (placement.startsWith("bottom")) {
    top = trigger.y + trigger.height + offset;
    bottom = undefined;
  } else if (placement.startsWith("left") || placement.startsWith("right")) {
    if (placement.endsWith("-start")) {
      top = trigger.y;
      bottom = undefined;
    } else if (placement.endsWith("-end")) {
      top = undefined;
      bottom = screen.height - (trigger.y + trigger.height);
    } else {
      const triggerCenterY = trigger.y + (trigger.height / 2);
      top = triggerCenterY;
      bottom = undefined;
    }
  }

  if (placement.startsWith("left")) {
    left = undefined;
    right = screen.width - trigger.x + offset;
  } else if (placement.startsWith("right")) {
    left = trigger.x + trigger.width + offset;
    right = undefined;
  } else if (placement.endsWith("-start")) {
    left = trigger.x;
    right = undefined;
  } else if (placement.endsWith("-end")) {
    left = undefined;
    right = screen.width - (trigger.x + trigger.width);
  } else {
    // Center alignment for "top" and "bottom" (no suffix)
    if (config.matchTriggerWidth) {
      // Match trigger width - align to start
      left = trigger.x;
      right = undefined;
    } else {
      // Center horizontally relative to trigger
      const triggerCenterX = trigger.x + (trigger.width / 2);
      if (hasReliableWidth) {
        // We know content width - center precisely
        left = triggerCenterX - (contentDimensions.width / 2);
        right = undefined;
      } else {
        // Don't know width yet - position at trigger center
        left = triggerCenterX;
        right = undefined;
        needsMeasurement = true;
      }
    }
  }

  return { top, bottom, left, right, needsMeasurement };
}

function checkCollision(
  position: { top?: number; bottom?: number; left?: number; right?: number },
  contentDimensions: { width: number; height: number },
  boundary: CollisionBoundary,
  screenPadding: number
): {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
} {
  const screen = Dimensions.get("window");
  
  const actualTop = position.top ?? (screen.height - (position.bottom ?? 0) - contentDimensions.height);
  const actualLeft = position.left ?? (screen.width - (position.right ?? 0) - contentDimensions.width);
  
  return {
    top: actualTop < boundary.top + screenPadding,
    right: actualLeft + contentDimensions.width > screen.width - boundary.right - screenPadding,
    bottom: actualTop + contentDimensions.height > screen.height - boundary.bottom - screenPadding,
    left: actualLeft < boundary.left + screenPadding,
  };
}

function getOppositePlacement(placement: Placement): Placement {
  const opposites: Record<Placement, Placement> = {
    "top-start": "bottom-start",
    "top": "bottom",
    "top-end": "bottom-end",
    "bottom-start": "top-start",
    "bottom": "top",
    "bottom-end": "top-end",
    "left-start": "right-start",
    "left": "right",
    "left-end": "right-end",
    "right-start": "left-start",
    "right": "left",
    "right-end": "left-end",
  };
  
  return opposites[placement];
}

function adjustPositionForCollision(
  position: { top?: number; bottom?: number; left?: number; right?: number },
  contentDimensions: { width: number; height: number },
  collision: ReturnType<typeof checkCollision>,
  boundary: CollisionBoundary,
  screenPadding: number
): { top?: number; bottom?: number; left?: number; right?: number } {
  const screen = Dimensions.get("window");
  const result = { ...position };
  
  const actualLeft = position.left ?? (screen.width - (position.right ?? 0) - contentDimensions.width);

  let newLeft = actualLeft;
  if (collision.left) {
    newLeft = boundary.left + screenPadding;
  } else if (collision.right) {
    newLeft = screen.width - boundary.right - contentDimensions.width - screenPadding;
  }

  if (collision.left || collision.right) {
    if (position.left !== undefined) {
      result.left = newLeft;
      result.right = undefined;
    } else {
      result.right = screen.width - newLeft - contentDimensions.width;
      result.left = undefined;
    }
  }

  return result;
}

function calculateAvailableSpace(
  trigger: TriggerMeasurements,
  boundary: CollisionBoundary,
  screenPadding: number
): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  const screen = Dimensions.get("window");
  
  return {
    top: trigger.y - boundary.top - screenPadding,
    right: screen.width - boundary.right - (trigger.x + trigger.width) - screenPadding,
    bottom: screen.height - boundary.bottom - (trigger.y + trigger.height) - screenPadding,
    left: trigger.x - boundary.left - screenPadding,
  };
}

function calculateMaxHeight(
  placement: Placement,
  trigger: TriggerMeasurements,
  config: Required<PositioningConfig>,
  boundary: CollisionBoundary
): number {
  const screen = Dimensions.get("window");
  const { offset, maxHeight, screenPadding } = config;
  
  let availableHeight = 0;
  
  if (placement.startsWith("top")) {
    availableHeight = trigger.y - boundary.top - offset - screenPadding;
  } else if (placement.startsWith("bottom")) {
    availableHeight = screen.height - boundary.bottom - (trigger.y + trigger.height) - offset - screenPadding;
  } else {
    availableHeight = screen.height - boundary.top - boundary.bottom - 2 * screenPadding;
  }
  
  const constrainedHeight = Math.min(maxHeight, availableHeight);
  
  return constrainedHeight;
}

export function calculatePosition(
  trigger: TriggerMeasurements,
  config: PositioningConfig,
  boundary?: Partial<CollisionBoundary>,
  contentDimensions?: { width: number; height: number }
): ComputedPosition & { needsMeasurement?: boolean } {
  const fullConfig: Required<PositioningConfig> = {
    placement: config.placement ?? "bottom-start",
    offset: config.offset ?? 4,
    matchTriggerWidth: config.matchTriggerWidth ?? false,
    maxHeight: config.maxHeight ?? 300,
    minHeight: config.minHeight ?? 100,
    collisionDetection: config.collisionDetection ?? true,
    collisionBoundary: config.collisionBoundary ?? {},
    screenPadding: config.screenPadding ?? 8,
  };

  const fullBoundary: CollisionBoundary = {
    ...DEFAULT_BOUNDARY,
    ...boundary,
  };

  const isExplicitPlacement = config.placement !== undefined;
  
  let placement = fullConfig.placement;
  let adjusted = false;

  const contentWidth = fullConfig.matchTriggerWidth 
    ? trigger.width 
    : (contentDimensions?.width ?? 200);

  const availableSpace = calculateAvailableSpace(trigger, fullBoundary, fullConfig.screenPadding);

  if (fullConfig.collisionDetection) {
    if (isExplicitPlacement) {
      const preferredMaxHeight = calculateMaxHeight(
        fullConfig.placement,
        trigger,
        fullConfig,
        fullBoundary
      );

      if (preferredMaxHeight < fullConfig.minHeight) {
        const isVerticalPlacement = fullConfig.placement.startsWith("top") || 
                                    fullConfig.placement.startsWith("bottom");
        const isHorizontalPlacement = fullConfig.placement.startsWith("left") || 
                                      fullConfig.placement.startsWith("right");
        
        if (isVerticalPlacement || isHorizontalPlacement) {
          const oppositePlacement = getOppositePlacement(fullConfig.placement);
          const oppositeMaxHeight = calculateMaxHeight(
            oppositePlacement,
            trigger,
            fullConfig,
            fullBoundary
          );
          
          if (oppositeMaxHeight >= fullConfig.minHeight) {
            placement = oppositePlacement;
            adjusted = true;
          }
        }
      }
      
    } else {
      const isVerticalPlacement = fullConfig.placement.startsWith("top") || 
                                  fullConfig.placement.startsWith("bottom");
      const isHorizontalPlacement = fullConfig.placement.startsWith("left") || 
                                    fullConfig.placement.startsWith("right");
      
      if (isVerticalPlacement) {
        const currentDirection = fullConfig.placement.startsWith("top") ? "top" : "bottom";
        const oppositeDirection = currentDirection === "top" ? "bottom" : "top";
        
        if (availableSpace[oppositeDirection] > availableSpace[currentDirection] * 1.2) {
          placement = getOppositePlacement(fullConfig.placement);
          adjusted = true;
        }
      } else if (isHorizontalPlacement) {
        const currentDirection = fullConfig.placement.startsWith("left") ? "left" : "right";
        const oppositeDirection = currentDirection === "left" ? "right" : "left";
        
        if (availableSpace[currentDirection] < contentWidth && 
            availableSpace[oppositeDirection] >= contentWidth) {
          placement = getOppositePlacement(fullConfig.placement);
          adjusted = true;
        }
      }
    }
  }

  const calculatedMaxHeight = calculateMaxHeight(placement, trigger, fullConfig, fullBoundary);
  const maxHeight = Math.max(fullConfig.minHeight, calculatedMaxHeight);

  const estimatedHeight = contentDimensions?.height ?? maxHeight;

  const finalDimensions = {
    width: contentWidth,
    height: Math.min(estimatedHeight, maxHeight),
  };

  let position = calculatePositionForPlacement(
    placement,
    trigger,
    fullConfig,
    fullBoundary,
    contentDimensions,
    maxHeight
  );

  const needsMeasurement = position.needsMeasurement || false;

  if (fullConfig.collisionDetection) {
    const collision = checkCollision(
      position,
      finalDimensions,
      fullBoundary,
      fullConfig.screenPadding
    );

    if (collision.left || collision.right) {
      position = {
        ...adjustPositionForCollision(
          position,
          finalDimensions,
          collision,
          fullBoundary,
          fullConfig.screenPadding
        ),
        needsMeasurement: position.needsMeasurement,
      };
      adjusted = true;
    }
  }

  return {
    top: position.top,
    bottom: position.bottom,
    left: position.left,
    right: position.right,
    width: fullConfig.matchTriggerWidth ? trigger.width : undefined,
    maxHeight,
    placement,
    adjusted,
    needsMeasurement,
  };
}
