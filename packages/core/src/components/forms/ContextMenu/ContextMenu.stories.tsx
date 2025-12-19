import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ContextMenu } from "./index";

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  title: "Overlay/ContextMenu",
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

// Componente auxiliar para botão
const TriggerButton = ({ children }: { children: string }) => (
  <View
    style={{
      backgroundColor: "#2962FF",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
    }}
  >
    <Text style={{ color: "#fff", fontWeight: "600" }}>{children}</Text>
  </View>
);

export const Default: Story = {
  render: () => {
    return (
      <View style={{ padding: 20, gap: 16, alignItems: "flex-start" }}>
        <ContextMenu
          content={
            <>
              <ContextMenu.Item label="Edit" onPress={() => console.log("Edit")} />
              <ContextMenu.Item label="Duplicate" onPress={() => console.log("Duplicate")} />
              <ContextMenu.Separator />
              <ContextMenu.Item
                destructive
                label="Delete"
                onPress={() => console.log("Delete")}
              />
            </>
          }
        >
          <TriggerButton>Open Menu</TriggerButton>
        </ContextMenu>
      </View>
    );
  },
};

export const AllPlacements: Story = {
  render: () => {
    return (
      <View
        style={{
          padding: 40,
          gap: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 16 }}>
          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option 1" />
                <ContextMenu.Item label="Option 2" />
                <ContextMenu.Item label="Option 3" />
              </>
            }
            placement="top-start"
          >
            <TriggerButton>Top Start</TriggerButton>
          </ContextMenu>

          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option 1" />
                <ContextMenu.Item label="Option 2" />
                <ContextMenu.Item label="Option 3" />
              </>
            }
            placement="top"
          >
            <TriggerButton>Top</TriggerButton>
          </ContextMenu>

          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option 1" />
                <ContextMenu.Item label="Option 2" />
                <ContextMenu.Item label="Option 3" />
              </>
            }
            placement="top-end"
          >
            <TriggerButton>Top End</TriggerButton>
          </ContextMenu>
        </View>

        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option 1" />
                <ContextMenu.Item label="Option 2" />
                <ContextMenu.Item label="Option 3" />
              </>
            }
            placement="left"
          >
            <TriggerButton>Left</TriggerButton>
          </ContextMenu>

          <View style={{ width: 100, height: 60 }} />

          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option 1" />
                <ContextMenu.Item label="Option 2" />
                <ContextMenu.Item label="Option 3" />
              </>
            }
            placement="right"
          >
            <TriggerButton>Right</TriggerButton>
          </ContextMenu>
        </View>

        <View style={{ flexDirection: "row", gap: 16 }}>
          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option 1" />
                <ContextMenu.Item label="Option 2" />
                <ContextMenu.Item label="Option 3" />
              </>
            }
            placement="bottom-start"
          >
            <TriggerButton>Bottom Start</TriggerButton>
          </ContextMenu>

          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option 1" />
                <ContextMenu.Item label="Option 2" />
                <ContextMenu.Item label="Option 3" />
              </>
            }
            placement="bottom"
          >
            <TriggerButton>Bottom</TriggerButton>
          </ContextMenu>

          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option 1" />
                <ContextMenu.Item label="Option 2" />
                <ContextMenu.Item label="Option 3" />
              </>
            }
            placement="bottom-end"
          >
            <TriggerButton>Bottom End</TriggerButton>
          </ContextMenu>
        </View>
      </View>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    return (
      <View style={{ padding: 20 }}>
        <ContextMenu
          content={
            <>
              <ContextMenu.Item
                icon={<Text>✏️</Text>}
                label="Edit"
                onPress={() => console.log("Edit")}
              />
              <ContextMenu.Item
                icon={<Text>📋</Text>}
                label="Copy"
                onPress={() => console.log("Copy")}
              />
              <ContextMenu.Item
                icon={<Text>📤</Text>}
                label="Share"
                onPress={() => console.log("Share")}
              />
              <ContextMenu.Separator />
              <ContextMenu.Item
                destructive
                icon={<Text>🗑️</Text>}
                label="Delete"
                onPress={() => console.log("Delete")}
              />
            </>
          }
        >
          <TriggerButton>Open Menu with Icons</TriggerButton>
        </ContextMenu>
      </View>
    );
  },
};

export const WithRightElements: Story = {
  render: () => {
    return (
      <View style={{ padding: 20 }}>
        <ContextMenu
          content={
            <>
              <ContextMenu.Item
                label="Cut"
                onPress={() => console.log("Cut")}
                rightElement={<Text style={{ color: "#666", fontSize: 12 }}>⌘X</Text>}
              />
              <ContextMenu.Item
                label="Copy"
                onPress={() => console.log("Copy")}
                rightElement={<Text style={{ color: "#666", fontSize: 12 }}>⌘C</Text>}
              />
              <ContextMenu.Item
                label="Paste"
                onPress={() => console.log("Paste")}
                rightElement={<Text style={{ color: "#666", fontSize: 12 }}>⌘V</Text>}
              />
              <ContextMenu.Separator />
              <ContextMenu.Item
                label="Select All"
                onPress={() => console.log("Select All")}
                rightElement={<Text style={{ color: "#666", fontSize: 12 }}>⌘A</Text>}
              />
            </>
          }
        >
          <TriggerButton>Keyboard Shortcuts</TriggerButton>
        </ContextMenu>
      </View>
    );
  },
};

export const LongPress: Story = {
  render: () => {
    return (
      <View style={{ padding: 20, gap: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          Long press the card below
        </Text>
        <ContextMenu
          content={
            <>
              <ContextMenu.Item label="Open" onPress={() => console.log("Open")} />
              <ContextMenu.Item
                label="Rename"
                onPress={() => console.log("Rename")}
              />
              <ContextMenu.Item
                label="Move to..."
                onPress={() => console.log("Move")}
              />
              <ContextMenu.Separator />
              <ContextMenu.Item
                destructive
                label="Delete"
                onPress={() => console.log("Delete")}
              />
            </>
          }
          triggerAction="longPress"
        >
          <View
            style={{
              padding: 16,
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
              Document.pdf
            </Text>
            <Text style={{ fontSize: 14, color: "#666" }}>2.4 MB • Modified yesterday</Text>
          </View>
        </ContextMenu>
      </View>
    );
  },
};

export const ControlledMenu: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View style={{ padding: 20, gap: 16 }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View
            style={{
              backgroundColor: "#2962FF",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text
              onPress={() => setVisible(true)}
              style={{ color: "#fff", fontWeight: "600" }}
            >
              Open Menu
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#666",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text
              onPress={() => setVisible(false)}
              style={{ color: "#fff", fontWeight: "600" }}
            >
              Close Menu
            </Text>
          </View>
        </View>

        <ContextMenu
          content={
            <>
              <ContextMenu.Item label="Option 1" />
              <ContextMenu.Item label="Option 2" />
              <ContextMenu.Item label="Option 3" />
            </>
          }
          onVisibleChange={setVisible}
          visible={visible}
        >
          <View
            style={{
              padding: 16,
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              alignSelf: "flex-start",
            }}
          >
            <Text>Trigger Element</Text>
          </View>
        </ContextMenu>

        <Text style={{ marginTop: 8, color: "#666" }}>
          Menu is {visible ? "open" : "closed"}
        </Text>
      </View>
    );
  },
};

export const DisabledItems: Story = {
  render: () => {
    return (
      <View style={{ padding: 20 }}>
        <ContextMenu
          content={
            <>
              <ContextMenu.Item label="Available Option" />
              <ContextMenu.Item disabled label="Disabled Option" />
              <ContextMenu.Item label="Another Available" />
              <ContextMenu.Separator />
              <ContextMenu.Item disabled label="Can't do this" />
            </>
          }
        >
          <TriggerButton>Menu with Disabled Items</TriggerButton>
        </ContextMenu>
      </View>
    );
  },
};

export const NoArrow: Story = {
  render: () => {
    return (
      <View style={{ padding: 20 }}>
        <ContextMenu
          content={
            <>
              <ContextMenu.Item label="Option 1" />
              <ContextMenu.Item label="Option 2" />
              <ContextMenu.Item label="Option 3" />
            </>
          }
          showArrow={false}
        >
          <TriggerButton>Menu without Arrow</TriggerButton>
        </ContextMenu>
      </View>
    );
  },
};

export const EdgeDetection: Story = {
  render: () => {
    return (
      <View style={{ padding: 20, gap: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          Menus automaticamente ajustam posição nas bordas
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="This menu" />
                <ContextMenu.Item label="Should flip" />
                <ContextMenu.Item label="To the right" />
                <ContextMenu.Item label="If needed" />
              </>
            }
            placement="left"
          >
            <TriggerButton>Near Left Edge</TriggerButton>
          </ContextMenu>

          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="This menu" />
                <ContextMenu.Item label="Should flip" />
                <ContextMenu.Item label="To the left" />
                <ContextMenu.Item label="If needed" />
              </>
            }
            placement="right"
          >
            <TriggerButton>Near Right Edge</TriggerButton>
          </ContextMenu>
        </View>

        <ContextMenu
          content={
            <>
              <ContextMenu.Item label="This menu" />
              <ContextMenu.Item label="Should flip" />
              <ContextMenu.Item label="To bottom" />
              <ContextMenu.Item label="If needed" />
            </>
          }
          placement="top"
        >
          <TriggerButton>Near Top Edge</TriggerButton>
        </ContextMenu>
      </View>
    );
  },
};

export const AsTooltip: Story = {
  render: () => {
    return (
      <View style={{ padding: 20, gap: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          ContextMenu usado como Tooltip
        </Text>

        <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
          <ContextMenu
            closeOnSelect={false}
            content={
              <View style={{ padding: 8 }}>
                <Text style={{ fontSize: 14 }}>This is a helpful tooltip</Text>
              </View>
            }
            placement="top"
          >
            <View
              style={{
                backgroundColor: "#2962FF",
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>?</Text>
            </View>
          </ContextMenu>

          <ContextMenu
            closeOnSelect={false}
            content={
              <View style={{ padding: 8 }}>
                <Text style={{ fontSize: 14 }}>Click for more info</Text>
              </View>
            }
            placement="bottom"
          >
            <View
              style={{
                backgroundColor: "#FF6B6B",
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>i</Text>
            </View>
          </ContextMenu>

          <ContextMenu
            closeOnSelect={false}
            content={
              <View style={{ padding: 8, maxWidth: 200 }}>
                <Text style={{ fontSize: 14 }}>
                  This is a longer tooltip with more information that wraps to multiple lines
                </Text>
              </View>
            }
            placement="right"
          >
            <View
              style={{
                backgroundColor: "#4CAF50",
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>!</Text>
            </View>
          </ContextMenu>
        </View>
      </View>
    );
  },
};

export const AsDropdown: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("Option 1");

    return (
      <View style={{ padding: 20, gap: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          ContextMenu usado como Dropdown Select
        </Text>

        <ContextMenu
          content={
            <>
              <ContextMenu.Item
                label="Option 1"
                onPress={() => setSelectedOption("Option 1")}
                rightElement={
                  selectedOption === "Option 1" ? <Text>✓</Text> : undefined
                }
              />
              <ContextMenu.Item
                label="Option 2"
                onPress={() => setSelectedOption("Option 2")}
                rightElement={
                  selectedOption === "Option 2" ? <Text>✓</Text> : undefined
                }
              />
              <ContextMenu.Item
                label="Option 3"
                onPress={() => setSelectedOption("Option 3")}
                rightElement={
                  selectedOption === "Option 3" ? <Text>✓</Text> : undefined
                }
              />
              <ContextMenu.Separator />
              <ContextMenu.Item
                label="Option 4"
                onPress={() => setSelectedOption("Option 4")}
                rightElement={
                  selectedOption === "Option 4" ? <Text>✓</Text> : undefined
                }
              />
            </>
          }
          placement="bottom-start"
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              backgroundColor: "#fff",
              minWidth: 200,
            }}
          >
            <Text>{selectedOption}</Text>
            <Text>▼</Text>
          </View>
        </ContextMenu>

        <Text style={{ color: "#666", marginTop: 8 }}>
          Selected: {selectedOption}
        </Text>
      </View>
    );
  },
};

export const ComplexMenu: Story = {
  render: () => {
    return (
      <View style={{ padding: 20 }}>
        <ContextMenu
          content={
            <>
              <ContextMenu.Item
                icon={<Text>👤</Text>}
                label="Profile"
                onPress={() => console.log("Profile")}
              />
              <ContextMenu.Item
                icon={<Text>⚙️</Text>}
                label="Settings"
                onPress={() => console.log("Settings")}
              />
              <ContextMenu.Separator />
              <ContextMenu.Item
                icon={<Text>🌙</Text>}
                label="Dark Mode"
                onPress={() => console.log("Dark Mode")}
                rightElement={
                  <View
                    style={{
                      width: 40,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: "#4CAF50",
                    }}
                  />
                }
              />
              <ContextMenu.Item
                icon={<Text>🔔</Text>}
                label="Notifications"
                onPress={() => console.log("Notifications")}
                rightElement={
                  <View
                    style={{
                      backgroundColor: "#FF6B6B",
                      borderRadius: 10,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 10 }}>3</Text>
                  </View>
                }
              />
              <ContextMenu.Separator />
              <ContextMenu.Item
                icon={<Text>❓</Text>}
                label="Help & Support"
                onPress={() => console.log("Help")}
              />
              <ContextMenu.Item
                disabled
                icon={<Text>🎁</Text>}
                label="Premium (Coming Soon)"
              />
              <ContextMenu.Separator />
              <ContextMenu.Item
                destructive
                icon={<Text>🚪</Text>}
                label="Sign Out"
                onPress={() => console.log("Sign Out")}
              />
            </>
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#2962FF",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>My Account</Text>
            <Text style={{ color: "#fff" }}>▼</Text>
          </View>
        </ContextMenu>
      </View>
    );
  },
};

export const ResponsiveBehavior: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View style={{ padding: 20, gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
          Comportamento Reativo
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
          Abra o menu e depois rotacione o dispositivo. O menu se reposiciona
          automaticamente para permanecer visível.
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option 1" />
                <ContextMenu.Item label="Option 2" />
                <ContextMenu.Item label="Option 3" />
                <ContextMenu.Item label="Option 4" />
                <ContextMenu.Item label="Option 5" />
              </>
            }
            onVisibleChange={setVisible}
            placement="bottom-start"
            visible={visible}
          >
            <TriggerButton>Left Corner Menu</TriggerButton>
          </ContextMenu>

          <ContextMenu
            content={
              <>
                <ContextMenu.Item label="Option A" />
                <ContextMenu.Item label="Option B" />
                <ContextMenu.Item label="Option C" />
                <ContextMenu.Item label="Option D" />
                <ContextMenu.Item label="Option E" />
              </>
            }
            placement="bottom-end"
          >
            <TriggerButton>Right Corner Menu</TriggerButton>
          </ContextMenu>
        </View>

        <Text style={{ fontSize: 12, color: "#999", marginTop: 16 }}>
          💡 O menu usa useDimensions() para reagir a mudanças de orientação
        </Text>
      </View>
    );
  },
};