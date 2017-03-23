const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModules = {};

fs.readdirSync('node_modules')
.filter(x => ['.bin'].indexOf(x) === -1)
.forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

const cssLoader = ExtractTextPlugin.extract({ use: 'css-loader' });
const stylusLoader = ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!stylus-loader' });

module.exports = [
  {
    entry: path.join(__dirname, '/src/client/main.jsx'),
    output: {
      path: path.join(__dirname, '/lib/client/js'),
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: path.join(__dirname, '/src/client'),
          loader: 'babel-loader',
          query: {
            presets: ["node7", "stage-1", "react"],
          },
        },
        {
          test: /\.styl|\.css$/,
          include: path.join(__dirname, '/src/client/styles'),
          loader: stylusLoader,
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin("../css/[name].css")
    ],
  },
  {
    entry: path.join(__dirname, '/src/index.js'),
    target: 'node',
    output: {
      path: path.join(__dirname, '/lib'),
      filename: 'index.js',
    },
    externals: nodeModules,
  },
];
