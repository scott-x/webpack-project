```
yarn add webpack@3.10.0 --dev
```
# 如何使用webpack
[官网](https://webpack.js.org/) ,webpack的开发文档已经汉化了，只有api的部分没有被翻译，不过已经足够了。可以通过api自定义一些插件和loader
## 快速搭建
#### 项目目录下新建 webpack.config.js
```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  }
};
```
指定了入口和出口，那么接着就可以在终端使用`node_modules/.bin/webpack`来打包了，可以看到非常简单

## html-webpack-plugin构建html模板
```
yarn add html-webpack-plugin@2.30.1 --dev
```
```
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```
引入上面的配置打包之后会有什么效果呢？它会自动在dist目录生成一个`index.html`的文件
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
  <script type="text/javascript" src="app.js"></script></body>
</html>
```
#### 那么如何自定义html模板呢，[github](https://github.com/jantimon/html-webpack-plugin#options)
```
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
```
接着在src目录下创建模板文件`index.html`
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="author" content="Scott">
	<meta name="viewPort" content="width=device-width,initial-scale=1">
	<title>app</title>

</head>
<body>
	<div id="app">test</div>
</body>
</html>
```
打包编译后
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="author" content="Scott">
	<meta name="viewPort" content="width=device-width,initial-scale=1">
	<title>app</title>

</head>
<body>
	<div id="app">test</div>
<script type="text/javascript" src="app.js"></script></body>
</html>
```
## 接着讲讲babel的使用

