import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { Button } from "../../actions/Button";
import { Text } from "../../data-display/Text";
import { PageIndicator } from "./PageIndicator";

const meta: Meta<typeof PageIndicator> = {
  title: "Navigation/PageIndicator",
  component: PageIndicator,
  args: {
    count: 5,
    currentIndex: 2,
  },
  argTypes: {
    count: {
      control: { type: "number", min: 1, max: 10 },
    },
    currentIndex: {
      control: { type: "number", min: 0, max: 9 },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 24, alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PageIndicator>;

export const Default: Story = {};

export const DifferentCounts: Story = {
  render: () => (
    <View style={{ gap: 24, alignItems: "center" }}>
      <PageIndicator count={3} currentIndex={0} />
      <PageIndicator count={5} currentIndex={2} />
      <PageIndicator count={7} currentIndex={4} />
    </View>
  ),
};

export const Interactive: Story = {
  render: function InteractiveExample() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const count = 5;

    return (
      <View style={{ gap: 24, alignItems: "center" }}>
        <PageIndicator
          count={count}
          currentIndex={currentIndex}
          onPagePress={setCurrentIndex}
        />
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Button
            onPress={() => {
              setCurrentIndex((prev) => Math.max(0, prev - 1));
            }}
            title="Previous"
            variant="outline"
          />
          <Button
            onPress={() => {
              setCurrentIndex((prev) => Math.min(count - 1, prev + 1));
            }}
            title="Next"
            variant="outline"
          />
        </View>
      </View>
    );
  },
};

export const Animated: Story = {
  render: function AnimatedExample() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const count = 5;

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % count);
      }, 1500);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <View style={{ gap: 16, alignItems: "center" }}>
        <Text variant="body">Auto-advancement (1.5s)</Text>
        <PageIndicator count={count} currentIndex={currentIndex} />
      </View>
    );
  },
};

export const FirstPage: Story = {
  args: {
    count: 5,
    currentIndex: 0,
  },
};

export const LastPage: Story = {
  args: {
    count: 5,
    currentIndex: 4,
  },
};
