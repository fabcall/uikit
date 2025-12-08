import { StyleSheet } from "react-native-unistyles";

export const ICON_SIZE = 24;

export const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderWidth: 1,

    variants: {
      variant: {
        error: {
          backgroundColor: `${theme.colors.error}0D`, // 5% opacity
          borderColor: `${theme.colors.error}33`, // 20% opacity
        },
        success: {
          backgroundColor: `${theme.colors.success}0D`, // 5% opacity
          borderColor: `${theme.colors.success}33`, // 20% opacity
        },
        warning: {
          backgroundColor: `${theme.colors.warning}0D`, // 5% opacity
          borderColor: `${theme.colors.warning}33`, // 20% opacity
        },
        info: {
          backgroundColor: `${theme.colors.info}0D`, // 5% opacity
          borderColor: `${theme.colors.info}33`, // 20% opacity
        },
      },
    },
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing[3],
  },
  iconContainer: {
    paddingVertical: 2, // Fine-tune alignment with text
  },
  title: {
    ...theme.typography.body,
    fontFamily: theme.typography.families.bold,
    color: theme.colors.textPrimary,
  },
  messageBelow: {
    marginTop: theme.spacing[1],
    marginLeft: ICON_SIZE + theme.spacing[3],
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  actionContainer: {
    marginLeft: "auto",
  },
}));
