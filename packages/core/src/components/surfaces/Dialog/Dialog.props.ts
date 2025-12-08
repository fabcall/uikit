import type { ReactNode } from "react";
import type { ModalProps, ViewProps } from "react-native";

export interface DialogProps extends Omit<ModalProps, "visible"> {
  /**
   * Controls whether the dialog is visible
   */
  open: boolean;
  /**
   * Callback when the dialog should be closed
   */
  onClose?: () => void;
  /**
   * Whether clicking the backdrop closes the dialog
   * @defaultValue true
   */
  dismissible?: boolean;
  /**
   * Dialog content
   */
  children: ReactNode;
}

export interface DialogTitleProps extends ViewProps {
  /**
   * Title text content
   */
  children: ReactNode;
}

export interface DialogDescriptionProps extends ViewProps {
  /**
   * Description text content
   */
  children: ReactNode;
}

export interface DialogContentProps extends ViewProps {
  /**
   * Content elements
   */
  children: ReactNode;
}

export interface DialogActionsProps extends ViewProps {
  /**
   * Action buttons
   */
  children: ReactNode;
  /**
   * Alignment of action buttons
   * @defaultValue "end"
   */
  align?: "start" | "center" | "end" | "space-between";
}
