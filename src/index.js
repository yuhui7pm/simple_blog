/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors: yuhui
 * @LastEditTime : 2020-02-10 00:16:10
 */
// vue组件的一个出口文件
import 'lib-flexible';
import "babel-polyfill";
import promise from 'es6-promise';
promise.polyfill();
import Vue from 'vue';
import App from './app.vue';
import router from './router/index.js';
// import common from './assets/common.js'

// 插入 meta 标签
// var oMeta = document.createElement('meta');
// oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=0';
// oMeta.name = 'viewport';
// document.documentElement.appendChild(oMeta);

//兼容IE
// var head = document.head || document.getElementsByTagName('head')[0];
// var oMeta2 = document.createElement('meta');
// oMeta2.content = "IE=edge,chrome=1";
// oMeta2.httpEquiv = "X-UA-Compatible";
// head.appendChild(oMeta2);

// Vue.config.productionTip = false
// fastClick.attach(document.body)

//插入title属性
// var tit = document.createElement('title');
// tit.innerHTML = "Xlink Blog";
// document.documentElement.appendChild(tit);

// 将组件插到html文档中
const root = document.createElement('div');
document.body.appendChild(root);

//给绑定节点渲染一个vue组件
new Vue({
  router:router,
  render:(h)=>h(App)
}).$mount(root);

//公共方法
// Vue.prototype.common = common;

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

/* vue有两种形式的代码 compiler（模板）模式和runtime模式（运行时），vue模块的package.json的main字段
默认为runtime模式， 指向了"dist/vue.runtime.common.js"位置。
下面这种是compiler模式
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
}) */

//给绑定节点渲染一个vue组件
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })