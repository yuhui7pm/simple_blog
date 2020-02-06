<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-02-06 16:55:43
 -->
<template>
  <div id="app">
    <!-- 用来对组件进行缓存，从而节省性能 -->
    <!-- <keep-alive>  -->
      <!-- router-view 当做是一个容器，它渲染的组件是你使用 vue-router 指定的。比如： -->
      <router-view/><!--承载路由组件-->
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name:'App',
  // data(){
  //   return{
  //      isMobile:true
  //   }
  // },
  // methods: {
  //   // 判断移动端还是pc端
  //   _isMobile(){
  //     let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  //     return flag;
  //   }
  // },
  // mounted: function() {
  //   if (this._isMobile()) {
      
  //     // alert('手机端');
  //     // this.$router.replace('/homeAndroid');
  //   }else {
  //     // alert('pc端');
  //     // this.$router.replace('/Home');
  //   }
  // },
}
</script>

<style lang="stylus" scoped>
// @import是stylus的语法
@import './assets/styles/reset.css';//全局初始化文件
@import './common/font/font.css';   //引入字体文件
</style>