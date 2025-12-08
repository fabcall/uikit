import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    treeshake: true,
    external: [
      "react",
      "react-native",
      "react-native-svg",
      "i18next",
      "react-i18next",
      "@readykit/tokens",
      "@readykit/hooks",
      "@readykit/icons",
    ],
    ...options,
  };
});
