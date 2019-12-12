<template>
  <div class="cover" ref="cover">
    <router-link to='/'>
      <header>
        <div class="header-wrapper">
          <img src="../../../assets/icons/coffee.svg" alt="博客icon"/>
          <p>Xlink Blog</p>
        </div>
      </header>
    </router-link>
    <div class="cover-pic">
      <img src="../../../assets/images/header_illustration.png" alt="人物图片">
    </div>
    <div class="contact-me">
      <a href="https://github.com/yuhui7pm"><img src="../../../assets/icons/github.svg" alt="通过github联系作者"/></a>
      <a href="https://blog.csdn.net/qq_40511157"><img src="../../../assets/icons/csdn.svg" alt="通过csdn联系作者"/></a>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../../assets/bus';
export default {
  data(){
    return{
      hei:0,
    }
  },
  mounted(){
     eventBus.$emit('getCoverHei',this.$refs.cover.offsetHeight);//兄弟组件间传值,传递顶部的高度
  }
}
</script>

<style lang="stylus" scoped>
  .cover
    margin-bottom 40px
    header
      width 100%
      height 80px
      padding-left 40px
      box-sizing border-box
      .header-wrapper
        height 100%
        min-width 238px 
        overflow hidden
        img 
          width 40px
          height 75px
          margin-right 20px
          vertical-align top //不加这个的话，对不齐顶部
        p
          font-size 1.8em
          font-family Georgia, serif
          // font-style italic
          font-weight 500
          color #555
          line-height 80px  
          letter-spacing:2px
          display inline-block
    .cover-pic
      text-align center
      background url('../../../assets/images/bg_dot.png') repeat
      background-size contain
      height 540px
      img
        width 1080px
        height 100%
    .contact-me
      width 100%
      height 37px
      text-align center
      img 
        width 37px
        height 37px
        margin 0 15px
      img:hover
        cursor pointer
    //小于屏幕宽度时，图片消失
    @media screen and (max-width: 768px) 
      header
        padding-left 0
        .header-wrapper
          margin 0 auto
          text-align center
      .cover-pic
        display none
</style>