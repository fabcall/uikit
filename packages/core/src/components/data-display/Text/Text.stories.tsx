import type { Meta, StoryObj } from "@storybook/react-native";

import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "DataDisplay/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "body", "button", "caption"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "disabled", "inverse"],
    },
    align: {
      control: "radio",
      options: ["left", "center", "right"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default text",
    variant: "body",
    color: "primary",
    align: "left",
  },
};

export const Heading: Story = {
  args: {
    children: "Main Heading",
    variant: "h1",
    color: "primary",
  },
};

export const Body: Story = {
  args: {
    children: "This is body text, used for paragraphs and main content.",
    variant: "body",
    color: "primary",
  },
};

export const Caption: Story = {
  args: {
    children: "Caption or auxiliary text",
    variant: "caption",
    color: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled text",
    variant: "body",
    color: "disabled",
  },
};

export const CenterAligned: Story = {
  args: {
    children: "Centered text",
    variant: "body",
    color: "primary",
    align: "center",
  },
};

export const RightAligned: Story = {
  args: {
    children: "Right-aligned text",
    variant: "body",
    color: "primary",
    align: "right",
  },
};
