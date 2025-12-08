import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { view } from "./storybook.requires";

// Safe storage wrapper for SSR compatibility
const safeStorage = {
  getItem: async (key: string) => {
    try {
      // Check if we're in a browser environment (for web)
      if (Platform.OS === "web" && typeof window === "undefined") {
        return null;
      }
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      if (Platform.OS === "web" && typeof window === "undefined") {
        return;
      }
      await AsyncStorage.setItem(key, value);
    } catch {
      // Silently fail in SSR
    }
  },
};

const StorybookUIRoot = view.getStorybookUI({
  storage: safeStorage,
});

export default StorybookUIRoot;
