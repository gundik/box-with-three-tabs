const path    = require('path');
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '../');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const config = {
  context: projectRoot,
  entry: {
    vendor: './src/vendor/index.js'
  },
  output: {
    path: 'dist',
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /(node_modules)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  postcss: function () {
    return [ autoprefixer ]
  },
  plugins: [
    new UglifyJsPlugin({ minimize: true })
  ]
};

module.exports = config;
