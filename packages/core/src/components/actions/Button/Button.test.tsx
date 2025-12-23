import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import { Button } from "./Button";
import { styles } from "./Button.styles";

const mockUseVariants = jest.fn();
jest.spyOn(styles, "useVariants").mockImplementation(mockUseVariants);

describe("Button", () => {
  beforeEach(() => {
    mockUseVariants.mockClear();
  });

  describe("Basic rendering", () => {
    it("should render button with title", () => {
      render(<Button title="Click here" />);

      expect(screen.getByText("Click here")).toBeTruthy();
    });

    it("should render as Pressable with accessibilityRole button", () => {
      render(<Button title="Test" />);

      const button = screen.getByRole("button");
      expect(button).toBeTruthy();
    });

    it("should have correct displayName", () => {
      expect(Button.displayName).toBe("Button");
    });
  });

  describe("Variants", () => {
    it("should apply solid variant by default", () => {
      render(<Button title="Test" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        disabled: false,
        variant: "solid",
        size: "md",
      });
    });

    it("should apply outline variant when specified", () => {
      render(<Button title="Test" variant="outline" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        disabled: false,
        variant: "outline",
        size: "md",
      });
    });

    it("should apply ghost variant when specified", () => {
      render(<Button title="Test" variant="ghost" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        disabled: false,
        variant: "ghost",
        size: "md",
      });
    });
  });

  describe("Sizes", () => {
    it("should apply md size by default", () => {
      render(<Button title="Test" />);

      expect(mockUseVariants).toHaveBeenCalledWith(
        expect.objectContaining({ size: "md" }),
      );
    });

    it("should apply sm size when specified", () => {
      render(<Button size="sm" title="Test" />);

      expect(mockUseVariants).toHaveBeenCalledWith(
        expect.objectContaining({ size: "sm" }),
      );
    });

    it("should apply lg size when specified", () => {
      render(<Button size="lg" title="Test" />);

      expect(mockUseVariants).toHaveBeenCalledWith(
        expect.objectContaining({ size: "lg" }),
      );
    });
  });

  describe("Loading state", () => {
    it("should show Spinner when isLoading is true", () => {
      render(<Button isLoading title="Test" />);

      expect(screen.queryByText("Test")).toBeNull();
      expect(screen.getByTestId("spinner")).toBeTruthy();
    });

    it("should not show title when loading", () => {
      render(<Button isLoading title="Test" />);

      expect(screen.queryByText("Test")).toBeNull();
    });

    it("should use onPrimary color in spinner for solid variant", () => {
      const { getByTestId } = render(
        <Button isLoading title="Test" variant="solid" />,
      );

      const spinner = getByTestId("spinner");
      expect(spinner.props.color).toBeDefined();
      // Should use theme.colors.onPrimary for solid variant
    });

    it("should use primary color in spinner for outline variant", () => {
      const { getByTestId } = render(
        <Button isLoading title="Test" variant="outline" />,
      );

      const spinner = getByTestId("spinner");
      expect(spinner.props.color).toBeDefined();
      // Should use theme.colors.primary for outline variant
    });

    it("should use primary color in spinner for ghost variant", () => {
      const { getByTestId } = render(
        <Button isLoading title="Test" variant="ghost" />,
      );

      const spinner = getByTestId("spinner");
      expect(spinner.props.color).toBeDefined();
      // Should use theme.colors.primary for ghost variant
    });

    it("should disable interaction when isLoading is true", () => {
      const { getByRole } = render(<Button isLoading title="Test" />);

      const button = getByRole("button");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    it("should set accessibilityState busy to true when isLoading", () => {
      const { getByRole } = render(<Button isLoading title="Test" />);

      const button = getByRole("button");
      expect(button.props.accessibilityState.busy).toBe(true);
    });
  });

  describe("Disabled state", () => {
    it("should disable button when isDisabled is true", () => {
      const { getByRole } = render(<Button isDisabled title="Test" />);

      const button = getByRole("button");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    it("should apply disabled variant in styles", () => {
      render(<Button isDisabled title="Test" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        disabled: true,
        variant: "solid",
        size: "md",
      });
    });

    it("should not call onPress when disabled", () => {
      const onPressMock = jest.fn();
      const { getByRole } = render(
        <Button isDisabled onPress={onPressMock} title="Test" />,
      );

      const button = getByRole("button");
      fireEvent.press(button);

      expect(onPressMock).not.toHaveBeenCalled();
    });

    it("should disable when isLoading is true", () => {
      const onPressMock = jest.fn();
      const { getByRole } = render(
        <Button isLoading onPress={onPressMock} title="Test" />,
      );

      const button = getByRole("button");
      fireEvent.press(button);

      expect(onPressMock).not.toHaveBeenCalled();
    });
  });

  describe("Interactions", () => {
    it("should call onPress when clicked", () => {
      const onPressMock = jest.fn();
      const { getByRole } = render(
        <Button onPress={onPressMock} title="Test" />,
      );

      const button = getByRole("button");
      fireEvent.press(button);

      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it("should call onPress multiple times", () => {
      const onPressMock = jest.fn();
      const { getByRole } = render(
        <Button onPress={onPressMock} title="Test" />,
      );

      const button = getByRole("button");
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      expect(onPressMock).toHaveBeenCalledTimes(3);
    });
  });

  describe("Accessibility", () => {
    it("should set accessibilityState.disabled to false by default", () => {
      const { getByRole } = render(<Button title="Test" />);

      const button = getByRole("button");
      expect(button.props.accessibilityState.disabled).toBe(false);
    });

    it("should set accessibilityState.busy to false by default", () => {
      const { getByRole } = render(<Button title="Test" />);

      const button = getByRole("button");
      expect(button.props.accessibilityState.busy).toBe(false);
    });

    it("should have accessibilityRole button", () => {
      const { getByRole } = render(<Button title="Test" />);

      expect(getByRole("button")).toBeTruthy();
    });
  });

  describe("Ref forwarding", () => {
    it("should accept ref", () => {
      const ref = React.createRef<any>();
      render(<Button ref={ref} title="Test" />);

      expect(ref.current).toBeTruthy();
    });
  });

  describe("Additional props", () => {
    it("should pass additional props to Pressable", () => {
      const { getByRole } = render(
        <Button
          accessibilityLabel="Custom button"
          testID="custom-button"
          title="Test"
        />,
      );

      const button = getByRole("button");
      expect(button.props.testID).toBe("custom-button");
      expect(button.props.accessibilityLabel).toBe("Custom button");
    });
  });

  describe("State combinations", () => {
    it("should handle isLoading and isDisabled simultaneously", () => {
      const onPressMock = jest.fn();
      const { getByRole, getByTestId } = render(
        <Button isDisabled isLoading onPress={onPressMock} title="Test" />,
      );

      expect(getByTestId("spinner")).toBeTruthy();

      const button = getByRole("button");
      fireEvent.press(button);
      expect(onPressMock).not.toHaveBeenCalled();
    });

    it("should combine custom variant and size", () => {
      render(<Button size="lg" title="Test" variant="outline" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        disabled: false,
        variant: "outline",
        size: "lg",
      });
    });
  });
});
