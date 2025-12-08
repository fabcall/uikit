import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef } from "react";
import { type ColorValue, Pressable, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { Badge } from "../../data-display/Badge";
import { Text } from "../../data-display/Text";
import type { TabBarItemProps, TabBarProps } from "./TabBar.props";
import { styles } from "./TabBar.styles";

const TabBarItemBase = forwardRef<View, TabBarItemProps>(
  (
    {
      icon,
      label,
      focused = false,
      disabled = false,
      badge,
      activeTintColor,
      inactiveTintColor,
      activeLabelColor,
      inactiveLabelColor,
      onPress,
      onLongPress,
      testID,
      ...props
    },
    ref,
  ) => {
    styles.useVariants({
      disabled,
    });

    const { theme } = useUnistyles();

    const handlePress = (): void => {
      if (!disabled && onPress) {
        onPress();
      }
    };

    const iconColor = disabled
      ? theme.colors.textDisabled
      : focused
        ? activeTintColor || theme.colors.primary
        : inactiveTintColor || theme.colors.textSecondary;

    const labelColor = disabled
      ? theme.colors.textDisabled
      : focused
        ? activeLabelColor || activeTintColor || theme.colors.primary
        : inactiveLabelColor || inactiveTintColor || theme.colors.textSecondary;

    const iconSize = 24;

    const shouldShowBadge = badge !== undefined && badge !== false;
    const badgeContent = typeof badge === "boolean" ? undefined : badge;

    return (
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: focused, disabled }}
        accessibilityLabel={label}
        disabled={disabled}
        onPress={handlePress}
        onLongPress={onLongPress}
        ref={ref}
        style={styles.tab}
        testID={testID}
        {...props}
      >
        <View style={styles.tabIconContainer}>
          <Badge
            content={badgeContent}
            dot={typeof badge === "boolean"}
            visible={shouldShowBadge}
            color="error"
            style={{ alignSelf: "center" }}
          >
            {icon({ focused, color: iconColor, size: iconSize })}
          </Badge>
          <Text style={[styles.tabLabel, { color: labelColor }]}>{label}</Text>
        </View>
      </Pressable>
    );
  },
);

TabBarItemBase.displayName = "TabBar.Item";

const TabBarItem = TabBarItemBase as typeof TabBarItemBase &
  ((props: TabBarItemProps & { ref?: React.Ref<View> }) => React.JSX.Element);

const TabBarRoot = forwardRef<View, TabBarProps>(
  (
    {
      children,
      style,
      gradientColors,
      activeTintColor,
      inactiveTintColor,
      activeLabelColor,
      inactiveLabelColor,
      ...props
    },
    ref,
  ) => {
    const { theme } = useUnistyles();

    const defaultGradientColors = [
      theme.colors.background,
      theme.colors.surface,
    ];

    const colors = (gradientColors || defaultGradientColors) as [
      ColorValue,
      ColorValue,
      ...ColorValue[],
    ];

    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(
          child as React.ReactElement<TabBarItemProps>,
          {
            activeTintColor,
            inactiveTintColor,
            activeLabelColor,
            inactiveLabelColor,
          },
        );
      }
      return child;
    });

    return (
      <View ref={ref} style={[styles.tabBar, style]} {...props}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientBackground}
        />
        <View style={styles.tabBarContent}>{childrenWithProps}</View>
      </View>
    );
  },
);

TabBarRoot.displayName = "TabBar";

export const TabBar = Object.assign(TabBarRoot, {
  Item: TabBarItem,
});
