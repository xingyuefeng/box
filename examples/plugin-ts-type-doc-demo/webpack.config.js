const path = require('path');
const PluginTsTypeDoc = require('@box/plugin-ts-type-doc')


module.exports = {
  entry: './src/index.ts',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].js'
  },
  mode: 'production',
  
  module: {
    rules: [
      {
        test: /\.ts?$/i,
        loader: 'babel-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new PluginTsTypeDoc()
  ]

};
