import type { ViewProps } from "react-native";

export interface CardProps extends Omit<ViewProps, "style"> {
  variant?: "elevated" | "outlined";
}

export type CardHeaderProps = Omit<ViewProps, "style">;

export type CardContentProps = Omit<ViewProps, "style">;

export type CardFooterProps = Omit<ViewProps, "style">;
