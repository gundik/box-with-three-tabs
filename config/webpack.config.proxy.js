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
    },
    proxy: {
      "/feeds/vgno/*": {
        target: "http://www.vg.no/",
        pathRewrite: {"^/feeds/vgno" : ""},
        changeOrigin: true
      },
      "/feeds/arstechnica/*": {
        target: "http://feeds.arstechnica.com/",
        pathRewrite: {"^/feeds/arstechnica" : ""},
        changeOrigin: true
      },
      "/feeds/theregister/*": {
        target: "http://www.theregister.co.uk/",
        pathRewrite: {"^/feeds/theregister" : ""},
        changeOrigin: true
      }
    }
  }
};

module.exports = config;
