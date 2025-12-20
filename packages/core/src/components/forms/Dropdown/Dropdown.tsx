import { Check } from "@readykit/icons";
import React, { forwardRef } from "react";
import {
  Modal,
  Pressable,
  Text as RNText,
  View,
  type View as ViewType,
} from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

import { usePackageTranslation } from "../../../i18n/usePackageTranslation";
import { Text } from "../../data-display/Text";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
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
  const theme = UnistylesRuntime.getTheme();

  return (
    <Text
      style={[
        styles.triggerText,
        !dropdown.selectedOption && { color: theme.colors.textSecondary },
      ]}
    >
      {dropdown.selectedOption ? dropdown.selectedOption.label : placeholder}
    </Text>
  );
}

function MultiSelectTriggerContent<T>({
  dropdown,
  placeholder,
  maxDisplayItems,
  renderSelectedCount,
  optionsLength,
}: DropdownMultipleInternalProps<T>): React.JSX.Element {
  const theme = UnistylesRuntime.getTheme();
  const selectedCount = dropdown.selectedOptions.length;

  if (selectedCount === 0) {
    return (
      <Text style={[styles.triggerText, { color: theme.colors.textSecondary }]}>
        {placeholder}
      </Text>
    );
  }

  const displayItems = dropdown.selectedOptions.slice(0, maxDisplayItems);
  const remainingCount = selectedCount - maxDisplayItems;

  if (renderSelectedCount && selectedCount > maxDisplayItems) {
    return (
      <View style={styles.triggerContent}>
        <Text style={styles.triggerText}>
          {renderSelectedCount(selectedCount, optionsLength)}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.triggerContent}>
      {displayItems.map((option) => (
        <View key={String(option.value)} style={styles.selectedBadge}>
          <Text style={styles.selectedBadgeText}>{option.label}</Text>
        </View>
      ))}
      {remainingCount > 0 ? (
        <View style={styles.selectedCountBadge}>
          <Text style={styles.selectedCountText}>+{remainingCount}</Text>
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
    placement = "bottom-start",
    offset = 4,
    emptyMessage = "No options found",
    forwardedRef,
    ...restProps
  } = props;

  const dropdown = useDropdownSingle({
    options,
    value,
    onChange,
    searchable,
    placement,
    offset,
    maxHeight,
    disabled,
  });

  styles.useVariants({
    disabled,
    error: Boolean(error),
  });

  return (
    <View ref={forwardedRef} style={styles.container} {...restProps}>
      {label ? (
        <Text color={disabled ? "disabled" : "primary"} style={styles.label}>
          {label}
          {required ? <RNText style={styles.required}> *</RNText> : null}
        </Text>
      ) : null}

      <View ref={dropdown.triggerRef}>
        <DropdownTrigger
          disabled={disabled}
          hasError={Boolean(error)}
          isOpen={dropdown.isOpen}
          onPress={dropdown.open}
        >
          <SingleSelectTriggerContent dropdown={dropdown} placeholder={placeholder} />
        </DropdownTrigger>
      </View>

      <Modal
        animationType="fade"
        onRequestClose={dropdown.close}
        transparent
        visible={dropdown.isOpen}
      >
        <Pressable onPress={dropdown.close} style={styles.dropdownOverlay}>
          <View
            onStartShouldSetResponder={() => true}
            style={[{ position: "absolute" }, dropdown.position]}
          >
            <DropdownContent
              maxHeight={dropdown.position.maxHeight}
              onSearchChange={dropdown.setSearchQuery}
              searchPlaceholder={searchPlaceholder}
              searchValue={dropdown.searchQuery}
              searchable={searchable}
            >
              {dropdown.filteredOptions.length > 0 ? (
                dropdown.filteredOptions.map((option) => (
                  <DropdownItem
                    disabled={option.disabled}
                    icon={option.icon}
                    key={String(option.value)}
                    label={option.label}
                    multiple={false}
                    onPress={dropdown.selectOption as (value: unknown) => void}
                    selected={option.value === value}
                    value={option.value}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>{emptyMessage}</Text>
                </View>
              )}
            </DropdownContent>
          </View>
        </Pressable>
      </Modal>

      {error ? <ErrorMessage error={error} /> : null}
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
    placement = "bottom-start",
    offset = 4,
    emptyMessage = "No options found",
    showSelectAll = false,
    selectAllLabel: selectAllLabelProp,
    maxDisplayItems = 3,
    renderSelectedCount,
    forwardedRef,
    ...restProps
  } = props;

  const { t } = usePackageTranslation();
  const theme = UnistylesRuntime.getTheme();

  const dropdown = useDropdownMultiple({
    options,
    value,
    onChange,
    searchable,
    placement,
    offset,
    maxHeight,
    disabled,
  });

  const selectAllLabel = selectAllLabelProp ?? t("common.selectAll");

  styles.useVariants({
    disabled,
    error: Boolean(error),
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
      {label ? (
        <Text color={disabled ? "disabled" : "primary"} style={styles.label}>
          {label}
          {required ? <RNText style={styles.required}> *</RNText> : null}
        </Text>
      ) : null}

      <View ref={dropdown.triggerRef}>
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

      <Modal
        animationType="fade"
        onRequestClose={dropdown.close}
        transparent
        visible={dropdown.isOpen}
      >
        <Pressable onPress={dropdown.close} style={styles.dropdownOverlay}>
          <View
            onStartShouldSetResponder={() => true}
            style={[{ position: "absolute" }, dropdown.position]}
          >
            <DropdownContent
              maxHeight={dropdown.position.maxHeight}
              onSearchChange={dropdown.setSearchQuery}
              searchPlaceholder={searchPlaceholder}
              searchValue={dropdown.searchQuery}
              searchable={searchable}
            >
              {showSelectAll && dropdown.filteredOptions.length > 0 ? (
                <Pressable onPress={handleToggleSelectAll} style={styles.selectAllItem}>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        borderColor: dropdown.isAllSelected
                          ? theme.colors.primary
                          : theme.colors.border,
                        backgroundColor: dropdown.isAllSelected
                          ? theme.colors.primary
                          : "transparent",
                      },
                    ]}
                  >
                    {dropdown.isAllSelected ? (
                      <Check fill={theme.colors.onPrimary} height={14} width={14} />
                    ) : null}
                  </View>
                  <Text style={styles.itemLabel}>{selectAllLabel}</Text>
                </Pressable>
              ) : null}

              {dropdown.filteredOptions.length > 0 ? (
                dropdown.filteredOptions.map((option) => (
                  <DropdownItem
                    disabled={option.disabled}
                    icon={option.icon}
                    key={String(option.value)}
                    label={option.label}
                    multiple
                    onPress={dropdown.toggleOption as (value: unknown) => void}
                    selected={value.includes(option.value)}
                    value={option.value}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>{emptyMessage}</Text>
                </View>
              )}

              {dropdown.selectedOptions.length > 0 ? (
                <View style={styles.actionsFooter}>
                  <Text style={styles.selectedCount}>
                    {dropdown.selectedOptions.length} {t("common.selected")}
                  </Text>
                  <Pressable onPress={dropdown.clearAll} style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>{t("common.clearAll")}</Text>
                  </Pressable>
                </View>
              ) : null}
            </DropdownContent>
          </View>
        </Pressable>
      </Modal>

      {error ? <ErrorMessage error={error} /> : null}
    </View>
  );
}

/**
 * Dropdown Component
 *
 * A flexible dropdown/select component with optional search functionality
 * and multi-select support. Uses the compound component pattern for advanced customization.
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
 * // Multi-select usage
 * <Dropdown
 *   label="Select fruits"
 *   placeholder="Choose fruits..."
 *   multiple
 *   value={selectedFruits}
 *   onChange={setSelectedFruits}
 *   options={fruits}
 *   showSelectAll
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With search and forced top placement
 * <Dropdown
 *   label="Select a country"
 *   searchable
 *   searchPlaceholder="Search countries..."
 *   placement="top-start"
 *   value={country}
 *   onChange={setCountry}
 *   options={countries}
 * />
 * ```
 */
const DropdownRoot = forwardRef<ViewType, DropdownProps<unknown>>(
  <T,>(props: DropdownProps<T>, ref: React.Ref<ViewType>) => {
    if (props.multiple === true) {
      return <DropdownMultipleComponent {...props} forwardedRef={ref} />;
    }
    return (
      <DropdownSingleComponent {...(props)} forwardedRef={ref} />
    );
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