import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.md,
    gap: theme.spacing[2],

    variants: {
      size: {
        sm: {
          height: theme.sizes.buttonHeight.sm,
          paddingHorizontal: theme.spacing[3],
        },
        md: {
          height: theme.sizes.buttonHeight.md,
          paddingHorizontal: theme.spacing[4],
        },
        lg: {
          height: theme.sizes.buttonHeight.lg,
          paddingHorizontal: theme.spacing[6],
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
  label: {
    ...theme.typography.button,
    textAlign: "center",

    variants: {
      variant: {
        solid: {},
        outline: {},
        ghost: {},
      },
      color: {
        primary: {},
        secondary: {},
      },
      size: {
        sm: { fontSize: 14 },
        md: { fontSize: 16 },
        lg: { fontSize: 18 },
      },
      disabled: {
        true: { color: theme.colors.textDisabled },
      },
    },

    compoundVariants: [
      {
        variant: "solid",
        color: "primary",
        styles: { color: theme.colors.onPrimary },
      },
      {
        variant: "solid",
        color: "secondary",
        styles: { color: theme.colors.onSecondary },
      },
      {
        variant: "outline",
        color: "primary",
        styles: { color: theme.colors.primary },
      },
      {
        variant: "outline",
        color: "secondary",
        styles: { color: theme.colors.secondary },
      },
      {
        variant: "ghost",
        color: "primary",
        styles: { color: theme.colors.primary },
      },
      {
        variant: "ghost",
        color: "secondary",
        styles: { color: theme.colors.secondary },
      },
    ],
  },
}));
