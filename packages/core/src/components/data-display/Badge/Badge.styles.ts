import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: "relative",
    alignSelf: "center",
  },

  badge: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 20,
    height: 20,
    paddingHorizontal: theme.spacing[1],
    borderRadius: 10,

    variants: {
      variant: {
        solid: {},
        outline: {
          backgroundColor: "transparent",
          borderWidth: 1.5,
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
      dot: {
        true: {
          minWidth: 10,
          width: 10,
          height: 10,
          paddingHorizontal: 0,
          borderRadius: 5,
        },
      },
      positioned: {
        true: {
          position: "absolute",
          top: -6,
          right: -6,
        },
      },
    },

    compoundVariants: [
      // Solid backgrounds
      {
        variant: "solid",
        color: "primary",
        styles: { backgroundColor: theme.colors.primary },
      },
      {
        variant: "solid",
        color: "secondary",
        styles: { backgroundColor: theme.colors.secondary },
      },
      {
        variant: "solid",
        color: "success",
        styles: { backgroundColor: theme.colors.success },
      },
      {
        variant: "solid",
        color: "error",
        styles: { backgroundColor: theme.colors.error },
      },
      {
        variant: "solid",
        color: "warning",
        styles: { backgroundColor: theme.colors.warning },
      },
      {
        variant: "solid",
        color: "info",
        styles: { backgroundColor: theme.colors.info },
      },
      // Outline borders
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
      // Positioned dot adjustments
      {
        dot: true,
        positioned: true,
        styles: {
          top: -2,
          right: -2,
        },
      },
    ],
  },

  text: {
    fontSize: 11,
    fontFamily: theme.typography.families.semiBold,
    textAlign: "center",

    variants: {
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
    },

    compoundVariants: [
      // Solid text colors
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
        variant: "solid",
        color: "success",
        styles: { color: theme.colors.onSuccess },
      },
      {
        variant: "solid",
        color: "error",
        styles: { color: theme.colors.onError },
      },
      {
        variant: "solid",
        color: "warning",
        styles: { color: theme.colors.onWarning },
      },
      {
        variant: "solid",
        color: "info",
        styles: { color: theme.colors.onInfo },
      },
      // Outline text colors
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
    ],
  },
}));
