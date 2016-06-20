'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './main',
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      global: {}, // bizarre lodash(?) webpack workaround
      'global.GENTLY': false // superagent client fix
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false
  },
};
