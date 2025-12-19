import { ContextMenu as ContextMenuComponent } from "./ContextMenu";
import type {
  ContextMenuItemProps,
  ContextMenuProps,
  ContextMenuSeparatorProps,
} from "./ContextMenu.props";
import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenuScrollable } from "./ContextMenuScrollable";
import { ContextMenuSeparator } from "./ContextMenuSeparator";

export const ContextMenu = Object.assign(ContextMenuComponent, {
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
  Scrollable: ContextMenuScrollable,
});

export type {
  ContextMenuItemProps,
  ContextMenuProps,
  ContextMenuSeparatorProps,
};

export { useContextMenu } from "./ContextMenu";
export type { UseContextMenuPositionConfig, UseContextMenuPositionReturn } from "./useContextMenuPosition";