const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/imageToArray.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'image-to-array.js',
    sourceMapFilename: 'image-to-array.js.map',
    chunkFilename: '[id].chunk.js',
    publicPath: path.resolve(__dirname, '../dist'),
    library: 'ImageToArray',
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'test': path.resolve(__dirname, '../test')
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: false
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: 'pre',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../test')
        ],
        loader: 'eslint-loader'
      },
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../test')
        ],
        loaders: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env'],
            plugins: ['transform-async-to-generator']
          }
        }]
      }
    ]
  }
};
