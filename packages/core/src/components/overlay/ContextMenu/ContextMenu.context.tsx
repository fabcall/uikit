import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { type View as ViewType } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type {
  ComputedPosition,
  ContextMenuContextValue,
  ContextMenuProps,
  PositioningConfig,
  TriggerMeasurements,
} from "./ContextMenu.props";
import { calculatePosition } from "./positioning";

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

export function useContextMenuContext(): ContextMenuContextValue {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      "ContextMenu components must be used within ContextMenu.Root"
    );
  }
  return context;
}

export function ContextMenuProvider({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: ContextMenuProps): React.JSX.Element {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const triggerRef = useRef<ViewType | null>(null);
  const contentRef = useRef<ViewType | null>(null);
  const [measurements, setMeasurements] = useState<TriggerMeasurements | null>(
    null
  );
  const [positioning, setPositioning] = useState<PositioningConfig>({
    placement: "bottom-start",
    offset: 4,
  });

  const insets = useSafeAreaInsets();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  const measureTrigger = useCallback(() => {
    if (!triggerRef.current) return;

    triggerRef.current.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        const measurements = {
          x,
          y,
          width,
          height,
          pageX: x,
          pageY: y,
        };

        setMeasurements(measurements);
      }
    );
  }, []);

  // Memoize setPositioning to prevent unnecessary re-renders
  const setPositioningMemo = useCallback(
    (newPositioning: PositioningConfig) => {
      setPositioning((prev) => {
        // Only update if values actually changed
        const hasChanged =
          prev.placement !== newPositioning.placement ||
          prev.offset !== newPositioning.offset ||
          prev.matchTriggerWidth !== newPositioning.matchTriggerWidth ||
          prev.maxHeight !== newPositioning.maxHeight ||
          prev.minHeight !== newPositioning.minHeight ||
          prev.collisionDetection !== newPositioning.collisionDetection ||
          prev.screenPadding !== newPositioning.screenPadding;

        return hasChanged ? newPositioning : prev;
      });
    },
    []
  );

  const computedPosition: ComputedPosition | null = React.useMemo(() => {
    if (!measurements) return null;

    return calculatePosition(measurements, positioning, {
      top: insets.top,
      right: insets.right,
      bottom: insets.bottom,
      left: insets.left,
    });
  }, [measurements, positioning, insets]);

  const value: ContextMenuContextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      triggerRef,
      contentRef,
      positioning,
      setPositioning: setPositioningMemo,
      measurements,
      computedPosition,
      measureTrigger,
    }),
    [
      open,
      setOpen,
      positioning,
      measurements,
      computedPosition,
      measureTrigger,
      setPositioningMemo,
    ]
  );

  return (
    <ContextMenuContext.Provider value={value}>
      {children}
    </ContextMenuContext.Provider>
  );
}

/**
 * Hook to control context menu programmatically
 */
export function useContextMenu() {
  const context = useContextMenuContext();

  return {
    open: context.open,
    setOpen: context.setOpen,
    measurements: context.measurements,
    computedPosition: context.computedPosition,
    measureTrigger: context.measureTrigger,
  };
}

/**
 * Hook to set positioning configuration
 */
export function useContextMenuPositioning(config: PositioningConfig) {
  const context = useContextMenuContext();

  React.useEffect(() => {
    context.setPositioning(config);
  }, [config, context]);
}
