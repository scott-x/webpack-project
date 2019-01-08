# webpack-project
```
yarn init
```
# webpack需要处理的文件类型
1， `html` =>对应插件` html-webpack-plugin`
` html-webpack-plugin`：这个插件除了能生成单独的html外，还可以把对应脚本和样式插入到合适的位置，不用我们手动引入了，支持hash的功能，防止更新的时候，有浏览器缓存
2， 脚本的处理
使用`es6`+`react`,对`es6`+`react`对语法做处理  => `babel`+`babel+preset-react`
3, 样式处理
样式分css，sass => `css-loader`+ `sass-loader`
- css
- sass
4, 图片/字体
图片/字体 => `url-loader` + `file-loader` 来处理这些资源

## 其他插件
### html-webpack-plugin
html单独打包成文件：这个插件可以把ejs模板语言组织起来，通过加工，生成一个可以在浏览器运行的html文件
### extract-text-webpack-plugin
样式单独打包成文件：这个插件可以把样式文件提取出来，提取在转化样式时用`style-loader`生成的结果
### CommousChunkPlugin
这个插件是webpack自带的，通过它可以提取模块里的通用部分，放到一个单独的文件里；通过抽取出一个公用的js，可以分担一下js的大小
这个模块的原理：假如某个模块被引入的次数超过某个值（比如3次），就会被单独放到这个文件里
### webpack-dev-server
它的作用有3个：
- 为webpack项目提供服务，能让我们在浏览器里通过http的协议访问编译好的文件，推荐版本`2.9.7`
- 舰艇文件的改动，更改代码自动刷新浏览器
- 路径的代理和转发
```
yarn add webpack-dev-server@2.9.7 --dev
```
webpack-dev-server bug: 多版本共存问题，如何解决呢？使用`node_modules/.bin`下的可执行文件