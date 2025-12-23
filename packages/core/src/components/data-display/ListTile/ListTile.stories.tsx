import { Check, CheckCircle, ExpandRight } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { Switch, View } from "react-native";

import { IconButton } from "../../actions/IconButton";
import { CircleAvatar } from "../CircleAvatar";
import { Icon } from "../Icon";
import { ListTile } from "./ListTile";


const meta: Meta<typeof ListTile> = {
  title: "DataDisplay/ListTile",
  component: ListTile,
  tags: ["autodocs"],
  args: {
    title: "List Item Title",
    subtitle: undefined,
    size: "md",
    isDisabled: false,
    showDivider: false,
    isSelected: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof ListTile>;

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: {
    title: "Primary Text",
    subtitle: "Secondary text that provides more context",
  },
};

export const Sizes: Story = {
  render: () => (
    <View>
      <ListTile showDivider size="sm" title="Small List Tile" />
      <ListTile showDivider size="md" title="Medium List Tile" />
      <ListTile size="lg" title="Large List Tile" />
    </View>
  ),
};

export const WithLeadingIcon: Story = {
  render: () => (
    <View>
      <ListTile
        leading={<Icon color="primary" icon={CheckCircle} size="md" />}
        showDivider
        subtitle="With leading icon"
        title="Settings"
      />
      <ListTile
        leading={<Icon color="success" icon={Check} size="md" />}
        subtitle="Ather item"
        title="Completed"
      />
    </View>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <View>
      <ListTile
        leading={<CircleAvatar name="John Doe" size="md" />}
        showDivider
        subtitle="john@example.com"
        title="John Doe"
      />
      <ListTile
        leading={<CircleAvatar name="Jane Smith" size="md" />}
        showDivider
        subtitle="jane@example.com"
        title="Jane Smith"
      />
      <ListTile
        leading={<CircleAvatar name="Bob Wilson" size="md" />}
        subtitle="bob@example.com"
        title="Bob Wilson"
      />
    </View>
  ),
};

export const WithTrailingIcon: Story = {
  render: () => (
    <View>
      <ListTile
        onPress={() => {}}
        showDivider
        subtitle="Tap to navigate"
        title="Navigate"
        trailing={<Icon color="textSecondary" icon={ExpandRight} size="md" />}
      />
      <ListTile
        onPress={() => {}}
        title="Another Item"
        trailing={<Icon color="textSecondary" icon={ExpandRight} size="md" />}
      />
    </View>
  ),
};

export const WithTrailingButton: Story = {
  render: () => (
    <View>
      <ListTile
        showDivider
        subtitle="Click the button"
        title="Action Item"
        trailing={
          <IconButton icon={Check} onPress={() => {}} size="sm" variant="ghost" />
        }
      />
    </View>
  ),
};

function WithSwitchExample(): React.JSX.Element {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <View>
      <ListTile
        showDivider
        subtitle="Receive push notifications"
        title="Notifications"
        trailing={
          <Switch onValueChange={setNotifications} value={notifications} />
        }
      />
      <ListTile
        showDivider
        subtitle="Use dark theme"
        title="Dark Mode"
        trailing={<Switch onValueChange={setDarkMode} value={darkMode} />}
      />
      <ListTile
        subtitle="Automatically update the app"
        title="Auto Update"
        trailing={<Switch onValueChange={setAutoUpdate} value={autoUpdate} />}
      />
    </View>
  );
}

export const WithSwitch: Story = {
  render: () => <WithSwitchExample />,
};

export const Pressable: Story = {
  render: () => (
    <View>
      <ListTile
        onPress={() => {}}
        showDivider
        subtitle="Tap me"
        title="Pressable Item"
      />
      <ListTile
        onPress={() => {}}
        showDivider
        subtitle="I'm also tappable"
        title="Another Pressable"
      />
      <ListTile subtitle="I'm not tappable" title="Not Pressable" />
    </View>
  ),
};

export const Selected: Story = {
  render: () => (
    <View>
      <ListTile
        isSelected
        onPress={() => {}}
        showDivider
        subtitle="This item is selected"
        title="Selected Item"
      />
      <ListTile
        onPress={() => {}}
        showDivider
        subtitle="This item is not selected"
        title="Normal Item"
      />
    </View>
  ),
};

export const Disabled: Story = {
  render: () => (
    <View>
      <ListTile
        isDisabled
        onPress={() => {}}
        showDivider
        subtitle="This item is disabled"
        title="Disabled Item"
      />
      <ListTile
        onPress={() => {}}
        subtitle="This item is enabled"
        title="Enabled Item"
      />
    </View>
  ),
};

function SelectableListExample(): React.JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>("1");

  const items = [
    { id: "1", title: "Option 1", subtitle: "First option" },
    { id: "2", title: "Option 2", subtitle: "Second option" },
    { id: "3", title: "Option 3", subtitle: "Third option" },
  ];

  return (
    <View>
      {items.map((item, index) => (
        <ListTile
          isSelected={selectedId === item.id}
          key={item.id}
          onPress={() => {
            setSelectedId(item.id);
          }}
          showDivider={index < items.length - 1}
          subtitle={item.subtitle}
          title={item.title}
          trailing={
            selectedId === item.id ? (
              <Icon color="primary" icon={Check} size="md" />
            ) : null
          }
        />
      ))}
    </View>
  );
}

export const SelectableList: Story = {
  render: () => <SelectableListExample />,
};

export const CompleteExample: Story = {
  render: () => (
    <View>
      <ListTile
        leading={<CircleAvatar name="Alice" size="md" />}
        onPress={() => {}}
        showDivider
        subtitle="Online"
        title="Alice Johnson"
        trailing={<Icon color="textSecondary" icon={ExpandRight} size="sm" />}
      />
      <ListTile
        leading={<CircleAvatar name="Bob" size="md" />}
        onPress={() => {}}
        showDivider
        subtitle="Last seen 5 min ago"
        title="Bob Smith"
        trailing={<Icon color="textSecondary" icon={ExpandRight} size="sm" />}
      />
      <ListTile
        isDisabled
        leading={<CircleAvatar name="Charlie" size="md" />}
        subtitle="Offline"
        title="Charlie Brown"
        trailing={<Icon color="textSecondary" icon={ExpandRight} size="sm" />}
      />
    </View>
  ),
};
