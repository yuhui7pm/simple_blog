// 总的app组件
<template>
  <div>
    <!-- 用来对组件进行缓存，从而节省性能 -->
    <!-- <keep-alive>  -->
      <!-- router-view 当做是一个容器，它渲染的组件是你使用 vue-router 指定的。比如： -->
      <router-view/><!--承载路由组件-->
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name:'App'
}
</script>

<style lang="stylus" scoped>
// @import是stylus的语法
@import './assets/styles/reset.css';//全局初始化文件
@import './common/font/font.css';   //引入字体文件
</style>