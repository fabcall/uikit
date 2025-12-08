import { Radio as RadioComponent } from "./Radio";
import type { RadioProps } from "./Radio.props";
import { RadioGroup } from "./RadioGroup";
import type { RadioGroupProps } from "./RadioGroup.props";

export const Radio = Object.assign(RadioComponent, {
  Group: RadioGroup,
});

export type { RadioGroupProps, RadioProps };
