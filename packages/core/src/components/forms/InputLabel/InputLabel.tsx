import React from "react";
import { View } from "react-native";

import { Text } from "../../data-display/Text";
import type { InputLabelProps } from "./InputLabel.props";
import { styles } from "./InputLabel.styles";

export const InputLabel: React.FC<InputLabelProps> = ({
  label,
  required = false,
  disabled = false,
}) => {
  if (!label) return null;

  return (
    <View style={styles.container}>
      <Text color={disabled ? "disabled" : "primary"} style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
    </View>
  );
};
