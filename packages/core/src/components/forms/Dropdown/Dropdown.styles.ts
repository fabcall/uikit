import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing[1],
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.error,
    marginTop: theme.spacing[1],
  },
  // Trigger (seguindo padrão do Input)
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
      open: {
        true: {
          borderColor: theme.colors.primary,
        },
        false: {},
      },
    },
    compoundVariants: [
      {
        error: true,
        open: true,
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
    color: theme.colors.textPrimary,
    variants: {
      placeholder: {
        true: {
          color: theme.colors.textSecondary,
        },
        false: {},
      },
      disabled: {
        true: {
          color: theme.colors.textDisabled,
        },
        false: {},
      },
    },
  },
  triggerIcon: {
    marginLeft: theme.spacing[2],
  },
  // Selected badges (multi-select)
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
    fontSize: 12,
    color: theme.colors.onPrimaryContainer,
  },
  selectedCountBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.sm,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
  },
  selectedCountText: {
    fontSize: 12,
    color: theme.colors.onPrimary,
    fontWeight: "600",
  },
  // Dropdown content
  dropdownContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  // Search
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
    backgroundColor: theme.colors.surfaceVariant,
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
    backgroundColor: theme.colors.surfaceVariant,
  },
  // Items
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
      pressed: {
        true: {
          backgroundColor: theme.colors.surfaceHighlight,
        },
        false: {},
      },
    },
    compoundVariants: [
      {
        selected: true,
        pressed: true,
        styles: {
          backgroundColor: theme.colors.primaryContainer,
          opacity: 0.8,
        },
      },
    ],
  },
  itemIcon: {
    marginRight: theme.spacing[2],
  },
  itemLabel: {
    ...theme.typography.body,
    flex: 1,
    color: theme.colors.textPrimary,
    variants: {
      selected: {
        true: {
          color: theme.colors.onPrimaryContainer,
          fontWeight: "600",
        },
        false: {},
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
  // Checkbox (multi-select)
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: theme.radii.sm,
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
    },
  },
  // Empty state
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
  // Actions footer (multi-select)
  actionsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceVariant,
  },
  actionButton: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  actionButtonText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  selectedCount: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
}));