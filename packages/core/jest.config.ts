import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/*.test.tsx", "**/*.test.ts"],

  moduleNameMapper: {
    "^@readykit/tokens$": "<rootDir>/../tokens/src/index.ts",
    "^@readykit/hooks$": "<rootDir>/../hooks/src/index.ts",
    "^@readykit/icons$": "<rootDir>/../icons/src/index.ts",
  },

  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-unistyles)",
  ],

  clearMocks: true,
};

export default config;
