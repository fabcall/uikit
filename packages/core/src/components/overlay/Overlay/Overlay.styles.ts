import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
  baseOverlay: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 6,
    overflow: "hidden",
  },
  offstage: {
    position: "absolute",
    top: -9999,
    left: -9999,
    opacity: 0,
  },
});
