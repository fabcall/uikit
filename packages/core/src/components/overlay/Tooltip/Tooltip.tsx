import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Overlay } from "../Overlay/Overlay";
import { type TooltipProps } from "./Tooltip.props";
import { styles } from "./Tooltip.styles";

export const Tooltip = ({
  children,
  content,
  containerStyle,
  textStyle,
  // Defaults específicos para Tooltip
  placement = "top",
  gap = 8,
  screenPadding = 16, // Tooltips precisam de margem segura das bordas
  ...overlayProps
}: TooltipProps) => {
  const anchorRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible((prev) => !prev);
  };

  const renderContent = () => {
    if (typeof content === "string") {
      return <Text style={[styles.tooltipText, textStyle]}>{content}</Text>;
    }
    return content;
  };

  return (
    <>
      {/* TRIGGER */}
      <TouchableOpacity
        ref={anchorRef}
        onPress={handleToggle}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>

      {/* OVERLAY */}
      <Overlay
        anchorRef={anchorRef as React.RefObject<View>}
        visible={visible}
        onClose={() => setVisible(false)}
        placement={placement}
        gap={gap}
        screenPadding={screenPadding}
        matchAnchorWidth={false} // Tooltips geralmente não seguem largura do trigger
        // Passamos disableResize=false por padrão,
        // para que tooltips gigantes scrollam se não couberem
        {...overlayProps}
        // Estilo base do Overlay + Estilo customizado
        contentStyle={[styles.tooltipContainer, containerStyle]}
      >
        <View style={styles.contentWrapper}>{renderContent()}</View>
      </Overlay>
    </>
  );
};
