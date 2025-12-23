import { Bell, Calendar, File, Home, MapMarker, User } from "@readykit/icons";
import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { View } from "react-native";

import { TabBar } from "./TabBar";

const meta = {
  title: "Navigation/TabBar",
  component: TabBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta;

type Story = StoryObj<typeof meta>;

const TAB_CONFIG = [
  {
    id: "home",
    icon: ({ color, size }: { color: string; size: number }) => (
      <Home fill={color} size={size} />
    ),
    label: "Home",
  },
  {
    id: "findShifts",
    icon: ({ color, size }: { color: string; size: number }) => (
      <MapMarker fill={color} size={size} />
    ),
    label: "Find shifts",
  },
  {
    id: "schedule",
    icon: ({ color, size }: { color: string; size: number }) => (
      <Calendar fill={color} size={size} />
    ),
    label: "Schedule",
  },
  {
    id: "activity",
    icon: ({ color, size }: { color: string; size: number }) => (
      <File fill={color} size={size} />
    ),
    label: "Activity",
  },
  {
    id: "profile",
    icon: ({ color, size }: { color: string; size: number }) => (
      <User fill={color} size={size} />
    ),
    label: "Profile",
  },
];

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => {
    const [activeTab, setActiveTab] = useState("home");

    return (
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TabBar
          gradientColors={["#2962FF1A", "#FFFFFF00"]}
          activeTintColor="#2962FF"
          inactiveTintColor="#9CA3AF"
          activeLabelColor="#2962FF"
          inactiveLabelColor="#101828"
        >
          {TAB_CONFIG.map((tab) => (
            <TabBar.Item
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              focused={activeTab === tab.id}
              onPress={() => setActiveTab(tab.id)}
            />
          ))}
        </TabBar>
      </View>
    );
  },
};

export const WithBadges: Story = {
  args: {
    children: null,
  },
  render: () => {
    const [activeTab, setActiveTab] = useState("home");

    return (
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TabBar
          gradientColors={["#2962FF1A", "#FFFFFF00"]}
          activeTintColor="#2962FF"
          inactiveTintColor="#9CA3AF"
          activeLabelColor="#2962FF"
          inactiveLabelColor="#101828"
        >
          <TabBar.Item
            icon={({ color, size }) => (
              <Home fill={color} size={size} />
            )}
            label="Home"
            focused={activeTab === "home"}
            onPress={() => setActiveTab("home")}
          />
          <TabBar.Item
            icon={({ color, size }) => (
              <Bell fill={color} size={size} />
            )}
            label="Notifications"
            badge={12}
            focused={activeTab === "notifications"}
            onPress={() => setActiveTab("notifications")}
          />
          <TabBar.Item
            icon={({ color, size }) => (
              <Calendar fill={color} size={size} />
            )}
            label="Schedule"
            badge="NEW"
            focused={activeTab === "schedule"}
            onPress={() => setActiveTab("schedule")}
          />
          <TabBar.Item
            icon={({ color, size }) => (
              <User fill={color} size={size} />
            )}
            label="Profile"
            badge={true}
            focused={activeTab === "profile"}
            onPress={() => setActiveTab("profile")}
          />
        </TabBar>
      </View>
    );
  },
};
