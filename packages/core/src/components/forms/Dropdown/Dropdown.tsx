import React, { forwardRef } from "react";
import {
  Modal,
  Pressable,
  Text as RNText,
  View,
  type View as ViewType,
} from "react-native";

import { Text } from "../../data-display/Text";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import type { DropdownProps } from "./Dropdown.props";
import { styles } from "./Dropdown.styles";
import { DropdownContent } from "./DropdownContent";
import { DropdownItem } from "./DropdownItem";
import { DropdownTrigger } from "./DropdownTrigger";
import { useDropdown } from "./hooks/useDropdown";

/**
 * Dropdown Component
 *
 * A flexible dropdown/select component with optional search functionality.
 * Uses the compound component pattern for advanced customization.
 *
 * @example
 * ```tsx
 * // Basic usage
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
 * // With icons
 * <Dropdown
 *   label="Select an action"
 *   value={action}
 *   onChange={setAction}
 *   options={[
 *     { label: "Upload", value: "upload", icon: <UploadIcon /> },
 *     { label: "Download", value: "download", icon: <DownloadIcon /> },
 *   ]}
 * />
 * ```
 */
const DropdownRoot = forwardRef<ViewType, DropdownProps<unknown>>(
  <T,>(
    {
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
      position = "bottom",
      emptyMessage = "No options found",
      ...props
    }: DropdownProps<T>,
    ref: React.Ref<ViewType>,
  ) => {
    // Use specialized dropdown hook
    const dropdown = useDropdown({
      options,
      value,
      onChange,
      searchable,
      position,
      maxHeight,
      disabled,
    });

    styles.useVariants({
      disabled,
      error: Boolean(error),
    });

    return (
      <View ref={ref} style={styles.container} {...props}>
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
            <Text
              style={[
                styles.triggerText,
                !dropdown.selectedOption && { color: "#9CA3AF" },
              ]}
            >
              {dropdown.selectedOption
                ? dropdown.selectedOption.label
                : placeholder}
            </Text>
          </DropdownTrigger>
        </View>

        <Modal
          animationType="fade"
          onRequestClose={dropdown.reset}
          transparent
          visible={dropdown.isOpen}
        >
          <Pressable onPress={dropdown.reset} style={styles.dropdownOverlay}>
            <View
              onStartShouldSetResponder={() => true}
              style={[
                {
                  position: "absolute",
                },
                dropdown.position,
              ]}
            >
              <DropdownContent
                maxHeight={maxHeight}
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
                      onPress={
                        dropdown.selectOption as (value: unknown) => void
                      }
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
