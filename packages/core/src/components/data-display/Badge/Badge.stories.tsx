import { Bell } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

import { IconButton } from "../../actions/IconButton";
import { CircleAvatar } from "../CircleAvatar";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "DataDisplay/Badge",
  component: Badge,
  args: {
    content: 5,
    color: "error",
    variant: "solid",
    visible: true,
    dot: false,
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
    content: {
      control: "text",
    },
    max: {
      control: "number",
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

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args) => (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <Badge {...args} />
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
      <Badge color="primary" content={5} />
      <Badge color="secondary" content={5} />
      <Badge color="success" content={5} />
      <Badge color="error" content={5} />
      <Badge color="warning" content={5} />
      <Badge color="info" content={5} />
    </View>
  ),
};

export const Outline: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
      <Badge color="primary" content={5} variant="outline" />
      <Badge color="secondary" content={5} variant="outline" />
      <Badge color="success" content={5} variant="outline" />
      <Badge color="error" content={5} variant="outline" />
      <Badge color="warning" content={5} variant="outline" />
      <Badge color="info" content={5} variant="outline" />
    </View>
  ),
};

export const WithMaxCount: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <Badge content={5} />
      <Badge content={50} />
      <Badge content={99} />
      <Badge content={100} max={99} />
      <Badge content={999} max={99} />
    </View>
  ),
};

export const DotVariant: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <Badge color="primary" dot />
      <Badge color="secondary" dot />
      <Badge color="success" dot />
      <Badge color="error" dot />
      <Badge color="warning" dot />
      <Badge color="info" dot />
    </View>
  ),
};

export const TextContent: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <Badge color="primary" content="New" />
      <Badge color="error" content="Hot" />
      <Badge color="info" content="Pro" />
    </View>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 24 }}>
      <Badge content={3}>
        <IconButton icon={Bell} variant="ghost" />
      </Badge>
      <Badge content={99}>
        <IconButton icon={Bell} variant="ghost" />
      </Badge>
      <Badge content={150} max={99}>
        <IconButton icon={Bell} variant="ghost" />
      </Badge>
      <Badge dot>
        <IconButton icon={Bell} variant="ghost" />
      </Badge>
    </View>
  ),
};

export const OnAvatar: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 24 }}>
      <Badge color="error" content={2}>
        <CircleAvatar name="John Doe" size="md" />
      </Badge>
      <Badge color="success" dot>
        <CircleAvatar name="Jane Smith" size="md" />
      </Badge>
      <Badge color="primary" content="Pro">
        <CircleAvatar name="Bob Wilson" size="md" />
      </Badge>
    </View>
  ),
};

export const Visibility: Story = {
  render: () => (
    <View style={{ flexDirection: "row", gap: 24 }}>
      <Badge content={5} visible>
        <IconButton icon={Bell} variant="ghost" />
      </Badge>
      <Badge content={5} visible={false}>
        <IconButton icon={Bell} variant="ghost" />
      </Badge>
    </View>
  ),
};
