import { useDimensions } from "@readykit/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LayoutRectangle, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ContextMenuPosition, Placement } from "./ContextMenu.props";
import { calculatePosition } from "./ContextMenu.utils";

export interface UseContextMenuPositionConfig {
  placement?: Placement;
  offset?: number;
  respectSafeArea?: boolean;
  visible?: boolean;
  matchTriggerWidth?: boolean;
}

export interface UseContextMenuPositionReturn {
  triggerRef: React.RefObject<View | null>;
  position: ContextMenuPosition;
  contentSize: { width: number; height: number };
  triggerLayout: LayoutRectangle | null;
  measureAndPosition: () => void;
  setContentSize: (size: { width: number; height: number }) => void;
}

export function useContextMenuPosition(
  config: UseContextMenuPositionConfig = {}
): UseContextMenuPositionReturn {
  const {
    placement = "bottom",
    offset = 8,
    respectSafeArea = true,
    visible = false,
    matchTriggerWidth = false,
  } = config;

  const triggerRef = useRef<View>(null);
  const safeAreaInsets = useSafeAreaInsets();
  const { window: windowDimensions } = useDimensions();

  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState<ContextMenuPosition>({
    top: 0,
    left: 0,
    placement,
    width: undefined,
  });

  const measureAndPosition = useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
      });
    }
  }, []);

  useEffect(() => {
    if (visible && triggerLayout && contentSize.width > 0) {
      const calculatedPosition = calculatePosition({
        triggerLayout,
        contentSize,
        placement,
        offset,
        safeAreaInsets,
        respectSafeArea,
        windowDimensions,
      });

      if (matchTriggerWidth) {
        calculatedPosition.width = triggerLayout.width;
      }

      setPosition(calculatedPosition);
    }
  }, [
    visible,
    triggerLayout,
    contentSize,
    placement,
    offset,
    safeAreaInsets,
    respectSafeArea,
    windowDimensions,
    matchTriggerWidth,
  ]);

  return {
    triggerRef,
    position,
    contentSize,
    triggerLayout,
    measureAndPosition,
    setContentSize,
  };
}
