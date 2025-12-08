import {
  type AppBreakpoints,
  type AppThemes,
  appThemes,
  breakpoints,
} from "@readykit/tokens";
import { StyleSheet } from "react-native-unistyles";

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  breakpoints,
  themes: appThemes,
  settings: {
    initialTheme: "light",
  },
});
