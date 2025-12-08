import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    borderRadius: 9999, // Fully rounded (circular)
    flexDirection: "row",
    justifyContent: "center",
    width: "auto",

    variants: {
      size: {
        sm: {
          height: theme.sizes.buttonHeight.sm,
          width: theme.sizes.buttonHeight.sm,
        },
        md: {
          height: theme.sizes.buttonHeight.md,
          width: theme.sizes.buttonHeight.md,
        },
        lg: {
          height: theme.sizes.buttonHeight.lg,
          width: theme.sizes.buttonHeight.lg,
        },
      },
      variant: {
        solid: {},
        outline: {
          backgroundColor: "transparent",
          borderWidth: 1,
        },
        ghost: {
          backgroundColor: "transparent",
        },
      },
      color: {
        primary: {},
        secondary: {},
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },

    compoundVariants: [
      {
        variant: "solid",
        color: "primary",
        styles: {
          backgroundColor: theme.colors.primary,
        },
      },
      {
        variant: "solid",
        color: "secondary",
        styles: {
          backgroundColor: theme.colors.secondary,
        },
      },
      {
        variant: "outline",
        color: "primary",
        styles: {
          borderColor: theme.colors.primary,
        },
      },
      {
        variant: "outline",
        color: "secondary",
        styles: {
          borderColor: theme.colors.secondary,
        },
      },
    ],
  },
}));
