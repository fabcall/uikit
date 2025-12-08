import { Download, Upload } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

import { IconButton } from "./IconButton";

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
  render: (args) => (
    <StoryWrapper>
      <IconButton {...args} />
    </StoryWrapper>
  ),
};

export const SecondarySolid: Story = {
  args: {
    accessibilityLabel: "Download file",
    color: "secondary",
    icon: Download,
    size: "md",
    variant: "solid",
  },
  render: (args) => (
    <StoryWrapper>
      <IconButton {...args} />
    </StoryWrapper>
  ),
};

export const PrimaryOutline: Story = {
  args: {
    accessibilityLabel: "Upload file",
    color: "primary",
    icon: Upload,
    size: "md",
    variant: "outline",
  },
  render: (args) => (
    <StoryWrapper>
      <IconButton {...args} />
    </StoryWrapper>
  ),
};

export const SecondaryOutline: Story = {
  args: {
    accessibilityLabel: "Download file",
    color: "secondary",
    icon: Download,
    size: "md",
    variant: "outline",
  },
  render: (args) => (
    <StoryWrapper>
      <IconButton {...args} />
    </StoryWrapper>
  ),
};

export const PrimaryGhost: Story = {
  args: {
    accessibilityLabel: "Upload file",
    color: "primary",
    icon: Upload,
    size: "md",
    variant: "ghost",
  },
  render: (args) => (
    <StoryWrapper>
      <IconButton {...args} />
    </StoryWrapper>
  ),
};

export const SecondaryGhost: Story = {
  args: {
    accessibilityLabel: "Download file",
    color: "secondary",
    icon: Download,
    size: "md",
    variant: "ghost",
  },
  render: (args) => (
    <StoryWrapper>
      <IconButton {...args} />
    </StoryWrapper>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryWrapper>
      <View style={{ alignItems: "center", flexDirection: "row", gap: 16 }}>
        <IconButton accessibilityLabel="Small button" icon={Upload} size="sm" />
        <IconButton
          accessibilityLabel="Medium button"
          icon={Upload}
          size="md"
        />
        <IconButton accessibilityLabel="Large button" icon={Upload} size="lg" />
      </View>
    </StoryWrapper>
  ),
};

export const Loading: Story = {
  args: {
    accessibilityLabel: "Uploading file",
    icon: Upload,
    isLoading: true,
  },
  render: (args) => (
    <StoryWrapper>
      <IconButton {...args} />
    </StoryWrapper>
  ),
};

export const Disabled: Story = {
  args: {
    accessibilityLabel: "Upload file",
    icon: Upload,
    isDisabled: true,
  },
  render: (args) => (
    <StoryWrapper>
      <IconButton {...args} />
    </StoryWrapper>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <StoryWrapper>
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
    </StoryWrapper>
  ),
};
