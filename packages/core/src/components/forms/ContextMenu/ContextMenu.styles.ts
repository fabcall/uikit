import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  contentContainer: {
    position: "absolute",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 150,
    maxWidth: 300,
    paddingVertical: theme.spacing[1],
  },
  arrow: {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
    
    variants: {
      placement: {
        top: {
          bottom: -8,
          borderLeftWidth: 8,
          borderRightWidth: 8,
          borderTopWidth: 8,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: theme.colors.surface,
        },
        bottom: {
          top: -8,
          borderLeftWidth: 8,
          borderRightWidth: 8,
          borderBottomWidth: 8,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: theme.colors.surface,
        },
        left: {
          right: -8,
          borderTopWidth: 8,
          borderBottomWidth: 8,
          borderLeftWidth: 8,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: theme.colors.surface,
        },
        right: {
          left: -8,
          borderTopWidth: 8,
          borderBottomWidth: 8,
          borderRightWidth: 8,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderRightColor: theme.colors.surface,
        },
      },
    },
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    gap: theme.spacing[2],
    minHeight: 40,
    
    variants: {
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {},
      },
      destructive: {
        true: {},
        false: {},
      },
    },
  },
  menuItemPressed: {
    backgroundColor: theme.colors.primary + "10",
  },
  menuItemIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemLabel: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    
    variants: {
      disabled: {
        true: {
          color: theme.colors.textDisabled,
        },
        false: {},
      },
      destructive: {
        true: {
          color: theme.colors.error,
        },
        false: {},
      },
    },
  },
  menuItemRight: {
    marginLeft: "auto",
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing[1],
  },
}));