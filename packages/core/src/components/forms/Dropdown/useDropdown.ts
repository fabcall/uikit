import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import type { View as ViewType } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Placement } from "../../overlay/ContextMenu";
import { calculatePosition } from "../../overlay/ContextMenu/positioning";
import type { DropdownOption } from "./Dropdown.props";

export interface UseDropdownConfigBase<T = string> {
  options: Array<DropdownOption<T>>;
  searchable?: boolean;
  placement?: Placement;
  maxHeight?: number;
  minHeight?: number;
  offset?: number;
  disabled?: boolean;
  collisionDetection?: boolean;
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
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  width?: number;
  maxHeight: number;
  placement: Placement;
  adjusted: boolean;
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
  contentSize: { width: number; height: number } | null;
  setContentSize: (size: { width: number; height: number } | null) => void;
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
  contentSize: { width: number; height: number } | null;
  setContentSize: (size: { width: number; height: number } | null) => void;
  multiple: true;
}

function useDropdownPositioning(config: {
  placement?: Placement;
  offset: number;
  maxHeight: number;
  minHeight: number;
  visible: boolean;
  collisionDetection: boolean;
  contentSize: { width: number; height: number } | null;
}) {
  const { placement = "bottom-start", offset, maxHeight, minHeight, visible, collisionDetection, contentSize } = config;
  const triggerRef = useRef<ViewType>(null);
  const insets = useSafeAreaInsets();
  const [triggerSize, setTriggerSize] = useState<{ width: number; height: number } | null>(null);
  
  const [position, setPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 0,
    maxHeight,
    placement,
    adjusted: false,
  });

  const measureAndPosition = useCallback(() => {
    if (!triggerRef.current) return;

    triggerRef.current.measureInWindow((x, y, width, height) => {
      // Track trigger size changes
      setTriggerSize({ width, height });

      const computedPosition = calculatePosition(
        {
          x,
          y,
          width,
          height,
          pageX: x,
          pageY: y,
        },
        {
          placement,
          offset,
          matchTriggerWidth: true,
          maxHeight,
          minHeight,
          collisionDetection,
          screenPadding: 8,
        },
        {
          top: insets.top,
          right: insets.right,
          bottom: insets.bottom,
          left: insets.left,
        },
        contentSize ?? undefined
      );

      setPosition({
        top: computedPosition.top,
        bottom: computedPosition.bottom,
        left: computedPosition.left,
        right: computedPosition.right,
        width: computedPosition.width,
        maxHeight: computedPosition.maxHeight!,
        placement: computedPosition.placement,
        adjusted: computedPosition.adjusted,
      });
    });
  }, [placement, offset, maxHeight, minHeight, collisionDetection, insets, contentSize]);

  useEffect(() => {
    if (visible) {
      measureAndPosition();
    }
  }, [visible, measureAndPosition]);

  useEffect(() => {
    if (visible && contentSize) {
      measureAndPosition();
    }
  }, [contentSize, visible, measureAndPosition]);

  // Monitor trigger size changes (for multi-select growing)
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      if (!triggerRef.current) return;
      
      triggerRef.current.measureInWindow((x, y, width, height) => {
        if (triggerSize && (triggerSize.width !== width || triggerSize.height !== height)) {
          // Trigger size changed - reposition
          measureAndPosition();
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [visible, triggerSize, measureAndPosition]);

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
    placement,
    offset = 4,
    maxHeight = 300,
    minHeight = 100,
    disabled = false,
    collisionDetection = true,
  } = config;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentSize, setContentSize] = useState<{ width: number; height: number } | null>(null);
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
  } = useDropdownPositioning({
    placement,
    offset,
    maxHeight,
    minHeight,
    visible: isOpen,
    collisionDetection,
    contentSize,
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
      setContentSize(null);
      measureAndPosition();
      setIsOpen(true);
    }
  }, [disabled, measureAndPosition]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
    setContentSize(null);
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
    contentSize,
    setContentSize,
    multiple: false as const,
  };
}

export function useDropdownMultiple<T = string>(config: UseDropdownConfigMultiple<T>): UseDropdownReturnMultiple<T> {
  const {
    options,
    value = [],
    onChange,
    searchable = false,
    placement,
    offset = 4,
    maxHeight = 300,
    minHeight = 100,
    disabled = false,
    collisionDetection = true,
  } = config;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentSize, setContentSize] = useState<{ width: number; height: number } | null>(null);
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
  } = useDropdownPositioning({
    placement,
    offset,
    maxHeight,
    minHeight,
    visible: isOpen,
    collisionDetection,
    contentSize,
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
      setContentSize(null);
      measureAndPosition();
      setIsOpen(true);
    }
  }, [disabled, measureAndPosition]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
    setContentSize(null);
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
    contentSize,
    setContentSize,
    multiple: true as const,
  };
}