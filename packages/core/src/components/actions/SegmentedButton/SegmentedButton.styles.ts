import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.radii.md,
    overflow: "hidden",
    height: theme.sizes.buttonHeight.md,

    variants: {
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 0, // BORDA INTERNA RETA
  },
  segment: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing[4],
    zIndex: 1,
  },
  label: {
    ...theme.typography.button,
    fontSize: 16,
    textAlign: "center",
  },
  labelSelected: {
    color: theme.colors.onPrimary,
  },
  labelUnselected: {
    color: theme.colors.primary,
  },
}));
