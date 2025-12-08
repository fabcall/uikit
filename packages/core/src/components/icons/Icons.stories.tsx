import {
  AngleDown,
  AngleLeft,
  AngleRight,
  AngleUp,
  Bell,
  Calendar,
  Check,
  CheckCircle,
  Download,
  ExclamationCircle,
  ExclamationTriangle,
  ExpandArrows,
  ExpandLeft,
  ExpandRight,
  File,
  Home,
  MapMarker,
  Upload,
  User,
} from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React, { type ComponentType, memo } from "react";
import {
  type DimensionValue,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { type SvgProps } from "react-native-svg";

import { Icon, type IconSize, type ThemeColor } from "../data-display/Icon";

interface IconItemProps {
  IconComponent: ComponentType<SvgProps>;
  color?: ThemeColor;
  size?: IconSize;
  label: string;
  showLabel?: boolean;
}

function StoryWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 24, alignItems: "center" }}
    >
      {children}
    </ScrollView>
  );
}

const IconItem = memo(
  ({
    IconComponent,
    color = "textPrimary",
    size = "md",
    label,
    showLabel = true,
    width = 100,
  }: IconItemProps & { width?: DimensionValue }) => (
    <View style={{ width, alignItems: "center", marginBottom: 24, gap: 8 }}>
      <Icon color={color} icon={IconComponent} size={size} />
      {showLabel && (
        <Text
          numberOfLines={1}
          style={{ fontSize: 10, color: "#666", textAlign: "center" }}
        >
          {label}
        </Text>
      )}
    </View>
  ),
);

const meta: Meta = {
  title: "Icons/Catalog",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const ICONS = [
  { IconComponent: AngleLeft, name: "AngleLeft" },
  { IconComponent: AngleRight, name: "AngleRight" },
  { IconComponent: AngleUp, name: "AngleUp" },
  { IconComponent: AngleDown, name: "AngleDown" },
  { IconComponent: Bell, name: "Bell" },
  { IconComponent: Calendar, name: "Calendar" },
  { IconComponent: Check, name: "Check" },
  { IconComponent: CheckCircle, name: "CheckCircle" },
  { IconComponent: Download, name: "Download" },
  { IconComponent: ExclamationCircle, name: "ExclamationCircle" },
  { IconComponent: ExclamationTriangle, name: "ExclamationTriangle" },
  { IconComponent: ExpandArrows, name: "ExpandArrows" },
  { IconComponent: ExpandLeft, name: "ExpandLeft" },
  { IconComponent: ExpandRight, name: "ExpandRight" },
  { IconComponent: File, name: "File" },
  { IconComponent: Home, name: "Home" },
  { IconComponent: MapMarker, name: "MapMarker" },
  { IconComponent: Upload, name: "Upload" },
  { IconComponent: User, name: "User" },
];

export const AllIcons: Story = {
  render: () => {
    const { width } = useWindowDimensions();
    const itemWidth = 90;
    const padding = 48;
    const numColumns = Math.floor((width - padding) / itemWidth);

    return (
      <StoryWrapper>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: numColumns * itemWidth,
          }}
        >
          {ICONS.map(({ IconComponent, name }) => (
            <IconItem
              key={name}
              IconComponent={IconComponent}
              label={name}
              width={itemWidth}
            />
          ))}
        </View>
      </StoryWrapper>
    );
  },
};
