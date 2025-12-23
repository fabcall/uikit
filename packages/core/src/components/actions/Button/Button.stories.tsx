import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Actions/Button",
  component: Button,
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
    title: "Click here",
    color: "primary",
    variant: "solid",
    size: "md",
  },
};

export const SecondarySolid: Story = {
  args: {
    title: "Click here",
    color: "secondary",
    variant: "solid",
    size: "md",
  },
};

export const PrimaryOutline: Story = {
  args: {
    title: "Cancel",
    color: "primary",
    variant: "outline",
    size: "md",
  },
};

export const SecondaryOutline: Story = {
  args: {
    title: "Cancel",
    color: "secondary",
    variant: "outline",
    size: "md",
  },
};

export const PrimaryGhost: Story = {
  args: {
    title: "Cancel",
    color: "primary",
    variant: "ghost",
    size: "md",
  },
};

export const SecondaryGhost: Story = {
  args: {
    title: "Cancel",
    color: "secondary",
    variant: "ghost",
    size: "md",
  },
};

export const Loading: Story = {
  args: {
    title: "Sign in",
    color: "primary",
    isLoading: true,
  },
};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={{ gap: 16, width: "100%", maxWidth: 400 }}>
      <Button color="primary" title="Primary Solid" variant="solid" />
      <Button color="secondary" title="Secondary Solid" variant="solid" />
      <Button color="primary" title="Primary Outline" variant="outline" />
      <Button color="secondary" title="Secondary Outline" variant="outline" />
      <Button color="primary" title="Primary Ghost" variant="ghost" />
      <Button color="secondary" title="Secondary Ghost" variant="ghost" />
    </View>
  ),
};