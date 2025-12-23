import { Download, Upload } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

import { CircleAvatar } from "./CircleAvatar";

const meta: Meta<typeof CircleAvatar> = {
  title: "DataDisplay/CircleAvatar",
  component: CircleAvatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
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

export const WithImage: Story = {
  args: {
    accessibilityLabel: "User avatar",
    name: "John Doe",
    size: "md",
    source: {
      uri: "https://i.pravatar.cc/150?img=12",
    },
  },
  render: (args) => <CircleAvatar {...args} />,
};

export const WithInitials: Story = {
  args: {
    name: "Jane Smith",
    size: "md",
  },
  render: (args) => <CircleAvatar {...args} />,
};

export const WithIcon: Story = {
  args: {
    accessibilityLabel: "Upload avatar",
    icon: Upload,
    size: "md",
  },
  render: (args) => <CircleAvatar {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 16 }}>
      <CircleAvatar name="Small" size="sm" />
      <CircleAvatar name="Medium" size="md" />
      <CircleAvatar name="Large" size="lg" />
    </View>
  ),
};

export const ImageFallback: Story = {
  render: () => (
    <View style={{ alignItems: "center", gap: 16 }}>
      <CircleAvatar
        name="John Doe"
        source={{ uri: "https://invalid-url.com/image.jpg" }}
      />
      <CircleAvatar name="John Doe" />
    </View>
  ),
};

export const InitialsExamples: Story = {
  render: () => (
    <View style={{ alignItems: "center", gap: 16 }}>
      <CircleAvatar name="John Doe" />
      <CircleAvatar name="Jane" />
      <CircleAvatar name="Mary Jane Watson" />
      <CircleAvatar name="A" />
    </View>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ alignItems: "center", gap: 24 }}>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <CircleAvatar
          name="John Doe"
          size="sm"
          source={{ uri: "https://i.pravatar.cc/150?img=1" }}
        />
        <CircleAvatar name="Jane" size="sm" />
        <CircleAvatar icon={Upload} size="sm" />
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <CircleAvatar
          name="John Doe"
          size="md"
          source={{ uri: "https://i.pravatar.cc/150?img=2" }}
        />
        <CircleAvatar name="Jane" size="md" />
        <CircleAvatar icon={Download} size="md" />
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <CircleAvatar
          name="John Doe"
          size="lg"
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
        />
        <CircleAvatar name="Jane" size="lg" />
        <CircleAvatar icon={Upload} size="lg" />
      </View>
    </View>
  ),
};
