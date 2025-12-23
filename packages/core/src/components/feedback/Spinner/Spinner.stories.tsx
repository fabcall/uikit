import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

import { Text } from "../../data-display/Text";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    color: {
      control: "color",
    },
  },
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => <Spinner {...args} />,
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => <Spinner {...args} />,
};

export const Medium: Story = {
  args: {
    size: "md",
  },
  render: (args) => <Spinner {...args} />,
};

export const Large: Story = {
  args: {
    size: "lg",
  },
  render: (args) => <Spinner {...args} />,
};

export const CustomColor: Story = {
  args: {
    color: "#9333EA",
  },
  render: (args) => <Spinner {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 32, alignItems: "center" }}>
      <View style={{ alignItems: "center", gap: 8 }}>
        <Spinner size="sm" />
        <Text color="secondary" variant="caption">
          Small
        </Text>
      </View>
      <View style={{ alignItems: "center", gap: 8 }}>
        <Spinner size="md" />
        <Text color="secondary" variant="caption">
          Medium
        </Text>
      </View>
      <View style={{ alignItems: "center", gap: 8 }}>
        <Spinner size="lg" />
        <Text color="secondary" variant="caption">
          Large
        </Text>
      </View>
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 24 }}>
      <View style={{ alignItems: "center", gap: 8 }}>
        <Spinner size="lg" />
        <Text color="secondary" variant="caption">
          Primary
        </Text>
      </View>
      <View style={{ alignItems: "center", gap: 8 }}>
        <Spinner color="#EF4444" size="lg" />
        <Text color="secondary" variant="caption">
          Red
        </Text>
      </View>
      <View style={{ alignItems: "center", gap: 8 }}>
        <Spinner color="#9333EA" size="lg" />
        <Text color="secondary" variant="caption">
          Purple
        </Text>
      </View>
    </View>
  ),
};

export const InContext: Story = {
  render: () => (
    <View style={{ gap: 24, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: 16,
          backgroundColor: "#F3F4F6",
          borderRadius: 8,
        }}
      >
        <Spinner size="sm" />
        <Text color="secondary" variant="body">
          Loading...
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          backgroundColor: "#F3F4F6",
          borderRadius: 8,
        }}
      >
        <Spinner size="lg" />
        <Text color="secondary" style={{ marginTop: 16 }} variant="body">
          Please wait
        </Text>
      </View>
    </View>
  ),
};
