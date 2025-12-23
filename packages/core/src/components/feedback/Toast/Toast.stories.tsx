import { Upload } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { Button, ScrollView, Text, View } from "react-native";

import { Toast } from "./Toast";
import type { ToastDuration, ToastVariant } from "./Toast.props";
import { ToastContainer } from "./ToastContainer";

function StoryWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <ToastContainer />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
          padding: 24,
          paddingTop: 100,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

function ToastButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}): React.JSX.Element {
  return (
    <View style={{ marginVertical: 8, minWidth: 200 }}>
      <Button onPress={onPress} title={label} />
    </View>
  );
}

const meta: Meta = {
  title: "Feedback/Toast",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StoryWrapper>
      <ToastButton
        label="Show Toast"
        onPress={() => {
          Toast.show({
            title: "Hello!",
            message: "This is a default toast notification.",
          });
        }}
      />
    </StoryWrapper>
  ),
};

export const Variants: Story = {
  render: () => {
    const variants: ToastVariant[] = [
      "success",
      "error",
      "warning",
      "info",
      "none",
    ];

    return (
      <StoryWrapper>
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Toast Variants
          </Text>
          {variants.map((variant) => (
            <ToastButton
              key={variant}
              label={`Show ${variant}`}
              onPress={() => {
                Toast.show({
                  title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
                  message: `This is a ${variant} toast message.`,
                  variant,
                });
              }}
            />
          ))}
        </View>
      </StoryWrapper>
    );
  },
};

export const Success: Story = {
  render: () => (
    <StoryWrapper>
      <ToastButton
        label="Show Success Toast"
        onPress={() => {
          Toast.show({
            title: "Success!",
            message: "Your action was completed successfully.",
            variant: "success",
          });
        }}
      />
    </StoryWrapper>
  ),
};

export const Error: Story = {
  render: () => (
    <StoryWrapper>
      <ToastButton
        label="Show Error Toast"
        onPress={() => {
          Toast.show({
            title: "Error",
            message: "Something went wrong. Please try again.",
            variant: "error",
          });
        }}
      />
    </StoryWrapper>
  ),
};

export const Warning: Story = {
  render: () => (
    <StoryWrapper>
      <ToastButton
        label="Show Warning Toast"
        onPress={() => {
          Toast.show({
            title: "Warning",
            message: "Please review your input before proceeding.",
            variant: "warning",
          });
        }}
      />
    </StoryWrapper>
  ),
};

export const Info: Story = {
  render: () => (
    <StoryWrapper>
      <ToastButton
        label="Show Info Toast"
        onPress={() => {
          Toast.show({
            title: "Information",
            message: "Here is some helpful information for you.",
            variant: "info",
          });
        }}
      />
    </StoryWrapper>
  ),
};

export const Durations: Story = {
  render: () => {
    const durations: { value: ToastDuration; label: string }[] = [
      { value: "short", label: "Short (3s)" },
      { value: "long", label: "Long (5s)" },
      { value: "infinite", label: "Infinite (swipe to dismiss)" },
    ];

    return (
      <StoryWrapper>
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Toast Durations
          </Text>
          {durations.map(({ value, label }) => (
            <ToastButton
              key={value}
              label={label}
              onPress={() => {
                Toast.show({
                  title: `Duration: ${value}`,
                  message:
                    value === "infinite"
                      ? "Swipe up to dismiss this toast."
                      : `This toast will auto-dismiss.`,
                  variant: "info",
                  duration: value,
                });
              }}
            />
          ))}
        </View>
      </StoryWrapper>
    );
  },
};

export const TitleOnly: Story = {
  render: () => (
    <StoryWrapper>
      <ToastButton
        label="Show Title Only Toast"
        onPress={() => {
          Toast.show({
            title: "Quick notification!",
            variant: "success",
          });
        }}
      />
    </StoryWrapper>
  ),
};

export const LongMessage: Story = {
  render: () => (
    <StoryWrapper>
      <ToastButton
        label="Show Long Message Toast"
        onPress={() => {
          Toast.show({
            title: "Important Update",
            message:
              "This is a longer message that demonstrates how the toast handles extended text content. The message should truncate appropriately.",
            variant: "info",
            duration: "long",
          });
        }}
      />
    </StoryWrapper>
  ),
};

export const WithCallback: Story = {
  render: () => (
    <StoryWrapper>
      <View style={{ gap: 8 }}>
        <ToastButton
          label="Toast with onTap"
          onPress={() => {
            Toast.show({
              title: "Tap me!",
              message: "Tap this toast to trigger an action.",
              variant: "info",
              duration: "long",
              onTap: () => {
                Toast.show({
                  title: "Tapped!",
                  message: "You tapped the previous toast.",
                  variant: "success",
                });
              },
            });
          }}
        />
        <ToastButton
          label="Toast with onDismiss"
          onPress={() => {
            Toast.show({
              title: "Watch for dismiss",
              message: "A new toast will appear when this one is dismissed.",
              variant: "warning",
              duration: "short",
              onDismiss: () => {
                Toast.show({
                  title: "Dismissed!",
                  message: "The previous toast was dismissed.",
                  variant: "info",
                });
              },
            });
          }}
        />
      </View>
    </StoryWrapper>
  ),
};

export const NonDismissible: Story = {
  render: () => (
    <StoryWrapper>
      <ToastButton
        label="Show Non-Dismissible Toast"
        onPress={() => {
          Toast.show({
            title: "Cannot swipe away",
            message: "This toast can only be dismissed by timeout.",
            variant: "warning",
            duration: "long",
            dismissible: false,
          });
        }}
      />
    </StoryWrapper>
  ),
};

export const StackedToasts: Story = {
  render: () => {
    let count = 0;
    const variants: ToastVariant[] = ["success", "error", "warning", "info"];

    return (
      <StoryWrapper>
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Stacked Toasts
          </Text>
          <ToastButton
            label="Add Toast to Stack"
            onPress={() => {
              count++;
              const variant = variants[count % variants.length];
              Toast.show({
                title: `Toast #${count}`,
                message: `This is toast number ${count} in the stack.`,
                variant,
                duration: "long",
              });
            }}
          />
          <ToastButton
            label="Add 3 Toasts Quickly"
            onPress={() => {
              [100, 200, 300].forEach((delay, i) => {
                setTimeout(() => {
                  count++;
                  Toast.show({
                    title: `Toast #${count}`,
                    message: `Added with ${delay}ms delay.`,
                    variant: variants[i % variants.length],
                    duration: "long",
                  });
                }, delay);
              });
            }}
          />
          <ToastButton
            label="Dismiss All"
            onPress={() => {
              Toast.dismissAll();
            }}
          />
        </View>
      </StoryWrapper>
    );
  },
};

export const CustomIcon: Story = {
  render: () => (
    <StoryWrapper>
      <ToastButton
        label="Show Toast with Custom Icon"
        onPress={() => {
          Toast.show({
            title: "Custom Icon",
            message: "This toast has a custom upload icon.",
            icon: Upload,
            duration: "long",
          });
        }}
      />
    </StoryWrapper>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <StoryWrapper>
      <View style={{ gap: 8 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Real World Examples
        </Text>
        <ToastButton
          label="File Uploaded"
          onPress={() => {
            Toast.show({
              title: "Upload Complete",
              message: "Your file has been uploaded successfully.",
              variant: "success",
            });
          }}
        />
        <ToastButton
          label="Network Error"
          onPress={() => {
            Toast.show({
              title: "Connection Lost",
              message: "Please check your internet connection and try again.",
              variant: "error",
              duration: "long",
            });
          }}
        />
        <ToastButton
          label="Session Expiring"
          onPress={() => {
            Toast.show({
              title: "Session Expiring Soon",
              message: "Your session will expire in 5 minutes.",
              variant: "warning",
              duration: "long",
            });
          }}
        />
        <ToastButton
          label="New Message"
          onPress={() => {
            Toast.show({
              title: "New Message",
              message: "You have received a new message from John.",
              variant: "info",
              onTap: () => {
                Toast.show({
                  title: "Opening chat...",
                  variant: "none",
                });
              },
            });
          }}
        />
        <ToastButton
          label="Undo Action"
          onPress={() => {
            Toast.show({
              title: "Item Deleted",
              message: "Tap to undo this action.",
              variant: "none",
              duration: "long",
              onTap: () => {
                Toast.show({
                  title: "Action Undone",
                  message: "The item has been restored.",
                  variant: "success",
                });
              },
            });
          }}
        />
      </View>
    </StoryWrapper>
  ),
};
