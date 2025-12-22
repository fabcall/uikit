import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { Radio } from "./index";

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: "Forms/Radio",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("option1");

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Radio
          label="Option 1"
          onChange={setSelected}
          selected={selected === "option1"}
          value="option1"
        />
        <Radio
          label="Option 2"
          onChange={setSelected}
          selected={selected === "option2"}
          value="option2"
        />
        <Radio
          label="Option 3"
          onChange={setSelected}
          selected={selected === "option3"}
          value="option3"
        />
      </View>
    );
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("option1");

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Radio.Group onChange={setSelected} selectedValue={selected}>
          <Radio label="Option 1" value="option1" />
          <Radio label="Option 2" value="option2" />
          <Radio label="Option 3" value="option3" />
        </Radio.Group>
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("option1");

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Radio
          label="Option 1 (Enabled)"
          onChange={setSelected}
          selected={selected === "option1"}
          value="option1"
        />
        <Radio
          disabled
          label="Option 2 (Disabled)"
          onChange={setSelected}
          selected={selected === "option2"}
          value="option2"
        />
        <Radio
          disabled
          label="Option 3 (Selected & Disabled)"
          onChange={setSelected}
          selected
          value="option3"
        />
      </View>
    );
  },
};

export const DisabledGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("option1");

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Radio.Group disabled onChange={setSelected} selectedValue={selected}>
          <Radio label="Option 1" value="option1" />
          <Radio label="Option 2" value="option2" />
          <Radio label="Option 3" value="option3" />
        </Radio.Group>
      </View>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>("option1");

    return (
      <View style={{ gap: 16, padding: 20, flexDirection: "row" }}>
        <Radio
          onChange={setSelected}
          selected={selected === "option1"}
          value="option1"
        />
        <Radio
          onChange={setSelected}
          selected={selected === "option2"}
          value="option2"
        />
        <Radio
          onChange={setSelected}
          selected={selected === "option3"}
          value="option3"
        />
      </View>
    );
  },
};

export const CustomValues: Story = {
  render: () => {
    const [selected, setSelected] = useState<number>(1);

    return (
      <View style={{ gap: 16, padding: 20, alignSelf: "flex-start" }}>
        <Radio.Group onChange={setSelected} selectedValue={selected}>
          <Radio label="First option" value={1} />
          <Radio label="Second option" value={2} />
          <Radio label="Third option" value={3} />
        </Radio.Group>
      </View>
    );
  },
};
