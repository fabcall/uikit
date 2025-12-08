import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { TextArea } from "./index";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: "Forms/TextArea",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <TextArea
          maxLength={500}
          onChangeText={setValue}
          placeholder="Enter your message"
          value={value}
        />
        <TextArea
          maxLength={200}
          onChangeText={() => {}}
          placeholder="Enter your comment"
          value="This is a pre-filled text area with some content."
        />
      </View>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>("");
    const [value3, setValue3] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <TextArea
          label="Description"
          maxLength={500}
          onChangeText={setValue1}
          placeholder="Enter description"
          value={value1}
        />
        <TextArea
          label="Comments"
          maxLength={300}
          onChangeText={setValue2}
          placeholder="Enter your comments"
          value={value2}
        />
        <TextArea
          disabled
          label="Disabled Field"
          maxLength={200}
          onChangeText={setValue3}
          placeholder="Cannot edit"
          value={value3}
        />
      </View>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>("");
    const [value3, setValue3] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <TextArea
          label="Description"
          maxLength={500}
          onChangeText={setValue1}
          placeholder="Enter description"
          required
          value={value1}
        />
        <TextArea
          label="Comments"
          maxLength={300}
          onChangeText={setValue2}
          placeholder="Enter your comments"
          required
          value={value2}
        />
        <TextArea
          error="This field is required"
          label="Required Field with Error"
          maxLength={500}
          onChangeText={setValue3}
          placeholder="Required field"
          required
          value={value3}
        />
      </View>
    );
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <TextArea
          maxLength={500}
          onChangeText={setValue}
          placeholder="What's on your mind?"
          value={value}
        />
        <TextArea
          maxLength={200}
          onChangeText={setValue}
          placeholder="Enter your feedback here..."
          value={value}
        />
      </View>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <TextArea
          error="This field is required"
          label="Required Field"
          maxLength={500}
          onChangeText={setValue}
          placeholder="Required field"
          required
          value={value}
        />
        <TextArea
          error="Message is too short. Please provide more details."
          label="Description"
          maxLength={500}
          onChangeText={setValue}
          placeholder="Enter description"
          required
          value="Short"
        />
        <TextArea
          error="Maximum character limit exceeded"
          label="Comments"
          maxLength={100}
          onChangeText={setValue}
          placeholder="Enter comments"
          required
          value="This is a very long text that exceeds the maximum character limit of 100 characters and should show an error message."
        />
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <TextArea
          disabled
          maxLength={500}
          onChangeText={() => {}}
          placeholder="Disabled text area"
          value=""
        />
        <TextArea
          disabled
          maxLength={500}
          onChangeText={() => {}}
          placeholder="Disabled with value"
          value="This text area is disabled and cannot be edited."
        />
        <TextArea
          disabled
          error="Error message"
          maxLength={500}
          onChangeText={() => {}}
          placeholder="Disabled with error"
          value=""
        />
      </View>
    );
  },
};

export const WithCharacterLimit: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>("");
    const longText =
      "This is a very long text that demonstrates how the character counter works when you approach or exceed the maximum limit. The counter will show the current count and the maximum allowed characters.";

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <TextArea
          label="Short Message (100 chars)"
          maxLength={100}
          onChangeText={setValue1}
          placeholder="Enter a short message"
          value={value1}
        />
        <TextArea
          label="Medium Message (200 chars)"
          maxLength={200}
          onChangeText={setValue2}
          placeholder="Enter a medium message"
          value={value2}
        />
        <TextArea
          label="Long Message (500 chars)"
          maxLength={500}
          onChangeText={() => {}}
          placeholder="Enter a long message"
          value={longText}
        />
      </View>
    );
  },
};

export const Resizable: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
          Resizable TextArea
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
          Drag the handle in the bottom-right corner to resize
        </Text>
        <TextArea
          label="Resizable (Default)"
          maxLength={500}
          onChangeText={setValue1}
          placeholder="Drag to resize"
          resizable
          value={value1}
        />
        <TextArea
          label="Custom Height Range"
          maxHeight={300}
          maxLength={500}
          minHeight={80}
          onChangeText={setValue2}
          placeholder="Custom min/max height"
          resizable
          value={value2}
        />
        <TextArea
          label="Non-Resizable"
          maxLength={500}
          onChangeText={setValue1}
          placeholder="Cannot resize"
          resizable={false}
          value={value1}
        />
      </View>
    );
  },
};

export const CustomHeight: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>("");
    const [value3, setValue3] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <TextArea
          label="Small (80px min)"
          maxHeight={200}
          maxLength={300}
          minHeight={80}
          onChangeText={setValue1}
          placeholder="Small text area"
          resizable
          value={value1}
        />
        <TextArea
          label="Medium (120px min)"
          maxHeight={300}
          maxLength={500}
          minHeight={120}
          onChangeText={setValue2}
          placeholder="Medium text area"
          resizable
          value={value2}
        />
        <TextArea
          label="Large (200px min)"
          maxHeight={500}
          maxLength={1000}
          minHeight={200}
          onChangeText={setValue3}
          placeholder="Large text area"
          resizable
          value={value3}
        />
      </View>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>(
      "This is a pre-filled text area with some content that demonstrates how it looks when there's already text in it.",
    );
    const [value3, setValue3] = useState<string>("");
    const [value4, setValue4] = useState<string>(
      "This text is very close to the character limit and should show a warning or highlight.",
    );

    return (
      <View style={{ gap: 20, padding: 20, width: "100%", maxWidth: 400 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Default</Text>
          <TextArea
            label="Default TextArea"
            maxLength={500}
            onChangeText={setValue1}
            placeholder="Default text area"
            value={value1}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>With Value</Text>
          <TextArea
            label="TextArea with Value"
            maxLength={500}
            onChangeText={setValue2}
            placeholder="Text area with value"
            value={value2}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>With Error</Text>
          <TextArea
            error="This field has an error"
            label="TextArea with Error"
            maxLength={500}
            onChangeText={setValue3}
            placeholder="Text area with error"
            value={value3}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Required</Text>
          <TextArea
            label="Required TextArea"
            maxLength={500}
            onChangeText={setValue1}
            placeholder="Required field"
            required
            value={value1}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Disabled</Text>
          <TextArea
            disabled
            maxLength={500}
            onChangeText={setValue4}
            placeholder="Disabled text area"
            value="Cannot edit this text area"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Near Character Limit
          </Text>
          <TextArea
            label="TextArea Near Limit"
            maxLength={100}
            onChangeText={setValue1}
            placeholder="Approaching limit"
            value={value4}
          />
        </View>
      </View>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <TextArea
          label="Long Content"
          maxLength={1000}
          onChangeText={() => {}}
          placeholder="Enter long content"
          value={longText}
        />
        <TextArea
          label="Scrollable Content"
          maxHeight={200}
          maxLength={1000}
          minHeight={120}
          onChangeText={() => {}}
          placeholder="Scrollable content"
          resizable
          value={longText}
        />
      </View>
    );
  },
};
