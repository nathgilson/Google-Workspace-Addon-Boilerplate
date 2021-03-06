/*********************************
 *    import webpack plugins
 ********************************/
const path = require("path")
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const GasPlugin = require("gas-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const ConfigWebpackPlugin = require("config-webpack")

/*********************************
 *    set up environment variables
 ********************************/
const dotenv = require("dotenv").config()
const parsed = dotenv.error ? {} : dotenv.parsed
const envVars = parsed || {}

/*********************************
 *    define entrypoints
 ********************************/
// our destination directory
const destination = path.resolve(__dirname, "dist")
// define server paths
const serverEntry = "./src/index.ts"
// define appsscript.json file path
const copyAppscriptEntry = "./appsscript.json"

/*********************************
 *    Declare settings
 ********************************/
// webpack settings for copying files to the destination folder
const copyFilesConfig = {
  name: "COPY FILES - appsscript.json",
  mode: "production", // unnecessary for this config, but removes console warning
  entry: copyAppscriptEntry,
  output: {
    path: destination
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: copyAppscriptEntry,
          to: destination
        }
      ]
    })
  ]
}

// webpack settings used by both client and server
const sharedClientAndServerConfig = {
  context: __dirname
}

// webpack settings used by the server-side code
const serverConfig = {
  ...sharedClientAndServerConfig,
  name: "SERVER",
  mode: "production",
  entry: serverEntry,
  output: {
    filename: "code.js",
    path: destination,
    libraryTarget: "this"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      // typescript config
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          // ecma 5 is needed to support Rhino "DEPRECATED_ES5" runtime
          // can use ecma 6 if V8 runtime is used
          ecma: 5,
          warnings: false,
          parse: {},
          compress: {
            properties: false
          },
          mangle: false,
          module: false,
          output: {
            beautify: true
          }
        }
      })
    ]
  },
  plugins: [
    new ConfigWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(envVars),
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new GasPlugin()
  ]
}

module.exports = [
  // 1. Copy appsscript.json to destination,
  // 2. Set up webpack dev server during development
  // Note: devServer settings are only read in the first element when module.exports is an array
  copyFilesConfig,
  // 3. Create the server bundle
  serverConfig
]
