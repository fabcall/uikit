import { CheckCircle, ExclamationTriangle } from "@readykit/icons";
import type { ComponentType } from "react";
import React from "react";
import type { SvgProps } from "react-native-svg";

import { Icon, type ThemeColor } from "../../data-display/Icon";
import type { ToastVariant } from "./Toast.props";

interface ToastIconProps {
  variant: ToastVariant;
}

interface IconConfig {
  icon: ComponentType<SvgProps>;
  color: ThemeColor;
}

const ICON_CONFIG: Record<Exclude<ToastVariant, "none">, IconConfig> = {
  success: { icon: CheckCircle, color: "success" },
  error: { icon: ExclamationTriangle, color: "error" },
  warning: { icon: ExclamationTriangle, color: "warning" },
  info: { icon: CheckCircle, color: "info" },
};

export function ToastIcon({
  variant,
}: ToastIconProps): React.JSX.Element | null {
  if (variant === "none") {
    return null;
  }

  const config = ICON_CONFIG[variant];

  return <Icon color={config.color} icon={config.icon} size="md" />;
}

ToastIcon.displayName = "ToastIcon";
