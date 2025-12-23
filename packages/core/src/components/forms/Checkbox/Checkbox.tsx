import { Check } from "@readykit/icons";
import React, { forwardRef } from "react";
import { Pressable, View, type View as ViewType } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

import { Text } from "../../data-display/Text";
import type { CheckboxProps } from "./Checkbox.props";
import { styles } from "./Checkbox.styles";

const CheckboxBase = forwardRef<ViewType, CheckboxProps<unknown>>(
  <T,>(
    {
      label,
      onChange,
      checked = false,
      disabled = false,
      ...props
    }: CheckboxProps<T>,
    ref: React.Ref<ViewType>,
  ) => {
    styles.useVariants({
      checked,
      disabled,
    });

    const theme = UnistylesRuntime.getTheme();

    const handlePress = (): void => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    return (
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        disabled={disabled}
        onPress={handlePress}
        ref={ref}
        style={styles.pressable}
        {...props}
      >
        <View style={styles.checkbox}>
          {checked ? (
            <Check
              fill={
                disabled ? theme.colors.textDisabled : theme.colors.onPrimary
              }
            />
          ) : null}
        </View>
        {label ? (
          <Text color={disabled ? "disabled" : "primary"}>{label}</Text>
        ) : null}
      </Pressable>
    );
  },
);

CheckboxBase.displayName = "Checkbox";

export const Checkbox = CheckboxBase as typeof CheckboxBase &
  (<T = string | number>(
    props: CheckboxProps<T> & { ref?: React.Ref<ViewType> },
  ) => React.JSX.Element);
