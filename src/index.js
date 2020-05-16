/*
 * @Descripttion: 页面总的配置
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-17 00:01:30
 */
// vue组件的一个出口文件
import 'lib-flexible';
import "babel-polyfill";
import promise from 'es6-promise';
promise.polyfill();
import Vue from 'vue';
import App from './app.vue';
import router from './router/index.js';
import 'animate.css'; //wow动画库

let head = document.getElementsByTagName('head')[0];

// 插入 meta 标签：适配
var oMeta = document.createElement('meta');
oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=0';
oMeta.name = 'viewport';
head.appendChild(oMeta);

// 插入 meta 标签：description
var oMeta3 = document.createElement('meta');
oMeta3.content = '这是一个个人博客分享平台，主要有日常说说，IT技术分享，个人课程录制分享等';
oMeta3.name = 'description';
head.appendChild(oMeta3);

//兼容IE
var oMeta4 = document.createElement('meta');
oMeta4.content = "IE=edge,chrome=1";
oMeta4.httpEquiv = "X-UA-Compatible";
head.appendChild(oMeta4);

// 将组件插到html文档中
const root = document.createElement('div');
document.body.appendChild(root);

//给绑定节点渲染一个vue组件
new Vue({
  router:router,
  render:(h)=>h(App)
}).$mount(root);