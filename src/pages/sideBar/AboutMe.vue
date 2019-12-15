<template>
  <div class="aboutWrapper" @mouseenter="showSt=true" @mouseleave="showSt=false">
    <h3>关于博客</h3>
    <div :style="{opacity:showSt?1:0}" class="about-text-wrapper">
      <p>98年，性别♂</p>
      <p>记录生活趣事，结交更多有趣的人</p>
    </div>  
  </div>
</template>

<script>
export default {
  name:'aboutWeb',
  data(){
    return{
      showSt:false
    }
  },
  components:{
  },
}
</script>

<style lang="stylus" scoped>
.aboutWrapper
  width 100%
  h3
    height 50px
    line-height 50px
  .about-text-wrapper
    padding 5px
    text-align center
    font-size 14px
    color #25a4bb
    transition-duration 1s
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
    p:first-child
      margin-bottom 15px
      margin-top 20px
</style>