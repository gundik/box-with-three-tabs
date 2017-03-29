const path    = require('path');
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '../');

const config = {
  output: {
    path: `${projectRoot}`
  },

  devServer: {
    port: 9090,
    contentBase: path.resolve(__dirname, "../assets"),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};

module.exports = config;
