import * as React from "react";
import { View } from "react-native";

import { Radio as RadioComponent } from "./Radio";
import type { RadioProps } from "./Radio.props";
import type { RadioGroupProps } from "./RadioGroup.props";

export function RadioGroup<T = string>(
  props: RadioGroupProps<T>
): React.JSX.Element {
  const { children, selectedValue, onChange, disabled, ...viewProps } = props;
  const childrenArray = React.Children.toArray(children);
  
  return (
    <View {...viewProps}>
      {childrenArray.map((child) => {
        if (React.isValidElement(child)) {
          const isRadio = 
            child.type === RadioComponent || 
            (typeof child.type === 'object' && 
             'displayName' in child.type && 
             (child.type as { displayName?: string }).displayName === 'Radio');
          
          if (isRadio) {
            const radioProps = child.props as RadioProps<T>;
            const radioValue = radioProps.value;
            const isSelected = radioValue === selectedValue;
            
            return React.cloneElement(child as React.ReactElement<RadioProps<T>>, {
              key: radioValue,
              value: radioValue,
              label: radioProps.label,
              selected: isSelected,
              disabled: disabled || radioProps.disabled,
              onChange,
            } as Partial<RadioProps<T>>);
          }
        }
        return child;
      })}
    </View>
  );
}
