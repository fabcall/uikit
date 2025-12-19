import type { ReactNode } from "react";
import type { ViewProps } from "react-native";

export interface DropdownOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface DropdownBaseProps<T = string> extends Omit<ViewProps, "style"> {
  /**
   * Label for the dropdown
   */
  label?: string;
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
  /**
   * Array of options to display
   */
  options: DropdownOption<T>[];
  /**
   * Whether the dropdown is disabled
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Whether the field is required
   * @defaultValue false
   */
  required?: boolean;
  /**
   * Enable search/filter functionality
   * @defaultValue false
   */
  searchable?: boolean;
  /**
   * Placeholder for search input
   * @defaultValue "Search..."
   */
  searchPlaceholder?: string;
  /**
   * Maximum height for the dropdown list
   * @defaultValue 300
   */
  maxHeight?: number;
  /**
   * Position of the dropdown relative to trigger
   * @defaultValue "bottom"
   */
  position?: "top" | "bottom";
  /**
   * Empty state message when no options match search
   */
  emptyMessage?: string;
}

export interface DropdownSingleProps<T = string> extends DropdownBaseProps<T> {
  /**
   * Enable multi-select mode
   * @defaultValue false
   */
  multiple?: false;
  /**
   * Currently selected value (single select)
   */
  value?: T;
  /**
   * Callback when value changes (single select)
   */
  onChange?: (value: T) => void;
}

export interface DropdownMultipleProps<T = string> extends DropdownBaseProps<T> {
  /**
   * Enable multi-select mode
   */
  multiple: true;
  /**
   * Currently selected values (multi-select)
   */
  value?: T[];
  /**
   * Callback when values change (multi-select)
   */
  onChange?: (value: T[]) => void;
  /**
   * Show "Select All" option
   * @defaultValue false
   */
  showSelectAll?: boolean;
  /**
   * Custom label for "Select All" option
   */
  selectAllLabel?: string;
  /**
   * Maximum number of selected items to show in trigger
   * @defaultValue 3
   */
  maxDisplayItems?: number;
  /**
   * Custom renderer for selected items count
   */
  renderSelectedCount?: (count: number, total: number) => string;
}

export type DropdownProps<T = string> = DropdownSingleProps<T> | DropdownMultipleProps<T>;

export interface DropdownItemProps<T = string> extends Omit<ViewProps, "style"> {
  /**
   * Label to display
   */
  label: string;
  /**
   * Value of the item
   */
  value: T;
  /**
   * Whether the item is selected
   */
  selected?: boolean;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Optional icon to display
   */
  icon?: ReactNode;
  /**
   * Callback when item is pressed
   */
  onPress?: (value: T) => void;
  /**
   * Whether in multi-select mode (shows checkbox instead of checkmark)
   */
  multiple?: boolean;
}

export interface DropdownTriggerProps extends Omit<ViewProps, "style"> {
  /**
   * Content to display in trigger
   */
  children: ReactNode;
  /**
   * Whether the dropdown is open
   */
  isOpen?: boolean;
  /**
   * Whether the trigger is disabled
   */
  disabled?: boolean;
  /**
   * Whether there's an error
   */
  hasError?: boolean;
  /**
   * Callback when trigger is pressed
   */
  onPress?: () => void;
}

export interface DropdownContentProps extends Omit<ViewProps, "style"> {
  /**
   * Items to display
   */
  children: ReactNode;
  /**
   * Maximum height
   */
  maxHeight?: number;
  /**
   * Whether to show search input
   */
  searchable?: boolean;
  /**
   * Search placeholder
   */
  searchPlaceholder?: string;
  /**
   * Search value
   */
  searchValue?: string;
  /**
   * Search change callback
   */
  onSearchChange?: (value: string) => void;
}
