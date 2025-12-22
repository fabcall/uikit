import { ExpandLeft } from "@readykit/icons";
import React, { forwardRef, useEffect, useState } from "react";
import type {
  BlurEvent,
  FocusEvent,
  TextInput as TextInputType,
} from "react-native";
import { TextInput, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";

import { usePackageTranslation } from "../../../i18n/usePackageTranslation";
import { Text } from "../../data-display/Text";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { InputLabel } from "../InputLabel";
import type { TextAreaProps } from "./TextArea.props";
import { styles } from "./TextArea.styles";

export const TextArea = forwardRef<TextInputType, TextAreaProps>(
  (
    {
      error,
      label,
      disabled = false,
      maxLength,
      resizable = true,
      minHeight = 120,
      maxHeight = 400,
      required = false,
      value = "",
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const { theme } = useUnistyles();
    const { t } = usePackageTranslation();
    const [focused, setFocused] = useState(false);
    const animatedHeight = useSharedValue(minHeight);
    const startHeight = useSharedValue(minHeight);

    const currentLength = (value || "").toString().length;

    useEffect(() => {
      animatedHeight.value = withSpring(minHeight, {
        damping: 20,
        stiffness: 90,
      });
    }, [minHeight, animatedHeight]);

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

    const panGesture = Gesture.Pan()
      .enabled(resizable && !disabled)
      .onStart(() => {
        startHeight.value = animatedHeight.value;
      })
      .onUpdate((event) => {
        const newHeight = Math.max(
          minHeight,
          Math.min(maxHeight, startHeight.value + event.translationY),
        );
        animatedHeight.value = newHeight;
      })
      .onEnd(() => {
        startHeight.value = animatedHeight.value;
      });

    const animatedContainerStyle = useAnimatedStyle(() => {
      return {
        height: animatedHeight.value,
      };
    });

    return (
      <View style={styles.container}>
        <InputLabel label={label} required={required} disabled={disabled} />

        <Animated.View style={[styles.inputContainer, animatedContainerStyle]}>
          <TextInput
            autoCapitalize="sentences"
            autoCorrect
            editable={!disabled}
            maxLength={maxLength}
            multiline
            numberOfLines={4}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholderTextColor={theme.colors.textSecondary}
            ref={ref}
            scrollEnabled
            selectionColor={theme.colors.primary}
            style={styles.input}
            textAlignVertical="top"
            value={value}
            {...props}
          />
          {resizable ? (
            <GestureDetector gesture={panGesture}>
              <View style={styles.resizeHandle}>
                <ExpandLeft height={20} width={20} />
              </View>
            </GestureDetector>
          ) : null}
        </Animated.View>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {t("components.textArea.maxCharacterCount")}: {currentLength}/
            {maxLength}
          </Text>
        </View>

        {error ? <ErrorMessage error={error} /> : null}
      </View>
    );
  },
);

TextArea.displayName = "TextArea";
