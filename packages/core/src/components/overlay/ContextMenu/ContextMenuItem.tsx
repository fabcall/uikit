import React from "react";
import { Pressable, View } from "react-native";

import { Text } from "../../data-display/Text";
import { useContextMenu } from "./ContextMenu";
import type { ContextMenuItemProps } from "./ContextMenu.props";
import { styles } from "./ContextMenu.styles";

export function ContextMenuItem({
  label,
  onPress,
  disabled = false,
  destructive = false,
  icon,
  rightElement,
}: ContextMenuItemProps): React.JSX.Element {
  const { closeMenu } = useContextMenu();

  styles.useVariants({
    disabled,
    destructive,
  });

  const handlePress = (): void => {
    if (!disabled) {
      onPress?.();
      closeMenu?.();
    }
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.menuItem,
        pressed && !disabled && styles.menuItemPressed,
      ]}
    >
      {icon ? <View style={styles.menuItemIcon}>{icon}</View> : null}
      
      <Text style={styles.menuItemLabel}>{label}</Text>
      
      {rightElement ? (
        <View style={styles.menuItemRight}>{rightElement}</View>
      ) : null}
    </Pressable>
  );
}

ContextMenuItem.displayName = "ContextMenuItem";
