import { useCallback, useDeferredValue, useMemo, useState } from "react";

import type { UseContextMenuReturn } from "../../../hooks/useContextMenu";
import { useContextMenu } from "../../../hooks/useContextMenu";
import type { DropdownOption } from "../Dropdown.props";

export interface UseDropdownConfig<T = string> {
  options: Array<DropdownOption<T>>;
  value?: T;
  onChange?: (value: T) => void;
  searchable?: boolean;
  position?: "top" | "bottom";
  maxHeight?: number;
  disabled?: boolean;
}

export interface UseDropdownReturn<T = string> extends Omit<
  UseContextMenuReturn,
  "open" | "toggle"
> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredOptions: Array<DropdownOption<T>>;
  selectedOption?: DropdownOption<T>;
  selectOption: (value: T) => void;
  open: () => void;
  toggle: () => void;
  reset: () => void;
  disabled: boolean;
}

const SEARCH_BAR_HEIGHT = 60;
const BASE_PADDING = 8;

export function useDropdown<T = string>(
  config: UseDropdownConfig<T>,
): UseDropdownReturn<T> {
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

  // Defer para não bloquear input durante filtragem pesada
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredQuery.trim()) {
      return options;
    }
    const query = deferredQuery.toLowerCase().trim();
    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [options, deferredQuery, searchable]);

  const menu = useContextMenu({
    position,
    maxHeight,
    itemCount: filteredOptions.length,
    extraPadding: (searchable ? SEARCH_BAR_HEIGHT : 0) + BASE_PADDING,
  });

  // Extrair funções estáveis para evitar dependências instáveis
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
  };
}
