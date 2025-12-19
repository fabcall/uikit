import { Check } from "@readykit/icons";
import React, { forwardRef } from "react";
import { Pressable, Text, View, type View as ViewType } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

import { Icon } from "../../data-display/Icon";
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
    styles.useVariants({
      selected: multiple ? false : selected, // Don't highlight background in multi-select
      disabled,
    });

    const theme = UnistylesRuntime.getTheme();

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
          pressed && !disabled && styles.itemPressed,
        ]}
        {...props}
      >
        {multiple ? (
          <View
            style={[
              styles.checkbox,
              {
                borderColor: selected ? theme.colors.primary : theme.colors.border,
                backgroundColor: selected ? theme.colors.primary : "transparent",
              },
            ]}
          >
            {selected ? (
              <Check
                fill={disabled ? theme.colors.textDisabled : theme.colors.onPrimary}
                height={14}
                width={14}
              />
            ) : null}
          </View>
        ) : null}
        {icon ? <View style={styles.itemIcon}>{icon}</View> : null}
        <Text style={styles.itemLabel}>{label}</Text>
        {!multiple && selected ? (
          <View style={styles.checkIcon}>
            <Icon color="onPrimaryContainer" icon={Check} size="sm" />
          </View>
        ) : null}
      </Pressable>
    );
  },
);

DropdownItem.displayName = "Dropdown.Item";
