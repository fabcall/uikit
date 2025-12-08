import { act, render, screen } from "@testing-library/react-native";
import React, { createRef } from "react";
import { type ImageErrorEvent, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { CircleAvatar } from "./CircleAvatar";
import { styles } from "./CircleAvatar.styles";

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

describe("CircleAvatar", () => {
  beforeEach(() => {
    mockUseVariants.mockClear();
  });

  describe("Basic rendering", () => {
    it("should render avatar with image", () => {
      const source = { uri: "https://example.com/avatar.jpg" };
      render(<CircleAvatar source={source} />);

      expect(screen.getByTestId("avatar-image")).toBeTruthy();
    });

    it("should render avatar with initials when name is provided", () => {
      render(<CircleAvatar name="John Doe" />);

      expect(screen.getByText("JD")).toBeTruthy();
    });

    it("should render avatar with icon when icon is provided", () => {
      render(<CircleAvatar icon={MockIcon} />);

      expect(screen.getByTestId("mock-icon")).toBeTruthy();
    });

    it("should render empty fallback when no source, name, or icon", () => {
      render(<CircleAvatar />);

      // Component should render without errors
      expect(screen.UNSAFE_root).toBeTruthy();
    });

    it("should have correct displayName", () => {
      expect(CircleAvatar.displayName).toBe("CircleAvatar");
    });
  });

  describe("Sizes", () => {
    it("should apply md size by default", () => {
      render(<CircleAvatar name="Test" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        size: "md",
      });
    });

    it("should apply sm size when specified", () => {
      render(<CircleAvatar name="Test" size="sm" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        size: "sm",
      });
    });

    it("should apply lg size when specified", () => {
      render(<CircleAvatar name="Test" size="lg" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        size: "lg",
      });
    });
  });

  describe("Initials generation", () => {
    it("should generate initials from full name", () => {
      render(<CircleAvatar name="John Doe" />);

      expect(screen.getByText("JD")).toBeTruthy();
    });

    it("should generate single initial from single name", () => {
      render(<CircleAvatar name="John" />);

      expect(screen.getByText("J")).toBeTruthy();
    });

    it("should generate initials from multiple words", () => {
      render(<CircleAvatar name="John Michael Doe" />);

      expect(screen.getByText("JD")).toBeTruthy();
    });

    it("should handle empty name", () => {
      render(<CircleAvatar name="" />);

      expect(screen.queryByText("")).toBeNull();
    });

    it("should handle name with extra spaces", () => {
      render(<CircleAvatar name="  John   Doe  " />);

      expect(screen.getByText("JD")).toBeTruthy();
    });
  });

  describe("Image fallback", () => {
    it("should show initials when image fails to load", () => {
      const source = { uri: "https://example.com/invalid.jpg" };
      const { getByTestId, rerender } = render(
        <CircleAvatar name="John Doe" source={source} />,
      );

      const image = getByTestId("avatar-image");

      // Simulate image error
      act(() => {
        image.props.onError({ nativeEvent: {} } as ImageErrorEvent);
      });

      // Re-render to show fallback
      rerender(<CircleAvatar name="John Doe" source={source} />);

      expect(screen.getByText("JD")).toBeTruthy();
    });

    it("should prioritize image over name", () => {
      const source = { uri: "https://example.com/avatar.jpg" };
      render(<CircleAvatar name="John Doe" source={source} />);

      expect(screen.getByTestId("avatar-image")).toBeTruthy();
      expect(screen.queryByText("JD")).toBeNull();
    });

    it("should prioritize name over icon", () => {
      render(<CircleAvatar icon={MockIcon} name="John Doe" />);

      expect(screen.getByText("JD")).toBeTruthy();
      expect(screen.queryByTestId("mock-icon")).toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("should have accessibilityLabel when provided", () => {
      const { UNSAFE_root } = render(
        <CircleAvatar accessibilityLabel="User avatar" name="John Doe" />,
      );

      const avatar = UNSAFE_root.findByType(View);
      expect(avatar.props.accessibilityLabel).toBe("User avatar");
    });

    it("should use name as accessibilityLabel when not provided", () => {
      const { UNSAFE_root } = render(<CircleAvatar name="John Doe" />);

      const avatar = UNSAFE_root.findByType(View);
      expect(avatar.props.accessibilityLabel).toBe("John Doe");
    });

    it("should use default accessibilityLabel when no name", () => {
      const { UNSAFE_root } = render(<CircleAvatar icon={MockIcon} />);

      const avatar = UNSAFE_root.findByType(View);
      expect(avatar.props.accessibilityLabel).toBe("Avatar");
    });

    it("should have correct accessibilityRole", () => {
      const { UNSAFE_root } = render(<CircleAvatar name="Test" />);

      const avatar = UNSAFE_root.findByType(View);
      expect(avatar.props.accessibilityRole).toBe("image");
    });
  });

  describe("Ref forwarding", () => {
    it("should forward ref to View", () => {
      const ref = createRef<View>();
      render(<CircleAvatar name="Test" ref={ref} />);

      expect(ref.current).toBeTruthy();
    });
  });

  describe("Additional props", () => {
    it("should pass additional props to View", () => {
      const { UNSAFE_root } = render(
        <CircleAvatar name="Test" testID="custom-avatar" />,
      );

      const avatar = UNSAFE_root.findByType(View);
      expect(avatar.props.testID).toBe("custom-avatar");
    });
  });
});
