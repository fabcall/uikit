import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    borderRadius: 9999,
    justifyContent: "center",
    overflow: "hidden",

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
    },
  },
  image: {
    height: "100%",
    width: "100%",
  },
  fallback: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  initials: {
    fontWeight: "600",
    textAlign: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
}));
