import { Button, Text } from "@readykit/core";
import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outlined"],
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

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "elevated",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Text color="primary" variant="h1">
          Card Title
        </Text>
      </Card.Header>
      <Card.Content>
        <Text color="secondary" variant="body">
          This is the main content of the card. You can place any relevant
          information here.
        </Text>
      </Card.Content>
      <Card.Footer>
        <Button size="md" title="Action" variant="solid" />
      </Card.Footer>
    </Card>
  ),
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Text color="primary" variant="h1">
          Elevated Card
        </Text>
      </Card.Header>
      <Card.Content>
        <Text color="secondary" variant="body">
          {`This card uses the "elevated" variant which applies a shadow to create
            visual depth.`}
        </Text>
      </Card.Content>
      <Card.Footer>
        <View style={{ flexDirection: "row" }}>
          <Button size="md" title="Cancel" variant="outline" />
          <View style={{ marginLeft: 8 }}>
            <Button size="md" title="Confirm" variant="solid" />
          </View>
        </View>
      </Card.Footer>
    </Card>
  ),
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Text color="primary" variant="h1">
          Outlined Card
        </Text>
      </Card.Header>
      <Card.Content>
        <Text color="secondary" variant="body">
          {`This card uses the "outlined" variant which applies a border to
            define its boundaries.`}
        </Text>
      </Card.Content>
      <Card.Footer>
        <Button size="md" title="Action" variant="ghost" />
      </Card.Footer>
    </Card>
  ),
};

export const OnlyHeader: Story = {
  args: {
    variant: "elevated",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Text color="primary" variant="h1">
          Card with Header Only
        </Text>
        <Text color="secondary" style={{ marginTop: 8 }} variant="body">
          This card contains only the header.
        </Text>
      </Card.Header>
    </Card>
  ),
};

export const OnlyContent: Story = {
  args: {
    variant: "elevated",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Content>
        <Text color="primary" variant="body">
          Card with Content Only
        </Text>
        <Text color="secondary" style={{ marginTop: 8 }} variant="body">
          This card contains only the main content.
        </Text>
      </Card.Content>
    </Card>
  ),
};

export const HeaderAndContent: Story = {
  args: {
    variant: "outlined",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Text color="primary" variant="h1">
          Card without Footer
        </Text>
      </Card.Header>
      <Card.Content>
        <Text color="secondary" variant="body">
          This card contains only header and content, without footer.
        </Text>
      </Card.Content>
    </Card>
  ),
};

export const ComplexContent: Story = {
  args: {
    variant: "elevated",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Text color="primary" variant="h1">
          Card with Complex Content
        </Text>
        <Text color="secondary" style={{ marginTop: 4 }} variant="caption">
          Subtitle or additional description
        </Text>
      </Card.Header>
      <Card.Content>
        <Text color="primary" style={{ marginBottom: 8 }} variant="body">
          Section 1
        </Text>
        <Text color="secondary" style={{ marginBottom: 16 }} variant="body">
          Content of the first section of the card.
        </Text>
        <Text color="primary" style={{ marginBottom: 8 }} variant="body">
          Section 2
        </Text>
        <Text color="secondary" variant="body">
          Content of the second section of the card.
        </Text>
      </Card.Content>
      <Card.Footer>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button size="md" title="Cancel" variant="ghost" />
          <View style={{ marginLeft: 8 }}>
            <Button size="md" title="Save" variant="solid" />
          </View>
        </View>
      </Card.Footer>
    </Card>
  ),
};
