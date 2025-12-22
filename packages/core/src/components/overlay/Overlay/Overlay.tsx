import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  type LayoutRectangle,
  Modal,
  Platform,
  type StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  type ViewStyle,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  computePosition,
  type Middleware,
  type Placement,
} from "./FloatingEngine";
import { flip, matchWidth, offset, shift, size } from "./middlewares";
import { styles } from "./Overlay.styles";

export interface OverlayProps {
  anchorRef: React.RefObject<View>;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  visible?: boolean;

  placement?: Placement;
  gap?: number;
  screenPadding?: number;

  minHeight?: number;
  maxHeight?: number;
  matchAnchorWidth?: boolean;

  disableFlip?: boolean;
  disableShift?: boolean;
  disableResize?: boolean;
}

export interface OverlayRef {
  show: () => void;
  hide: () => void;
  update: () => void;
}

interface PositionState {
  x: number;
  y: number;
  maxHeight?: number;
  width?: number;
  placement: Placement;
}

export const Overlay = forwardRef<OverlayRef, OverlayProps>((props, ref) => {
  const {
    anchorRef,
    children,
    onClose,
    contentStyle,
    visible: propVisible,
    placement = "bottom",

    gap = 4,
    screenPadding = 12,

    minHeight = 100,
    maxHeight = 9999,
    matchAnchorWidth = false,
    disableFlip = false,
    disableShift = false,
    disableResize = false,
  } = props;

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<PositionState | null>(null);
  const [anchorRect, setAnchorRect] = useState<LayoutRectangle | null>(null);
  const [hasMeasured, setHasMeasured] = useState(false);

  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const middlewares = useMemo(() => {
    const list: Middleware[] = [];

    if (gap) list.push(offset(gap));
    if (matchAnchorWidth) list.push(matchWidth());
    if (!disableFlip) list.push(flip({ minHeight, gap, screenPadding }));
    if (!disableShift) list.push(shift(screenPadding));
    if (!disableResize) list.push(size(screenPadding, { maxHeight }));

    return list;
  }, [
    gap,
    screenPadding,
    disableFlip,
    disableShift,
    disableResize,
    matchAnchorWidth,
    minHeight,
    maxHeight,
  ]);

  const calculatePosition = useCallback(
    (
      anchor: LayoutRectangle,
      floatingSize: { width: number; height: number },
    ): PositionState => {
      const floatingRect: LayoutRectangle = {
        x: 0,
        y: 0,
        width: floatingSize.width,
        height: floatingSize.height,
      };

      const result = computePosition(
        anchor,
        floatingRect,
        { width: window.width, height: window.height, insets },
        placement,
        middlewares,
      );

      const middlewareData = result.middlewareData as {
        size?: { maxHeight?: number };
        matchWidth?: { width?: number };
      };

      return {
        x: result.x,
        y: result.y,
        maxHeight: middlewareData.size?.maxHeight,
        width: middlewareData.matchWidth?.width,
        placement: result.placement,
      };
    },
    [window, insets, placement, middlewares],
  );

  // Medir anchor
  const measureAnchor = useCallback(() => {
    if (!anchorRef.current) return;

    const delay = Platform.OS === "android" ? 50 : 10;

    setTimeout(() => {
      anchorRef.current?.measureInWindow((ax, ay, aw, ah) => {
        if (aw === 0 && ah === 0) {
          requestAnimationFrame(measureAnchor);
          return;
        }
        setAnchorRect({ x: ax, y: ay, width: aw, height: ah });
      });
    }, delay);
  }, [anchorRef]);

  // Quando o conteúdo é medido via onLayout
  const handleContentLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
      if (!anchorRect || hasMeasured) return;

      const { width, height } = event.nativeEvent.layout;
      if (width > 0 && height > 0) {
        const pos = calculatePosition(anchorRect, { width, height });
        setPosition(pos);
        setHasMeasured(true);
      }
    },
    [anchorRect, calculatePosition, hasMeasured],
  );

  const update = useCallback(() => {
    if (!anchorRef.current) return;
    setPosition(null);
    setAnchorRect(null);
    setHasMeasured(false);
    measureAnchor();
  }, [anchorRef, measureAnchor]);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
      setPosition(null);
      setAnchorRect(null);
      setHasMeasured(false);
      measureAnchor();
    },
    hide: () => {
      setVisible(false);
      setPosition(null);
      setAnchorRect(null);
      setHasMeasured(false);
    },
    update,
  }));

  useEffect(() => {
    if (propVisible !== undefined) {
      if (propVisible) {
        setVisible(true);
        setPosition(null);
        setAnchorRect(null);
        setHasMeasured(false);
        measureAnchor();
      } else {
        setVisible(false);
        setPosition(null);
        setAnchorRect(null);
        setHasMeasured(false);
      }
    }
  }, [propVisible, measureAnchor]);

  // Animações padrão
  const entering = FadeIn.duration(200).springify();
  const exiting = FadeOut.duration(150);

  if (!visible) return null;

  // Se ainda não mediu, renderiza invisível para medir
  const shouldRenderInvisible = anchorRect && !hasMeasured;
  const shouldRenderVisible = anchorRect && hasMeasured && position;

  // Largura para o conteúdo (usa anchor width se matchAnchorWidth)
  const contentWidth =
    matchAnchorWidth && anchorRect ? anchorRect.width : position?.width;

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Renderiza invisível para medir */}
        {shouldRenderInvisible && (
          <View
            style={[
              styles.baseOverlay,
              {
                position: "absolute",
                left: anchorRect.x,
                top: anchorRect.y,
                width: contentWidth,
                opacity: 0,
              },
              contentStyle,
            ]}
            onLayout={handleContentLayout}
            pointerEvents="none"
          >
            <View style={{ flexShrink: 1 }}>{children}</View>
          </View>
        )}

        {/* Renderiza visível após medir */}
        {shouldRenderVisible && (
          <Animated.View
            entering={entering}
            exiting={exiting}
            style={[
              styles.baseOverlay,
              {
                position: "absolute",
                left: position.x,
                top: position.y,
                width: position.width,
                maxHeight: position.maxHeight,
              },
              contentStyle,
            ]}
          >
            <TouchableOpacity activeOpacity={1} style={{ flexShrink: 1 }}>
              {children}
            </TouchableOpacity>
          </Animated.View>
        )}
      </TouchableOpacity>
    </Modal>
  );
});

Overlay.displayName = "Overlay";
