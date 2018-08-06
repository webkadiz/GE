const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  entry: ["./src/js/app.js"],
  output: {
    path: __dirname + "/build/js",
    filename: "build.js",
    publicPath: "/build/js/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
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
      }
    ]
  },

  devServer: {
    overlay: true
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin(), new VueLoaderPlugin()],
  devtool: "eval",
  mode: "development",
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  }
};
