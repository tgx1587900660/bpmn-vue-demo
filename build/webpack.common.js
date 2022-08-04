'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 网页标题
      title: 'test-bpmn.js',
      // 模板文件位置
      template: path.resolve(__dirname, '../static/index.html'),
      // 将给定的favicon路径添加到输出HTML
      favicon: path.resolve(__dirname, '../static/favicon.ico'),
      // 添加一个 ICON_URL 自定义属性，可以在模板html中用 htmlWebpackPlugin.options.ICON_URL 访问到
      ICON_URL: 'ICON_URL'
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      // vue 相关 loader
      { test: /\.vue$/i, loader: 'vue-loader' },
      // 样式 相关 loader
      { test: /\.(scss|css)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      // bpmn 相关 loader
      { test: /\.bpmn$/i, use: ['raw-loader'] }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.ts', '.json']
  }
}
