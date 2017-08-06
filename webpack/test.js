const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.js');

delete webpackBase.entry;
webpackBase.target = 'node';

module.exports = merge(webpackBase, {
  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        enforce: 'post',
        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
        exclude: /node_modules|\.spec\.js$/
      }
    ]
  }
});
