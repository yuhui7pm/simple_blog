import 'babel-polyfill';
import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/home/Home.vue';
import Detail from '../pages/detail/Detail.vue';
import NotFound from '../pages/notFound/NotFound.vue'


//通过全局方法 Vue.use() 使用插件。
Vue.use(Router);
export default new Router({
  //vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
  // mode:"history",//必须放在routers前面
  routes:[{
    path:'/',
    name:'Home',
    component:Home
  },{
    path:'/detail',
    name:'Detail',
    component:Detail
  },,{
    path:'/404',
    name:'NotFound',
    component:NotFound
  }, {
    path: '*', // 页面不存在的情况下会跳到404页面
    redirect: '/404',
  }],
  //滚动到顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})