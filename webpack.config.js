const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const autoprefixer = require("autoprefixer");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== "production";
  return {
    entry: "./src/index.js",
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: "babel-loader"
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff2?|otf)$/,
          use: "file-loader"
        }
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            alwaysWriteToDisk: true,
            template: "./public/index.html"
          },
          isDevelopment
            ? {}
            : {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
        )
      ),

      new HtmlWebpackHarddiskPlugin()
    ],
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "./",
      filename: "bundle.js"
    },
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      publicPath: "/",
      port: 3000,
      hotOnly: true,
      clientLogLevel: "none"
    }
  };
};
