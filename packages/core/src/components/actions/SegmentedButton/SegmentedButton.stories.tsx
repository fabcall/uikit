import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";

import { Text } from "../../data-display/Text";
import { SegmentedButton } from "./SegmentedButton";

function StoryWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        padding: 24,
      }}
    >
      {children}
    </View>
  );
}

const meta: Meta<typeof SegmentedButton> = {
  title: "Actions/SegmentedButton",
  component: SegmentedButton,
  tags: ["autodocs"],
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function DefaultExample(): React.JSX.Element {
  const [value, setValue] = useState("upcoming");

  return (
    <StoryWrapper>
      <SegmentedButton
        onChange={setValue}
        options={[
          { value: "upcoming", label: "Upcoming" },
          { value: "history", label: "History" },
        ]}
        value={value}
      />
    </StoryWrapper>
  );
}

export const Default: Story = {
  render: () => <DefaultExample />,
};

function ThreeOptionsExample(): React.JSX.Element {
  const [value, setValue] = useState("all");

  return (
    <StoryWrapper>
      <SegmentedButton
        onChange={setValue}
        options={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "completed", label: "Completed" },
        ]}
        value={value}
      />
    </StoryWrapper>
  );
}

export const ThreeOptions: Story = {
  render: () => <ThreeOptionsExample />,
};

export const Disabled: Story = {
  render: () => (
    <StoryWrapper>
      <SegmentedButton
        isDisabled
        onChange={() => {}}
        options={[
          { value: "upcoming", label: "Upcoming" },
          { value: "history", label: "History" },
        ]}
        value="upcoming"
      />
    </StoryWrapper>
  ),
};

function ViewToggleExample(): React.JSX.Element {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <StoryWrapper>
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
    </StoryWrapper>
  );
}

export const ViewToggle: Story = {
  render: () => <ViewToggleExample />,
};
