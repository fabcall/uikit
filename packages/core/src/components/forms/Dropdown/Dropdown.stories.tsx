import { Download, Upload, User } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

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

// ==================== MULTI-SELECT STORIES ====================

export const MultiSelectBasic: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Select Fruits"
          multiple
          onChange={setSelected}
          options={fruitOptions}
          placeholder="Choose fruits..."
          value={selected}
        />
        {selected.length > 0 ? (
          <Text color="secondary">Selected: {selected.join(", ")}</Text>
        ) : null}
      </View>
    );
  },
};

export const MultiSelectWithSelectAll: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Select Countries"
          multiple
          onChange={setSelected}
          options={countryOptions}
          placeholder="Choose countries..."
          selectAllLabel="Select All Countries"
          showSelectAll
          value={selected}
        />
        {selected.length > 0 ? (
          <Text color="secondary">
            Selected {selected.length} countries: {selected.join(", ")}
          </Text>
        ) : null}
      </View>
    );
  },
};

export const MultiSelectSearchable: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["apple", "banana"]);

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Search and Select Fruits"
          multiple
          onChange={setSelected}
          options={fruitOptions}
          placeholder="Search fruits..."
          searchable
          searchPlaceholder="Type to search..."
          showSelectAll
          value={selected}
        />
      </View>
    );
  },
};

export const MultiSelectMaxDisplayItems: Story = {
  render: () => {
    const [selected1, setSelected1] = useState<string[]>([
      "apple",
      "banana",
      "orange",
      "grape",
      "mango",
    ]);
    const [selected2, setSelected2] = useState<string[]>([
      "apple",
      "banana",
      "orange",
      "grape",
      "mango",
    ]);

    return (
      <View style={{ gap: 24, padding: 20, width: "100%", maxWidth: 400 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>
            Default (max 3 items shown)
          </Text>
          <Dropdown
            multiple
            onChange={setSelected1}
            options={fruitOptions}
            placeholder="Select fruits"
            value={selected1}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>
            Custom (max 2 items shown)
          </Text>
          <Dropdown
            maxDisplayItems={2}
            multiple
            onChange={setSelected2}
            options={fruitOptions}
            placeholder="Select fruits"
            value={selected2}
          />
        </View>
      </View>
    );
  },
};

export const MultiSelectCustomRenderer: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([
      "apple",
      "banana",
      "orange",
    ]);

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="With Custom Selected Count"
          maxDisplayItems={1}
          multiple
          onChange={setSelected}
          options={fruitOptions}
          placeholder="Select fruits"
          renderSelectedCount={(count, total) =>
            `${count} of ${total} fruits selected`
          }
          showSelectAll
          value={selected}
        />
      </View>
    );
  },
};

export const MultiSelectDisabled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["apple", "banana"]);

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          disabled
          label="Disabled Multi-Select"
          multiple
          onChange={setSelected}
          options={fruitOptions}
          placeholder="Cannot select"
          value={selected}
        />
      </View>
    );
  },
};

export const MultiSelectWithError: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          error="Please select at least one option"
          label="Required Multi-Select"
          multiple
          onChange={setSelected}
          options={fruitOptions}
          placeholder="Select fruits"
          required
          value={selected}
        />
      </View>
    );
  },
};

export const MultiSelectWithDisabledOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["opt1"]);

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
          label="Multi-Select with Disabled Options"
          multiple
          onChange={setSelected}
          options={optionsWithDisabled}
          placeholder="Some options are disabled"
          showSelectAll
          value={selected}
        />
      </View>
    );
  },
};

export const MultiSelectNumericValues: Story = {
  render: () => {
    const [selected, setSelected] = useState<number[]>([1, 3]);

    const numericOptions: DropdownOption<number>[] = [
      { label: "First option", value: 1 },
      { label: "Second option", value: 2 },
      { label: "Third option", value: 3 },
      { label: "Fourth option", value: 4 },
      { label: "Fifth option", value: 5 },
    ];

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Dropdown
          label="Select Numbers"
          multiple
          onChange={setSelected}
          options={numericOptions}
          placeholder="Choose numbers"
          showSelectAll
          value={selected}
        />
        {selected.length > 0 ? (
          <Text color="secondary">Selected values: {selected.join(", ")}</Text>
        ) : null}
      </View>
    );
  },
};

export const ComparisonSingleVsMulti: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState<string>();
    const [multiValue, setMultiValue] = useState<string[]>([]);

    return (
      <View style={{ gap: 24, padding: 20, width: "100%", maxWidth: 400 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Single Select</Text>
          <Dropdown
            label="Choose one fruit"
            onChange={setSingleValue}
            options={fruitOptions}
            placeholder="Select a fruit"
            searchable
            value={singleValue}
          />
          {singleValue ? (
            <Text color="secondary">Selected: {singleValue}</Text>
          ) : null}
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Multi Select</Text>
          <Dropdown
            label="Choose multiple fruits"
            multiple
            onChange={setMultiValue}
            options={fruitOptions}
            placeholder="Select fruits"
            searchable
            showSelectAll
            value={multiValue}
          />
          {multiValue.length > 0 ? (
            <Text color="secondary">Selected: {multiValue.join(", ")}</Text>
          ) : null}
        </View>
      </View>
    );
  },
};

// ==================== EXISTING STORIES ====================

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
    const [multiValue, setMultiValue] = useState<string[]>(["apple", "banana"]);

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

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Multi-Select</Text>
          <Dropdown
            label="Multi-Select Dropdown"
            multiple
            onChange={setMultiValue}
            options={fruitOptions}
            placeholder="Select fruits..."
            showSelectAll
            value={multiValue}
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

export const ForcePlacement: Story = {
  render: () => {
    const [topStartValue, setTopStartValue] = useState<string>();
    const [topEndValue, setTopEndValue] = useState<string>();
    const [bottomStartValue, setBottomStartValue] = useState<string>();
    const [bottomEndValue, setBottomEndValue] = useState<string>();

    return (
      <ScrollView style={{ gap: 20, padding: 20 }}>
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Force Open Upward (top-start)
          </Text>
          <Text color="secondary" style={{ marginBottom: 8 }}>
            {`Using placement="top-start" prop to force upward opening, aligned to start`}
          </Text>
          <Dropdown
            label="Forced Top-Start Position"
            onChange={setTopStartValue}
            options={fruitOptions}
            placeholder="Always opens upward"
            placement="top-start"
            value={topStartValue}
          />
        </View>

        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Force Open Upward (top-end)
          </Text>
          <Text color="secondary" style={{ marginBottom: 8 }}>
            {`Using placement="top-end" prop to force upward opening, aligned to end`}
          </Text>
          <Dropdown
            label="Forced Top-End Position"
            onChange={setTopEndValue}
            options={fruitOptions}
            placeholder="Always opens upward (end aligned)"
            placement="top-end"
            value={topEndValue}
          />
        </View>

        <View style={{ gap: 16, marginTop: 200 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Force Open Downward (bottom-start)
          </Text>
          <Text color="secondary" style={{ marginBottom: 8 }}>
            {`Using placement="bottom-start" prop (default behavior)`}
          </Text>
          <Dropdown
            label="Bottom-Start Position"
            onChange={setBottomStartValue}
            options={countryOptions}
            placeholder="Opens downward (default)"
            placement="bottom-start"
            searchable
            value={bottomStartValue}
          />
        </View>

        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Force Open Downward (bottom-end)
          </Text>
          <Text color="secondary" style={{ marginBottom: 8 }}>
            {`Using placement="bottom-end" prop for end alignment`}
          </Text>
          <Dropdown
            label="Bottom-End Position"
            onChange={setBottomEndValue}
            options={countryOptions}
            placeholder="Opens downward (end aligned)"
            placement="bottom-end"
            searchable
            value={bottomEndValue}
          />
        </View>
      </ScrollView>
    );
  },
};

// Keep the old story name as an alias for backwards compatibility
export const ForcePosition = ForcePlacement;