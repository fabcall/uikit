import { Checkbox as CheckboxComponent } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox.props";
import { CheckboxGroup } from "./CheckboxGroup";
import type { CheckboxGroupProps } from "./CheckboxGroup.props";

export const Checkbox = Object.assign(CheckboxComponent, {
  Group: CheckboxGroup,
});

export type { CheckboxGroupProps, CheckboxProps };
