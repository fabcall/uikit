import { Check, CheckCircle } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";

import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "DataDisplay/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    label: "Chip",
    color: "primary",
    variant: "solid",
    size: "md",
    roundedSide: "all",
    isSelected: false,
    isDisabled: false,
    isDismissible: false,
  },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
    },
    variant: {
      control: "select",
      options: ["solid", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    roundedSide: {
      control: "select",
      options: ["all", "left", "right", "none"],
    },
  },
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <View style={{ padding: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: (args) => <Chip {...args} />,
};

export const Variants: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      <Chip color="primary" label="Solid" variant="solid" />
      <Chip color="primary" label="Outline" variant="outline" />
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        <Chip color="primary" label="Primary" />
        <Chip color="secondary" label="Secondary" />
        <Chip color="success" label="Success" />
        <Chip color="error" label="Error" />
        <Chip color="warning" label="Warning" />
        <Chip color="info" label="Info" />
      </View>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        <Chip color="primary" label="Primary" variant="outline" />
        <Chip color="secondary" label="Secondary" variant="outline" />
        <Chip color="success" label="Success" variant="outline" />
        <Chip color="error" label="Error" variant="outline" />
        <Chip color="warning" label="Warning" variant="outline" />
        <Chip color="info" label="Info" variant="outline" />
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      <Chip color="primary" label="Small" size="sm" />
      <Chip color="primary" label="Medium" size="md" />
    </View>
  ),
};

export const RoundedSides: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Chip color="primary" label="All" roundedSide="all" />
        <Chip color="primary" label="Left" roundedSide="left" />
        <Chip color="primary" label="Right" roundedSide="right" />
        <Chip color="primary" label="None" roundedSide="none" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Chip color="secondary" label="First" roundedSide="left" />
        <Chip color="secondary" label="Middle" roundedSide="none" />
        <Chip color="secondary" label="Last" roundedSide="right" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Chip
          color="primary"
          label="Tab 1"
          roundedSide="left"
          variant="outline"
        />
        <Chip
          color="primary"
          isSelected
          label="Tab 2"
          roundedSide="none"
          variant="outline"
        />
        <Chip
          color="primary"
          label="Tab 3"
          roundedSide="right"
          variant="outline"
        />
      </View>
    </View>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      <Chip color="primary" label="With Icon" leftIcon={CheckCircle} />
      <Chip
        color="primary"
        label="With Icon"
        leftIcon={Check}
        variant="outline"
      />
      <Chip color="success" label="Success" leftIcon={CheckCircle} />
    </View>
  ),
};

export const Selected: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        <Chip color="primary" isSelected label="Selected" />
        <Chip color="secondary" isSelected label="Selected" />
        <Chip color="success" isSelected label="Selected" />
        <Chip color="error" isSelected label="Selected" />
        <Chip color="warning" isSelected label="Selected" />
        <Chip color="info" isSelected label="Selected" />
      </View>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        <Chip color="primary" label="Not Selected" />
        <Chip color="secondary" label="Not Selected" />
        <Chip color="success" label="Not Selected" />
        <Chip color="error" label="Not Selected" />
        <Chip color="warning" label="Not Selected" />
        <Chip color="info" label="Not Selected" />
      </View>
    </View>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      <Chip
        color="primary"
        isDismissible
        label="Dismissible"
        onDismiss={() => {
          //
        }}
      />
      <Chip
        color="success"
        isDismissible
        label="Dismissible"
        onDismiss={() => {
          //
        }}
      />
      <Chip
        color="secondary"
        isDismissible
        label="Outline"
        onDismiss={() => {
          //
        }}
        variant="outline"
      />
    </View>
  ),
};

export const Disabled: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      <Chip color="primary" isDisabled label="Disabled" />
      <Chip color="primary" isDisabled label="Disabled" variant="outline" />
      <Chip color="success" isDisabled label="Disabled" />
    </View>
  ),
};

function SelectableChipsExample(): React.JSX.Element {
  const [selected, setSelected] = useState<string[]>(["react"]);

  const options = ["react", "vue", "angular", "svelte"];

  const toggleOption = (option: string): void => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  return (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      {options.map((option) => (
        <Chip
          color="primary"
          isSelected={selected.includes(option)}
          key={option}
          label={option}
          onPress={() => {
            toggleOption(option);
          }}
        />
      ))}
    </View>
  );
}

export const SelectableChips: Story = {
  render: () => <SelectableChipsExample />,
};

function DismissibleChipsExample(): React.JSX.Element {
  const [chips, setChips] = useState(["Tag 1", "Tag 2", "Tag 3", "Tag 4"]);

  const removeChip = (chip: string): void => {
    setChips((prev) => prev.filter((c) => c !== chip));
  };

  return (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      {chips.map((chip) => (
        <Chip
          color="info"
          isDismissible
          key={chip}
          label={chip}
          onDismiss={() => {
            removeChip(chip);
          }}
        />
      ))}
    </View>
  );
}

export const DismissibleChipsInteractive: Story = {
  render: () => <DismissibleChipsExample />,
};
