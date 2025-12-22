import React, { forwardRef } from "react";
import {
  Pressable,
  ScrollView,
  Text as RNText,
  TextInput,
  View,
  type View as ViewType,
} from "react-native";

import { Overlay } from "../../overlay/Overlay";
import { InputLabel } from "../InputLabel";
import type {
  DropdownMultipleProps,
  DropdownProps,
  DropdownSingleProps,
} from "./Dropdown.props";
import { styles } from "./Dropdown.styles";
import { DropdownContent } from "./DropdownContent";
import { DropdownItem } from "./DropdownItem";
import { DropdownTrigger } from "./DropdownTrigger";
import {
  useDropdownMultiple,
  type UseDropdownReturnMultiple,
  type UseDropdownReturnSingle,
  useDropdownSingle,
} from "./useDropdown";

interface DropdownSingleInternalProps<T> {
  dropdown: UseDropdownReturnSingle<T>;
  placeholder: string;
}

interface DropdownMultipleInternalProps<T> {
  dropdown: UseDropdownReturnMultiple<T>;
  placeholder: string;
  maxDisplayItems: number;
  renderSelectedCount?: (count: number, total: number) => string;
  optionsLength: number;
}

function SingleSelectTriggerContent<T>({
  dropdown,
  placeholder,
}: DropdownSingleInternalProps<T>): React.JSX.Element {
  return (
    <RNText
      style={[
        styles.triggerText,
        !dropdown.selectedOption && styles.triggerTextPlaceholder,
      ]}
    >
      {dropdown.selectedOption ? dropdown.selectedOption.label : placeholder}
    </RNText>
  );
}

function MultiSelectTriggerContent<T>({
  dropdown,
  placeholder,
  maxDisplayItems,
  renderSelectedCount,
  optionsLength,
}: DropdownMultipleInternalProps<T>): React.JSX.Element {
  const selectedCount = dropdown.selectedOptions.length;

  if (selectedCount === 0) {
    return (
      <RNText style={[styles.triggerText, styles.triggerTextPlaceholder]}>
        {placeholder}
      </RNText>
    );
  }

  const displayItems = dropdown.selectedOptions.slice(0, maxDisplayItems);
  const remainingCount = selectedCount - maxDisplayItems;

  if (renderSelectedCount && selectedCount > maxDisplayItems) {
    return (
      <View style={styles.triggerContent}>
        <RNText style={styles.triggerText}>
          {renderSelectedCount(selectedCount, optionsLength)}
        </RNText>
      </View>
    );
  }

  return (
    <View style={styles.triggerContent}>
      {displayItems.map((option) => (
        <View key={String(option.value)} style={styles.selectedBadge}>
          <RNText style={styles.selectedBadgeText}>{option.label}</RNText>
        </View>
      ))}
      {remainingCount > 0 ? (
        <View style={styles.selectedCountBadge}>
          <RNText style={styles.selectedCountText}>+{remainingCount}</RNText>
        </View>
      ) : null}
    </View>
  );
}

/**
 * Single Select Dropdown Component
 */
function DropdownSingleComponent<T>(
  props: DropdownSingleProps<T> & { forwardedRef?: React.Ref<ViewType> },
): React.JSX.Element {
  const {
    label,
    placeholder = "Select...",
    value,
    onChange,
    options,
    disabled = false,
    error,
    required = false,
    searchable = false,
    searchPlaceholder = "Search...",
    maxHeight = 300,
    minHeight = 100,
    placement = "bottom",
    offset = 4,
    screenPadding = 8,
    emptyMessage = "No options found",
    forwardedRef,
    ...restProps
  } = props;

  const dropdown = useDropdownSingle({
    options,
    value,
    onChange,
    searchable,
    disabled,
  });

  return (
    <View ref={forwardedRef} style={styles.container} {...restProps}>
      <InputLabel label={label} required={required} disabled={disabled} />

      <View ref={dropdown.anchorRef}>
        <DropdownTrigger
          disabled={disabled}
          hasError={Boolean(error)}
          isOpen={dropdown.isOpen}
          onPress={dropdown.open}
        >
          <SingleSelectTriggerContent
            dropdown={dropdown}
            placeholder={placeholder}
          />
        </DropdownTrigger>
      </View>

      <Overlay
        anchorRef={dropdown.anchorRef as React.RefObject<View>}
        visible={dropdown.isOpen}
        onClose={dropdown.close}
        placement={placement}
        gap={offset}
        screenPadding={screenPadding}
        minHeight={minHeight}
        maxHeight={maxHeight}
        matchAnchorWidth
        contentStyle={styles.dropdownContent}
      >
        {/* Search Input */}
        {searchable ? (
          <View style={styles.searchContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={dropdown.setSearchQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
              value={dropdown.searchQuery}
            />
          </View>
        ) : null}

        {/* Options List */}
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          bounces={false}
        >
          {dropdown.filteredOptions.length > 0 ? (
            dropdown.filteredOptions.map((option) => (
              <DropdownItem
                key={String(option.value)}
                disabled={option.disabled}
                icon={option.icon}
                label={option.label}
                multiple={false}
                onPress={dropdown.selectOption as (value: unknown) => void}
                selected={option.value === value}
                value={option.value}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <RNText style={styles.emptyText}>{emptyMessage}</RNText>
            </View>
          )}
        </ScrollView>
      </Overlay>

      {error ? <RNText style={styles.errorText}>{error}</RNText> : null}
    </View>
  );
}

/**
 * Multiple Select Dropdown Component
 */
function DropdownMultipleComponent<T>(
  props: DropdownMultipleProps<T> & { forwardedRef?: React.Ref<ViewType> },
): React.JSX.Element {
  const {
    label,
    placeholder = "Select...",
    value = [],
    onChange,
    options,
    disabled = false,
    error,
    required = false,
    searchable = false,
    searchPlaceholder = "Search...",
    maxHeight = 300,
    minHeight = 100,
    placement = "bottom",
    offset = 4,
    screenPadding = 8,
    emptyMessage = "No options found",
    showSelectAll = false,
    selectAllLabel = "Select All",
    maxDisplayItems = 3,
    renderSelectedCount,
    forwardedRef,
    ...restProps
  } = props;

  const dropdown = useDropdownMultiple({
    options,
    value,
    onChange,
    searchable,
    disabled,
  });

  const handleToggleSelectAll = (): void => {
    if (dropdown.isAllSelected) {
      dropdown.clearAll();
    } else {
      dropdown.selectAll();
    }
  };

  return (
    <View ref={forwardedRef} style={styles.container} {...restProps}>
      <InputLabel label={label} required={required} disabled={disabled} />

      <View ref={dropdown.anchorRef}>
        <DropdownTrigger
          disabled={disabled}
          hasError={Boolean(error)}
          isOpen={dropdown.isOpen}
          onPress={dropdown.open}
        >
          <MultiSelectTriggerContent
            dropdown={dropdown}
            maxDisplayItems={maxDisplayItems}
            optionsLength={options.length}
            placeholder={placeholder}
            renderSelectedCount={renderSelectedCount}
          />
        </DropdownTrigger>
      </View>

      <Overlay
        anchorRef={dropdown.anchorRef as React.RefObject<View>}
        visible={dropdown.isOpen}
        onClose={dropdown.close}
        placement={placement}
        gap={offset}
        screenPadding={screenPadding}
        minHeight={minHeight}
        maxHeight={maxHeight}
        matchAnchorWidth
        contentStyle={styles.dropdownContent}
      >
        {/* Search Input */}
        {searchable ? (
          <View style={styles.searchContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={dropdown.setSearchQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
              value={dropdown.searchQuery}
            />
          </View>
        ) : null}

        {/* Select All */}
        {showSelectAll && dropdown.filteredOptions.length > 0 ? (
          <Pressable
            onPress={handleToggleSelectAll}
            style={styles.selectAllItem}
          >
            <View
              style={[
                styles.checkbox,
                dropdown.isAllSelected
                  ? styles.checkboxChecked
                  : styles.checkboxUnchecked,
              ]}
            >
              {dropdown.isAllSelected ? (
                <RNText style={{ color: "#fff", fontSize: 12 }}>✓</RNText>
              ) : null}
            </View>
            <RNText style={styles.itemLabel}>{selectAllLabel}</RNText>
          </Pressable>
        ) : null}

        {/* Options List */}
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          bounces={false}
        >
          {dropdown.filteredOptions.length > 0 ? (
            dropdown.filteredOptions.map((option) => (
              <DropdownItem
                key={String(option.value)}
                disabled={option.disabled}
                icon={option.icon}
                label={option.label}
                multiple
                onPress={dropdown.toggleOption as (value: unknown) => void}
                selected={value.includes(option.value)}
                value={option.value}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <RNText style={styles.emptyText}>{emptyMessage}</RNText>
            </View>
          )}
        </ScrollView>

        {/* Footer with selected count and clear */}
        {dropdown.selectedOptions.length > 0 ? (
          <View style={styles.actionsFooter}>
            <RNText style={styles.selectedCount}>
              {dropdown.selectedOptions.length} selected
            </RNText>
            <Pressable onPress={dropdown.clearAll} style={styles.actionButton}>
              <RNText style={styles.actionButtonText}>Clear All</RNText>
            </Pressable>
          </View>
        ) : null}
      </Overlay>

      {error ? <RNText style={styles.errorText}>{error}</RNText> : null}
    </View>
  );
}

/**
 * Dropdown Component
 *
 * A flexible dropdown/select component with optional search functionality
 * and multi-select support. Uses the Overlay component for intelligent
 * positioning with automatic collision detection via middlewares.
 *
 * @example
 * ```tsx
 * // Basic single select usage
 * <Dropdown
 *   label="Select a fruit"
 *   placeholder="Choose..."
 *   value={selectedFruit}
 *   onChange={setSelectedFruit}
 *   options={[
 *     { label: "Apple", value: "apple" },
 *     { label: "Banana", value: "banana" },
 *     { label: "Orange", value: "orange" },
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With search
 * <Dropdown
 *   label="Select a country"
 *   searchable
 *   searchPlaceholder="Search countries..."
 *   value={country}
 *   onChange={setCountry}
 *   options={countries}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Multi-select usage
 * <Dropdown
 *   label="Select fruits"
 *   placeholder="Choose fruits..."
 *   multiple
 *   value={selectedFruits}
 *   onChange={setSelectedFruits}
 *   options={fruits}
 *   showSelectAll
 *   searchable
 * />
 * ```
 */
const DropdownRoot = forwardRef<ViewType, DropdownProps<unknown>>(
  <T,>(props: DropdownProps<T>, ref: React.Ref<ViewType>) => {
    if (props.multiple === true) {
      return <DropdownMultipleComponent {...props} forwardedRef={ref} />;
    }
    return <DropdownSingleComponent {...props} forwardedRef={ref} />;
  },
);

DropdownRoot.displayName = "Dropdown";

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
}) as typeof DropdownRoot & {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
  Item: typeof DropdownItem;
} & (<T = string>(
    props: DropdownProps<T> & { ref?: React.Ref<ViewType> },
  ) => React.JSX.Element);
