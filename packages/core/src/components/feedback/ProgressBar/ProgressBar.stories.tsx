import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Feedback/ProgressBar",
  component: ProgressBar,
  args: {
    value: 60,
    color: "primary",
    size: "md",
    showLabel: false,
    animated: true,
    indeterminate: false,
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    showLabel: true,
    value: 75,
  },
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ProgressBar color="primary" value={60} />
      <ProgressBar color="secondary" value={60} />
      <ProgressBar color="success" value={60} />
      <ProgressBar color="error" value={60} />
      <ProgressBar color="warning" value={60} />
      <ProgressBar color="info" value={60} />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ProgressBar showLabel size="sm" value={40} />
      <ProgressBar showLabel size="md" value={60} />
      <ProgressBar showLabel size="lg" value={80} />
    </View>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ProgressBar color="primary" indeterminate value={0} />
      <ProgressBar color="success" indeterminate value={0} />
      <ProgressBar color="info" indeterminate size="lg" value={0} />
    </View>
  ),
};

export const ProgressValues: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <ProgressBar showLabel value={0} />
      <ProgressBar showLabel value={25} />
      <ProgressBar showLabel value={50} />
      <ProgressBar showLabel value={75} />
      <ProgressBar showLabel value={100} />
    </View>
  ),
};

function AnimatedProgressExample(): React.JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={{ gap: 16 }}>
      <ProgressBar color="primary" showLabel value={progress} />
      <ProgressBar color="success" showLabel size="lg" value={progress} />
    </View>
  );
}

export const AnimatedProgress: Story = {
  render: () => <AnimatedProgressExample />,
};

function DownloadSimulationExample(): React.JSX.Element {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setIsComplete(true);
      return;
    }

    const timeout = setTimeout(() => {
      const increment = Math.random() * 15 + 5;
      setProgress((prev) => Math.min(100, prev + increment));
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [progress]);

  return (
    <View style={{ gap: 8 }}>
      <ProgressBar
        color={isComplete ? "success" : "primary"}
        showLabel
        value={progress}
      />
    </View>
  );
}

export const DownloadSimulation: Story = {
  render: () => <DownloadSimulationExample />,
};
