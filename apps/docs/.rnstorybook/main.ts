import type { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  stories: [
    // Stories from @readykit/core package
    "../../../packages/core/src/components/**/*.stories.?(ts|tsx|js|jsx)",
  ],
  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
  ],
};

export default main;
