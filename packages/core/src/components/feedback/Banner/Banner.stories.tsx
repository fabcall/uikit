import { Upload } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { Pressable, View } from "react-native";

import { Text } from "../../data-display/Text";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["error", "success", "warning", "info"],
    },
    message: {
      control: "text",
    },
    title: {
      control: "text",
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
    message:
      "Error retrieving data. We will automatically retry until it is back.",
    variant: "error",
  },
  render: (args) => <Banner {...args} />,
};

export const Error: Story = {
  args: {
    message:
      "An error occurred while processing your request. Please try again.",
    variant: "error",
  },
  render: (args) => <Banner {...args} />,
};

export const Success: Story = {
  args: {
    message: "Data saved successfully! Your changes have been applied.",
    variant: "success",
  },
  render: (args) => <Banner {...args} />,
};

export const Warning: Story = {
  args: {
    message:
      "Warning: This action cannot be undone. Please proceed with caution.",
    variant: "warning",
  },
  render: (args) => <Banner {...args} />,
};

export const Info: Story = {
  args: {
    message:
      "Information: New features are available. Check the updates section.",
    variant: "info",
  },
  render: (args) => <Banner {...args} />,
};

export const WithCustomIcon: Story = {
  args: {
    message: "File upload in progress. Please wait while we process your file.",
    variant: "info",
    icon: Upload,
  },
  render: (args) => <Banner {...args} />,
};

export const WithCustomColor: Story = {
  args: {
    message: "Custom colored banner with a personalized appearance.",
    color: "#9333EA",
  },
  render: (args) => <Banner {...args} />,
};

export const LongMessage: Story = {
  args: {
    message:
      "This is a longer message that demonstrates how the banner handles extended text content. The banner should wrap appropriately and maintain proper spacing and readability across multiple lines.",
    variant: "warning",
  },
  render: (args) => <Banner {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16, width: "100%" }}>
      <Banner
        message="Error: Something went wrong with your request."
        variant="error"
      />
      <Banner
        message="Success: Your action was completed successfully."
        variant="success"
      />
      <Banner
        message="Warning: Please review your input before proceeding."
        variant="warning"
      />
      <Banner
        message="Info: Here is some helpful information for you."
        variant="info"
      />
    </View>
  ),
};

export const WithTitle: Story = {
  args: {
    title: "Error",
    message:
      "An error occurred while processing your request. Please try again.",
    variant: "error",
  },
  render: (args) => <Banner {...args} />,
};

export const AllVariantsWithTitles: Story = {
  render: () => (
    <View style={{ gap: 16, width: "100%" }}>
      <Banner
        message="Something went wrong with your request."
        title="Error"
        variant="error"
      />
      <Banner
        message="Your action was completed successfully."
        title="Success"
        variant="success"
      />
      <Banner
        message="Please review your input before proceeding."
        title="Warning"
        variant="warning"
      />
      <Banner
        message="Here is some helpful information for you."
        title="Information"
        variant="info"
      />
    </View>
  ),
};

function ActionLink({
  title,
  color,
  onPress,
}: {
  title: string;
  color: string;
  onPress?: () => void;
}): React.JSX.Element {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ color }} variant="body">
        {title}
      </Text>
    </Pressable>
  );
}

export const WithAction: Story = {
  args: {
    message: "Item has been deleted.",
    variant: "success",
  },
  render: (args) => (
    <Banner {...args} action={<ActionLink color="#15803D" title="UNDO" />} />
  ),
};

export const WithActionVariants: Story = {
  render: () => (
    <View style={{ gap: 16, width: "100%" }}>
      <Banner
        action={<ActionLink color="#991B1B" title="RETRY" />}
        message="Failed to sync data."
        variant="error"
      />
      <Banner
        action={<ActionLink color="#15803D" title="VIEW" />}
        message="Your file has been uploaded."
        variant="success"
      />
      <Banner
        action={<ActionLink color="#A16207" title="DISMISS" />}
        message="Your session will expire in 5 minutes."
        variant="warning"
      />
      <Banner
        action={<ActionLink color="#1D4ED8" title="LEARN MORE" />}
        message="New features are available."
        variant="info"
      />
    </View>
  ),
};
