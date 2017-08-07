const webpackConfig = require('./webpack/test.js');

module.exports = function(config) {
  config.set({
    webpack: webpackConfig,
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/whatwg-fetch/fetch.js',
      { pattern: 'test/**/*.spec.js', watched: false },
      { pattern: 'test/data/**/*', watched: false, included: false },
      { pattern: 'src/**/*.js', watched: false, included: false }
    ],
    proxies: {
      '/data/': '/base/test/data/'
    },
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'test/**/*.spec.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: [ 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    plugins: [
      'karma-webpack',
      'karma-coverage-istanbul-reporter',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader'
    ],
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: true
  });
};
