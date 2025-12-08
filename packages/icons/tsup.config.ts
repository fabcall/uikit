import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  minify: true,
  treeshake: true,
  external: ["react", "react-native", "react-native-svg"],
});
