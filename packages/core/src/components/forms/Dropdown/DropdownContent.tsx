import React, { forwardRef } from "react";
import {
  ScrollView,
  TextInput,
  View,
  type View as ViewType,
} from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { Text } from "../../data-display/Text";
import type { DropdownContentProps } from "./Dropdown.props";
import { styles } from "./Dropdown.styles";

export const DropdownContent = forwardRef<ViewType, DropdownContentProps>(
  (
    {
      children,
      maxHeight = 300,
      searchable = false,
      searchPlaceholder = "Search...",
      searchValue = "",
      onSearchChange,
      ...props
    },
    ref,
  ) => {
    const { theme } = useUnistyles();
    const childrenArray = React.Children.toArray(children);
    const hasItems = childrenArray.length > 0;

    return (
      <View ref={ref} style={[styles.dropdownContent, { maxHeight }]} {...props}>
        {searchable ? (
          <View style={styles.searchContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onSearchChange}
              placeholder={searchPlaceholder}
              placeholderTextColor={theme.colors.textSecondary}
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