import React, { forwardRef } from "react";
import {
  type LayoutChangeEvent,
  ScrollView,
  Text,
  TextInput,
  View,
  type View as ViewType,
} from "react-native";

import type { DropdownContentProps } from "./Dropdown.props";
import { styles } from "./Dropdown.styles";

export const DropdownContent = forwardRef<
  ViewType,
  DropdownContentProps & {
    onLayout?: (event: LayoutChangeEvent) => void;
  }
>(
  (
    {
      children,
      maxHeight = 300,
      searchable = false,
      searchPlaceholder = "Search...",
      searchValue = "",
      onSearchChange,
      onLayout,
      ...props
    },
    ref,
  ) => {
    const childrenArray = React.Children.toArray(children);
    const hasItems = childrenArray.length > 0;

    return (
      <View
        ref={ref}
        style={[styles.dropdownContent, { maxHeight }]}
        onLayout={onLayout}
        {...props}
      >
        {searchable ? (
          <View style={styles.searchContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onSearchChange}
              placeholder={searchPlaceholder}
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
              value={searchValue}
            />
          </View>
        ) : null}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          style={styles.scrollContainer}
        >
          {hasItems ? (
            children
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No options found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  },
);

DropdownContent.displayName = "Dropdown.Content";
