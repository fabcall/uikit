// useContextMenu.ts
import { useDimensions } from "@readykit/hooks";
import { useCallback, useRef, useState } from "react";
import type { View } from "react-native";

export interface ContextMenuConfig {
  position?: "top" | "bottom";
  maxHeight: number;
  itemCount?: number;
  itemHeight?: number;
  extraPadding?: number;
  /** Gap entre trigger e menu */
  gap?: number;
}

export interface MenuPosition {
  top: number;
  left: number;
  width: number;
  /** Indica se o menu abriu para cima */
  openedUpwards: boolean;
}

export interface UseContextMenuReturn {
  triggerRef: React.RefObject<View | null>;
  position: MenuPosition;
  isOpen: boolean;
  /** Indica se a posição está sendo calculada */
  isPositioning: boolean;
  open: () => Promise<void>;
  close: () => void;
  toggle: () => void;
}

const DEFAULT_POSITION: MenuPosition = {
  top: 0,
  left: 0,
  width: 0,
  openedUpwards: false,
};

export function useContextMenu(
  config: ContextMenuConfig,
): UseContextMenuReturn {
  const {
    position: preferredPosition = "bottom",
    maxHeight,
    itemCount = 0,
    itemHeight = 48,
    extraPadding = 8,
    gap = 4,
  } = config;

  const { height: screenHeight } = useDimensions();
  const triggerRef = useRef<View>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isPositioning, setIsPositioning] = useState(false);
  const [position, setPosition] = useState<MenuPosition>(DEFAULT_POSITION);

  const calculatePosition = useCallback((): Promise<MenuPosition> => {
    return new Promise((resolve) => {
      if (!triggerRef.current) {
        resolve(DEFAULT_POSITION);
        return;
      }

      triggerRef.current.measureInWindow((x, y, width, height) => {
        const spaceBelow = screenHeight - (y + height);
        const spaceAbove = y;
        const estimatedMenuHeight =
          Math.min(itemCount * itemHeight, maxHeight) + extraPadding;

        const shouldOpenUpwards =
          preferredPosition === "top" ||
          (preferredPosition === "bottom" &&
            spaceBelow < estimatedMenuHeight &&
            spaceAbove > spaceBelow);

        const top = shouldOpenUpwards
          ? Math.max(0, y - estimatedMenuHeight + gap)
          : y + height + gap;

        const newPosition: MenuPosition = {
          left: x,
          width,
          top,
          openedUpwards: shouldOpenUpwards,
        };

        resolve(newPosition);
      });
    });
  }, [
    preferredPosition,
    maxHeight,
    itemCount,
    itemHeight,
    extraPadding,
    gap,
    screenHeight,
  ]);

  const open = useCallback(async () => {
    setIsPositioning(true);
    const newPosition = await calculatePosition();
    setPosition(newPosition);
    setIsOpen(true);
    setIsPositioning(false);
  }, [calculatePosition]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      void open();
    }
  }, [isOpen, open, close]);

  return {
    triggerRef,
    position,
    isOpen,
    isPositioning,
    open,
    close,
    toggle,
  };
}
