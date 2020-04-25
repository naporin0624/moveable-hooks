const path = require("path");

module.exports = ({
  config
}) => {
  config.module.rules.push({
    test: /\.md?$/,
    loader: "markdown-loader",
  }, {
    test: /\.(ts|tsx)$/,
    use: [{
        loader: require.resolve("react-docgen-typescript-loader")
      },
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          parser: 'typescript'
        }
      }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");
  config.resolve.alias = {
    ...(config.resolve.alias ? config.resolve.alias : {}),
    "@": path.join(process.cwd(), "../src/")
  }

  return config;
};