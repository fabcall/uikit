import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { ScrollView, View } from "react-native";

import { Text } from "../../data-display/Text";
import { Surface } from "./Surface";
import type { SurfaceElevation } from "./Surface.props";

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

const meta: Meta<typeof Surface> = {
  title: "Layout/Surface",
  component: Surface,
  tags: ["autodocs"],
  argTypes: {
    elevation: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    elevation: 1,
  },
  render: (args) => (
    <StoryWrapper>
      <Surface {...args}>
        <View style={{ padding: 16 }}>
          <Text color="primary" variant="body">
            Surface content (elevation: {args.elevation})
          </Text>
        </View>
      </Surface>
    </StoryWrapper>
  ),
};

export const Elevation0: Story = {
  args: {
    elevation: 0,
  },
  render: (args) => (
    <StoryWrapper>
      <Surface {...args}>
        <View style={{ padding: 16 }}>
          <Text color="primary" variant="h2">
            Elevation 0
          </Text>
          <Text color="secondary" style={{ marginTop: 8 }} variant="body">
            No tint, no shadow (pure background)
          </Text>
        </View>
      </Surface>
    </StoryWrapper>
  ),
};

export const Elevation1: Story = {
  args: {
    elevation: 1,
  },
  render: (args) => (
    <StoryWrapper>
      <Surface {...args}>
        <View style={{ padding: 16 }}>
          <Text color="primary" variant="h2">
            Elevation 1
          </Text>
          <Text color="secondary" style={{ marginTop: 8 }} variant="body">
            5% primary tint + small shadow
          </Text>
        </View>
      </Surface>
    </StoryWrapper>
  ),
};

export const Elevation2: Story = {
  args: {
    elevation: 2,
  },
  render: (args) => (
    <StoryWrapper>
      <Surface {...args}>
        <View style={{ padding: 16 }}>
          <Text color="primary" variant="h2">
            Elevation 2
          </Text>
          <Text color="secondary" style={{ marginTop: 8 }} variant="body">
            8% primary tint + small shadow
          </Text>
        </View>
      </Surface>
    </StoryWrapper>
  ),
};

export const Elevation3: Story = {
  args: {
    elevation: 3,
  },
  render: (args) => (
    <StoryWrapper>
      <Surface {...args}>
        <View style={{ padding: 16 }}>
          <Text color="primary" variant="h2">
            Elevation 3
          </Text>
          <Text color="secondary" style={{ marginTop: 8 }} variant="body">
            11% primary tint + medium shadow
          </Text>
        </View>
      </Surface>
    </StoryWrapper>
  ),
};

export const Elevation4: Story = {
  args: {
    elevation: 4,
  },
  render: (args) => (
    <StoryWrapper>
      <Surface {...args}>
        <View style={{ padding: 16 }}>
          <Text color="primary" variant="h2">
            Elevation 4
          </Text>
          <Text color="secondary" style={{ marginTop: 8 }} variant="body">
            12% primary tint + medium shadow
          </Text>
        </View>
      </Surface>
    </StoryWrapper>
  ),
};

export const Elevation5: Story = {
  args: {
    elevation: 5,
  },
  render: (args) => (
    <StoryWrapper>
      <Surface {...args}>
        <View style={{ padding: 16 }}>
          <Text color="primary" variant="h2">
            Elevation 5
          </Text>
          <Text color="secondary" style={{ marginTop: 8 }} variant="body">
            14% primary tint + large shadow
          </Text>
        </View>
      </Surface>
    </StoryWrapper>
  ),
};

export const ElevationComparison: Story = {
  render: () => (
    <StoryWrapper>
      <ScrollView
        contentContainerStyle={{ gap: 16, paddingHorizontal: 0 }}
        style={{ width: "100%" }}
      >
        {([0, 1, 2, 3, 4, 5] as SurfaceElevation[]).map((elevation) => (
          <Surface elevation={elevation} key={elevation}>
            <View style={{ padding: 16 }}>
              <Text color="primary" variant="h2">
                Elevation {elevation}
              </Text>
              <Text color="secondary" style={{ marginTop: 4 }} variant="body">
                Notice the subtle blue tint and shadow increase
              </Text>
            </View>
          </Surface>
        ))}
      </ScrollView>
    </StoryWrapper>
  ),
};
