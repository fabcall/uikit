// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const fs = require("fs");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

// Resolve workspace packages paths
const workspacePackages = {
  core: { src: path.resolve(workspaceRoot, "packages/core/src") },
  tokens: { src: path.resolve(workspaceRoot, "packages/tokens/src") },
  hooks: { src: path.resolve(workspaceRoot, "packages/hooks/src") },
  icons: { src: path.resolve(workspaceRoot, "packages/icons/src") },
};

// Build extraNodeModules for workspace packages
const extraNodeModules = {
  "@readykit/core": workspacePackages.core.src,
  "@readykit/tokens": workspacePackages.tokens.src,
  "@readykit/hooks": workspacePackages.hooks.src,
  "@readykit/icons": workspacePackages.icons.src,
};

const defaultConfig = getDefaultConfig(projectRoot);

// Configure resolver
const existingResolver = defaultConfig.resolver || {};
const existingSourceExts = existingResolver.sourceExts || [];

const resolverConfig = {
  ...existingResolver,
  nodeModulesPaths: [
    ...(existingResolver.nodeModulesPaths || []),
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
  ],
  extraNodeModules: {
    ...(existingResolver.extraNodeModules || {}),
    ...extraNodeModules,
  },
  sourceExts: Array.from(new Set([...existingSourceExts, "ts", "tsx"])),
};

// Create a new config object to avoid modifying readonly properties
const config = {
  ...defaultConfig,
  resolver: {
    ...resolverConfig,
    // Custom resolver for workspace packages
    resolveRequest: (context, moduleName, platform) => {
      // Handle @readykit workspace packages
      if (moduleName.startsWith("@readykit/")) {
        const packageName = moduleName.replace("@readykit/", "");
        if (workspacePackages[packageName]) {
          const packagePath = workspacePackages[packageName].src;
          const indexTs = path.join(packagePath, "index.ts");
          const indexJs = path.join(packagePath, "index.js");
          if (fs.existsSync(indexTs)) {
            return { filePath: indexTs, type: "sourceFile" };
          }
          if (fs.existsSync(indexJs)) {
            return { filePath: indexJs, type: "sourceFile" };
          }
        }
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
  watchFolders: [
    ...(defaultConfig.watchFolders || []),
    workspaceRoot,
    workspacePackages.core.src,
    workspacePackages.tokens.src,
    workspacePackages.hooks.src,
    workspacePackages.icons.src,
  ],
};

const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

module.exports = withStorybook(config, {
  enabled: true,
  configPath: path.resolve(projectRoot, ".rnstorybook"),
});