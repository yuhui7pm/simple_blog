<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-01-01 12:34:39
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-02-05 22:26:01
 -->
<template>
  <div class="button-wrapper">
    <img src="../../../assets/icons/sidebarBut.svg" alt='侧边栏按钮' width="30" height="30">
  </div>
</template>

<script>

export default {
  name:'SidebarButton',
  props:{
  },
  data(){
    return{
    }
  },
  methods:{

  },
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
.button-wrapper
  height 46px
  width 60px
  line-height 44px
  background black
  text-align center;
  opacity 0.9
  border-top-right-radius 23px
  border-bottom-right-radius 23px
</style>