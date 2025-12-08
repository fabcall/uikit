import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing[1],
  },
  label: {
    ...theme.typography.body,
    marginBottom: theme.spacing[1],
  },
  required: {
    color: theme.colors.error,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing[3],
    minHeight: 44,
    variants: {
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {},
      },
      error: {
        true: {
          borderColor: theme.colors.error,
        },
        false: {},
      },
      focused: {
        true: {
          borderColor: theme.colors.primary,
        },
        false: {},
      },
    },
    compoundVariants: [
      {
        error: true,
        focused: true,
        styles: {
          borderColor: theme.colors.error,
        },
      },
    ],
  },
  input: {
    flex: 1,
    ...theme.typography.input,
    color: theme.colors.textPrimary,
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    paddingTop: 0,
    paddingBottom: 0,
    variants: {
      disabled: {
        true: {
          color: theme.colors.textDisabled,
        },
        false: {},
      },
    },
  },
  leftAccessory: {
    marginRight: theme.spacing[2],
    justifyContent: "center",
    alignItems: "center",
  },
  rightAccessory: {
    marginLeft: theme.spacing[2],
    justifyContent: "center",
    alignItems: "center",
  },
}));
