/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-16 23:41:41
 */
// import 'babel-polyfill';
import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta'

//通过全局方法 Vue.use() 使用插件。
Vue.use(Router);
Vue.use(Meta);

// 解决报错问题
// NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated", message: "Navigating to current location ("/index") is not allowed", stack: "Error↵ at new NavigationDuplicated
//  (webpack-int…e_modules/element-ui/lib/mixins/emitter.js:29:22)"}
// 原因:在路由跳转的时候同一个路由多次添加是不被允许的

const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  //vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
  mode:"hash",//必须放在routers前面,如果使用history则刷新页面的时候会显示Can not GET
  routes:[{
    path:'/',
    name:'Home',
    component:() => import('../pages/home/Home.vue'),
    meta: {
      keepAlive: true, //此组件需要被缓存
    }
  },{
    path:'/detail',
    name:'Detail',
    component:() => import('../pages/detail/Detail.vue'),
    meta: {
      keepAlive: false, //此组件需要被缓存
    }
  },{
    path:'/404',
    name:'NotFound',
    component:() => import('../pages/notFound/NotFound.vue')
  },{
    path: '*', // 页面不存在的情况下会跳到404页面
    redirect: '/404',
  }],
  //滚动到顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})