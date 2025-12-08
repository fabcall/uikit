import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing[1],
  },
}));
