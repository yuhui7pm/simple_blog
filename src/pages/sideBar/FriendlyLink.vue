<template>
  <div class="friendWrapper" @mouseenter="friendShow=true" @mouseleave="friendShow=false">
    <h3>友情链接</h3>
    <div class="friend-text-wrapper" :style="{opacity:friendShow?1:0}">
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
      <a>xx的个人博客</a>
    </div>  
  </div>
</template>

<script>
export default {
  name:'friendlyLink',
  data(){
    return{
      friendShow:false
    }
  },
  components:{
  },
}
</script>

<style lang="stylus" scoped>
.friendWrapper
  width 100%
  h3
    height 50px
    line-height 50px
  .friend-text-wrapper
    padding 5px
    text-align center
    font-size 14px
    color #aaa
    transition-duration 1s
    padding-top 0
    height 100px
    box-size border-box
    overflow-y scroll
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar
      display none
    // animation displayInput 1s 1 forwards
    // display block !important
    // @keyframes displayInput{
    //   0%{
    //     opacity 0 
    //   }
    //   100%{
    //     opacity 1 
    //   }
    // }
    a:first-child
      margin-top 10px
    a:hover
      cursor pointer
      color red
    a 
      display inline-block
      margin 5px
</style>