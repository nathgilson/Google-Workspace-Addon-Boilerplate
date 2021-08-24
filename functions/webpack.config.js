const nodeExternals = require("webpack-node-externals")
const path = require("path")

const devMode = process.env.NODE_ENV === "development"
const isProduction = process.env.NODE_ENV === "production"

const SOURCE_DIR = path.resolve(__dirname, "src")
const OUTPUT_DIR = path.resolve(__dirname, "dist")

const ConfigWebpackPlugin = require("config-webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  mode: devMode ? "development" : "production",
  entry: SOURCE_DIR,
  output: {
    path: OUTPUT_DIR,
    filename: "index.js", // <-- Important
    libraryTarget: "this" // <-- Important
  },
  target: "node", // <-- Important
  resolve: {
    extensions: [".ts", ".tsx", ".json"]
  },
  // Generate sourcemaps for proper error messages
  devtool: "source-map",
  // we exclude all node dependencies
  externals: [nodeExternals()],
  mode: isProduction ? "production" : "development",
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          compilerOptions: {
            module: "es2015"
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: !isProduction
    }),
    new ConfigWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: "./package.json",
        to: OUTPUT_DIR
      }
    ])
  ]
}
