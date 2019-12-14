<template>
  <div class="blogTitle">
    <img src="https://media.simplecast.com/episode/image/291977/thumb_1555299712-artwork.jpg" class="pic-left" alt="封面图片"/>
    <div class="right-wrapper">
      <div class="title-tag">NO.68|35MIN</div>
      <h1>41种蓝色</h1>
      <audio controls>
        <source src="https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/83b511/83b511d3-70d2-4bb9-9734-ee83d74bce44/37b2e9b3-758f-4d75-9925-92fda6642a6b/552830be_tc.mp3" type="audio/mpeg">
      </audio>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'Title', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
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
  .blogTitle 
    overflow hidden
    width 100%
    .pic-left
      border-radius 5px;
      width 240px
      height 240px
      float left
      margin-bottom 30px
    .right-wrapper
      width calc(100% - 240px -40px)
      margin-left 280px
      .title-tag
        background-color #FFE55C
        padding 0px 12px
        margin-bottom 24px
        height 28px
        width auto
        display inline-block
        font-size 12px 
        font-family IBMPlexSans
        letter-spacing 2px
        line-height 28px
      h1
        font-size 36px
        line-height 48px
        margin 8px 0 28px
        font-family "Myriad Pro"
        color #3d3634
        font-weight bold  
      audio
        height 54px
        width 100%
        outline none
  @media screen and (max-width: 768px) 
    .blogTitle
      text-align center 
      .pic-left
        border-radius 5px;
        width 240px
        height 240px
        float none
      .right-wrapper
        width 100%
        margin-left 0
        .title-tag
          margin-bottom 10px
        h1
          margin-bottom 20px
</style>