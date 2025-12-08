import { render, screen } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { Banner } from "./Banner";
import { styles } from "./Banner.styles";

// Mock useVariants
const mockUseVariants = jest.fn();
jest.spyOn(styles, "useVariants").mockImplementation(mockUseVariants);

// Mock icon component for testing
function MockIcon({
  testID,
  ...props
}: SvgProps & { testID?: string }): React.JSX.Element {
  return <View testID={testID || "custom-icon"} {...props} />;
}

describe("Banner", () => {
  beforeEach(() => {
    mockUseVariants.mockClear();
  });

  describe("Basic rendering", () => {
    it("should render banner with message", () => {
      render(<Banner message="Test message" />);

      expect(screen.getByText("Test message")).toBeTruthy();
    });

    it("should have correct displayName", () => {
      expect(Banner.displayName).toBe("Banner");
    });
  });

  describe("Variants", () => {
    it("should apply error variant by default", () => {
      render(<Banner message="Error message" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        variant: "error",
      });
    });

    it("should apply error variant when specified", () => {
      render(<Banner message="Error message" variant="error" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        variant: "error",
      });
    });

    it("should apply success variant when specified", () => {
      render(<Banner message="Success message" variant="success" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        variant: "success",
      });
    });

    it("should apply warning variant when specified", () => {
      render(<Banner message="Warning message" variant="warning" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        variant: "warning",
      });
    });

    it("should apply info variant when specified", () => {
      render(<Banner message="Info message" variant="info" />);

      expect(mockUseVariants).toHaveBeenCalledWith({
        variant: "info",
      });
    });
  });

  describe("Custom icon", () => {
    it("should render custom icon when provided", () => {
      render(<Banner icon={MockIcon} message="Test message" />);

      expect(screen.getByTestId("custom-icon")).toBeTruthy();
    });

    it("should not render icon when not provided", () => {
      render(<Banner message="Test message" />);

      expect(screen.queryByTestId("custom-icon")).toBeNull();
    });
  });

  describe("Custom color", () => {
    it("should use custom color when provided", () => {
      render(<Banner color="#FF6B6B" icon={MockIcon} message="Test message" />);

      const icon = screen.getByTestId("custom-icon");
      expect(icon).toBeTruthy();
    });

    it("should use variant default color when custom color not provided", () => {
      render(<Banner icon={MockIcon} message="Test message" variant="error" />);

      const icon = screen.getByTestId("custom-icon");
      expect(icon).toBeTruthy();
    });
  });

  describe("Message rendering", () => {
    it("should render long messages correctly", () => {
      const longMessage =
        "This is a very long message that should wrap correctly and maintain proper spacing and readability across multiple lines.";

      render(<Banner message={longMessage} />);

      expect(screen.getByText(longMessage)).toBeTruthy();
    });

    it("should render empty message", () => {
      render(<Banner message="" />);

      expect(screen.getByText("")).toBeTruthy();
    });
  });
});
