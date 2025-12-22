import React, { forwardRef } from "react";
import { Pressable, Text, View, type View as ViewType } from "react-native";

import type { DropdownItemProps } from "./Dropdown.props";
import { styles } from "./Dropdown.styles";

export const DropdownItem = forwardRef<ViewType, DropdownItemProps<unknown>>(
  <T,>(
    {
      label,
      value,
      selected = false,
      disabled = false,
      icon,
      onPress,
      multiple = false,
      ...props
    }: DropdownItemProps<T>,
    ref: React.Ref<ViewType>,
  ) => {
    const handlePress = (): void => {
      if (!disabled && onPress) {
        onPress(value);
      }
    };

    return (
      <Pressable
        accessibilityRole="menuitem"
        accessibilityState={{ selected, disabled }}
        disabled={disabled}
        onPress={handlePress}
        ref={ref}
        style={({ pressed }) => [
          styles.item,
          !multiple && selected && styles.itemSelected,
          disabled && styles.itemDisabled,
          pressed && !disabled && styles.itemPressed,
        ]}
        {...props}
      >
        {multiple ? (
          <View
            style={[
              styles.checkbox,
              selected ? styles.checkboxChecked : styles.checkboxUnchecked,
            ]}
          >
            {selected ? (
              <Text style={{ color: disabled ? "#9ca3af" : "#fff", fontSize: 12 }}>
                ✓
              </Text>
            ) : null}
          </View>
        ) : null}
        {icon ? <View style={styles.itemIcon}>{icon}</View> : null}
        <Text
          style={[
            styles.itemLabel,
            selected && styles.itemLabelSelected,
            disabled && styles.itemLabelDisabled,
          ]}
        >
          {label}
        </Text>
        {!multiple && selected ? (
          <View style={styles.checkIcon}>
            <Text style={{ color: "#1e40af", fontSize: 16 }}>✓</Text>
          </View>
        ) : null}
      </Pressable>
    );
  },
);

DropdownItem.displayName = "Dropdown.Item";
