<!--
 * @Descripttion: 首页顶部背景图
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-11 15:02:04
 -->
<template>
  <div class="cover" ref="cover">
    <div :class="[flag?'fadein':'','cover-pic']">
      <img src="../../../assets/images/header_illustration.png" alt="人物图片">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      hei:0,
      flag:false
    }
  },
  mounted(){
    this.flag = true;
  }
}
</script>

<style lang="stylus" scoped>
  .cover
    margin-bottom 40px
    .cover-pic
      text-align center
      background url('../../../assets/images/bg_dot.png') repeat
      background-size contain
      height 540px
      opacity 0
      img
        width 1080px
        height 100%
    .fadein
      opacity 1
      transition opacity 3s ease

  //小于屏幕宽度时，图片消失
  @media screen and (max-width: 768px) 
    .cover-pic
      display none
</style>