import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: "DataDisplay/Divider",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <View style={{ width: "100%", padding: 20 }}>
      <Divider />
    </View>
  ),
};

export const WithText: Story = {
  render: () => (
    <View style={{ width: "100%", padding: 20 }}>
      <Divider text="OR" />
    </View>
  ),
};

export const Thickness: Story = {
  render: () => (
    <View style={{ width: "100%", padding: 20, gap: 20 }}>
      <Divider thickness="sm" />
      <Divider thickness="md" />
      <Divider thickness="lg" />
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ width: "100%", padding: 20, gap: 20 }}>
      <Divider color="divider" />
      <Divider color="border" />
    </View>
  ),
};

export const Vertical: Story = {
  render: () => (
    <View style={{ height: 200, padding: 20, flexDirection: "row", gap: 20 }}>
      <Divider orientation="vertical" />
      <View style={{ flex: 1 }}>
        <Divider text="OR" />
      </View>
      <Divider orientation="vertical" />
    </View>
  ),
};

export const CustomText: Story = {
  render: () => (
    <View style={{ width: "100%", padding: 20, gap: 20 }}>
      <Divider text="OR" />
      <Divider text="Continue with" />
      <Divider text="Sign in with" />
    </View>
  ),
};
