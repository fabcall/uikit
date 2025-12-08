import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import { Dropdown } from "./Dropdown";
import type { DropdownOption } from "./Dropdown.props";

const mockOptions: DropdownOption[] = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
  { label: "Option 3", value: "opt3" },
];

describe("Dropdown", () => {
  describe("Basic rendering", () => {
    it("should render dropdown with placeholder", () => {
      render(
        <Dropdown
          onChange={jest.fn()}
          options={mockOptions}
          placeholder="Select an option"
        />,
      );

      expect(screen.getByText("Select an option")).toBeTruthy();
    });

    it("should render dropdown with label", () => {
      render(
        <Dropdown
          label="Choose Option"
          onChange={jest.fn()}
          options={mockOptions}
        />,
      );

      expect(screen.getByText("Choose Option")).toBeTruthy();
    });

    it("should render selected value", () => {
      render(
        <Dropdown onChange={jest.fn()} options={mockOptions} value="opt2" />,
      );

      expect(screen.getByText("Option 2")).toBeTruthy();
    });

    it("should have correct displayName", () => {
      expect(Dropdown.displayName).toBe("Dropdown");
    });
  });

  describe("Required field", () => {
    it("should show required indicator when required is true", () => {
      render(
        <Dropdown
          label="Required Field"
          onChange={jest.fn()}
          options={mockOptions}
          required
        />,
      );

      expect(screen.getByText("Required Field")).toBeTruthy();
      expect(screen.getByText("*")).toBeTruthy();
    });
  });

  describe("Disabled state", () => {
    it("should disable trigger when disabled is true", () => {
      const { getByRole } = render(
        <Dropdown disabled onChange={jest.fn()} options={mockOptions} />,
      );

      const trigger = getByRole("button");
      expect(trigger.props.accessibilityState.disabled).toBe(true);
    });

    it("should not call onChange when disabled", () => {
      const onChangeMock = jest.fn();
      const { getByRole } = render(
        <Dropdown disabled onChange={onChangeMock} options={mockOptions} />,
      );

      const trigger = getByRole("button");
      fireEvent.press(trigger);

      expect(onChangeMock).not.toHaveBeenCalled();
    });
  });

  describe("Error state", () => {
    it("should display error message", () => {
      render(
        <Dropdown
          error="This field is required"
          onChange={jest.fn()}
          options={mockOptions}
        />,
      );

      expect(screen.getByText("This field is required")).toBeTruthy();
    });
  });

  describe("Interactions", () => {
    it("should open dropdown when trigger is pressed", () => {
      const { getByRole } = render(
        <Dropdown onChange={jest.fn()} options={mockOptions} />,
      );

      const trigger = getByRole("button");
      fireEvent.press(trigger);

      expect(trigger.props.accessibilityState.expanded).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("should set accessibilityState.disabled to false by default", () => {
      const { getByRole } = render(
        <Dropdown onChange={jest.fn()} options={mockOptions} />,
      );

      const trigger = getByRole("button");
      expect(trigger.props.accessibilityState.disabled).toBe(false);
    });

    it("should have accessibilityRole button on trigger", () => {
      const { getByRole } = render(
        <Dropdown onChange={jest.fn()} options={mockOptions} />,
      );

      expect(getByRole("button")).toBeTruthy();
    });
  });

  describe("Options", () => {
    it("should handle empty options array", () => {
      render(
        <Dropdown onChange={jest.fn()} options={[]} placeholder="No options" />,
      );

      expect(screen.getByText("No options")).toBeTruthy();
    });

    it("should handle options with disabled items", () => {
      const optionsWithDisabled: DropdownOption[] = [
        { label: "Enabled", value: "enabled" },
        { label: "Disabled", value: "disabled", disabled: true },
      ];

      render(<Dropdown onChange={jest.fn()} options={optionsWithDisabled} />);

      expect(screen.getByText("Enabled")).toBeTruthy();
    });
  });

  describe("Searchable", () => {
    it("should render search input when searchable is true", () => {
      const { getByRole, getByPlaceholderText } = render(
        <Dropdown
          onChange={jest.fn()}
          options={mockOptions}
          searchable
          searchPlaceholder="Search options..."
        />,
      );

      const trigger = getByRole("button");
      fireEvent.press(trigger);

      expect(getByPlaceholderText("Search options...")).toBeTruthy();
    });
  });

  describe("Custom messages", () => {
    it("should show custom empty message", () => {
      const { getByRole } = render(
        <Dropdown
          emptyMessage="No results available"
          onChange={jest.fn()}
          options={[]}
        />,
      );

      const trigger = getByRole("button");
      fireEvent.press(trigger);

      expect(screen.getByText("No results available")).toBeTruthy();
    });
  });
});
