import { Download, Upload, User } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";

import { Icon } from "../../data-display/Icon";
import { Text } from "../../data-display/Text";
import { Dropdown } from "./Dropdown";
import type { DropdownOption } from "./Dropdown.props";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "Forms/Dropdown",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const basicOptions: DropdownOption[] = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
  { label: "Option 3", value: "opt3" },
  { label: "Option 4", value: "opt4" },
];

const fruitOptions: DropdownOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Grape", value: "grape" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Watermelon", value: "watermelon" },
];

const countryOptions: DropdownOption[] = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "Brazil", value: "br" },
  { label: "India", value: "in" },
  { label: "China", value: "cn" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>();

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          onChange={setValue}
          options={basicOptions}
          placeholder="Select an option"
          value={value}
        />
        {value ? <Text color="secondary">Selected: {value}</Text> : null}
      </View>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>();
    const [value2, setValue2] = useState<string>();
    const [value3, setValue3] = useState<string>();

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Favorite Fruit"
          onChange={setValue1}
          options={fruitOptions}
          placeholder="Choose a fruit"
          value={value1}
        />
        <Dropdown
          label="Country"
          onChange={setValue2}
          options={countryOptions}
          placeholder="Select country"
          value={value2}
        />
        <Dropdown
          disabled
          label="Disabled Field"
          onChange={setValue3}
          options={basicOptions}
          placeholder="Cannot select"
          value={value3}
        />
      </View>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>();
    const [value2, setValue2] = useState<string>();
    const [value3, setValue3] = useState<string>();

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Required Field"
          onChange={setValue1}
          options={basicOptions}
          placeholder="Select an option"
          required
          value={value1}
        />
        <Dropdown
          label="Another Required Field"
          onChange={setValue2}
          options={fruitOptions}
          placeholder="Choose a fruit"
          required
          value={value2}
        />
        <Dropdown
          error="This field is required"
          label="Required with Error"
          onChange={setValue3}
          options={basicOptions}
          placeholder="Required field"
          required
          value={value3}
        />
      </View>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string>();

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          error="This field is required"
          label="Required Field"
          onChange={setValue}
          options={basicOptions}
          placeholder="Select an option"
          required
          value={value}
        />
        <Dropdown
          error="Please select a valid option"
          label="Field with Error"
          onChange={setValue}
          options={fruitOptions}
          placeholder="Choose a fruit"
          value={value}
        />
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          disabled
          onChange={() => {}}
          options={basicOptions}
          placeholder="Disabled dropdown"
        />
        <Dropdown
          disabled
          onChange={() => {}}
          options={fruitOptions}
          placeholder="Disabled with value"
          value="banana"
        />
        <Dropdown
          disabled
          error="Error message"
          onChange={() => {}}
          options={basicOptions}
          placeholder="Disabled with error"
        />
      </View>
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>();
    const [value2, setValue2] = useState<string>();

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Search Fruits"
          onChange={setValue1}
          options={fruitOptions}
          placeholder="Search for a fruit..."
          searchable
          searchPlaceholder="Type to search..."
          value={value1}
        />
        <Dropdown
          label="Search Countries"
          onChange={setValue2}
          options={countryOptions}
          placeholder="Search for a country..."
          searchable
          value={value2}
        />
      </View>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string>();

    const optionsWithIcons: DropdownOption[] = [
      {
        label: "Upload",
        value: "upload",
        icon: <Icon icon={Upload} size="sm" color="textPrimary" />,
      },
      {
        label: "Download",
        value: "download",
        icon: <Icon icon={Download} size="sm" color="textPrimary" />,
      },
      {
        label: "Profile",
        value: "profile",
        icon: <Icon icon={User} size="sm" color="textPrimary" />,
      },
    ];

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Select Action"
          onChange={setValue}
          options={optionsWithIcons}
          placeholder="Choose an action"
          value={value}
        />
      </View>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string>();

    const optionsWithDisabled: DropdownOption[] = [
      { label: "Available Option 1", value: "opt1" },
      { label: "Disabled Option", value: "opt2", disabled: true },
      { label: "Available Option 2", value: "opt3" },
      { label: "Another Disabled", value: "opt4", disabled: true },
      { label: "Available Option 3", value: "opt5" },
    ];

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Select Option"
          onChange={setValue}
          options={optionsWithDisabled}
          placeholder="Some options are disabled"
          value={value}
        />
      </View>
    );
  },
};

export const LongList: Story = {
  render: () => {
    const [value, setValue] = useState<string>();

    const longList: DropdownOption[] = Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `opt${i + 1}`,
    }));

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Long List"
          maxHeight={250}
          onChange={setValue}
          options={longList}
          placeholder="Select from many options"
          searchable
          value={value}
        />
      </View>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const [value, setValue] = useState<string>();

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          emptyMessage="No options available"
          label="Empty Dropdown"
          onChange={setValue}
          options={[]}
          placeholder="No options"
          value={value}
        />
        <Dropdown
          emptyMessage="No fruits found"
          label="With Search (No Results)"
          onChange={setValue}
          options={[]}
          placeholder="Search fruits"
          searchable
          value={value}
        />
      </View>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>();
    const [value2, setValue2] = useState<string>("opt2");
    const [value3, setValue3] = useState<string>();
    const [value4, setValue4] = useState<string>();

    return (
      <View style={{ gap: 20, padding: 20, width: "100%", maxWidth: 400 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Default</Text>
          <Dropdown
            label="Default Dropdown"
            onChange={setValue1}
            options={basicOptions}
            placeholder="Select an option"
            value={value1}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>With Value</Text>
          <Dropdown
            label="Dropdown with Value"
            onChange={setValue2}
            options={basicOptions}
            placeholder="Select an option"
            value={value2}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>With Error</Text>
          <Dropdown
            error="This field has an error"
            label="Dropdown with Error"
            onChange={setValue3}
            options={basicOptions}
            placeholder="Select an option"
            value={value3}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Required</Text>
          <Dropdown
            label="Required Dropdown"
            onChange={setValue1}
            options={basicOptions}
            placeholder="Required field"
            required
            value={value1}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Disabled</Text>
          <Dropdown
            disabled
            onChange={setValue4}
            options={basicOptions}
            placeholder="Disabled dropdown"
            value="opt1"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Searchable</Text>
          <Dropdown
            label="Searchable Dropdown"
            onChange={setValue1}
            options={fruitOptions}
            placeholder="Search fruits..."
            searchable
            value={value1}
          />
        </View>
      </View>
    );
  },
};

export const PositioningEdgeCases: Story = {
  render: () => {
    const [topValue, setTopValue] = useState<string>();
    const [bottomValue, setBottomValue] = useState<string>();

    return (
      <View style={{ flex: 1, padding: 20, justifyContent: "space-between" }}>
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
            Dropdown at Top of Screen
          </Text>
          <Text color="secondary" style={{ marginBottom: 16 }}>
            This dropdown has plenty of space below, so it opens downward.
          </Text>
          <Dropdown
            label="Select Fruit"
            onChange={setTopValue}
            options={fruitOptions}
            placeholder="Opens downward"
            searchable
            value={topValue}
          />
        </View>

        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
            Dropdown at Bottom of Screen
          </Text>
          <Text color="secondary" style={{ marginBottom: 16 }}>
            {`This dropdown automatically opens upward because there's no space
            below!`}
          </Text>
          <Dropdown
            label="Select Country"
            onChange={setBottomValue}
            options={countryOptions}
            placeholder="Auto-opens upward"
            searchable
            value={bottomValue}
          />
        </View>
      </View>
    );
  },
};

export const ForcePosition: Story = {
  render: () => {
    const [topValue, setTopValue] = useState<string>();
    const [bottomValue, setBottomValue] = useState<string>();

    return (
      <View style={{ gap: 20, padding: 20 }}>
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Force Open Upward
          </Text>
          <Text color="secondary" style={{ marginBottom: 8 }}>
            {`Using position="top" prop to force upward opening`}
          </Text>
          <Dropdown
            label="Forced Top Position"
            onChange={setTopValue}
            options={fruitOptions}
            placeholder="Always opens upward"
            position="top"
            value={topValue}
          />
        </View>

        <View style={{ gap: 16, marginTop: 300 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Force Open Downward
          </Text>
          <Text color="secondary" style={{ marginBottom: 8 }}>
            {`Using position="bottom" prop, but auto-adjusts if no space`}
          </Text>
          <Dropdown
            label="Bottom Position (auto-adjusts)"
            onChange={setBottomValue}
            options={countryOptions}
            placeholder="Tries to open downward"
            position="bottom"
            searchable
            value={bottomValue}
          />
        </View>
      </View>
    );
  },
};
