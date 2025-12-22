import React, { forwardRef, useState } from "react";
import type {
  BlurEvent,
  FocusEvent,
  TextInput as TextInputType,
  TextInputSubmitEditingEvent,
} from "react-native";
import { TextInput, View } from "react-native";

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { InputLabel } from "../InputLabel";
import type { InputProps } from "./Input.props";
import { styles } from "./Input.styles";

export const Input = forwardRef<TextInputType, InputProps>(
  (
    {
      error,
      label,
      leftAccessory,
      rightAccessory,
      disabled = false,
      nextInputRef,
      required = false,
      onFocus,
      onBlur,
      onSubmitEditing,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    styles.useVariants({
      disabled,
      error: Boolean(error),
      focused,
    });

    const handleFocus = (e: FocusEvent): void => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: BlurEvent): void => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleSubmitEditing = (e: TextInputSubmitEditingEvent): void => {
      onSubmitEditing?.(e);

      if (nextInputRef?.current) {
        nextInputRef.current.focus();
      }
    };

    return (
      <View style={styles.container}>
        <InputLabel label={label} required={required} disabled={disabled} />

        <View style={styles.inputContainer}>
          {leftAccessory ? (
            <View pointerEvents="none" style={styles.leftAccessory}>
              {leftAccessory}
            </View>
          ) : null}

          <TextInput
            editable={!disabled}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onSubmitEditing={handleSubmitEditing}
            ref={ref}
            returnKeyType={nextInputRef ? "next" : props.returnKeyType}
            style={styles.input}
            {...props}
          />

          {rightAccessory ? (
            <View pointerEvents="box-none" style={styles.rightAccessory}>
              {rightAccessory}
            </View>
          ) : null}
        </View>

        {error ? <ErrorMessage error={error} /> : null}
      </View>
    );
  },
);

Input.displayName = "Input";
