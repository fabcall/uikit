import type { ReactNode } from "react";
import type { ViewProps } from "react-native";

export interface DropdownOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface DropdownBaseProps<T = string> extends Omit<ViewProps, "style"> {
  label?: string;
  placeholder?: string;
  options: DropdownOption<T>[];
  disabled?: boolean;
  error?: string;
  required?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  maxHeight?: number;
  /**
   * Position using ContextMenu placement system
   * @defaultValue "bottom-start"
   */
  placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end";
  emptyMessage?: string;
  /**
   * Offset from trigger
   * @defaultValue 4
   */
  offset?: number;
}

export interface DropdownSingleProps<T = string> extends DropdownBaseProps<T> {
  multiple?: false;
  value?: T;
  onChange?: (value: T) => void;
}

export interface DropdownMultipleProps<T = string> extends DropdownBaseProps<T> {
  multiple: true;
  value?: T[];
  onChange?: (value: T[]) => void;
  showSelectAll?: boolean;
  selectAllLabel?: string;
  maxDisplayItems?: number;
  renderSelectedCount?: (count: number, total: number) => string;
}

export type DropdownProps<T = string> = DropdownSingleProps<T> | DropdownMultipleProps<T>;

export interface DropdownItemProps<T = string> extends Omit<ViewProps, "style"> {
  label: string;
  value: T;
  selected?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onPress?: (value: T) => void;
  multiple?: boolean;
}

export interface DropdownTriggerProps extends Omit<ViewProps, "style"> {
  children: ReactNode;
  isOpen?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  onPress?: () => void;
}

export interface DropdownContentProps extends Omit<ViewProps, "style"> {
  children: ReactNode;
  maxHeight?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}
