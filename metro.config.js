const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ensure Metro will process .mjs and .cjs files from node_modules so Babel
// (babel-preset-expo with unstable_transformImportMeta) can transform import.meta.
config.resolver = config.resolver || {};
config.resolver.sourceExts = Array.from(
  new Set([...(config.resolver.sourceExts || []), "cjs", "mjs"])
);

module.exports = withNativeWind(config, { input: "./app/global.css" });
