import React from "react";
import { ScrollView, View } from "react-native";

interface ContextMenuScrollableProps {
  children: React.ReactNode;
  maxHeight?: number;
}

/**
 * Wrapper opcional para conteúdo de ContextMenu com scroll
 * Útil quando você tem muitos itens e quer controle explícito do scroll
 */
export function ContextMenuScrollable({
  children,
  maxHeight,
}: ContextMenuScrollableProps): React.JSX.Element {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={maxHeight ? { maxHeight } : undefined}
      nestedScrollEnabled
    >
      <View>{children}</View>
    </ScrollView>
  );
}

ContextMenuScrollable.displayName = "ContextMenuScrollable";