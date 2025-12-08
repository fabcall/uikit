import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View } from "react-native";

import { Button } from "../../actions/Button";
import { Text } from "../../data-display/Text";
import { Dialog } from "./Dialog";

function StoryWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        padding: 24,
      }}
    >
      {children}
    </View>
  );
}

const meta: Meta<typeof Dialog> = {
  title: "Surfaces/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
    },
    dismissible: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function DefaultDialogExample(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <StoryWrapper>
      <Button
        onPress={() => {
          setOpen(true);
        }}
        title="Open Dialog"
      />
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Dialog.Title>Confirm Action</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to proceed with this action? This cannot be
          undone.
        </Dialog.Description>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="Cancel"
            variant="ghost"
          />
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="Confirm"
          />
        </Dialog.Actions>
      </Dialog>
    </StoryWrapper>
  );
}

export const Default: Story = {
  render: () => <DefaultDialogExample />,
};

function AlertDialogExample(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <StoryWrapper>
      <Button
        color="secondary"
        onPress={() => {
          setOpen(true);
        }}
        title="Show Alert"
      />
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Dialog.Title>Warning</Dialog.Title>
        <Dialog.Description>
          You are about to delete this item permanently. This action cannot be
          reversed.
        </Dialog.Description>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="Cancel"
            variant="outline"
          />
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="Delete"
          />
        </Dialog.Actions>
      </Dialog>
    </StoryWrapper>
  );
}

export const Alert: Story = {
  render: () => <AlertDialogExample />,
};

function NonDismissibleDialogExample(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <StoryWrapper>
      <Button
        onPress={() => {
          setOpen(true);
        }}
        title="Open Non-Dismissible"
      />
      <Dialog
        dismissible={false}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Dialog.Title>Terms and Conditions</Dialog.Title>
        <Dialog.Description>
          You must accept the terms and conditions to continue using this
          application.
        </Dialog.Description>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="Accept"
          />
        </Dialog.Actions>
      </Dialog>
    </StoryWrapper>
  );
}

export const NonDismissible: Story = {
  render: () => <NonDismissibleDialogExample />,
};

function WithCustomContentExample(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <StoryWrapper>
      <Button
        onPress={() => {
          setOpen(true);
        }}
        title="Open with Custom Content"
      />
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Dialog.Title>Settings</Dialog.Title>
        <Dialog.Content>
          <View style={{ gap: 16 }}>
            <View>
              <Text color="primary" variant="body">
                Notifications
              </Text>
              <Text color="secondary" variant="caption">
                Enable push notifications for updates
              </Text>
            </View>
            <View>
              <Text color="primary" variant="body">
                Dark Mode
              </Text>
              <Text color="secondary" variant="caption">
                Switch between light and dark themes
              </Text>
            </View>
            <View>
              <Text color="primary" variant="body">
                Language
              </Text>
              <Text color="secondary" variant="caption">
                Select your preferred language
              </Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="Cancel"
            variant="ghost"
          />
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="Save"
          />
        </Dialog.Actions>
      </Dialog>
    </StoryWrapper>
  );
}

export const WithCustomContent: Story = {
  render: () => <WithCustomContentExample />,
};

function ActionsAlignmentExample(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<
    "start" | "center" | "end" | "space-between"
  >("end");

  const nextAlign = (): void => {
    const alignments: ("start" | "center" | "end" | "space-between")[] = [
      "start",
      "center",
      "end",
      "space-between",
    ];
    const currentIndex = alignments.indexOf(align);
    setAlign(alignments[(currentIndex + 1) % alignments.length]);
  };

  return (
    <StoryWrapper>
      <View style={{ gap: 12 }}>
        <Button
          onPress={() => {
            setOpen(true);
          }}
          title="Open Dialog"
        />
        <Button
          onPress={nextAlign}
          title={`Align: ${align}`}
          variant="outline"
        />
      </View>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Dialog.Title>Actions Alignment</Dialog.Title>
        <Dialog.Description>
          {`The action buttons are aligned to "${align}".`}
        </Dialog.Description>
        <Dialog.Actions align={align}>
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="Cancel"
            variant="ghost"
          />
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="Confirm"
          />
        </Dialog.Actions>
      </Dialog>
    </StoryWrapper>
  );
}

export const ActionsAlignment: Story = {
  render: () => <ActionsAlignmentExample />,
};

function SimpleInfoDialogExample(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <StoryWrapper>
      <Button
        onPress={() => {
          setOpen(true);
        }}
        title="Show Info"
        variant="outline"
      />
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Dialog.Title>Information</Dialog.Title>
        <Dialog.Description>
          Your changes have been saved successfully.
        </Dialog.Description>
        <Dialog.Actions align="center">
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title="OK"
          />
        </Dialog.Actions>
      </Dialog>
    </StoryWrapper>
  );
}

export const SimpleInfo: Story = {
  render: () => <SimpleInfoDialogExample />,
};
