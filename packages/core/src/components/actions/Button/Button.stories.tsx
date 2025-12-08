import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

import { Button } from "./Button";

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
  render: (args) => (
    <StoryWrapper>
      <Button {...args} />
    </StoryWrapper>
  ),
};

export const SecondarySolid: Story = {
  args: {
    title: "Click here",
    color: "secondary",
    variant: "solid",
    size: "md",
  },
  render: (args) => (
    <StoryWrapper>
      <Button {...args} />
    </StoryWrapper>
  ),
};

export const PrimaryOutline: Story = {
  args: {
    title: "Cancel",
    color: "primary",
    variant: "outline",
    size: "md",
  },
  render: (args) => (
    <StoryWrapper>
      <Button {...args} />
    </StoryWrapper>
  ),
};

export const SecondaryOutline: Story = {
  args: {
    title: "Cancel",
    color: "secondary",
    variant: "outline",
    size: "md",
  },
  render: (args) => (
    <StoryWrapper>
      <Button {...args} />
    </StoryWrapper>
  ),
};

export const PrimaryGhost: Story = {
  args: {
    title: "Cancel",
    color: "primary",
    variant: "ghost",
    size: "md",
  },
  render: (args) => (
    <StoryWrapper>
      <Button {...args} />
    </StoryWrapper>
  ),
};

export const SecondaryGhost: Story = {
  args: {
    title: "Cancel",
    color: "secondary",
    variant: "ghost",
    size: "md",
  },
  render: (args) => (
    <StoryWrapper>
      <Button {...args} />
    </StoryWrapper>
  ),
};

export const Loading: Story = {
  args: {
    title: "Sign in",
    color: "primary",
    isLoading: true,
  },
  render: (args) => (
    <StoryWrapper>
      <Button {...args} />
    </StoryWrapper>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <StoryWrapper>
      <View style={{ gap: 16, width: "100%" }}>
        <Button color="primary" title="Primary Solid" variant="solid" />
        <Button color="secondary" title="Secondary Solid" variant="solid" />
        <Button color="primary" title="Primary Outline" variant="outline" />
        <Button color="secondary" title="Secondary Outline" variant="outline" />
        <Button color="primary" title="Primary Ghost" variant="ghost" />
        <Button color="secondary" title="Secondary Ghost" variant="ghost" />
      </View>
    </StoryWrapper>
  ),
};
