import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { Pressable,ScrollView, StyleSheet, Text, View } from "react-native";

import { ContextMenu } from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  title: "Overlay/ContextMenu",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

const localStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemText: {
    fontSize: 16,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  tooltip: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    maxWidth: 200,
  },
  tooltipText: {
    color: "white",
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  gridItem: {
    width: "48%",
  },
});

export const BasicUsage: Story = {
  render: () => {
    return (
      <View style={localStyles.container}>
        <Text style={localStyles.sectionTitle}>Basic Context Menu</Text>
        <Text style={localStyles.description}>
          Click the button to open a simple menu
        </Text>
        
        <ContextMenu>
          <ContextMenu.Trigger>
            <View style={localStyles.button}>
              <Text style={localStyles.buttonText}>Open Menu</Text>
            </View>
          </ContextMenu.Trigger>

          <ContextMenu.Content
            positioning={{
              placement: "bottom-start",
              offset: 8,
            }}
          >
            <View style={localStyles.menu}>
              <Pressable style={localStyles.menuItem}>
                <Text style={localStyles.menuItemText}>Edit</Text>
              </Pressable>
              <Pressable style={localStyles.menuItem}>
                <Text style={localStyles.menuItemText}>Duplicate</Text>
              </Pressable>
              <Pressable style={localStyles.menuItem}>
                <Text style={localStyles.menuItemText}>Archive</Text>
              </Pressable>
              <Pressable style={[localStyles.menuItem, localStyles.lastMenuItem]}>
                <Text style={[localStyles.menuItemText, { color: "#ff3b30" }]}>
                  Delete
                </Text>
              </Pressable>
            </View>
          </ContextMenu.Content>
        </ContextMenu>
      </View>
    );
  },
};

export const AllPlacements: Story = {
  render: () => {
    const placements = [
      { value: "top-start", label: "Top Start" },
      { value: "top", label: "Top" },
      { value: "top-end", label: "Top End" },
      { value: "bottom-start", label: "Bottom Start" },
      { value: "bottom", label: "Bottom" },
      { value: "bottom-end", label: "Bottom End" },
      { value: "left-start", label: "Left Start" },
      { value: "left", label: "Left" },
      { value: "left-end", label: "Left End" },
      { value: "right-start", label: "Right Start" },
      { value: "right", label: "Right" },
      { value: "right-end", label: "Right End" },
    ] as const;

    return (
      <ScrollView style={localStyles.container}>
        <Text style={localStyles.sectionTitle}>All 12 Placement Options</Text>
        <Text style={localStyles.description}>
          Collision detection is disabled to show exact placements.
          Scroll to see how each placement works in different positions.
        </Text>
        
        <View style={localStyles.grid}>
          {placements.map((placement) => (
            <View key={placement.value} style={localStyles.gridItem}>
              <ContextMenu>
                <ContextMenu.Trigger>
                  <View style={localStyles.button}>
                    <Text style={localStyles.buttonText}>{placement.label}</Text>
                  </View>
                </ContextMenu.Trigger>

                <ContextMenu.Content
                  positioning={{
                    placement: placement.value,
                    offset: 8,
                    collisionDetection: false, // Disable to show exact placement
                  }}
                >
                  <View style={localStyles.menu}>
                    <View style={localStyles.menuItem}>
                      <Text style={localStyles.menuItemText}>Option 1</Text>
                    </View>
                    <View style={[localStyles.menuItem, localStyles.lastMenuItem]}>
                      <Text style={localStyles.menuItemText}>Option 2</Text>
                    </View>
                  </View>
                </ContextMenu.Content>
              </ContextMenu>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  },
};

export const CollisionDetection: Story = {
  render: () => {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: "space-between", minHeight: 700 }}>
        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>Top of Screen</Text>
          <Text style={localStyles.description}>
            Requested top-start, but will flip to bottom-start due to collision
          </Text>
          <ContextMenu>
            <ContextMenu.Trigger>
              <View style={localStyles.button}>
                <Text style={localStyles.buttonText}>Open Menu (top-start)</Text>
              </View>
            </ContextMenu.Trigger>

            <ContextMenu.Content
              positioning={{
                placement: "top-start",
                collisionDetection: true,
              }}
            >
              <View style={localStyles.menu}>
                <View style={localStyles.menuItem}>
                  <Text style={localStyles.menuItemText}>Item 1</Text>
                </View>
                <View style={localStyles.menuItem}>
                  <Text style={localStyles.menuItemText}>Item 2</Text>
                </View>
                <View style={[localStyles.menuItem, localStyles.lastMenuItem]}>
                  <Text style={localStyles.menuItemText}>Item 3</Text>
                </View>
                <View style={[localStyles.menuItem, localStyles.lastMenuItem]}>
                  <Text style={localStyles.menuItemText}>Item 4</Text>
                </View>
              </View>
            </ContextMenu.Content>
          </ContextMenu>
        </View>

        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>Bottom of Screen</Text>
          <Text style={localStyles.description}>
            Requested bottom-start, but will flip to top-start due to collision
          </Text>
          <ContextMenu>
            <ContextMenu.Trigger>
              <View style={localStyles.button}>
                <Text style={localStyles.buttonText}>Open Menu (bottom-start)</Text>
              </View>
            </ContextMenu.Trigger>

            <ContextMenu.Content
              positioning={{
                placement: "bottom-start",
                collisionDetection: true,
              }}
            >
              <View style={localStyles.menu}>
                <View style={localStyles.menuItem}>
                  <Text style={localStyles.menuItemText}>Item 1</Text>
                </View>
                <View style={localStyles.menuItem}>
                  <Text style={localStyles.menuItemText}>Item 2</Text>
                </View>
                <View style={[localStyles.menuItem, localStyles.lastMenuItem]}>
                  <Text style={localStyles.menuItemText}>Item 3</Text>
                </View>
              </View>
            </ContextMenu.Content>
          </ContextMenu>
        </View>
      </View>
    );
  },
};

export const MatchTriggerWidth: Story = {
  render: () => {
    return (
      <View style={localStyles.container}>
        <Text style={localStyles.sectionTitle}>Match Trigger Width</Text>
        <Text style={localStyles.description}>
          Content automatically matches the width of the trigger (useful for dropdowns)
        </Text>

        <ContextMenu>
          <ContextMenu.Trigger>
            <View style={[localStyles.button, { width: 300 }]}>
              <Text style={localStyles.buttonText}>Wide Trigger (300px)</Text>
            </View>
          </ContextMenu.Trigger>

          <ContextMenu.Content
            positioning={{
              placement: "bottom-start",
              matchTriggerWidth: true,
              offset: 4,
            }}
          >
            <View style={localStyles.menu}>
              <View style={localStyles.menuItem}>
                <Text style={localStyles.menuItemText}>
                  Content matches trigger width
                </Text>
              </View>
              <View style={localStyles.menuItem}>
                <Text style={localStyles.menuItemText}>Option 2</Text>
              </View>
              <View style={[localStyles.menuItem, localStyles.lastMenuItem]}>
                <Text style={localStyles.menuItemText}>Option 3</Text>
              </View>
            </View>
          </ContextMenu.Content>
        </ContextMenu>
      </View>
    );
  },
};

export const MaxHeightScroll: Story = {
  render: () => {
    return (
      <View style={localStyles.container}>
        <Text style={localStyles.sectionTitle}>Max Height with Scroll</Text>
        <Text style={localStyles.description}>
          Content is limited to maxHeight with automatic scrolling
        </Text>

        <ContextMenu>
          <ContextMenu.Trigger>
            <View style={localStyles.button}>
              <Text style={localStyles.buttonText}>Many Items</Text>
            </View>
          </ContextMenu.Trigger>

          <ContextMenu.Content
            positioning={{
              placement: "bottom-start",
              maxHeight: 200,
            }}
          >
            <ScrollView style={localStyles.menu}>
              {Array.from({ length: 15 }, (_, i) => (
                <View
                  key={i}
                  style={[
                    localStyles.menuItem,
                    i === 14 && localStyles.lastMenuItem,
                  ]}
                >
                  <Text style={localStyles.menuItemText}>Item {i + 1}</Text>
                </View>
              ))}
            </ScrollView>
          </ContextMenu.Content>
        </ContextMenu>
      </View>
    );
  },
};

export const TooltipExample: Story = {
  render: () => {
    return (
      <View style={localStyles.container}>
        <Text style={localStyles.sectionTitle}>Tooltip Use Case</Text>
        <Text style={localStyles.description}>
          ContextMenu can be used to create tooltips with any placement
        </Text>
        
        <ContextMenu>
          <ContextMenu.Trigger>
            <View style={localStyles.button}>
              <Text style={localStyles.buttonText}>Hover me (Tooltip)</Text>
            </View>
          </ContextMenu.Trigger>

          <ContextMenu.Content
            positioning={{
              placement: "top",
              offset: 8,
            }}
            withBackdrop={false}
          >
            <View style={localStyles.tooltip}>
              <Text style={localStyles.tooltipText}>
                This is a helpful tooltip that provides additional information
              </Text>
            </View>
          </ContextMenu.Content>
        </ContextMenu>
      </View>
    );
  },
};

export const ControlledState: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <View style={localStyles.container}>
        <Text style={localStyles.sectionTitle}>Controlled State</Text>
        <Text style={localStyles.description}>
          Menu state can be controlled externally
        </Text>

        <View style={{ gap: 12 }}>
          <Pressable
            onPress={() => setOpen(!open)}
            style={[localStyles.button, { backgroundColor: "#34C759" }]}
          >
            <Text style={localStyles.buttonText}>
              {open ? "Close Menu" : "Open Menu"} (External Control)
            </Text>
          </Pressable>

          <ContextMenu open={open} onOpenChange={setOpen}>
            <ContextMenu.Trigger>
              <View style={localStyles.button}>
                <Text style={localStyles.buttonText}>Or Click Here</Text>
              </View>
            </ContextMenu.Trigger>

            <ContextMenu.Content
              positioning={{
                placement: "bottom-start",
                offset: 8,
              }}
            >
              <View style={localStyles.menu}>
                <Pressable
                  onPress={() => setOpen(false)}
                  style={localStyles.menuItem}
                >
                  <Text style={localStyles.menuItemText}>Close from inside</Text>
                </Pressable>
                <View style={[localStyles.menuItem, localStyles.lastMenuItem]}>
                  <Text style={localStyles.menuItemText}>Another option</Text>
                </View>
              </View>
            </ContextMenu.Content>
          </ContextMenu>

          <Text style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
            Current state: {open ? "OPEN" : "CLOSED"}
          </Text>
        </View>
      </View>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <View style={localStyles.container}>
        <Text style={localStyles.sectionTitle}>Custom Styling</Text>
        <Text style={localStyles.description}>
          Fully customizable appearance for any design system
        </Text>

        <ContextMenu>
          <ContextMenu.Trigger>
            <View
              style={[
                localStyles.button,
                {
                  backgroundColor: "#5856D6",
                  borderRadius: 20,
                  paddingHorizontal: 24,
                  paddingVertical: 14,
                },
              ]}
            >
              <Text style={[localStyles.buttonText, { fontSize: 16 }]}>
                Custom Styled Menu
              </Text>
            </View>
          </ContextMenu.Trigger>

          <ContextMenu.Content
            positioning={{
              placement: "bottom-start",
              offset: 12,
            }}
          >
            <View
              style={[
                localStyles.menu,
                {
                  backgroundColor: "#5856D6",
                  borderColor: "#5856D6",
                  borderRadius: 16,
                },
              ]}
            >
              <View style={localStyles.menuItem}>
                <Text style={[localStyles.menuItemText, { color: "white" }]}>
                  Custom Item 1
                </Text>
              </View>
              <View style={localStyles.menuItem}>
                <Text style={[localStyles.menuItemText, { color: "white" }]}>
                  Custom Item 2
                </Text>
              </View>
              <View style={[localStyles.menuItem, localStyles.lastMenuItem]}>
                <Text style={[localStyles.menuItemText, { color: "white" }]}>
                  Custom Item 3
                </Text>
              </View>
            </View>
          </ContextMenu.Content>
        </ContextMenu>
      </View>
    );
  },
};