<!--
 * @Descripttion: 点击底部复制按钮出现的 提示框
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-05-08 18:51:26
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-17 00:19:35
 -->

<template>
  <div v-show="toastFlag" class="toast">
    {{toastText}}
  </div>
</template>

<script>
export default {
  name:'Toast',
  data() {
    return {
    }
  },
  props:{
    toastText: String,
    toastFlag:Boolean
  }
}
</script>

<style lang="stylus" scoped>
  .toast
    opacity 1
    position fixed
    z-index 2000
    left 50%
    transform translateX(-50%)
    bottom 320px
    transition all 2s
    text-align center
    border-radius 5px
    color #FFF
    background rgba(17, 17, 17, 0.7)
    height 45px
    line-height 45px
    padding 0 15px
    max-width 150px
</style>