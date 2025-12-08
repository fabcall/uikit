import type { UnistylesThemes } from "react-native-unistyles";
import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme: UnistylesThemes["light"]) => ({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    width: "100%",

    variants: {
      orientation: {
        horizontal: {
          flexDirection: "row",
          width: "100%",
          alignItems: "stretch",
        },
        vertical: {
          flexDirection: "column",
          height: "100%",
          width: "auto",
          alignItems: "stretch",
        },
      },
      thickness: {
        sm: {},
        md: {},
        lg: {},
      },
      color: {
        divider: {},
        border: {},
      },
    },

    compoundVariants: [
      {
        orientation: "horizontal",
        thickness: "sm",
        styles: {
          height: 1,
          minHeight: 1,
        },
      },
      {
        orientation: "horizontal",
        thickness: "md",
        styles: {
          height: 2,
          minHeight: 2,
        },
      },
      {
        orientation: "horizontal",
        thickness: "lg",
        styles: {
          height: 4,
          minHeight: 4,
        },
      },
      {
        orientation: "vertical",
        thickness: "sm",
        styles: {
          width: 1,
          minWidth: 1,
        },
      },
      {
        orientation: "vertical",
        thickness: "md",
        styles: {
          width: 2,
          minWidth: 2,
        },
      },
      {
        orientation: "vertical",
        thickness: "lg",
        styles: {
          width: 4,
          minWidth: 4,
        },
      },
      {
        color: "divider",
        styles: {
          backgroundColor: theme.colors.divider,
        },
      },
      {
        color: "border",
        styles: {
          backgroundColor: theme.colors.border,
        },
      },
    ],
  },
  line: {
    flex: 1,

    variants: {
      orientation: {
        horizontal: {
          height: "100%",
        },
        vertical: {
          width: "100%",
        },
      },
      thickness: {
        sm: {},
        md: {},
        lg: {},
      },
      color: {
        divider: {},
        border: {},
      },
    },

    compoundVariants: [
      {
        orientation: "horizontal",
        thickness: "sm",
        styles: {
          height: 1,
        },
      },
      {
        orientation: "horizontal",
        thickness: "md",
        styles: {
          height: 2,
        },
      },
      {
        orientation: "horizontal",
        thickness: "lg",
        styles: {
          height: 4,
        },
      },
      {
        orientation: "vertical",
        thickness: "sm",
        styles: {
          width: 1,
        },
      },
      {
        orientation: "vertical",
        thickness: "md",
        styles: {
          width: 2,
        },
      },
      {
        orientation: "vertical",
        thickness: "lg",
        styles: {
          width: 4,
        },
      },
      {
        color: "divider",
        styles: {
          backgroundColor: theme.colors.divider,
        },
      },
      {
        color: "border",
        styles: {
          backgroundColor: theme.colors.border,
        },
      },
    ],
  },
  textContainer: {
    paddingHorizontal: theme.spacing[3],

    variants: {
      orientation: {
        horizontal: {
          paddingHorizontal: theme.spacing[3],
          paddingVertical: 0,
        },
        vertical: {
          paddingHorizontal: 0,
          paddingVertical: theme.spacing[3],
        },
      },
    },
  },
  text: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  containerWithText: {
    alignItems: "center",
    justifyContent: "center",
  },
}));
