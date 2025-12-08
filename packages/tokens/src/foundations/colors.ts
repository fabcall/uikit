export const colors = {
  brand: {
    primary: "#2962FF",
    onPrimary: "#FFFFFF",
    primaryLight: "#E3ECFF",
    onPrimaryLight: "#0D47A1",

    primaryHover: "#0041F5",
    primaryDisabled: "#A5B4FC",

    secondary: "#EE5067",
    onSecondary: "#FFFFFF",
    secondaryLight: "#FCE4EC",
    onSecondaryLight: "#880E4F",
    secondaryHover: "#E41634",
  },

  text: {
    primary: "#111827",
    secondary: "#1F2937",
    disabled: "#9CA3AF",
    inverse: "#FFFFFF",
  },

  background: {
    base: "#FFFFFF",
    surface: "#F9FAFB",
    elevated: "#F3F4F6",
  },

  // Surface tint colors (background + primary blend for MD3-style elevation)
  // Computed: background (#FFFFFF) + primary (#2962FF) at increasing opacity
  surfaceTint: {
    level0: "#FFFFFF", // 0% - pure background
    level1: "#F7F9FF", // 5% primary tint
    level2: "#F0F4FF", // 8% primary tint
    level3: "#E9EFFF", // 11% primary tint
    level4: "#E6ECFF", // 12% primary tint
    level5: "#E1E9FF", // 14% primary tint
  },

  border: {
    base: "#D1D5DB",
  },

  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray800: "#1F2937",
    gray900: "#111827",
  },

  error: {
    light: "#FEE2E2",
    onLight: "#991B1B",

    main: "#EF4444",
    onError: "#FFFFFF",
  },

  success: {
    light: "#D1FAE5",
    onLight: "#065F46",

    main: "#059669",
    onSuccess: "#FFFFFF",
  },

  warning: {
    light: "#FEF3C7",
    onLight: "#92400E",

    main: "#D97706",
    onWarning: "#FFFFFF",
  },

  info: {
    light: "#DBEAFE",
    onLight: "#1E40AF",

    main: "#2563EB",
    onInfo: "#FFFFFF",
  },

  overlay: {
    dark: "#00000080",
  },
};
