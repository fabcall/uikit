import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, type View as ViewType } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { DropdownOption } from "./Dropdown.props";

export interface UseDropdownConfigBase<T = string> {
  options: Array<DropdownOption<T>>;
  searchable?: boolean;
  placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end";
  maxHeight?: number;
  offset?: number;
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

interface DropdownPosition {
  top: number;
  left: number;
  width: number;
  /**
   * Dynamic maxHeight that may be reduced if there's not enough space
   */
  maxHeight: number;
}

export interface UseDropdownReturnSingle<T> {
  triggerRef: React.RefObject<ViewType | null>;
  position: DropdownPosition;
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredOptions: Array<DropdownOption<T>>;
  selectedOption: DropdownOption<T> | undefined;
  selectOption: (value: T) => void;
  open: () => void;
  close: () => void;
  disabled: boolean;
  measureAndPosition: () => void;
  multiple: false;
}

export interface UseDropdownReturnMultiple<T> {
  triggerRef: React.RefObject<ViewType | null>;
  position: DropdownPosition;
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
  measureAndPosition: () => void;
  multiple: true;
}

// Minimum height for dropdown content (ensures usability)
const MIN_DROPDOWN_HEIGHT = 100;

function useDropdownPosition(config: {
  placement: "top-start" | "top-end" | "bottom-start" | "bottom-end";
  offset: number;
  maxHeight: number;
  visible: boolean;
}) {
  const { placement, offset, maxHeight, visible } = config;
  const triggerRef = useRef<ViewType>(null);
  const insets = useSafeAreaInsets();
  
  const [position, setPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 0,
    maxHeight,
  });

  const measureAndPosition = useCallback(() => {
    if (!triggerRef.current) return;

    triggerRef.current.measureInWindow((x, y, width, height) => {
      const windowWidth = Dimensions.get("window").width;
      
      const isTopPlacement = placement.startsWith("top");
      const isEndAligned = placement.endsWith("end");
      
      // Calculate available space (respecting safe areas)
      const availableSpaceAbove = y - insets.top;
      
      // Calculate horizontal position
      let left = x;
      if (isEndAligned) {
        // For end alignment with matchTriggerWidth, left stays the same
        left = x;
      }
      
      // Ensure horizontal bounds
      const maxLeft = windowWidth - width - 8; // 8px padding from edge
      left = Math.max(8, Math.min(left, maxLeft));
      
      let newPosition: DropdownPosition;
      
      if (isTopPlacement) {
        // For top placement: position dropdown ABOVE the trigger
        // Calculate available height and shrink if needed
        const availableHeight = availableSpaceAbove - offset;
        const actualMaxHeight = Math.max(
          Math.min(maxHeight, availableHeight),
          MIN_DROPDOWN_HEIGHT
        );
        
        // Position using 'top' - the dropdown's top edge starts at:
        // trigger's Y position - offset - content height
        // But since we don't know exact content height, we position the 
        // bottom of the dropdown at (triggerY - offset)
        // 
        // In RN absolute positioning, we use 'top' to position from top of screen
        // So: top = triggerY - offset - actualMaxHeight
        const top = y - offset - actualMaxHeight;
        
        newPosition = {
          top: Math.max(insets.top, top), // Don't go above safe area
          left,
          width,
          maxHeight: actualMaxHeight,
        };
      } else {
        // For bottom placement: position dropdown BELOW the trigger
        const top = y + height + offset;
        
        // Calculate available height and shrink if needed  
        const windowHeight = Dimensions.get("window").height;
        const availableSpaceBelow = windowHeight - (y + height) - insets.bottom;
        const availableHeight = availableSpaceBelow - offset;
        const actualMaxHeight = Math.max(
          Math.min(maxHeight, availableHeight),
          MIN_DROPDOWN_HEIGHT
        );
        
        newPosition = {
          top,
          left,
          width,
          maxHeight: actualMaxHeight,
        };
      }
      
      setPosition(newPosition);
    });
  }, [placement, offset, maxHeight, insets]);

  useEffect(() => {
    if (visible) {
      measureAndPosition();
    }
  }, [visible, measureAndPosition]);

  return {
    triggerRef,
    position,
    measureAndPosition,
  };
}

export function useDropdownSingle<T = string>(config: UseDropdownConfigSingle<T>): UseDropdownReturnSingle<T> {
  const {
    options,
    value,
    onChange,
    searchable = false,
    placement = "bottom-start",
    offset = 4,
    maxHeight = 300,
    disabled = false,
  } = config;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredQuery.trim()) return options;
    const query = deferredQuery.toLowerCase().trim();
    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, deferredQuery, searchable]);

  const {
    triggerRef,
    position,
    measureAndPosition,
  } = useDropdownPosition({
    placement,
    offset,
    maxHeight,
    visible: isOpen,
  });

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value],
  );

  const selectOption = useCallback(
    (optionValue: T) => {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchQuery("");
    },
    [onChange],
  );

  const open = useCallback(() => {
    if (!disabled) {
      setSearchQuery("");
      measureAndPosition();
      setIsOpen(true);
    }
  }, [disabled, measureAndPosition]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
  }, []);

  return {
    triggerRef,
    position,
    isOpen,
    searchQuery,
    setSearchQuery,
    filteredOptions,
    selectedOption,
    selectOption,
    open,
    close,
    disabled,
    measureAndPosition,
    multiple: false as const,
  };
}

export function useDropdownMultiple<T = string>(config: UseDropdownConfigMultiple<T>): UseDropdownReturnMultiple<T> {
  const {
    options,
    value = [],
    onChange,
    searchable = false,
    placement = "bottom-start",
    offset = 4,
    maxHeight = 300,
    disabled = false,
  } = config;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredQuery.trim()) return options;
    const query = deferredQuery.toLowerCase().trim();
    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, deferredQuery, searchable]);

  const {
    triggerRef,
    position,
    measureAndPosition,
  } = useDropdownPosition({
    placement,
    offset,
    maxHeight,
    visible: isOpen,
  });

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
      measureAndPosition();
      setIsOpen(true);
    }
  }, [disabled, measureAndPosition]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
  }, []);

  return {
    triggerRef,
    position,
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
    measureAndPosition,
    multiple: true as const,
  };
}