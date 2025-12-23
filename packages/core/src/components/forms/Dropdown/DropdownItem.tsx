import { Check } from "@readykit/icons";
import React, { forwardRef } from "react";
import { Pressable, Text, View, type View as ViewType } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { Checkbox } from "../Checkbox";
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
    ref: React.Ref<ViewType>
  ) => {
    const { theme } = useUnistyles();

    styles.useVariants({
      selected: !multiple && selected,
      disabled,
    });

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
          pressed && !disabled && { opacity: 0.7 },
        ]}
        {...props}
      >
        {multiple ? (
          <View pointerEvents="none">
            <Checkbox
              checked={selected}
              disabled={disabled}
              onChange={() => {}} // Handled by Pressable onPress
              value={value}
            />
          </View>
        ) : null}
        {icon ? <View style={styles.itemIcon}>{icon}</View> : null}
        <Text style={styles.itemLabel}>{label}</Text>
        {!multiple && selected ? (
          <View style={styles.checkIcon}>
            <Check size={16} fill={theme.colors.onPrimaryContainer} />
          </View>
        ) : null}
      </Pressable>
    );
  }
);

DropdownItem.displayName = "Dropdown.Item";
