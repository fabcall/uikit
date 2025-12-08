import React, { forwardRef } from "react";
import {
  Modal,
  Pressable,
  Text as RNText,
  View,
  type View as ViewType,
} from "react-native";

import type {
  DialogActionsProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogProps,
  DialogTitleProps,
} from "./Dialog.props";
import { styles } from "./Dialog.styles";

/**
 * Dialog Root Component
 *
 * A modal dialog component that displays content in an overlay.
 * Uses the compound component pattern for flexible composition.
 *
 * @example
 * ```tsx
 * <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
 *   <Dialog.Title>Confirm Action</Dialog.Title>
 *   <Dialog.Description>
 *     Are you sure you want to proceed?
 *   </Dialog.Description>
 *   <Dialog.Actions>
 *     <Button title="Cancel" variant="ghost" onPress={() => setIsOpen(false)} />
 *     <Button title="Confirm" onPress={handleConfirm} />
 *   </Dialog.Actions>
 * </Dialog>
 * ```
 */
const DialogRoot = forwardRef<ViewType, DialogProps>(
  (
    {
      open,
      onClose,
      dismissible = true,
      children,
      animationType = "fade",
      transparent = true,
      ...props
    },
    ref,
  ) => {
    const handleBackdropPress = (): void => {
      if (dismissible && onClose) {
        onClose();
      }
    };

    return (
      <Modal
        animationType={animationType}
        onRequestClose={onClose}
        transparent={transparent}
        visible={open}
        {...props}
      >
        <Pressable onPress={handleBackdropPress} style={styles.backdrop}>
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
            }}
            ref={ref}
            style={styles.container}
          >
            {children}
          </Pressable>
        </Pressable>
      </Modal>
    );
  },
);

DialogRoot.displayName = "Dialog";

/**
 * Dialog Title Component
 *
 * Displays the dialog title with appropriate styling.
 */
const DialogTitle = forwardRef<ViewType, DialogTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <View ref={ref} style={styles.title} {...props}>
        {typeof children === "string" ? (
          <RNText style={styles.titleText}>{children}</RNText>
        ) : (
          children
        )}
      </View>
    );
  },
);

DialogTitle.displayName = "Dialog.Title";

/**
 * Dialog Description Component
 *
 * Displays descriptive text below the title.
 */
const DialogDescription = forwardRef<ViewType, DialogDescriptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <View ref={ref} style={styles.description} {...props}>
        {typeof children === "string" ? (
          <RNText style={styles.descriptionText}>{children}</RNText>
        ) : (
          children
        )}
      </View>
    );
  },
);

DialogDescription.displayName = "Dialog.Description";

/**
 * Dialog Content Component
 *
 * Container for custom dialog content.
 */
const DialogContent = forwardRef<ViewType, DialogContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <View ref={ref} style={styles.content} {...props}>
        {children}
      </View>
    );
  },
);

DialogContent.displayName = "Dialog.Content";

/**
 * Dialog Actions Component
 *
 * Container for dialog action buttons.
 */
const DialogActions = forwardRef<ViewType, DialogActionsProps>(
  ({ children, align = "end", ...props }, ref) => {
    styles.useVariants({
      align,
    });

    return (
      <View ref={ref} style={styles.actions} {...props}>
        {children}
      </View>
    );
  },
);

DialogActions.displayName = "Dialog.Actions";

export const Dialog = Object.assign(DialogRoot, {
  Title: DialogTitle,
  Description: DialogDescription,
  Content: DialogContent,
  Actions: DialogActions,
});
