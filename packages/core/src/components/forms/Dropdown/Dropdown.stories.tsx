import { type Meta, type StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Forms/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },

};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const options = Array.from({ length: 20 }).map((_, i) => ({
  label: `Item ${i + 1}`,
  value: `item-${i + 1}`,
}));

const SingleDropdownWrapper = (
  args: React.ComponentProps<typeof Dropdown<string>> & { multiple?: false }
) => {
  const [val, setVal] = useState<string | undefined>(undefined);
  return <Dropdown<string> {...args} value={val} onChange={setVal} />;
};

const MultiDropdownWrapper = (
  args: Omit<React.ComponentProps<typeof Dropdown<string>>, "multiple"> & {
    multiple: true;
  }
) => {
  const [val, setVal] = useState<string[]>([]);
  return <Dropdown<string> {...args} multiple value={val} onChange={setVal} />;
};

// 1. Basic
export const Standard: Story = {
  // @ts-expect-error - No type error
  render: (args) => <SingleDropdownWrapper {...args} />,
  args: {
    options: options.slice(0, 5),
    placeholder: "Select an item",
    placement: "bottom",
  },
};

// 2. With Label
export const WithLabel: Story = {
  // @ts-expect-error - No type error
  render: (args) => <SingleDropdownWrapper {...args} />,
  args: {
    options: options.slice(0, 5),
    placeholder: "Select...",
    label: "Choose an option",
    placement: "bottom",
  },
};

// 3. With Error
export const WithError: Story = {
  // @ts-expect-error - No type error
  render: (args) => <SingleDropdownWrapper {...args} />,
  args: {
    options: options.slice(0, 5),
    placeholder: "Select...",
    label: "Required field",
    error: "This field is required",
    required: true,
    placement: "bottom",
  },
};

// 4. Disabled
export const Disabled: Story = {
  // @ts-expect-error - No type error
  render: (args) => <SingleDropdownWrapper {...args} />,
  args: {
    options: options.slice(0, 5),
    placeholder: "Unavailable",
    disabled: true,
    placement: "bottom",
  },
};

// 5. Searchable
export const Searchable: Story = {
  // @ts-expect-error - No type error
  render: (args) => <SingleDropdownWrapper {...args} />,
  args: {
    options: options,
    placeholder: "Search and select...",
    label: "Searchable Dropdown",
    searchable: true,
    searchPlaceholder: "Type to search...",
    placement: "bottom",
  },
};

// 6. Flip Behavior (menu opens upward when no space below)
export const FlipBehavior: Story = {
  render: (args) => (
    <View style={{ marginTop: "auto" }}>
      <Text
        style={{
          marginBottom: 10,
          color: "#666",
          textAlign: "center",
        }}
      >
        {`The dropdown is at the bottom. The 'flip' middleware should open the
        menu UPWARD.`}
      </Text>
      {/* @ts-expect-error - No type error */}
      <SingleDropdownWrapper {...args} />
    </View>
  ),
  args: {
    options: options.slice(0, 5),
    placeholder: "Select...",
    placement: "bottom",
  },
};

// 7. Large List (tests automatic scroll)
export const LargeList: Story = {
  render: (args) => (
    <View style={{ justifyContent: "center", alignItems: "stretch" }}>
      <Text
        style={{
          marginBottom: 10,
          color: "#666",
          textAlign: "center",
        }}
      >
        {`Menu with 20 items. The 'size' middleware applies maxHeight automatically.`}
      </Text>
      {/* @ts-expect-error - No type error */}
      <SingleDropdownWrapper {...args} />
    </View>
  ),
  args: {
    options: options,
    placeholder: "Select an item",
    placement: "bottom",
  },
};

// 8. Options with disabled items
export const WithDisabledOptions: Story = {
  // @ts-expect-error - No type error
  render: (args) => <SingleDropdownWrapper {...args} />,
  args: {
    options: [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2 (disabled)", value: "opt2", disabled: true },
      { label: "Option 3", value: "opt3" },
      { label: "Option 4 (disabled)", value: "opt4", disabled: true },
      { label: "Option 5", value: "opt5" },
    ],
    placeholder: "Select...",
    placement: "bottom",
  },
};

// 9. Multi-select
export const MultiSelect: Story = {
  // @ts-expect-error - No type error
  render: (args) => <MultiDropdownWrapper {...args} />,
  args: {
    options: options.slice(0, 8),
    placeholder: "Select multiple items",
    label: "Multi-select Dropdown",
    multiple: true,
    placement: "bottom",
  },
};

// 10. Multi-select with Select All
export const MultiSelectWithSelectAll: Story = {
  // @ts-expect-error - No type error
  render: (args) => <MultiDropdownWrapper {...args} />,
  args: {
    options: options.slice(0, 8),
    placeholder: "Select items",
    label: "Multi-select with Select All",
    multiple: true,
    showSelectAll: true,
    selectAllLabel: "Select All",
    placement: "bottom",
  },
};

// 11. Multi-select with custom count renderer
export const MultiSelectCustomCount: Story = {
  // @ts-expect-error - No type error
  render: (args) => <MultiDropdownWrapper {...args} />,
  args: {
    options: options.slice(0, 10),
    placeholder: "Select items",
    label: "Custom count display",
    multiple: true,
    maxDisplayItems: 2,
    renderSelectedCount: (count, total) => `${count} of ${total} selected`,
    placement: "bottom",
  },
};

// 12. Multi-select searchable
export const MultiSelectSearchable: Story = {
  // @ts-expect-error - No type error
  render: (args) => <MultiDropdownWrapper {...args} />,
  args: {
    options: options,
    placeholder: "Search and select multiple...",
    label: "Searchable Multi-select",
    multiple: true,
    searchable: true,
    searchPlaceholder: "Type to filter...",
    showSelectAll: true,
    placement: "bottom",
  },
};
