import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],

    variants: {
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",

    variants: {
      checked: {
        true: {
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.primary,
        },
        false: {
          borderColor: theme.colors.border,
          backgroundColor: "transparent",
        },
      },
      disabled: {
        true: {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.border,
        },
      },
    },
  },
}));
