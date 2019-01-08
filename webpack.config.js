var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'app.js'
  },
  plugins: [
	  new HtmlWebpackPlugin({
	  	 title: 'My App',
         template: './src/index.html'
	  }),
    new ExtractTextPlugin("index.css"),
  ],
  module: {
    rules: [
      //react文件的处理
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },
      //css文件的处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
        })
      },
      //sass文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }
};