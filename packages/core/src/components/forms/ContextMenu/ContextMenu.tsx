import { useDimensions } from "@readykit/hooks";
import React, { useEffect, useRef, useState } from "react";
import type { LayoutRectangle } from "react-native";
import {
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { ContextMenuProps } from "./ContextMenu.props";
import { styles } from "./ContextMenu.styles";
import { calculatePosition, getArrowPosition } from "./ContextMenu.utils";

export function ContextMenu({
  children,
  content,
  placement = "bottom",
  offset = 8,
  triggerAction = "press",
  visible: controlledVisible,
  onVisibleChange,
  disabled = false,
  closeOnSelect = true,
  showArrow = true,
  containerStyle,
  contentStyle,
  arrowStyle,
  respectSafeArea = true,
}: ContextMenuProps): React.JSX.Element {
  const [internalVisible, setInternalVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(
    null
  );
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ top: 0, left: 0, placement });
  const [arrowPos, setArrowPos] = useState<{ top?: number; left?: number }>(
    {}
  );

  const triggerRef = useRef<View>(null);
  const safeAreaInsets = useSafeAreaInsets();
  const { window: windowDimensions } = useDimensions();

  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  const visible = controlledVisible ?? internalVisible;

  useEffect(() => {
    if (visible) {
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      opacity.value = withSpring(1);
    } else {
      scale.value = 0.9;
      opacity.value = 0;
    }
  }, [visible, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleVisibleChange = (newVisible: boolean): void => {
    if (controlledVisible === undefined) {
      setInternalVisible(newVisible);
    }
    onVisibleChange?.(newVisible);
  };

  const measureTrigger = (): void => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
      });
    }
  };

  const handleOpen = (): void => {
    if (disabled) return;
    measureTrigger();
    handleVisibleChange(true);
  };

  const handleClose = (): void => {
    handleVisibleChange(false);
  };

  const handleTrigger = (): void => {
    if (triggerAction === "press") {
      handleOpen();
    }
  };

  const handleLongPress = (): void => {
    if (triggerAction === "longPress") {
      handleOpen();
    }
  };

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

      setPosition(calculatedPosition);

      if (showArrow) {
        const arrowPosition = getArrowPosition(
          calculatedPosition.placement,
          triggerLayout,
          {
            top: calculatedPosition.top,
            left: calculatedPosition.left,
            width: contentSize.width,
            height: contentSize.height,
          }
        );
        setArrowPos(arrowPosition);
      }
    }
  }, [
    visible,
    triggerLayout,
    contentSize,
    placement,
    offset,
    safeAreaInsets,
    respectSafeArea,
    showArrow,
    windowDimensions,
  ]);

  const handleContentLayout = (event: {
    nativeEvent: { layout: { width: number; height: number } };
  }): void => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== contentSize.width || height !== contentSize.height) {
      setContentSize({ width, height });
    }
  };

  const [primaryPlacement] = position.placement.split("-");

  styles.useVariants({
    placement: primaryPlacement as "top" | "bottom" | "left" | "right",
  });

  return (
    <>
      <Pressable
        disabled={disabled}
        onLongPress={handleLongPress}
        onPress={handleTrigger}
        ref={triggerRef}
        style={containerStyle}
      >
        {children}
      </Pressable>

      <Modal
        animationType="none"
        onRequestClose={handleClose}
        statusBarTranslucent
        transparent
        visible={visible}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(100)}
            style={styles.overlay}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                onLayout={handleContentLayout}
                style={[
                  styles.contentContainer,
                  {
                    top: position.top,
                    left: position.left,
                  },
                  animatedStyle,
                  contentStyle,
                ]}
              >
                {showArrow ? (
                  <View
                    style={[
                      styles.arrow,
                      arrowPos,
                      arrowStyle,
                    ]}
                  />
                ) : null}
                
                <ContextMenuContext.Provider
                  value={{ closeMenu: closeOnSelect ? handleClose : undefined }}
                >
                  {content}
                </ContextMenuContext.Provider>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

// Context para permitir que os itens fechem o menu
const ContextMenuContext = React.createContext<{
  closeMenu?: () => void;
}>({});

export const useContextMenu = () => React.useContext(ContextMenuContext);

ContextMenu.displayName = "ContextMenu";