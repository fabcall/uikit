import { useCallback, useDeferredValue, useMemo, useState } from "react";

import { useContextMenu, type UseContextMenuReturn } from "../../hooks";
import { type DropdownOption } from "./Dropdown.props";

export interface UseDropdownConfigBase<T = string> {
  options: Array<DropdownOption<T>>;
  searchable?: boolean;
  position?: "top" | "bottom";
  maxHeight?: number;
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

export type UseDropdownConfig<T = string> =
  | UseDropdownConfigSingle<T>
  | UseDropdownConfigMultiple<T>;

export interface UseDropdownReturnBase<T = string>
  extends Omit<UseContextMenuReturn, "open" | "toggle"> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredOptions: Array<DropdownOption<T>>;
  open: () => void;
  toggle: () => void;
  reset: () => void;
  disabled: boolean;
}

export interface UseDropdownReturnSingle<T = string> extends UseDropdownReturnBase<T> {
  multiple: false;
  selectedOption: DropdownOption<T> | undefined;
  selectOption: (value: T) => void;
}

export interface UseDropdownReturnMultiple<T = string> extends UseDropdownReturnBase<T> {
  multiple: true;
  selectedOptions: Array<DropdownOption<T>>;
  toggleOption: (value: T) => void;
  selectAll: () => void;
  clearAll: () => void;
  isAllSelected: boolean;
}

export type UseDropdownReturn<T = string> =
  | UseDropdownReturnSingle<T>
  | UseDropdownReturnMultiple<T>;

const SEARCH_BAR_HEIGHT = 60;
const BASE_PADDING = 8;

export function useDropdownSingle<T = string>(
  config: UseDropdownConfigSingle<T>,
): UseDropdownReturnSingle<T> {
  const {
    options,
    value,
    onChange,
    searchable = false,
    position = "bottom",
    maxHeight = 300,
    disabled = false,
  } = config;

  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredQuery.trim()) {
      return options;
    }
    const query = deferredQuery.toLowerCase().trim();
    return options.filter((option) => option.label.toLowerCase().includes(query));
  }, [options, deferredQuery, searchable]);

  const menu = useContextMenu({
    position,
    maxHeight,
    itemCount: filteredOptions.length,
    extraPadding: (searchable ? SEARCH_BAR_HEIGHT : 0) + BASE_PADDING,
  });

  const { close: menuClose, open: menuOpen } = menu;

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value],
  );

  const selectOption = useCallback(
    (optionValue: T) => {
      onChange?.(optionValue);
      menuClose();
      setSearchQuery("");
    },
    [onChange, menuClose],
  );

  const open = useCallback(() => {
    if (!disabled) {
      setSearchQuery("");
      void menuOpen();
    }
  }, [disabled, menuOpen]);

  const toggle = useCallback(() => {
    if (menu.isOpen) {
      menuClose();
    } else {
      open();
    }
  }, [menu.isOpen, menuClose, open]);

  const reset = useCallback(() => {
    setSearchQuery("");
    menuClose();
  }, [menuClose]);

  return {
    triggerRef: menu.triggerRef,
    position: menu.position,
    isOpen: menu.isOpen,
    isPositioning: menu.isPositioning,
    close: menuClose,
    open,
    toggle,
    searchQuery,
    setSearchQuery,
    filteredOptions,
    selectedOption,
    selectOption,
    reset,
    disabled,
    multiple: false,
  };
}

export function useDropdownMultiple<T = string>(
  config: UseDropdownConfigMultiple<T>,
): UseDropdownReturnMultiple<T> {
  const {
    options,
    value = [],
    onChange,
    searchable = false,
    position = "bottom",
    maxHeight = 300,
    disabled = false,
  } = config;

  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredQuery.trim()) {
      return options;
    }
    const query = deferredQuery.toLowerCase().trim();
    return options.filter((option) => option.label.toLowerCase().includes(query));
  }, [options, deferredQuery, searchable]);

  const menu = useContextMenu({
    position,
    maxHeight,
    itemCount: filteredOptions.length,
    extraPadding: (searchable ? SEARCH_BAR_HEIGHT : 0) + BASE_PADDING,
  });

  const { close: menuClose, open: menuOpen } = menu;

  const selectedOptions = useMemo(
    () => options.filter((opt) => value.includes(opt.value)),
    [options, value],
  );

  const enabledOptions = useMemo(
    () => options.filter((opt) => !opt.disabled),
    [options],
  );

  const isAllSelected = useMemo(
    () =>
      enabledOptions.length > 0 &&
      enabledOptions.every((opt) => value.includes(opt.value)),
    [enabledOptions, value],
  );

  const toggleOption = useCallback(
    (optionValue: T) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange?.(newValue);
    },
    [value, onChange],
  );

  const selectAll = useCallback(() => {
    const enabledValues = enabledOptions.map((opt) => opt.value);
    // Mantém as opções desabilitadas que já estavam selecionadas
    const disabledSelectedValues = value.filter((v) => {
      const option = options.find((opt) => opt.value === v);
      return option?.disabled;
    });
    onChange?.([...new Set([...disabledSelectedValues, ...enabledValues])]);
  }, [enabledOptions, options, value, onChange]);

  const clearAll = useCallback(() => {
    // Mantém as opções desabilitadas que estavam selecionadas
    const disabledSelectedValues = value.filter((v) => {
      const option = options.find((opt) => opt.value === v);
      return option?.disabled;
    });
    onChange?.(disabledSelectedValues);
  }, [options, value, onChange]);

  const open = useCallback(() => {
    if (!disabled) {
      setSearchQuery("");
      void menuOpen();
    }
  }, [disabled, menuOpen]);

  const toggle = useCallback(() => {
    if (menu.isOpen) {
      menuClose();
    } else {
      open();
    }
  }, [menu.isOpen, menuClose, open]);

  const reset = useCallback(() => {
    setSearchQuery("");
    menuClose();
  }, [menuClose]);

  return {
    triggerRef: menu.triggerRef,
    position: menu.position,
    isOpen: menu.isOpen,
    isPositioning: menu.isPositioning,
    close: menuClose,
    open,
    toggle,
    searchQuery,
    setSearchQuery,
    filteredOptions,
    selectedOptions,
    toggleOption,
    selectAll,
    clearAll,
    isAllSelected,
    reset,
    disabled,
    multiple: true,
  };
}