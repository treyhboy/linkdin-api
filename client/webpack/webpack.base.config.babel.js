var webpack = require('webpack');
var path = require('path');

const config = {
  devtool: 'source-map',
  entry: {
    app: ['babel-polyfill', './src/App.js'],
  },
  output: {
    path: path.resolve(__dirname, '../../dist/web/client'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.(jpg|png)/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/'
          }
        }],
      },
    ],
  }
};

export default config;
