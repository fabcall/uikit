import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing[4],

    variants: {
      size: {
        sm: {
          minHeight: 48,
          paddingVertical: theme.spacing[2],
        },
        md: {
          minHeight: 56,
          paddingVertical: theme.spacing[3],
        },
        lg: {
          minHeight: 72,
          paddingVertical: theme.spacing[4],
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
      selected: {
        true: {
          backgroundColor: theme.colors.primaryContainer,
        },
      },
    },
  },
  pressed: {
    backgroundColor: theme.colors.surfaceHighlight,
  },
  selectedPressed: {
    backgroundColor: theme.colors.primaryContainer,
    opacity: 0.8,
  },
  leading: {
    marginRight: theme.spacing[4],
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,

    variants: {
      size: {
        sm: {
          fontSize: 14,
          lineHeight: 20,
        },
        md: {
          fontSize: 16,
          lineHeight: 24,
        },
        lg: {
          fontSize: 16,
          lineHeight: 24,
        },
      },
      disabled: {
        true: {
          color: theme.colors.textDisabled,
        },
      },
      selected: {
        true: {
          color: theme.colors.onPrimaryContainer,
        },
      },
    },
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: 2,

    variants: {
      size: {
        sm: {
          fontSize: 12,
          lineHeight: 16,
        },
        md: {
          fontSize: 14,
          lineHeight: 20,
        },
        lg: {
          fontSize: 14,
          lineHeight: 20,
        },
      },
      disabled: {
        true: {
          color: theme.colors.textDisabled,
        },
      },
      selected: {
        true: {
          color: theme.colors.onPrimaryContainer,
          opacity: 0.8,
        },
      },
    },
  },
  trailing: {
    marginLeft: theme.spacing[3],
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: theme.spacing[4],
    right: theme.spacing[4],
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  dividerWithLeading: {
    left: 72, // Aligns with content when leading is present
  },
}));
