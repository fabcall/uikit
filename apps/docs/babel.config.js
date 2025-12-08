const path = require("path");

module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-transform-class-static-block",
      [
        "react-native-unistyles/plugin",
        {
          root: "app",
          // Processa também os packages do workspace que usam unistyles
          autoProcessPaths: [
            path.resolve(__dirname, "../../packages/core/src"),
            path.resolve(__dirname, "../../packages/tokens/src"),
          ],
        },
      ],
    ],
  };
};

