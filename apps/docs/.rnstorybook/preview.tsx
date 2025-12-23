import type { Preview } from "@storybook/react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const PRESET_COLORS = {
  White: "#FFFFFF",
} as const;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => {
      const preset =
        (context.args.backgroundPreset as keyof typeof PRESET_COLORS) ||
        "White";

      const backgroundColor =
        PRESET_COLORS[preset as keyof typeof PRESET_COLORS];

      return (
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor }}>
            <Story />
          </SafeAreaView>
        </SafeAreaProvider>
      );
    },
  ],
  argTypes: {
    backgroundPreset: {
      control: { type: "select" },
      options: Object.keys(PRESET_COLORS),
      description: "Background preset",
      table: {
        category: "Story Layout",
        defaultValue: { summary: "Dark" },
      },
    },
  },
};

export default preview;
