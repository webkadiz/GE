const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => ({
  entry: ["./src/js/app.js"],
  output: {
    path: __dirname + "/build/",
    filename: "js/build.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.sass$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.html/,
        use: "html-loader"
      }
    ]
  },
  resolve: {
    extensions: [".css", ".sass", ".js", ".vue"],
    alias: {
      "config-style": __dirname + "/src/sass/config.sass"
    }
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: "src/index.html" })
  ],
  devtool: env === 'dev' ? "source-map" : undefined,
});
