'use strict';

const autoprefixer	 	= require('autoprefixer');
const path		 		    = require('path');
const tools    				= require('./webpack/webpack.tools');

function webpackConfig (ENV) {
  let config = {}

  config.entry     = tools.setEntry(ENV, './app/app.js');
  config.output    = tools.setOutput(ENV, __dirname + '/dist');
  config.devtool   = tools.setDevtool(ENV);
  config.devServer = tools.setDevServer();
  config.plugins   = tools.setPlugins(ENV);
  config.postcss   = [ autoprefixer({browsers: ['last 2 version']}) ];
  config.module    = {
    loaders:    tools.setLoaders(ENV)
  };

	return config;
}

module.exports = webpackConfig(process.env.NODE_ENV);
