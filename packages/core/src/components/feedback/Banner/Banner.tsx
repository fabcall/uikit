import {
  CheckCircle,
  ExclamationCircle,
  ExclamationTriangle,
} from "@readykit/icons";
import React, { forwardRef } from "react";
import { View, type View as ViewType } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { Text } from "../../data-display/Text";
import type { BannerProps, BannerVariant } from "./Banner.props";
import { ICON_SIZE, styles } from "./Banner.styles";

/**
 * Banner variant configurations
 * Maps each variant to its default icon and color key
 */
const BANNER_CONFIG: Record<
  BannerVariant,
  {
    Icon?: React.ComponentType<React.ComponentProps<typeof CheckCircle>>;
    colorKey: string;
  }
> = {
  error: {
    Icon: ExclamationCircle,
    colorKey: "error",
  },
  success: {
    Icon: CheckCircle,
    colorKey: "success",
  },
  warning: {
    Icon: ExclamationTriangle,
    colorKey: "warning",
  },
  info: {
    Icon: ExclamationCircle,
    colorKey: "info",
  },
};

/**
 * Banner Component
 *
 * A versatile banner component that displays messages with different
 * severity levels (error, success, warning, info). Perfect for notifying users
 * about system states, errors, or important information.
 *
 * @example
 * ```tsx
 * // Variant-based banner (default: error)
 * <Banner
 *   message="Error retrieving data. We'll automatically retry until it's back."
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom variant
 * <Banner
 *   variant="success"
 *   message="Data saved successfully!"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom color (variant not allowed)
 * <Banner
 *   color="#9333EA"
 *   message="Custom colored banner."
 *   icon={CustomIcon}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With action button
 * <Banner
 *   variant="success"
 *   message="Item deleted."
 *   action={<Button title="UNDO" variant="ghost" size="sm" />}
 * />
 * ```
 */
export const Banner = forwardRef<ViewType, BannerProps>(
  (
    {
      message,
      title,
      variant,
      icon: IconComponent,
      color,
      backgroundColor,
      action,
      ...props
    },
    ref,
  ) => {
    const { theme } = useUnistyles();

    // Determine if using custom color mode or variant mode
    const isCustomColorMode = Boolean(color);
    const activeVariant = isCustomColorMode ? undefined : (variant ?? "error");
    const config = activeVariant ? BANNER_CONFIG[activeVariant] : null;

    styles.useVariants({
      variant: activeVariant,
    });

    // Use custom icon if provided, otherwise use default icon from config
    const IconToRender = IconComponent ?? config?.Icon;

    // Determine content color
    const contentColor = isCustomColorMode
      ? color
      : theme.colors[config?.colorKey as keyof typeof theme.colors];

    // Custom background and border for custom color mode
    const customContainerStyle = isCustomColorMode
      ? {
          backgroundColor: backgroundColor ?? `${color}0D`, // 5% opacity
          borderColor: `${color}33`, // 20% opacity
        }
      : undefined;

    const hasTitle = Boolean(title);

    return (
      <View
        ref={ref}
        style={[styles.container, customContainerStyle]}
        {...props}
      >
        {/* Header row: icon + first line (title or message) + action */}
        <View style={styles.headerRow}>
          {IconToRender ? (
            <View style={styles.iconContainer}>
              <IconToRender
                fill={contentColor}
                height={ICON_SIZE}
                width={ICON_SIZE}
              />
            </View>
          ) : null}
          <Text
            style={[hasTitle ? styles.title : styles.message, { flex: 1 }]}
            variant="body"
          >
            {hasTitle ? title : message}
          </Text>
          {action ? <View style={styles.actionContainer}>{action}</View> : null}
        </View>
        {hasTitle ? (
          <View style={styles.messageBelow}>
            <Text style={styles.message} variant="body">
              {message}
            </Text>
          </View>
        ) : null}
      </View>
    );
  },
);

Banner.displayName = "Banner";
