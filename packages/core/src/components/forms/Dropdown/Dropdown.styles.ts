import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#dc3545",
    marginTop: 4,
  },
  // Trigger
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    minHeight: 44,
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerError: {
    borderColor: "#dc3545",
  },
  triggerFocused: {
    borderColor: "#3b82f6",
  },
  triggerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    paddingVertical: 8,
  },
  triggerText: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  triggerTextPlaceholder: {
    color: "#9ca3af",
  },
  triggerTextDisabled: {
    color: "#9ca3af",
  },
  triggerIcon: {
    marginLeft: 8,
  },
  // Selected badges (multi-select)
  selectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  selectedBadgeText: {
    fontSize: 12,
    color: "#1e40af",
  },
  selectedCountBadge: {
    backgroundColor: "#3b82f6",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  selectedCountText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  // Dropdown content
  dropdownContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  // Search
  searchContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f9fafb",
  },
  scrollContainer: {
    flex: 1,
  },
  // Select All item
  selectAllItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  // Items
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  itemSelected: {
    backgroundColor: "#dbeafe",
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemPressed: {
    backgroundColor: "#f3f4f6",
  },
  itemIcon: {
    marginRight: 8,
  },
  itemLabel: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  itemLabelSelected: {
    color: "#1e40af",
    fontWeight: "600",
  },
  itemLabelDisabled: {
    color: "#9ca3af",
  },
  checkIcon: {
    marginLeft: "auto",
  },
  // Checkbox (multi-select)
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    borderColor: "#3b82f6",
    backgroundColor: "#3b82f6",
  },
  checkboxUnchecked: {
    borderColor: "#e5e7eb",
    backgroundColor: "transparent",
  },
  // Empty state
  emptyContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
  },
  // Actions footer (multi-select)
  actionsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "600",
  },
  selectedCount: {
    fontSize: 12,
    color: "#6b7280",
  },
});
