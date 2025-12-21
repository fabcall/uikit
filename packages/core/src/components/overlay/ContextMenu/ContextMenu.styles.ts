import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: theme.zIndices.dropdown,
  },
  overlayWithBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  contentContainer: {
    position: "absolute",
    zIndex: theme.zIndices.dropdown + 1,
  },
}));