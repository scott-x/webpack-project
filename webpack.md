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
```
# es6
yarn add babel-core@6.26.0 babel-preset-env@1.6.1 babel-loader@7.1.2 --dev
# react
yarn add babel-preset-react@6.24.1 --dev
```
#### 简单配置，这样就支持了es6和react语法
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
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      }
    ]
  }
};
```
```
# 因为是源码里要用到的，就不加dev了，这里react必须与react-dom的版本一致
yarn add react@16.2.0 react-dom@16.2.0
```
#### 开始写es6和react代码
```
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('app')
);
```
webpack编译后点击dist/index.html， open in browser，就会看到h3的Hello world！

## 到这里，脚本就配置完了，接下来看看样式该怎么配置
```
yarn add style-loader@0.19.1 css-loader@0.28.8 --dev
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
  plugins: [
    new HtmlWebpackPlugin({
       title: 'My App',
         template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
```
#### 接着就可以在app.js中引入css文件了
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('app')
);
```
```
//index.css
#app{
  color:red;
}
```
#### 编译，打开浏览器，可以看到字体变成红色的了app
但是呢，现在有个问题：打包后的app.js中搜索#app，发现18341行才读到这ge样式文件，(根据加载顺序，那这段css代码需要等所有的js执行完毕，才会去解析，去样式渲染)这样的话，首屏加载会很慢，有很长的白屏时间，为了解决这个问题，我们需要把css放入单独的文件里
```
18341 exports.push([module.i, "#app{\n\tcolor:red;\n}", ""]);
```
#### [ExtractTextWebpackPlugin](https://webpack.docschina.org/plugins/extract-text-webpack-plugin/#src/components/Sidebar/Sidebar.jsx)
它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。 如果你的样式文件大小较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载。
```
yarn add extract-text-webpack-plugin@3.0.2 --dev
```
```
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
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
        })
      }
    ]
  }
};
```
编译后，我们发现dist目录下会生成一个index.css文件,index.html变为
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="author" content="Scott">
  <meta name="viewPort" content="width=device-width,initial-scale=1">
  <title>app</title>
<link href="/dist/index.css" rel="stylesheet"></head>
<body>
  <div id="app"></div>
<script type="text/javascript" src="/dist/app.js"></script></body>
</html>
```
#### 支持sass
```
yarn add sass-loader@6.0.6 --dev
yarn add node-sass@4.7.2 --dev
```