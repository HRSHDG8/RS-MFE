const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3002/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Include .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules folder
        use: {
          loader: "babel-loader", // Use Babel Loader
        },
      },
      {
        test: /\.css$/, // Add this rule to handle CSS files
        use: ["style-loader", "css-loader"], // Loaders for CSS
      },
    ],
  },
  devServer: {
    port: 3002,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: "misc",
      filename: "remoteEntry.js",
      exposes: {
        "./Footer": "./src/components/Footer",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: "^18.0.0",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^18.0.0",
        },
        "@emotion/react": {
          singleton: true,
          eager: true,
          requiredVersion: "^11.13.5"
        }
      },
    }),
  ],
};
