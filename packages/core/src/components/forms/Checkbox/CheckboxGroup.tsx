import * as React from "react";
import { View } from "react-native";

import { usePackageTranslation } from "../../../i18n/usePackageTranslation";
import { Checkbox as CheckboxComponent } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox.props";
import type { CheckboxGroupProps } from "./CheckboxGroup.props";

export function CheckboxGroup<T = string | number>(
  props: CheckboxGroupProps<T>,
): React.JSX.Element {
  const { t } = usePackageTranslation();
  const {
    children,
    value,
    onChange,
    disabled,
    showSelectAll = false,
    selectAllLabel,
    direction = "vertical",
    style,
    ...viewProps
  } = props;
  const childrenArray = React.Children.toArray(children);

  const defaultSelectAllLabel = selectAllLabel ?? t("common.selectAll");
  const gap = direction === "horizontal" ? 16 : 4;

  // Extract all values from children
  const getAllValues = (): T[] => {
    const values: T[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const checkboxProps = child.props as CheckboxProps<T>;
        if (checkboxProps.value !== undefined) {
          values.push(checkboxProps.value);
        }
      }
    });
    return values;
  };

  const allValues = getAllValues();
  const allSelected =
    allValues.length > 0 && allValues.every((v) => value.includes(v));

  const handleChange = (itemValue: T): void => {
    const newValue = value.includes(itemValue)
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue];
    onChange(newValue);
  };

  const handleSelectAll = (): void => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(allValues);
    }
  };

  return (
    <View {...viewProps} style={[{ gap }, style]}>
      {showSelectAll ? (
        <CheckboxComponent
          checked={allSelected}
          disabled={disabled}
          label={defaultSelectAllLabel}
          onChange={handleSelectAll}
          value=""
        />
      ) : null}

      <View
        style={{
          flexDirection: direction === "horizontal" ? "row" : "column",
          flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
          gap,
        }}
      >
        {childrenArray.map((child) => {
          if (React.isValidElement(child)) {
            const isCheckbox =
              child.type === CheckboxComponent ||
              (typeof child.type === "object" &&
                "displayName" in child.type &&
                (child.type as { displayName?: string }).displayName ===
                  "Checkbox");

            if (isCheckbox) {
              const checkboxProps = child.props as CheckboxProps<T>;
              const checkboxValue = checkboxProps.value;
              const isChecked = value.includes(checkboxValue);

              return React.cloneElement(
                child as React.ReactElement<CheckboxProps<T>>,
                {
                  key: String(checkboxValue),
                  value: checkboxValue,
                  label: checkboxProps.label,
                  checked: isChecked,
                  disabled: disabled || checkboxProps.disabled,
                  onChange: () => {
                    handleChange(checkboxValue);
                  },
                } as Partial<CheckboxProps<T>>,
              );
            }
          }
          return child;
        })}
      </View>
    </View>
  );
}
