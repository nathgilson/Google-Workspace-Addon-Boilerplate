/*********************************
 *    import webpack plugins
 ********************************/
const path = require("path")
const fs = require("fs")
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
const PORT = envVars.PORT || 3000
envVars.NODE_ENV = process.env.NODE_ENV
envVars.PORT = PORT

const isProd = process.env.NODE_ENV === "production"

/*********************************
 *    define entrypoints
 ********************************/
// our destination directory
const destination = path.resolve(__dirname, "dist")

// define server paths
const serverEntry = "./src/app/index.ts"

// define appsscript.json file path
const copyAppscriptEntry = "./appsscript.json"

// define certificate locations
// see "npm run setup:https" script in package.json
const keyPath = path.resolve(__dirname, "./certs/key.pem")
const certPath = path.resolve(__dirname, "./certs/cert.pem")

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

const gasWebpackDevServerPath = require.resolve("google-apps-script-webpack-dev-server")

// webpack settings for devServer https://webpack.js.org/configuration/dev-server/
const devServer = {
  port: PORT,
  https: true,
  // run our own route to serve the package google-apps-script-webpack-dev-server
  before: (app) => {
    // this '/gas/' path needs to match the path loaded in the iframe in dev/index.js
    app.get("/gas/*", (req, res) => {
      res.setHeader("Content-Type", "text/html")
      fs.createReadStream(gasWebpackDevServerPath).pipe(res)
    })
  }
}

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  // use key and cert settings only if they are found
  devServer.https = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  }
}

// webpack settings used by the server-side code
const serverConfig = {
  ...sharedClientAndServerConfig,
  name: "SERVER",
  // server config can't use 'development' mode
  // https://github.com/fossamagna/gas-webpack-plugin/issues/135
  mode: isProd ? "production" : "none",
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
        test: /\.tsx?$/,
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
      "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development")
    }),
    new GasPlugin()
  ]
}

module.exports = [
  // 1. Copy appsscript.json to destination,
  // 2. Set up webpack dev server during development
  // Note: devServer settings are only read in the first element when module.exports is an array
  { ...copyFilesConfig, ...(isProd ? {} : { devServer }) },
  // 3. Create the server bundle
  serverConfig
]
