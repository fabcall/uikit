import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],

    variants: {
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {},
      },
    },
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.border,

    variants: {
      selected: {
        true: {
          borderColor: theme.colors.primary,
        },
        false: {
          borderColor: theme.colors.border,
        },
      },
      disabled: {
        true: {
          borderColor: theme.colors.border,
        },
        false: {},
      },
    },
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,

    variants: {
      selected: {
        true: {},
        false: {
          display: "none",
        },
      },
      disabled: {
        true: {
          backgroundColor: theme.colors.border,
        },
        false: {},
      },
    },
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    flex: 1,

    variants: {
      disabled: {
        true: {
          color: theme.colors.textDisabled,
        },
        false: {},
      },
    },
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],
  },
}));
