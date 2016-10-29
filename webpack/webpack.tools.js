'use strict';

const webpack            = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const webpackLoaders     = require('./webpack.loaders');

exports.setEntry = function (ENV, entryUrl) {
  let entry = ENV === 'test' ? {} : {
    app: entryUrl
  };
  return entry;
};

exports.setOutput = function (ENV, outputDir) {
  let output = ENV == 'test' ? {} : {
    path:           outputDir,
    publicPath:     ENV === 'prod' ? '/' : 'http://localhost:8080/',
    filename:       ENV === 'prod' ? '[name][hash].js' : '[name].bundle.js',
    chunkFilename:  ENV === 'prod' ? '[name][hash].js' : '[name].bundle.js'
  };
  return output;
};

exports.setDevtool = function (ENV) {
  // Switch to eval-source-map if needed
  let devtool = 'source-map';
  if (ENV === 'test') {
    devtool = 'inline-source-map';
  } else if (ENV === 'prod') {
    devtool = undefined;
  }
  return devtool;
};

exports.setLoaders = function (ENV) {
  return [
    webpackLoaders.babelLoader,
    webpackLoaders.cssLoader(ENV),
    webpackLoaders.sassLoader,
    webpackLoaders.jqueryLoader,
  ];
};

exports.setDevServer = function () {
  let devServer = {
    contentBase: './app',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };
  return devServer;
};

exports.setPlugins = function (ENV) {
  let plugins = [];

  if (ENV !== 'test') {
    plugins.push(
      new ExtractTextPlugin(
        '[name].[hash].css', {disable: ENV !== 'prod'}
      )
    );
  }
  if (ENV === 'dev') {
    plugins.push(
      new HtmlWebpackPlugin({
        template: './app/index.html',
        filename: '/index.html',
        inject: 'body',
        chunks: ['app']
      })
    );
  }
  if (ENV === 'prod') {
    plugins.push(
      new HtmlWebpackPlugin({
        template: './app/index.html',
        inject: 'body',
        chunks: ['app']
      }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true
      })
    );
  }

  return plugins;
}
