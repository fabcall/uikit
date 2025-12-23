import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndices.toast,
    pointerEvents: "box-none",
  },
  toastWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  toast: {
    borderRadius: theme.radii.xl,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "85%",
    ...theme.shadows.lg,
    variants: {
      variant: {
        success: {
          backgroundColor: theme.colors.surface,
        },
        error: {
          backgroundColor: theme.colors.surface,
        },
        warning: {
          backgroundColor: theme.colors.surface,
        },
        info: {
          backgroundColor: theme.colors.surface,
        },
        none: {
          backgroundColor: theme.colors.surface,
        },
      },
    },
  },
  iconContainer: {
    marginRight: theme.spacing[2],
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.bodySmall,
    fontFamily: theme.typography.families.semiBold,
    variants: {
      variant: {
        success: { color: theme.colors.textPrimary },
        error: { color: theme.colors.textPrimary },
        warning: { color: theme.colors.textPrimary },
        info: { color: theme.colors.textPrimary },
        none: { color: theme.colors.textPrimary },
      },
    },
  },
  titleWithMessage: {
    marginBottom: 2,
  },
  message: {
    ...theme.typography.caption,
    variants: {
      variant: {
        success: { color: theme.colors.textPrimary },
        error: { color: theme.colors.textPrimary },
        warning: { color: theme.colors.textPrimary },
        info: { color: theme.colors.textPrimary },
        none: { color: theme.colors.textPrimary },
      },
    },
  },
}));
