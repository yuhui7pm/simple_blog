import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/home/Home.vue';

//通过全局方法 Vue.use() 使用插件。
Vue.use(Router);
export default new Router({
  routes:[{
    path:'/',
    name:'Home',
    component:Home
  }],
  //滚动到顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})