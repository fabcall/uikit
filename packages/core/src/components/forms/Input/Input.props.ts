import type { ReactNode, RefObject } from "react";
import type { TextInput, TextInputProps } from "react-native";

export interface InputProps extends Omit<TextInputProps, "editable"> {
  error?: string;
  label?: string;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  disabled?: boolean;
  nextInputRef?: RefObject<TextInput | null>;
  required?: boolean;
}
