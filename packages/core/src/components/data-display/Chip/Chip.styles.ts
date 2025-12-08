import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: theme.radii.xl,
    gap: theme.spacing[1],

    variants: {
      size: {
        sm: {
          height: 28,
          paddingHorizontal: theme.spacing[2],
        },
        md: {
          height: 32,
          paddingHorizontal: theme.spacing[3],
        },
      },
      variant: {
        solid: {},
        outline: {
          backgroundColor: "transparent",
          borderWidth: 1,
        },
      },
      color: {
        primary: {},
        secondary: {},
        success: {},
        error: {},
        warning: {},
        info: {},
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
      selected: {
        true: {},
      },
    },

    compoundVariants: [
      // Solid variants (default)
      {
        variant: "solid",
        color: "primary",
        styles: { backgroundColor: theme.colors.primaryContainer },
      },
      {
        variant: "solid",
        color: "secondary",
        styles: { backgroundColor: theme.colors.secondaryContainer },
      },
      {
        variant: "solid",
        color: "success",
        styles: { backgroundColor: theme.colors.successContainer },
      },
      {
        variant: "solid",
        color: "error",
        styles: { backgroundColor: theme.colors.errorContainer },
      },
      {
        variant: "solid",
        color: "warning",
        styles: { backgroundColor: theme.colors.warningContainer },
      },
      {
        variant: "solid",
        color: "info",
        styles: { backgroundColor: theme.colors.infoContainer },
      },
      // Outline variants
      {
        variant: "outline",
        color: "primary",
        styles: { borderColor: theme.colors.primary },
      },
      {
        variant: "outline",
        color: "secondary",
        styles: { borderColor: theme.colors.secondary },
      },
      {
        variant: "outline",
        color: "success",
        styles: { borderColor: theme.colors.success },
      },
      {
        variant: "outline",
        color: "error",
        styles: { borderColor: theme.colors.error },
      },
      {
        variant: "outline",
        color: "warning",
        styles: { borderColor: theme.colors.warning },
      },
      {
        variant: "outline",
        color: "info",
        styles: { borderColor: theme.colors.info },
      },
      // Selected solid variants
      {
        variant: "solid",
        color: "primary",
        selected: true,
        styles: { backgroundColor: theme.colors.primary },
      },
      {
        variant: "solid",
        color: "secondary",
        selected: true,
        styles: { backgroundColor: theme.colors.secondary },
      },
      {
        variant: "solid",
        color: "success",
        selected: true,
        styles: { backgroundColor: theme.colors.success },
      },
      {
        variant: "solid",
        color: "error",
        selected: true,
        styles: { backgroundColor: theme.colors.error },
      },
      {
        variant: "solid",
        color: "warning",
        selected: true,
        styles: { backgroundColor: theme.colors.warning },
      },
      {
        variant: "solid",
        color: "info",
        selected: true,
        styles: { backgroundColor: theme.colors.info },
      },
    ],
  },

  label: {
    ...theme.typography.label,

    variants: {
      size: {
        sm: { fontSize: 12 },
        md: { fontSize: 14 },
      },
      variant: {
        solid: {},
        outline: {},
      },
      color: {
        primary: {},
        secondary: {},
        success: {},
        error: {},
        warning: {},
        info: {},
      },
      selected: {
        true: {},
      },
      disabled: {
        true: { color: theme.colors.textDisabled },
      },
    },

    compoundVariants: [
      // Solid label colors (default)
      {
        variant: "solid",
        color: "primary",
        styles: { color: theme.colors.onPrimaryContainer },
      },
      {
        variant: "solid",
        color: "secondary",
        styles: { color: theme.colors.onSecondaryContainer },
      },
      {
        variant: "solid",
        color: "success",
        styles: { color: theme.colors.onSuccessContainer },
      },
      {
        variant: "solid",
        color: "error",
        styles: { color: theme.colors.onErrorContainer },
      },
      {
        variant: "solid",
        color: "warning",
        styles: { color: theme.colors.onWarningContainer },
      },
      {
        variant: "solid",
        color: "info",
        styles: { color: theme.colors.onInfoContainer },
      },
      // Outline label colors
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
        variant: "outline",
        color: "success",
        styles: { color: theme.colors.success },
      },
      {
        variant: "outline",
        color: "error",
        styles: { color: theme.colors.error },
      },
      {
        variant: "outline",
        color: "warning",
        styles: { color: theme.colors.warning },
      },
      {
        variant: "outline",
        color: "info",
        styles: { color: theme.colors.info },
      },
      // Selected solid label colors (override)
      {
        variant: "solid",
        color: "primary",
        selected: true,
        styles: { color: theme.colors.onPrimary },
      },
      {
        variant: "solid",
        color: "secondary",
        selected: true,
        styles: { color: theme.colors.onSecondary },
      },
      {
        variant: "solid",
        color: "success",
        selected: true,
        styles: { color: theme.colors.onSuccess },
      },
      {
        variant: "solid",
        color: "error",
        selected: true,
        styles: { color: theme.colors.onError },
      },
      {
        variant: "solid",
        color: "warning",
        selected: true,
        styles: { color: theme.colors.onWarning },
      },
      {
        variant: "solid",
        color: "info",
        selected: true,
        styles: { color: theme.colors.onInfo },
      },
    ],
  },

  dismissButton: {
    marginLeft: theme.spacing[1],
    padding: 2,
    borderRadius: theme.radii.xl,
  },
}));
