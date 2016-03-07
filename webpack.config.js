var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: './entry.jsx',
  output: {
    path: 'lib',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url',
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false },
    }),
    new CompressionPlugin(),
  ],
  devtool: 'source-map',
};
