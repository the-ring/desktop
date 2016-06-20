'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/index'
  ],
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
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
    }),
  ],
  module: {
    loaders: [
      {
        loaders: ['babel-loader'],
        include: [
          path.dirname(require.resolve('the-ring-main-react-components')),
          path.resolve(__dirname, 'src'),
        ],
        test: /\.js$/,
      }
    ]
  },
  target: 'electron-renderer'
};
