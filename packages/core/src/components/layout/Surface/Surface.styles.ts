import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  surface: {
    borderRadius: theme.radii.md,
    overflow: "hidden",

    variants: {
      elevation: {
        0: {
          backgroundColor: theme.colors.surfaceLevel0,
          // No shadow at level 0
        },
        1: {
          backgroundColor: theme.colors.surfaceLevel1,
          ...theme.shadows.sm,
        },
        2: {
          backgroundColor: theme.colors.surfaceLevel2,
          ...theme.shadows.sm,
        },
        3: {
          backgroundColor: theme.colors.surfaceLevel3,
          ...theme.shadows.md,
        },
        4: {
          backgroundColor: theme.colors.surfaceLevel4,
          ...theme.shadows.md,
        },
        5: {
          backgroundColor: theme.colors.surfaceLevel5,
          ...theme.shadows.lg,
        },
      },
    },
  },
}));
