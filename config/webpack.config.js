const path    = require('path');
const env     = require('yargs').argv.mode;
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')

const projectRoot = path.resolve(__dirname, '../');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const plugins = [];
if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
}

const config = {
  entry: {
    app: `${projectRoot}/src/app/index.js`
  },
  devtool: 'source-map',
  output: {
    path: `${projectRoot}/dist/js`,
    filename: '[name].min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /(node_modules)/
      },
      {
        test: /\.(less)$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.log$/,
        loader: "raw-loader"
      }
    ]
  },
  resolve: {
    root: `${projectRoot}/src`,
    extensions: ['', '.js']
  },
  externals: {
    'vendor': 'vendor'
  },
  postcss: function () {
    return [ autoprefixer ]
  },
  plugins,

  devServer: {
    publicPath: "/js",
    contentBase: path.resolve(__dirname, "../dist")
  }
};

module.exports = config;
