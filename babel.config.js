module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        { jsxImportSource: "nativewind", unstable_transformImportMeta: true },
      ],
      // nativewind provides a preset (not a plain plugin), so keep it in presets
      "nativewind/babel",
    ],
    plugins: [
      // react-native-reanimated plugin must be listed last
      "react-native-reanimated/plugin",
    ],
  };
};
