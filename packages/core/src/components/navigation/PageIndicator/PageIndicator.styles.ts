import { StyleSheet } from "react-native-unistyles";

export const DOT_SIZE = {
  inactive: 8,
  activeWidth: 24,
} as const;

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing[2],
  },
}));
