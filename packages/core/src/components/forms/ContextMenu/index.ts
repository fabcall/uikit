import { ContextMenu as ContextMenuComponent } from "./ContextMenu";
import type {
  ContextMenuItemProps,
  ContextMenuProps,
  ContextMenuSeparatorProps,
} from "./ContextMenu.props";
import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenuSeparator } from "./ContextMenuSeparator";

export const ContextMenu = Object.assign(ContextMenuComponent, {
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
});

export type { ContextMenuItemProps, ContextMenuProps, ContextMenuSeparatorProps };

export { useContextMenu } from "./ContextMenu";