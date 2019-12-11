// 总的app组件
<template>
  <div>
    <keep-alive>
      <router-view/><!--承载路由组件-->
    </keep-alive>
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