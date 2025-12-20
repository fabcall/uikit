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
  triggerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing[1],
    paddingVertical: theme.spacing[2],
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
  // Multi-select chips/badges
  selectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: theme.radii.sm,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    gap: theme.spacing[1],
  },
  selectedBadgeText: {
    ...theme.typography.caption,
    color: theme.colors.onPrimaryContainer,
  },
  selectedBadgeRemove: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.onPrimaryContainer,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6,
  },
  selectedCountBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.sm,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
  },
  selectedCountText: {
    ...theme.typography.caption,
    color: theme.colors.onPrimary,
    fontFamily: theme.typography.families.semiBold,
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
    flex: 1,
  },
  // Select All item
  selectAllItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    gap: theme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceHighlight,
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
  // Checkbox styles for multi-select
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
  // Multi-select actions footer
  actionsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceHighlight,
  },
  actionButton: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  actionButtonText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontFamily: theme.typography.families.semiBold,
  },
  selectedCount: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
}));