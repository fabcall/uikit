import { Image, type ImageLoadEventData } from "expo-image";
import React, { forwardRef, useMemo, useState } from "react";
import { Text, View, type View as ViewType } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { Spinner } from "../../feedback/Spinner";
import type { CircleAvatarProps } from "./CircleAvatar.props";
import { styles } from "./CircleAvatar.styles";
import {
  generateInitials,
  getColorFromName,
  getForegroundColor,
} from "./helpers";

/**
 * CircleAvatar Component
 *
 * A circular avatar component that displays a user's image, initials, or icon.
 * Perfect for user profiles, contact lists, or any place where you need to
 * display user identity.
 *
 * @example
 * ```tsx
 * // With image
 * <CircleAvatar
 *   source={{ uri: 'https://example.com/avatar.jpg' }}
 *   name="John Doe"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With initials
 * <CircleAvatar
 *   name="Jane Smith"
 *   size="lg"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With icon fallback
 * import { Upload } from '@readykit/icons';
 *
 * <CircleAvatar
 *   icon={Upload}
 *   size="sm"
 * />
 * ```
 */
export const CircleAvatar = forwardRef<ViewType, CircleAvatarProps>(
  (
    {
      source,
      name,
      icon: IconComponent,
      size = "md",
      backgroundColor,
      foregroundColor,
      allowSpecialChars = false,
      keepCase = false,
      initialsLength = 2,
      accessibilityLabel,
      ...props
    },
    ref,
  ) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const { theme } = useUnistyles();

    styles.useVariants({
      size,
    });

    const handleImageError = (): void => {
      setImageError(true);
      setImageLoading(false);
    };

    const handleImageLoadStart = (): void => {
      setImageLoading(true);
      setImageError(false);
    };

    const handleImageLoad = (_event: ImageLoadEventData): void => {
      setImageLoading(false);
      setImageError(false);
    };

    const hasValidImage = source && !imageError;
    const hasName = name && name.trim().length > 0;
    const hasIcon = IconComponent !== undefined;

    // Generate initials
    const initials = useMemo(() => {
      if (!hasName) {
        return "";
      }
      return generateInitials(
        name,
        allowSpecialChars,
        keepCase,
        initialsLength,
      );
    }, [name, allowSpecialChars, keepCase, initialsLength, hasName]);

    // Calculate background color
    const effectiveBackgroundColor = useMemo(() => {
      if (backgroundColor) {
        return backgroundColor;
      }
      if (hasName) {
        return getColorFromName(name);
      }
      // Default gray color when no name is provided
      return "#9E9E9E";
    }, [backgroundColor, hasName, name]);

    // Calculate foreground color
    const effectiveForegroundColor = useMemo(() => {
      if (foregroundColor) {
        return foregroundColor;
      }
      return getForegroundColor(effectiveBackgroundColor);
    }, [foregroundColor, effectiveBackgroundColor]);

    const getIconSize = (): number => {
      const sizeMap = {
        sm: theme.sizes.icon.sm,
        md: theme.sizes.icon.md,
        lg: theme.sizes.icon.lg,
      };

      return sizeMap[size];
    };

    const iconSize = getIconSize();

    const getInitialsFontSize = (): number => {
      const sizeMap = {
        sm: 12,
        md: 16,
        lg: 20,
      };

      return sizeMap[size];
    };

    const initialsFontSize = getInitialsFontSize();

    const getAccessibilityLabel = (): string => {
      if (accessibilityLabel) {
        return accessibilityLabel;
      }
      if (hasName) {
        return name;
      }
      return "Avatar";
    };

    const renderIcon = (): React.JSX.Element => {
      if (!IconComponent) {
        throw new Error("IconComponent is required when rendering icon");
      }

      return (
        <View
          style={[styles.iconContainer, { height: iconSize, width: iconSize }]}
        >
          <IconComponent
            color={effectiveForegroundColor}
            height={iconSize}
            width={iconSize}
          />
        </View>
      );
    };

    const renderInitials = (): React.JSX.Element => {
      return (
        <Text
          style={[
            styles.initials,
            { fontSize: initialsFontSize, color: effectiveForegroundColor },
          ]}
        >
          {initials}
        </Text>
      );
    };

    const renderFallbackContent = (): React.JSX.Element | null => {
      if (initials) {
        return renderInitials();
      }
      if (hasIcon) {
        return renderIcon();
      }
      return null;
    };

    const renderContent = (): React.JSX.Element => {
      const fallbackStyle = [
        styles.fallback,
        { backgroundColor: effectiveBackgroundColor },
      ];

      // If we have a valid source and no errors
      if (hasValidImage) {
        return (
          <>
            <Image
              source={source}
              style={styles.image}
              contentFit="cover"
              transition={200}
              onLoadStart={handleImageLoadStart}
              onLoad={handleImageLoad}
              onError={handleImageError}
              placeholder={{ blurhash: "L5H2EC=PM+yV0g-mq.wG9c010J}I" }}
              cachePolicy="memory-disk"
              priority="high"
            />
            {imageLoading && (
              <View
                style={[
                  styles.fallback,
                  {
                    backgroundColor: effectiveBackgroundColor,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                ]}
              >
                <Spinner color={effectiveForegroundColor} size="md" />
              </View>
            )}
          </>
        );
      }

      // Show fallback content (error or no source)
      if (hasName || hasIcon) {
        return <View style={fallbackStyle}>{renderFallbackContent()}</View>;
      }

      return <View style={fallbackStyle} />;
    };

    return (
      <View
        accessibilityLabel={getAccessibilityLabel()}
        accessibilityRole="image"
        ref={ref}
        style={styles.container}
        {...props}
      >
        {renderContent()}
      </View>
    );
  },
);

CircleAvatar.displayName = "CircleAvatar";