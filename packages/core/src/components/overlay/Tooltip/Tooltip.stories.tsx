import { type Meta, type StoryObj } from "@storybook/react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

// 1. Placement Bottom
export const PlacementTop: Story = {
  args: {
    content: "This is an informative tooltip.",
    placement: "top",
  },
  render: (args) => (
    <View style={styles.center}>
      <Tooltip {...args}>
        <View style={styles.button}>
          <Text>Tap me</Text>
        </View>
      </Tooltip>
    </View>
  ),
};

// 2. Placement Bottom
export const PlacementBottom: Story = {
  args: {
    content: "Tooltip appears below the element.",
    placement: "bottom",
  },
  render: (args) => (
    <View style={styles.center}>
      <Tooltip {...args}>
        <View style={styles.button}>
          <Text>↓ Bottom</Text>
        </View>
      </Tooltip>
    </View>
  ),
};

// 3. Placement Right
export const PlacementRight: Story = {
  args: {
    content: "Tooltip appears to the right.",
    placement: "right",
  },
  render: (args) => (
    <View style={styles.leftContainer}>
      <Tooltip {...args}>
        <View style={styles.button}>
          <Text>→ Right</Text>
        </View>
      </Tooltip>
    </View>
  ),
};

// 4. Placement Left
export const PlacementLeft: Story = {
  args: {
    content: "Tooltip appears to the left.",
    placement: "left",
  },
  render: (args) => (
    <View style={styles.rightContainer}>
      <Tooltip {...args}>
        <View style={styles.button}>
          <Text>← Left</Text>
        </View>
      </Tooltip>
    </View>
  ),
};

// 5. Long Text
export const LongText: Story = {
  args: {
    content:
      "This is a longer tooltip text that demonstrates how the tooltip handles multiple lines of content. It should wrap nicely within the max width constraint.",
    placement: "bottom",
  },
  render: (args) => (
    <View style={[styles.center, { alignSelf: "center" }]}>
      <Tooltip {...args}>
        <View style={styles.button}>
          <Text>Long Text</Text>
        </View>
      </Tooltip>
    </View>
  ),
};

// 6. Rich Content
export const RichContent: Story = {
  args: {
    placement: "bottom",
  },
  render: (args) => (
    <View style={[styles.center, { alignSelf: "center" }]}>
      <Tooltip
        {...args}
        content={
          <View>
            <Text style={styles.richTitle}>Tooltip Title</Text>
            <Text style={styles.richDesc}>
              This tooltip contains custom rich content with multiple elements.
            </Text>
            <View style={styles.richDivider} />
            <Text style={styles.richDesc}>
              You can add any React components here.
            </Text>
          </View>
        }
      >
        <View style={styles.button}>
          <Text>Rich Content</Text>
        </View>
      </Tooltip>
    </View>
  ),
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  topContainer: {
    paddingTop: 20,
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Rich content styles
  richTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  richDesc: {
    color: "#D1D5DB",
    fontSize: 14,
    marginBottom: 4,
  },
  richDivider: {
    height: 1,
    backgroundColor: "#4B5563",
    marginVertical: 8,
  },
});
