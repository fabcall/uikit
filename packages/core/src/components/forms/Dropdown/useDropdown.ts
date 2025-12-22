import {
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
import type { View as ViewType } from "react-native";

import type { DropdownOption } from "./Dropdown.props";

export interface UseDropdownConfigBase<T = string> {
  options: Array<DropdownOption<T>>;
  searchable?: boolean;
  disabled?: boolean;
}

export interface UseDropdownConfigSingle<T = string> extends UseDropdownConfigBase<T> {
  multiple?: false;
  value?: T;
  onChange?: (value: T) => void;
}

export interface UseDropdownConfigMultiple<T = string> extends UseDropdownConfigBase<T> {
  multiple?: true;
  value?: T[];
  onChange?: (value: T[]) => void;
}

export interface UseDropdownReturnSingle<T> {
  anchorRef: React.RefObject<ViewType | null>;
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredOptions: Array<DropdownOption<T>>;
  selectedOption: DropdownOption<T> | undefined;
  selectOption: (value: T) => void;
  open: () => void;
  close: () => void;
  disabled: boolean;
  multiple: false;
}

export interface UseDropdownReturnMultiple<T> {
  anchorRef: React.RefObject<ViewType | null>;
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredOptions: Array<DropdownOption<T>>;
  selectedOptions: Array<DropdownOption<T>>;
  toggleOption: (value: T) => void;
  selectAll: () => void;
  clearAll: () => void;
  isAllSelected: boolean;
  open: () => void;
  close: () => void;
  disabled: boolean;
  multiple: true;
}

export function useDropdownSingle<T = string>(
  config: UseDropdownConfigSingle<T>
): UseDropdownReturnSingle<T> {
  const {
    options,
    value,
    onChange,
    searchable = false,
    disabled = false,
  } = config;

  const anchorRef = useRef<ViewType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredQuery.trim()) return options;
    const query = deferredQuery.toLowerCase().trim();
    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, deferredQuery, searchable]);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  const selectOption = useCallback(
    (optionValue: T) => {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchQuery("");
    },
    [onChange]
  );

  const open = useCallback(() => {
    if (!disabled) {
      setSearchQuery("");
      setIsOpen(true);
    }
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
  }, []);

  return {
    anchorRef,
    isOpen,
    searchQuery,
    setSearchQuery,
    filteredOptions,
    selectedOption,
    selectOption,
    open,
    close,
    disabled,
    multiple: false as const,
  };
}

export function useDropdownMultiple<T = string>(
  config: UseDropdownConfigMultiple<T>
): UseDropdownReturnMultiple<T> {
  const {
    options,
    value = [],
    onChange,
    searchable = false,
    disabled = false,
  } = config;

  const anchorRef = useRef<ViewType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredQuery.trim()) return options;
    const query = deferredQuery.toLowerCase().trim();
    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, deferredQuery, searchable]);

  const selectedOptions = useMemo(
    () => options.filter((opt) => value.includes(opt.value)),
    [options, value]
  );

  const enabledOptions = useMemo(
    () => options.filter((opt) => !opt.disabled),
    [options]
  );

  const isAllSelected = useMemo(
    () =>
      enabledOptions.length > 0 &&
      enabledOptions.every((opt) => value.includes(opt.value)),
    [enabledOptions, value]
  );

  const toggleOption = useCallback(
    (optionValue: T) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange?.(newValue);
    },
    [value, onChange]
  );

  const selectAll = useCallback(() => {
    const enabledValues = enabledOptions.map((opt) => opt.value);
    const disabledSelectedValues = value.filter((v) => {
      const option = options.find((opt) => opt.value === v);
      return option?.disabled;
    });
    onChange?.([...new Set([...disabledSelectedValues, ...enabledValues])]);
  }, [enabledOptions, options, value, onChange]);

  const clearAll = useCallback(() => {
    const disabledSelectedValues = value.filter((v) => {
      const option = options.find((opt) => opt.value === v);
      return option?.disabled;
    });
    onChange?.(disabledSelectedValues);
  }, [options, value, onChange]);

  const open = useCallback(() => {
    if (!disabled) {
      setSearchQuery("");
      setIsOpen(true);
    }
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
  }, []);

  return {
    anchorRef,
    isOpen,
    searchQuery,
    setSearchQuery,
    filteredOptions,
    selectedOptions,
    toggleOption,
    selectAll,
    clearAll,
    isAllSelected,
    open,
    close,
    disabled,
    multiple: true as const,
  };
}