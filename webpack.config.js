const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const src = path.resolve(__dirname, './src');
const build = path.resolve(__dirname, './build');
const publicPath = path.resolve(__dirname, './public');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: "development",
  entry: src + '/index.tsx',
  output: {
    path: build,
    filename: "[name].[contenthash].js"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack'
          },
        ],
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.s([ac])ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", "postcss-loader",
        ],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: publicPath + '/img',
          to: build + '/img',
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: publicPath + '/index.html'
    }),
    new ESLintPlugin(),
    new StylelintPlugin({
      fix: true,
    }),
  ],
  resolve: {
    alias: {
      '@': src,
      '%': publicPath,
    },
    extensions: ['.ts', '.js', '.tsx', '.scss', '.css'],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: [build],
  }
}
