import { Download, Upload } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Actions/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary"],
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    isDisabled: { control: "boolean" },
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

export const PrimarySolid: Story = {
  args: {
    accessibilityLabel: "Upload file",
    color: "primary",
    icon: Upload,
    size: "md",
    variant: "solid",
  },
};

export const SecondarySolid: Story = {
  args: {
    accessibilityLabel: "Download file",
    color: "secondary",
    icon: Download,
    size: "md",
    variant: "solid",
  },
};

export const PrimaryOutline: Story = {
  args: {
    accessibilityLabel: "Upload file",
    color: "primary",
    icon: Upload,
    size: "md",
    variant: "outline",
  },
};

export const SecondaryOutline: Story = {
  args: {
    accessibilityLabel: "Download file",
    color: "secondary",
    icon: Download,
    size: "md",
    variant: "outline",
  },
};

export const PrimaryGhost: Story = {
  args: {
    accessibilityLabel: "Upload file",
    color: "primary",
    icon: Upload,
    size: "md",
    variant: "ghost",
  },
};

export const SecondaryGhost: Story = {
  args: {
    accessibilityLabel: "Download file",
    color: "secondary",
    icon: Download,
    size: "md",
    variant: "ghost",
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 16 }}>
      <IconButton accessibilityLabel="Small button" icon={Upload} size="sm" />
      <IconButton
        accessibilityLabel="Medium button"
        icon={Upload}
        size="md"
      />
      <IconButton accessibilityLabel="Large button" icon={Upload} size="lg" />
    </View>
  ),
};

export const Loading: Story = {
  args: {
    accessibilityLabel: "Uploading file",
    icon: Upload,
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    accessibilityLabel: "Upload file",
    icon: Upload,
    isDisabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ alignItems: "center", gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <IconButton
          accessibilityLabel="Primary solid"
          color="primary"
          icon={Upload}
          variant="solid"
        />
        <IconButton
          accessibilityLabel="Secondary solid"
          color="secondary"
          icon={Download}
          variant="solid"
        />
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <IconButton
          accessibilityLabel="Primary outline"
          color="primary"
          icon={Upload}
          variant="outline"
        />
        <IconButton
          accessibilityLabel="Secondary outline"
          color="secondary"
          icon={Download}
          variant="outline"
        />
      </View>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <IconButton
          accessibilityLabel="Primary ghost"
          color="primary"
          icon={Upload}
          variant="ghost"
        />
        <IconButton
          accessibilityLabel="Secondary ghost"
          color="secondary"
          icon={Download}
          variant="ghost"
        />
      </View>
    </View>
  ),
};