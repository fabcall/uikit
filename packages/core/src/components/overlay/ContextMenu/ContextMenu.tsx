import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Modal, Pressable, View, type View as ViewType } from "react-native";

import {
  ContextMenuProvider,
  useContextMenuContext,
} from "./ContextMenu.context";
import type {
  ContextMenuContentProps,
  ContextMenuProps,
  ContextMenuTriggerProps,
} from "./ContextMenu.props";
import { styles } from "./ContextMenu.styles";

// ============================================================================
// Root Component
// ============================================================================

/**
 * Root component for ContextMenu
 * Manages state and provides context to children
 */
function ContextMenuRoot(props: ContextMenuProps): React.JSX.Element {
  return <ContextMenuProvider {...props} />;
}

// ============================================================================
// Trigger Component
// ============================================================================

/**
 * Trigger component for ContextMenu
 * The element that opens the menu when pressed
 */
const ContextMenuTrigger = forwardRef<ViewType, ContextMenuTriggerProps>(
  (
    {
      children,
      isOpen: externalIsOpen,
      disabled = false,
      onPress: externalOnPress,
      accessibilityLabel,
      ...props
    },
    forwardedRef
  ) => {
    const context = useContextMenuContext();
    const isOpen = externalIsOpen ?? context.open;

    const handlePress = (): void => {
      if (disabled) return;

      if (externalOnPress) {
        externalOnPress();
      } else {
        context.measureTrigger();
        context.setOpen(!context.open);
      }
    };

    // Combine refs - measure the Pressable directly, not the wrapper View
    const combinedRef = useCallback(
      (node: ViewType | null) => {
        context.triggerRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [context.triggerRef, forwardedRef]
    );

    return (
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled, expanded: isOpen }}
        disabled={disabled}
        onPress={handlePress}
        ref={combinedRef}
        style={{ alignSelf: "flex-start" }} // Make Pressable wrap content
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

ContextMenuTrigger.displayName = "ContextMenu.Trigger";

// ============================================================================
// Content Component
// ============================================================================

/**
 * Content component for ContextMenu
 * The content that appears when menu is open
 */
const ContextMenuContent = forwardRef<ViewType, ContextMenuContentProps>(
  (
    {
      children,
      visible: externalVisible,
      onDismiss,
      positioning,
      animationType = "fade",
      withBackdrop = true,
      backdropOpacity = 0,
      ...props
    },
    forwardedRef
  ) => {
    const context = useContextMenuContext();
    const visible = externalVisible ?? context.open;
    const [contentSize, setContentSize] = useState<{
      width: number;
      height: number;
    } | null>(null);

    // Use ref to store positioning to avoid unnecessary updates
    const positioningRef = useRef(positioning);
    positioningRef.current = positioning;

    // Only update positioning in context when it actually changes
    useEffect(() => {
      if (!positioning) return;

      // Compare with current context positioning
      const current = context.positioning;
      const hasChanged =
        current.placement !== positioning.placement ||
        current.offset !== positioning.offset ||
        current.matchTriggerWidth !== positioning.matchTriggerWidth ||
        current.maxHeight !== positioning.maxHeight ||
        current.minHeight !== positioning.minHeight ||
        current.collisionDetection !== positioning.collisionDetection ||
        current.screenPadding !== positioning.screenPadding;

      if (hasChanged) {
        context.setPositioning(positioning);
      }
    }, [positioning, context]);

    // Measure trigger when content becomes visible
    useEffect(() => {
      if (visible) {
        context.measureTrigger();
        setContentSize(null); // Reset on open
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, context.measureTrigger]);

    const handleDismiss = (): void => {
      if (onDismiss) {
        onDismiss();
      } else {
        context.setOpen(false);
      }
    };

    if (!visible || !context.computedPosition) {
      return null;
    }

    const { top, bottom, left, right, width, maxHeight, placement } =
      context.computedPosition;

    // Adjust position for center placements based on measured content size
    let adjustedLeft = left;
    let adjustedTop = top;

    if (contentSize) {
      // For horizontal center (top, bottom)
      if (placement === "top" || placement === "bottom") {
        if (left !== undefined) {
          // left is currently at trigger center, adjust by half content width
          adjustedLeft = left - contentSize.width / 2;
        }
      }

      // For vertical center (left, right)
      if (placement === "left" || placement === "right") {
        if (top !== undefined) {
          // top is currently at trigger center, adjust by half content height
          adjustedTop = top - contentSize.height / 2;
        }
      }
    }

    return (
      <Modal
        animationType={animationType}
        onRequestClose={handleDismiss}
        transparent
        visible={visible}
      >
        <Pressable
          onPress={handleDismiss}
          style={[
            styles.overlay,
            withBackdrop &&
              backdropOpacity > 0 && {
                backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
              },
          ]}
        >
          <View
            onLayout={(event) => {
              const { width: w, height: h } = event.nativeEvent.layout;
              if (
                !contentSize ||
                contentSize.width !== w ||
                contentSize.height !== h
              ) {
                setContentSize({ width: w, height: h });
              }
            }}
            onStartShouldSetResponder={() => true}
            ref={(ref) => {
              context.contentRef.current = ref;
              if (typeof forwardedRef === "function") {
                forwardedRef(ref);
              } else if (forwardedRef) {
                forwardedRef.current = ref;
              }
            }}
            style={[
              styles.contentContainer,
              {
                ...(adjustedTop !== undefined && { top: adjustedTop }),
                ...(bottom !== undefined && { bottom }),
                ...(adjustedLeft !== undefined && { left: adjustedLeft }),
                ...(right !== undefined && { right }),
                ...(width && { width }),
                ...(maxHeight && { maxHeight }),
                // Initially hide until measured (only for center placements)
                ...(!contentSize &&
                  (placement === "top" ||
                    placement === "bottom" ||
                    placement === "left" ||
                    placement === "right") && {
                    opacity: 0,
                  }),
              },
            ]}
            {...props}
          >
            {children}
          </View>
        </Pressable>
      </Modal>
    );
  }
);

ContextMenuContent.displayName = "ContextMenu.Content";

// ============================================================================
// Exports
// ============================================================================

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
});

export type {
  ContextMenuContentProps,
  ContextMenuProps,
  ContextMenuTriggerProps,
};
