import { useState } from "react";
import type { LayoutChangeEvent, LayoutRectangle } from "react-native";

export const useLayout = (): {
  layout: LayoutRectangle | null;
  onLayout: (event: LayoutChangeEvent) => void;
} => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const onLayout = (event: LayoutChangeEvent): void => {
    setLayout(event.nativeEvent.layout);
  };

  return {
    layout,
    onLayout,
  };
};
