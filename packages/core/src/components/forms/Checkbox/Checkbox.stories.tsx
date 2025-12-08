import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { Checkbox } from "./index";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Forms/Checkbox",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean>(false);

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Checkbox
          checked={checked}
          label="I accept the terms and conditions"
          onChange={setChecked}
          value="accept-terms"
        />
        <Checkbox
          checked
          label="Receive newsletter"
          onChange={() => {}}
          value="receive-newsletter"
        />
        <Checkbox
          checked={false}
          label="Unchecked option"
          onChange={() => {}}
          value="unchecked-option"
        />
      </View>
    );
  },
};

export const WithCheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["apple"]);

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Checkbox.Group onChange={setSelected} value={selected}>
          <Checkbox label="Apple" value="apple" />
          <Checkbox label="Banana" value="banana" />
          <Checkbox label="Orange" value="orange" />
          <Checkbox label="Grape" value="grape" />
        </Checkbox.Group>
      </View>
    );
  },
};

export const WithSelectAll: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Checkbox.Group
          onChange={setSelected}
          selectAllLabel="Select All"
          showSelectAll
          value={selected}
        >
          <Checkbox label="Technology" value="tech" />
          <Checkbox label="Sports" value="sports" />
          <Checkbox label="Music" value="music" />
          <Checkbox label="Movies" value="movies" />
          <Checkbox label="Books" value="books" />
        </Checkbox.Group>
      </View>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Checkbox.Group
          direction="horizontal"
          onChange={setSelected}
          showSelectAll
          value={selected}
        >
          <Checkbox label="Email" value="email" />
          <Checkbox label="SMS" value="sms" />
          <Checkbox label="Push" value="push" />
        </Checkbox.Group>
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean>(true);

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Checkbox
          checked={checked}
          label="Enabled checkbox"
          onChange={setChecked}
          value="enabled"
        />
        <Checkbox
          checked={false}
          disabled
          label="Disabled checkbox"
          onChange={setChecked}
          value="disabled"
        />
        <Checkbox
          checked
          disabled
          label="Checked and disabled checkbox"
          onChange={setChecked}
          value="checked-disabled"
        />
      </View>
    );
  },
};

export const DisabledGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["apple"]);

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Checkbox.Group disabled onChange={setSelected} value={selected}>
          <Checkbox label="Apple" value="apple" />
          <Checkbox label="Banana" value="banana" />
          <Checkbox label="Orange" value="orange" />
        </Checkbox.Group>
      </View>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const [checked1, setChecked1] = useState<boolean>(false);
    const [checked2, setChecked2] = useState<boolean>(true);
    const [checked3, setChecked3] = useState<boolean>(false);

    return (
      <View style={{ gap: 16, padding: 20, flexDirection: "row" }}>
        <Checkbox checked={checked1} onChange={setChecked1} value="checked1" />
        <Checkbox checked={checked2} onChange={setChecked2} value="checked2" />
        <Checkbox checked={checked3} onChange={setChecked3} value="checked3" />
      </View>
    );
  },
};

export const CustomValues: Story = {
  render: () => {
    const [selected, setSelected] = useState<number[]>([1]);

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Checkbox.Group onChange={setSelected} value={selected}>
          <Checkbox label="First option" value={1} />
          <Checkbox label="Second option" value={2} />
          <Checkbox label="Third option" value={3} />
        </Checkbox.Group>
      </View>
    );
  },
};
