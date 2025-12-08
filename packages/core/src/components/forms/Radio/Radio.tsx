import React, { forwardRef } from "react";
import { Pressable, View, type View as ViewType } from "react-native";

import { Text } from "../../data-display/Text";
import type { RadioProps } from "./Radio.props";
import { styles } from "./Radio.styles";

const RadioBase = forwardRef<ViewType, RadioProps<unknown>>(
  <T,>(
    {
      value,
      label,
      onChange,
      selected = false,
      disabled = false,
      ...props
    }: RadioProps<T>,
    ref: React.Ref<ViewType>,
  ) => {
    styles.useVariants({
      disabled,
    });

    styles.useVariants({
      selected,
      disabled,
    });

    const handlePress = (): void => {
      if (!disabled && onChange) {
        onChange(value);
      }
    };

    return (
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected, disabled }}
        disabled={disabled}
        onPress={handlePress}
        ref={ref}
        style={styles.pressable}
        {...props}
      >
        <View style={styles.container}>
          <View style={styles.radioButton}>
            <View style={styles.radioButtonInner} />
          </View>
          {label ? (
            <Text color={disabled ? "disabled" : "primary"}>{label}</Text>
          ) : null}
        </View>
      </Pressable>
    );
  },
);

RadioBase.displayName = "Radio";

export const Radio = RadioBase as typeof RadioBase &
  (<T = string>(
    props: RadioProps<T> & { ref?: React.Ref<ViewType> },
  ) => React.JSX.Element);
