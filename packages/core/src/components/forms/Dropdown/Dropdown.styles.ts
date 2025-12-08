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
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  triggerText: {
    ...theme.typography.input,
    flex: 1,

    variants: {
      disabled: {
        true: {
          color: theme.colors.textDisabled,
        },
        false: {
          color: theme.colors.textPrimary,
        },
      },
      placeholder: {
        true: {
          color: theme.colors.textSecondary,
        },
        false: {},
      },
    },
  },
  triggerIcon: {
    marginLeft: theme.spacing[2],
  },
  dropdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: theme.zIndices.dropdown,
  },
  dropdownContent: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.lg,
    zIndex: theme.zIndices.dropdown + 1,
    overflow: "hidden",
  },
  searchContainer: {
    padding: theme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchInput: {
    ...theme.typography.input,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    maxHeight: 300,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    gap: theme.spacing[2],

    variants: {
      selected: {
        true: {
          backgroundColor: theme.colors.primaryContainer,
        },
        false: {},
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {},
      },
    },
  },
  itemPressed: {
    backgroundColor: theme.colors.surfaceHighlight,
  },
  itemIcon: {
    marginRight: theme.spacing[2],
  },
  itemLabel: {
    ...theme.typography.body,
    flex: 1,

    variants: {
      selected: {
        true: {
          color: theme.colors.onPrimaryContainer,
          fontFamily: theme.typography.families.semiBold,
        },
        false: {
          color: theme.colors.textPrimary,
        },
      },
      disabled: {
        true: {
          color: theme.colors.textDisabled,
        },
        false: {},
      },
    },
  },
  checkIcon: {
    marginLeft: "auto",
  },
  emptyContainer: {
    padding: theme.spacing[6],
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
}));
