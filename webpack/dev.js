const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const envConfig = require('../env/dev.js')

module.exports = (env = {}, argv = {}) => {
  console.log('mode -> ', argv.mode)
  console.log('envConfig -> ', envConfig)

  return {
    entry: {
      app: path.resolve('src', 'app.js')
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(node_modules|dist)/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(png|ico|gif|svg|jpe?g)(\?[a-z0-9]+)?$/,
          use: 'url-loader'
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')]
              }
            },
            {
              loader: 'sass-loader',
              options: {}
            },
            {
              loader: 'import-glob-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
                removeComments: false,
                collapseWhitespace: true
              }
            }
          ]
        }
      ]
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: 'dist',
      open: true,
      watchContentBase: true
    },
    plugins: [
      new webpack.DefinePlugin({
        ENV: JSON.stringify(envConfig)
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[hash].css',
        chunkFilename: '[id].css'
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets/images',
          to: 'images',
          force: true
        }
      ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html'
      })
    ],
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, '../dist'),
      filename: 'script/[name].[hash].bundle.js',
      chunkFilename: '[name].chunk.js'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
        '~': path.resolve(__dirname, '../'),
      },
      extensions: ['.js']
    }
  }
}
