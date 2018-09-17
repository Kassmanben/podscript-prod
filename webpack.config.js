const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {test: /\.svg$/,loader: 'svg-sprite-loader'},
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
          { 
            test: /\.jsx?$/,         // Match both .js and .jsx files
            exclude: /node_modules/, 
            loader: "babel-loader", 
            query:
              {
                presets:['react']
              }
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }

    ]
  },

  plugins: [HtmlWebpackPluginConfig]

};
