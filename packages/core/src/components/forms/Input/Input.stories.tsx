import { Search } from "@readykit/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useRef, useState } from "react";
import type { TextInput } from "react-native";
import { Text, View } from "react-native";

import { Icon } from "../../data-display/Icon";
import { Input } from "./index";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Forms/Input",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20 }}>
        <Input
          onChangeText={setValue}
          placeholder="Enter your name"
          value={value}
        />
        <Input
          onChangeText={() => {}}
          placeholder="Enter your email"
          value="user@example.com"
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
        <Input
          label="Full Name"
          onChangeText={setValue1}
          placeholder="Enter your full name"
          value={value1}
        />
        <Input
          label="Email Address"
          onChangeText={setValue2}
          placeholder="Enter your email"
          value={value2}
        />
        <Input
          disabled
          label="Disabled Field"
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
        <Input
          label="Full Name"
          onChangeText={setValue1}
          placeholder="Enter your full name"
          required
          value={value1}
        />
        <Input
          label="Email Address"
          onChangeText={setValue2}
          placeholder="Enter your email"
          required
          value={value2}
        />
        <Input
          error="This field is required"
          label="Required Field with Error"
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
        <Input onChangeText={setValue} placeholder="Search..." value={value} />
        <Input
          multiline
          numberOfLines={4}
          onChangeText={setValue}
          placeholder="Enter your message"
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
        <Input
          error="This field is required"
          label="Required Field"
          onChangeText={setValue}
          placeholder="Required field"
          required
          value={value}
        />
        <Input
          error="Please enter a valid email address"
          label="Email"
          onChangeText={setValue}
          placeholder="Email"
          required
          value="invalid-email"
        />
        <Input
          error="Password must be at least 8 characters"
          label="Password"
          onChangeText={setValue}
          placeholder="Password"
          required
          secureTextEntry
          value={value}
        />
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Input
          disabled
          onChangeText={() => {}}
          placeholder="Disabled input"
          value=""
        />
        <Input
          disabled
          onChangeText={() => {}}
          placeholder="Disabled with value"
          value="Cannot edit this"
        />
        <Input
          disabled
          error="Error message"
          onChangeText={() => {}}
          placeholder="Disabled with error"
          value=""
        />
      </View>
    );
  },
};

export const WithLeftAccessory: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Input
          leftAccessory={<Text style={{ color: "#666" }}>@</Text>}
          onChangeText={setValue}
          placeholder="Username"
          value={value}
        />
        <Input
          leftAccessory={<Text style={{ color: "#666" }}>$</Text>}
          onChangeText={setValue}
          placeholder="Amount"
          value={value}
        />
        <Input
          error="Invalid username"
          leftAccessory={<Text style={{ color: "#666" }}>@</Text>}
          onChangeText={setValue}
          placeholder="Username"
          value={value}
        />
      </View>
    );
  },
};

export const WithRightAccessory: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Input
          onChangeText={setValue}
          placeholder="Password"
          rightAccessory={
            <Text
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              style={{ color: "#2962FF", fontSize: 14 }}
            >
              {showPassword ? "Hide" : "Show"}
            </Text>
          }
          secureTextEntry={!showPassword}
          value={value}
        />
        <Input
          onChangeText={setValue}
          placeholder="Search"
          rightAccessory={
            <Icon icon={Search} color="textPrimary"/>
          }
          value={value}
        />
      </View>
    );
  },
};

export const WithBothAccessories: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Input
          leftAccessory={<Text style={{ color: "#666" }}>$</Text>}
          onChangeText={setValue}
          placeholder="Amount"
          rightAccessory={
            <Text style={{ color: "#666", fontSize: 12 }}>USD</Text>
          }
          value={value}
        />
        <Input
          error="Invalid amount"
          leftAccessory={<Text style={{ color: "#666" }}>$</Text>}
          onChangeText={setValue}
          placeholder="Amount"
          rightAccessory={
            <Text style={{ color: "#666", fontSize: 12 }}>USD</Text>
          }
          value={value}
        />
      </View>
    );
  },
};

export const PasswordInput: Story = {
  render: () => {
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Input
          onChangeText={setPassword}
          placeholder="Enter password"
          rightAccessory={
            <Text
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              style={{ color: "#2962FF", fontSize: 14 }}
            >
              {showPassword ? "Hide" : "Show"}
            </Text>
          }
          secureTextEntry={!showPassword}
          value={password}
        />
        <Input
          error="Password must be at least 8 characters"
          onChangeText={setPassword}
          placeholder="Enter password"
          rightAccessory={
            <Text
              onPress={() => {
                setShowPassword(!showPassword);
              }}
              style={{ color: "#2962FF", fontSize: 14 }}
            >
              {showPassword ? "Hide" : "Show"}
            </Text>
          }
          secureTextEntry={!showPassword}
          value={password}
        />
      </View>
    );
  },
};

export const Multiline: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Input
          multiline
          numberOfLines={3}
          onChangeText={setValue}
          placeholder="Enter your message"
          value={value}
        />
        <Input
          error="Message is too short"
          multiline
          numberOfLines={4}
          onChangeText={setValue}
          placeholder="Enter your message"
          value={value}
        />
      </View>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>("");
    const [value2, setValue2] = useState<string>("");
    const [value3, setValue3] = useState<string>("");
    const [value4, setValue4] = useState<string>("");

    return (
      <View style={{ gap: 20, padding: 20, width: "100%", maxWidth: 400 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Default</Text>
          <Input
            label="Default Input"
            onChangeText={setValue1}
            placeholder="Default input"
            value={value1}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>With Value</Text>
          <Input
            label="Input with Value"
            onChangeText={setValue2}
            placeholder="Input with value"
            value="Some text here"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>With Error</Text>
          <Input
            error="This field has an error"
            label="Input with Error"
            onChangeText={setValue3}
            placeholder="Input with error"
            value={value3}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Required</Text>
          <Input
            label="Required Input"
            onChangeText={setValue1}
            placeholder="Required field"
            required
            value={value1}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Disabled</Text>
          <Input
            disabled
            onChangeText={setValue4}
            placeholder="Disabled input"
            value="Cannot edit"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            With Accessories
          </Text>
          <Input
            leftAccessory={<Text style={{ color: "#666" }}>@</Text>}
            onChangeText={setValue1}
            placeholder="Username"
            rightAccessory={
              <Text style={{ color: "#666", fontSize: 12 }}>✓</Text>
            }
            value={value1}
          />
        </View>
      </View>
    );
  },
};

export const WithNextInputRef: Story = {
  render: () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const lastNameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);

    return (
      <View style={{ gap: 16, padding: 20, width: "100%", maxWidth: 400 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          Form with Next Input Navigation
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
          Press &quot;Next&quot; on the keyboard to navigate between fields
        </Text>

        <Input
          label="First Name"
          nextInputRef={lastNameRef}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          required
          value={firstName}
        />

        <Input
          label="Last Name"
          nextInputRef={emailRef}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          ref={lastNameRef}
          required
          value={lastName}
        />

        <Input
          keyboardType="email-address"
          label="Email"
          nextInputRef={phoneRef}
          onChangeText={setEmail}
          placeholder="Enter your email"
          ref={emailRef}
          required
          value={email}
        />

        <Input
          keyboardType="phone-pad"
          label="Phone"
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          ref={phoneRef}
          returnKeyType="done"
          value={phone}
        />
      </View>
    );
  },
};
