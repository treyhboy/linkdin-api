var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

import baseConfig from './webpack.base.config.babel';

const config = {
  ...baseConfig,
  mode: 'development',
  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3000/',
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false,
      },
    },
    inline: true,
    contentBase: 'nonExistentDirectory',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Load a custom template
      inject: 'body', // Inject all scripts into the body
    }),
  ],
};

export default config;
