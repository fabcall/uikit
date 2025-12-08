import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme, rt) => ({
  tabBar: {
    position: "relative",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: theme.spacing[2] + rt.insets.bottom,
    paddingTop: theme.spacing[2],
    backgroundColor: theme.colors.background,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: -3,
        blurRadius: 3,
        color: theme.colors.primaryContainer,
      },
    ],
  },

  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  tabBarContent: {
    flexDirection: "row",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing[2],

    variants: {
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
  },

  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing[1],
    minWidth: 60,
  },

  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
}));
