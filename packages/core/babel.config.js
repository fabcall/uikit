module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }]
    ],
    plugins: [
      [
        "react-native-unistyles/plugin",
        {
          root: "src", 
        },
      ],
    ],
  };
};