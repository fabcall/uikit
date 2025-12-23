import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";

import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Layout/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EmptyState />,
};
