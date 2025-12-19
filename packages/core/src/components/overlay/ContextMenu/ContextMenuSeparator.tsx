import React from "react";
import { View } from "react-native";

import type { ContextMenuSeparatorProps } from "./ContextMenu.props";
import { styles } from "./ContextMenu.styles";

export function ContextMenuSeparator({
  spacing,
}: ContextMenuSeparatorProps = {}): React.JSX.Element {
  return (
    <View
      style={[
        styles.separator,
        spacing && { marginVertical: spacing },
      ]}
    />
  );
}

ContextMenuSeparator.displayName = "ContextMenuSeparator";
