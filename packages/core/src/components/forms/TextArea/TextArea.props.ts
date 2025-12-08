import type { TextInputProps } from "react-native";

export interface TextAreaProps extends Omit<TextInputProps, "editable"> {
  error?: string;
  label?: string;
  disabled?: boolean;
  maxLength: number;
  resizable?: boolean;
  minHeight?: number;
  maxHeight?: number;
  required?: boolean;
}
