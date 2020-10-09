/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-03 21:51:51
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-03 22:07:22
 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const app = express();
const compiler = webpack(webpackConfig); // webpack开发环境配置
const mockPlugin = require('../src/plugins/mock-plugin/index.js');
 
const config = {
 prd: 3002
};
 
 // 注册webpack-dev-middleware中间件
app.use(
 devMiddleware(compiler, { 
  publicPath: webpackConfig.output.publicPath
 })
);
 
// 注册webpack-hot-middleware中间件
app.use(
 hotMiddleware(compiler) 
);
 
// 注册mockPlugin插件
app.use(
 mockPlugin({ 
  routes: {
   '/api': 'http://localhost:3002' // 测试代理到服务器的地址
  },
  root: path.resolve(__dirname) // 项目根目录
 })
);
 
app.listen(config.prd, function () {
 console.log('访问地址：', `http://localhost:${config.prd}`);
});