const webpack = require("webpack");

module.exports = {
  // ... other configurations
  resolve: {
    fallback: {
      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
