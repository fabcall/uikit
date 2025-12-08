import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing[4],
  },
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    width: "100%",
    maxWidth: 400,
    ...theme.shadows.lg,
  },
  title: {
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[6],
    paddingBottom: theme.spacing[2],
  },
  titleText: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
  },
  description: {
    paddingHorizontal: theme.spacing[6],
    paddingBottom: theme.spacing[4],
  },
  descriptionText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  content: {
    paddingHorizontal: theme.spacing[6],
    paddingBottom: theme.spacing[4],
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing[6],
    paddingBottom: theme.spacing[6],
    gap: theme.spacing[3],

    variants: {
      align: {
        start: {
          justifyContent: "flex-start",
        },
        center: {
          justifyContent: "center",
        },
        end: {
          justifyContent: "flex-end",
        },
        "space-between": {
          justifyContent: "space-between",
        },
      },
    },
  },
}));
