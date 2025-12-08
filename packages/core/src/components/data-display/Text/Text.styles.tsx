import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      variant: {
        h1: {
          ...theme.typography.h1,
        },
        body: {
          ...theme.typography.body,
        },
        button: {
          ...theme.typography.button,
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
      align: {
        left: {
          textAlign: "left",
        },
        center: {
          textAlign: "center",
        },
        right: {
          textAlign: "right",
        },
      },
    },
  },
}));
