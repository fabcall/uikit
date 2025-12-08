import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

export type ToastVariant = "success" | "error" | "warning" | "info" | "none";
export type ToastDuration = "short" | "long" | "infinite";

export interface ToastOptions {
  title: string;
  message?: string;
  variant?: ToastVariant;
  duration?: ToastDuration;
  /**
   * Custom icon component to override variant default
   */
  icon?: ComponentType<SvgProps>;
  dismissible?: boolean;
  onTap?: () => void;
  onDismiss?: () => void;
}

export interface ToastData extends Required<Omit<ToastOptions, "icon">> {
  id: string;
  icon?: ComponentType<SvgProps>;
  createdAt: number;
  isExiting?: boolean;
}

export interface ToastItemProps {
  toast: ToastData;
  stackIndex: number;
  isTopmost: boolean;
  onDismiss: () => void;
  onPauseTimer: (id: string) => void;
  onResumeTimer: (id: string) => void;
}
