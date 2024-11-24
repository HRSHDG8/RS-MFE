const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    port: 3000,
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        Testimonial: "testimonial@http://localhost:3001/remoteEntry.js",
        Misc: "misc@http://localhost:3002/remoteEntry.js",
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
