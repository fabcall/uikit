import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      variant: {
        h1: {
          ...theme.typography.h1,
        },
        h2: {
          ...theme.typography.h2,
        },
        body: {
          ...theme.typography.body,
        },
        bodySmall: {
          ...theme.typography.bodySmall,
        },
        caption: {
          ...theme.typography.caption,
        },
      },
      color: {
        primary: {
          color: theme.colors.textPrimary,
        },
        secondary: {
          color: theme.colors.textSecondary,
        },
        disabled: {
          color: theme.colors.textDisabled,
        },
        inverse: {
          color: theme.colors.textInverse,
        },
      },
    },
  },
}));
