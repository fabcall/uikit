import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { IconButton } from "./IconButton";
import { styles } from "./IconButton.styles";

// Mock useVariants
const mockUseVariants = jest.fn();
jest.spyOn(styles, "useVariants").mockImplementation(mockUseVariants);

// Mock icon component for testing
function MockIcon({
  testID,
  ...props
}: SvgProps & { testID?: string }): React.JSX.Element {
  return <View testID={testID || "mock-icon"} {...props} />;
}

describe("IconButton", () => {
  beforeEach(() => {
    mockUseVariants.mockClear();
  });

  describe("Basic rendering", () => {
    it("should render icon button with icon", () => {
      render(<IconButton icon={MockIcon} />);

      expect(screen.getByTestId("mock-icon")).toBeTruthy();
    });

    it("should render as Pressable with accessibilityRole button", () => {
      render(<IconButton icon={MockIcon} />);

      const button = screen.getByRole("button");
      expect(button).toBeTruthy();
    });

    it("should have correct displayName", () => {
      expect(IconButton.displayName).toBe("IconButton");
    });
  });

  describe("Variants", () => {
    it("should apply solid variant by default", () => {
      render(<IconButton icon={MockIcon} />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        color: "primary",
        disabled: false,
        size: "md",
        variant: "solid",
      });
    });

    it("should apply outline variant when specified", () => {
      render(<IconButton icon={MockIcon} variant="outline" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        color: "primary",
        disabled: false,
        size: "md",
        variant: "outline",
      });
    });

    it("should apply ghost variant when specified", () => {
      render(<IconButton icon={MockIcon} variant="ghost" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        color: "primary",
        disabled: false,
        size: "md",
        variant: "ghost",
      });
    });
  });

  describe("Sizes", () => {
    it("should apply md size by default", () => {
      render(<IconButton icon={MockIcon} />);

      expect(mockUseVariants).toHaveBeenCalledWith(
        expect.objectContaining({ size: "md" }),
      );
    });

    it("should apply sm size when specified", () => {
      render(<IconButton icon={MockIcon} size="sm" />);

      expect(mockUseVariants).toHaveBeenCalledWith(
        expect.objectContaining({ size: "sm" }),
      );
    });

    it("should apply lg size when specified", () => {
      render(<IconButton icon={MockIcon} size="lg" />);

      expect(mockUseVariants).toHaveBeenCalledWith(
        expect.objectContaining({ size: "lg" }),
      );
    });
  });

  describe("Colors", () => {
    it("should apply primary color by default", () => {
      render(<IconButton icon={MockIcon} />);

      expect(mockUseVariants).toHaveBeenCalledWith(
        expect.objectContaining({ color: "primary" }),
      );
    });

    it("should apply secondary color when specified", () => {
      render(<IconButton color="secondary" icon={MockIcon} />);

      expect(mockUseVariants).toHaveBeenCalledWith(
        expect.objectContaining({ color: "secondary" }),
      );
    });
  });

  describe("Loading state", () => {
    it("should show Spinner when isLoading is true", () => {
      render(<IconButton icon={MockIcon} isLoading />);

      expect(screen.queryByTestId("mock-icon")).toBeNull();
      expect(screen.getByTestId("spinner")).toBeTruthy();
    });

    it("should hide icon when isLoading is true", () => {
      render(<IconButton icon={MockIcon} isLoading />);

      expect(screen.queryByTestId("mock-icon")).toBeNull();
    });

    it("should show icon when isLoading is false", () => {
      render(<IconButton icon={MockIcon} isLoading={false} />);

      expect(screen.getByTestId("mock-icon")).toBeTruthy();
      expect(screen.queryByTestId("spinner")).toBeNull();
    });
  });

  describe("Disabled state", () => {
    it("should disable button when isDisabled is true", () => {
      render(<IconButton icon={MockIcon} isDisabled />);

      const button = screen.getByRole("button");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    it("should apply disabled variant in styles", () => {
      render(<IconButton icon={MockIcon} isDisabled />);

      expect(mockUseVariants).toHaveBeenCalledWith(
        expect.objectContaining({ disabled: true }),
      );
    });
  });

  describe("Interactions", () => {
    it("should call onPress when pressed", () => {
      const onPressMock = jest.fn();
      render(<IconButton icon={MockIcon} onPress={onPressMock} />);

      const button = screen.getByRole("button");
      fireEvent.press(button);

      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it("should not call onPress when disabled", () => {
      const onPressMock = jest.fn();
      render(<IconButton icon={MockIcon} isDisabled onPress={onPressMock} />);

      const button = screen.getByRole("button");
      fireEvent.press(button);

      expect(onPressMock).not.toHaveBeenCalled();
    });

    it("should not call onPress when loading", () => {
      const onPressMock = jest.fn();
      render(<IconButton icon={MockIcon} isLoading onPress={onPressMock} />);

      const button = screen.getByRole("button");
      fireEvent.press(button);

      expect(onPressMock).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have accessibilityLabel when provided", () => {
      render(<IconButton accessibilityLabel="Upload file" icon={MockIcon} />);

      const button = screen.getByRole("button");
      expect(button.props.accessibilityLabel).toBe("Upload file");
    });

    it("should have correct accessibilityState when loading", () => {
      render(<IconButton icon={MockIcon} isLoading />);

      const button = screen.getByRole("button");
      expect(button.props.accessibilityState.busy).toBe(true);
    });

    it("should have correct accessibilityState when disabled", () => {
      render(<IconButton icon={MockIcon} isDisabled />);

      const button = screen.getByRole("button");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe("Ref forwarding", () => {
    it("should forward ref to Pressable", () => {
      const ref = React.createRef<View>();
      render(<IconButton icon={MockIcon} ref={ref} />);

      expect(ref.current).toBeTruthy();
    });
  });

  describe("Additional props", () => {
    it("should pass additional props to Pressable", () => {
      render(<IconButton icon={MockIcon} testID="custom-icon-button" />);

      const button = screen.getByRole("button");
      expect(button.props.testID).toBe("custom-icon-button");
    });
  });
});
