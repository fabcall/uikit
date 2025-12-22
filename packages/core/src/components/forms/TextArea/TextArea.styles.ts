import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing[1],
  },
  inputContainer: {
    position: "relative",
    borderWidth: 2,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
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
    width: "100%",
    height: "100%",
    ...theme.typography.input,
    color: theme.colors.textPrimary,
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    includeFontPadding: false,
    textAlignVertical: "top",
    variants: {
      disabled: {
        true: {
          color: theme.colors.textDisabled,
        },
        false: {},
      },
    },
  },
  resizeHandle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  resizeHandleIndicator: {
    width: 20,
    height: 20,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: theme.colors.border,
    transform: [{ rotate: "45deg" }],
  },
  counterContainer: {
    alignItems: "flex-start",
    marginTop: theme.spacing[1],
  },
  counterText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
}));
