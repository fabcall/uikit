import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing[1],
  },
  label: {
    ...theme.typography.body,
  },
  required: {
    color: theme.colors.error,
  },
}));
