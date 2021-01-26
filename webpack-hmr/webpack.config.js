const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // 开发模式不压缩代码，方便调试
  entry: './src/index.js', // 入口文件
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}