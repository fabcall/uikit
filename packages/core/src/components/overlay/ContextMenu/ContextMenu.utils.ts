import type { LayoutRectangle, ScaledSize } from "react-native";

import type { ContextMenuPosition, Placement } from "./ContextMenu.props";

interface CalculatePositionParams {
  triggerLayout: LayoutRectangle;
  contentSize: { width: number; height: number };
  placement: Placement;
  offset: number;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  respectSafeArea: boolean;
  windowDimensions: ScaledSize;
}

const SCREEN_PADDING = 8;

export function calculatePosition({
  triggerLayout,
  contentSize,
  placement,
  offset,
  safeAreaInsets,
  respectSafeArea,
  windowDimensions,
}: CalculatePositionParams): ContextMenuPosition {
  const screen = windowDimensions;
  
  const safeArea = respectSafeArea
    ? safeAreaInsets
    : { top: 0, bottom: 0, left: 0, right: 0 };
  
  const bounds = {
    top: safeArea.top + SCREEN_PADDING,
    bottom: screen.height - safeArea.bottom - SCREEN_PADDING,
    left: safeArea.left + SCREEN_PADDING,
    right: screen.width - safeArea.right - SCREEN_PADDING,
  };
    
  let position = getInitialPosition(triggerLayout, contentSize, placement, offset);
  
  // Detecção de colisão e ajuste automático
  const collision = detectCollision(position, contentSize, bounds);
  
  if (collision.top || collision.bottom || collision.left || collision.right) {
    const adjustedPlacement = getAdjustedPlacement(
      placement,
      collision,
      triggerLayout,
      contentSize,
      bounds
    );
    
    position = getInitialPosition(
      triggerLayout,
      contentSize,
      adjustedPlacement,
      offset
    );
  }
  
  // Garante que o conteúdo não ultrapasse os limites
  position.top = Math.max(bounds.top, Math.min(position.top, bounds.bottom - contentSize.height));
  position.left = Math.max(bounds.left, Math.min(position.left, bounds.right - contentSize.width));
  
  return {
    ...position,
    placement: position.placement || placement,
  };
}

function getInitialPosition(
  triggerLayout: LayoutRectangle,
  contentSize: { width: number; height: number },
  placement: Placement,
  offset: number
): ContextMenuPosition {
  const { x, y, width, height } = triggerLayout;
  let top = 0;
  let left = 0;
  
  switch (placement) {
    case "top":
      top = y - contentSize.height - offset;
      left = x + width / 2 - contentSize.width / 2;
      break;
    case "top-start":
      top = y - contentSize.height - offset;
      left = x;
      break;
    case "top-end":
      top = y - contentSize.height - offset;
      left = x + width - contentSize.width;
      break;
    case "bottom":
      top = y + height + offset;
      left = x + width / 2 - contentSize.width / 2;
      break;
    case "bottom-start":
      top = y + height + offset;
      left = x;
      break;
    case "bottom-end":
      top = y + height + offset;
      left = x + width - contentSize.width;
      break;
    case "left":
      top = y + height / 2 - contentSize.height / 2;
      left = x - contentSize.width - offset;
      break;
    case "left-start":
      top = y;
      left = x - contentSize.width - offset;
      break;
    case "left-end":
      top = y + height - contentSize.height;
      left = x - contentSize.width - offset;
      break;
    case "right":
      top = y + height / 2 - contentSize.height / 2;
      left = x + width + offset;
      break;
    case "right-start":
      top = y;
      left = x + width + offset;
      break;
    case "right-end":
      top = y + height - contentSize.height;
      left = x + width + offset;
      break;
  }
  
  return { top, left, placement };
}

interface Collision {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

function detectCollision(
  position: { top: number; left: number },
  contentSize: { width: number; height: number },
  bounds: { top: number; bottom: number; left: number; right: number }
): Collision {
  return {
    top: position.top < bounds.top,
    bottom: position.top + contentSize.height > bounds.bottom,
    left: position.left < bounds.left,
    right: position.left + contentSize.width > bounds.right,
  };
}

function getAdjustedPlacement(
  placement: Placement,
  collision: Collision,
  triggerLayout: LayoutRectangle,
  contentSize: { width: number; height: number },
  bounds: { top: number; bottom: number; left: number; right: number }
): Placement {
  const [primary, secondary] = placement.split("-") as [string, string?];
  
  // Prioridade de ajuste baseada na colisão
  if (primary === "top" && collision.top) {
    return secondary ? `bottom-${secondary}` as Placement : "bottom";
  }
  if (primary === "bottom" && collision.bottom) {
    return secondary ? `top-${secondary}` as Placement : "top";
  }
  if (primary === "left" && collision.left) {
    return secondary ? `right-${secondary}` as Placement : "right";
  }
  if (primary === "right" && collision.right) {
    return secondary ? `left-${secondary}` as Placement : "left";
  }
  
  // Se ainda houver colisão, tenta encontrar o melhor posicionamento
  if (collision.left || collision.right) {
    const spaceAbove = triggerLayout.y - bounds.top;
    const spaceBelow = bounds.bottom - (triggerLayout.y + triggerLayout.height);
    
    if (spaceBelow > spaceAbove && spaceBelow > contentSize.height) {
      return "bottom";
    } else if (spaceAbove > contentSize.height) {
      return "top";
    }
  }
  
  return placement;
}

export function getArrowPosition(
  placement: Placement,
  triggerLayout: LayoutRectangle,
  contentLayout: { top: number; left: number; width: number; height: number }
): { top?: number; left?: number } {
  const [primary] = placement.split("-");
  const triggerCenter = {
    x: triggerLayout.x + triggerLayout.width / 2,
    y: triggerLayout.y + triggerLayout.height / 2,
  };
  
  switch (primary) {
    case "top":
    case "bottom":
      return {
        left: Math.max(
          16,
          Math.min(
            triggerCenter.x - contentLayout.left - 8,
            contentLayout.width - 24
          )
        ),
      };
    case "left":
    case "right":
      return {
        top: Math.max(
          16,
          Math.min(
            triggerCenter.y - contentLayout.top - 8,
            contentLayout.height - 24
          )
        ),
      };
    default:
      return {};
  }
}