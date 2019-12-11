// vue组件的一个出口文件
import Vue from 'vue';
import App from './app.vue';
import router from './router/index.js'

// import './assets/styles/test.css';
// import './assets/styles/test.stylus.styl';



const root = document.createElement('div');
document.body.appendChild(root);

//给绑定节点渲染一个vue组件
new Vue({
  router,
  render:(h)=>h(App)
}).$mount(root);


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