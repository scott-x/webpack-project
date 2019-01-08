var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  plugins: [
	  new HtmlWebpackPlugin({
	  	 title: 'My App',
         template: './src/index.html'
	  })
  ]
};