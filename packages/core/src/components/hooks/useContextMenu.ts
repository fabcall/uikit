import { useDimensions } from "@readykit/hooks";
import { useCallback, useRef, useState } from "react";
import type { View } from "react-native";

export interface ContextMenuConfig {
  position?: "top" | "bottom";
  maxHeight: number;
  itemCount?: number;
  itemHeight?: number;
  extraPadding?: number;
  gap?: number;
}

export interface MenuPosition {
  top: number;
  left: number;
  width: number;
  openedUpwards: boolean;
}

export interface UseContextMenuReturn {
  triggerRef: React.RefObject<View | null>;
  position: MenuPosition;
  isOpen: boolean;
  isPositioning: boolean;
  open: () => Promise<void>;
  close: () => void;
  toggle: () => void;
  /** Altura máxima recalculada para caber na tela sem sobrepor o trigger */
  dynamicMaxHeight: number;
}

const DEFAULT_POSITION: MenuPosition = {
  top: 0,
  left: 0,
  width: 0,
  openedUpwards: false,
};

export function useContextMenu(config: ContextMenuConfig): UseContextMenuReturn {
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
  const [dynamicMaxHeight, setDynamicMaxHeight] = useState(maxHeight);

  const calculatePosition = useCallback((): Promise<MenuPosition & { adjMaxHeight: number }> => {
    return new Promise((resolve) => {
      if (!triggerRef.current) {
        resolve({ ...DEFAULT_POSITION, adjMaxHeight: maxHeight });
        return;
      }

      triggerRef.current.measureInWindow((x, y, width, height) => {
        const spaceBelow = screenHeight - (y + height) - gap;
        const spaceAbove = y - gap;
        
        // Altura teórica que o conteúdo gostaria de ter
        const desiredHeight = Math.min(itemCount * itemHeight, maxHeight) + extraPadding;

        const shouldOpenUpwards =
          preferredPosition === "top" ||
          (preferredPosition === "bottom" &&
            spaceBelow < desiredHeight &&
            spaceAbove > spaceBelow);

        let finalTop: number;
        let adjMaxHeight: number;

        if (shouldOpenUpwards) {
          // Limita a altura ao espaço disponível acima
          const availableHeight = Math.max(0, spaceAbove);
          const actualMenuHeight = Math.min(desiredHeight, availableHeight);
          
          finalTop = y - actualMenuHeight - gap;
          // A altura do ScrollView interno deve ser a altura total menos o padding do container
          adjMaxHeight = Math.max(0, actualMenuHeight - extraPadding);
        } else {
          // Limita a altura ao espaço disponível abaixo
          const availableHeight = Math.max(0, spaceBelow);
          const actualMenuHeight = Math.min(desiredHeight, availableHeight);
          
          finalTop = y + height + gap;
          adjMaxHeight = Math.max(0, actualMenuHeight - extraPadding);
        }

        resolve({
          left: x,
          width,
          top: finalTop,
          openedUpwards: shouldOpenUpwards,
          adjMaxHeight,
        });
      });
    });
  }, [preferredPosition, maxHeight, itemCount, itemHeight, extraPadding, gap, screenHeight]);

  const open = useCallback(async () => {
    setIsPositioning(true);
    const result = await calculatePosition();
    
    setPosition({
      left: result.left,
      width: result.width,
      top: result.top,
      openedUpwards: result.openedUpwards,
    });
    setDynamicMaxHeight(result.adjMaxHeight);
    
    setIsOpen(true);
    setIsPositioning(false);
  }, [calculatePosition]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else void open();
  }, [isOpen, open, close]);

  return {
    triggerRef,
    position,
    isOpen,
    isPositioning,
    open,
    close,
    toggle,
    dynamicMaxHeight,
  };
}