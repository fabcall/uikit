import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

import { Text } from "../../data-display/Text";
import { Spinner } from "./Spinner";

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
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <StoryWrapper>
      <Spinner {...args} />
    </StoryWrapper>
  ),
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <StoryWrapper>
      <Spinner {...args} />
    </StoryWrapper>
  ),
};

export const Medium: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <StoryWrapper>
      <Spinner {...args} />
    </StoryWrapper>
  ),
};

export const Large: Story = {
  args: {
    size: "lg",
  },
  render: (args) => (
    <StoryWrapper>
      <Spinner {...args} />
    </StoryWrapper>
  ),
};

export const CustomColor: Story = {
  args: {
    color: "#9333EA",
  },
  render: (args) => (
    <StoryWrapper>
      <Spinner {...args} />
    </StoryWrapper>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryWrapper>
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
    </StoryWrapper>
  ),
};

export const Colors: Story = {
  render: () => (
    <StoryWrapper>
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
    </StoryWrapper>
  ),
};

export const InContext: Story = {
  render: () => (
    <StoryWrapper>
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
    </StoryWrapper>
  ),
};
