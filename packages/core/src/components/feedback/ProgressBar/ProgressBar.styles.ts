import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],
  },
  trackContainer: {
    flex: 1,
  },
  track: {
    width: "100%",
    backgroundColor: theme.colors.surfaceHighlight,
    borderRadius: theme.radii.xl,
    overflow: "hidden",

    variants: {
      size: {
        sm: { height: 4 },
        md: { height: 8 },
        lg: { height: 12 },
      },
    },
  },
  fill: {
    height: "100%",
    borderRadius: theme.radii.xl,

    variants: {
      color: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary },
        success: { backgroundColor: theme.colors.success },
        error: { backgroundColor: theme.colors.error },
        warning: { backgroundColor: theme.colors.warning },
        info: { backgroundColor: theme.colors.info },
      },
    },
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    minWidth: 36,
    textAlign: "right",
  },
}));
