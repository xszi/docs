# SourceMap

## SourceMap简介

sourceMap的主要作用是为了方便测试，因为现在的前端代码都是模块化、组件化。在上线之前会对JS和CSS代码进行合并压缩。对于开发者来说，对这样的线上代码进行调试是痛苦的，压缩之后的代码可阅读性很差。sourceMap的作用就是让浏览器的调试面板将生成后的代码映射到源码文件中，开发者可以在源码文件中做调试工作。

## SourceMap的作用

1. 开发环境生成SourceMap方便调试代码
2. 生产环境通常会禁用掉SourceMap，避免源码泄露，但是一些第三方库，比如BootStrap会提供sourceMap方便用户测试
3. 生产环境错误监控系统可以收集出错堆栈，经过SourceMap还原出错位置。（[使用sentry进行前端监控](https://woai3c.gitee.io/introduction-to-front-end-engineering/07.htm)）

sourceMap生成过程举例：
* 创建js文件
```js
// index.js
const sayHello = function () {
    console.log('hello sentry');
}
```
* 全局安装uglify.js
~~~
npm i -g uglify-js
~~~
* 命令行执行以下命令
~~~
uglifyjs index.js -o output.min.js --source-map "filename='output.min.js.map'"
~~~
* 生成的js文件和sourceMap文件如下：
```js
// output.min.js
const sayHello=function(){console.log("hello sentry")};
```
```json
// output.min.js.map
{
    "version": 3,
    "file": "output.min.js.map",
    "sources": [
        "index.js"
    ],
    "names": [
        "sayHello",
        "console",
        "log"
    ],
    "mappings": "AAAA,MAAMA,SAAW,WACbC,QAAQC,IAAI"
}
```
uglifyjs压缩代码生成sourceMap文件，然后可对mapping 关系进行优化。

## SourceMap原理

用编码的方式记录代码的位置，后续使用的时候再映射还原。

* 编号： 行（都是0省略）---> 文件 --->|省略| |列位置| |||name（具体变量）|
* 偏移量表示位置：行（都是0省略）---> 文件 --->|省略| |列位置| |||name（具体变量）|

VLQ编码 ，可变长度编码

[surge hugo —— 个人博客部署快速通道](https://jamstack.org/generators/hugo/)

[jamStack —— 国外一个建站帮助网站](https://jamstack.org/generators/)

——————  2020.12.04
