import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";

import { Text } from "../../data-display/Text";
import { SegmentedButton } from "./SegmentedButton";

const meta: Meta<typeof SegmentedButton> = {
  title: "Actions/SegmentedButton",
  component: SegmentedButton,
  tags: ["autodocs"],
  argTypes: {
    isDisabled: {
      control: "boolean",
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

type Story = StoryObj<typeof meta>;

function DefaultExample(): React.JSX.Element {
  const [value, setValue] = useState("upcoming");

  return (
    <SegmentedButton
      onChange={setValue}
      options={[
        { value: "upcoming", label: "Upcoming" },
        { value: "history", label: "History" },
      ]}
      value={value}
    />
  );
}

export const Default: Story = {
  render: () => <DefaultExample />,
};

function ThreeOptionsExample(): React.JSX.Element {
  const [value, setValue] = useState("all");

  return (
    <SegmentedButton
      onChange={setValue}
      options={[
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "completed", label: "Completed" },
      ]}
      value={value}
    />
  );
}

export const ThreeOptions: Story = {
  render: () => <ThreeOptionsExample />,
};

export const Disabled: Story = {
  render: () => (
    <SegmentedButton
      isDisabled
      onChange={() => {}}
      options={[
        { value: "upcoming", label: "Upcoming" },
        { value: "history", label: "History" },
      ]}
      value="upcoming"
    />
  ),
};

function ViewToggleExample(): React.JSX.Element {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <View style={{ gap: 16, width: "100%" }}>
      <SegmentedButton
        onChange={setView}
        options={[
          { value: "list", label: "List" },
          { value: "grid", label: "Grid" },
        ]}
        value={view}
      />
      <View
        style={{
          padding: 24,
          backgroundColor: "#F3F4F6",
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text color="secondary" variant="body">
          Current view: {view}
        </Text>
      </View>
    </View>
  );
}

export const ViewToggle: Story = {
  render: () => <ViewToggleExample />,
};