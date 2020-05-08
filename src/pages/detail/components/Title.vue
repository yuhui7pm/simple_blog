<!--
 * @Descripttion: 详情页的博客title显示
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 15:31:36
 * @LastEditors: yuhui
 * @LastEditTime: 2020-03-14 00:52:25
 -->
<template>
  <div class="blogTitle">
    <img :src="blogContent.picurl" class="pic-left" alt="封面图片"/>
    <div class="right-wrapper">
      <div class="title-tag">{{`NO.${blogIndOrder} | ${timestampToTime(blogContent.createtime)}`}}</div>
      <h1>{{blogContent.title}}</h1>
      <!-- <audio controls loop="loop" preload="auto">
        <source :src="blogContent.musicurl" type="audio/mpeg">
      </audio> -->
      <audio :src="blogContent.musicurl" controls="controls" preload ref="audioMusic"></audio>
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
  props:{
    blogContent:Object,
    blogIndOrder:Number
  },
  methods:{
    timestampToTime(timestamp) {
      let date =new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear();
      let M = (date.getMonth() +1 <10 ?'0' + (date.getMonth() +1) : date.getMonth() +1);
      let D = date.getDate();
      let h = date.getHours() +':';
      let m = date.getMinutes() +':';
      let s = date.getSeconds();
      return (Y + '-' + M + '-' + D);//时分秒可以根据自己的需求加上
    },
  },
}
</script>

<style lang="stylus" scoped>
  .blogTitle 
    overflow hidden
    width 100%
    background white
    padding 100px 100px 0
    box-sizing border-box
    .pic-left
      border-radius 5px;
      width 240px
      height 240px
      float left
      margin-bottom 30px
      object-fit cover
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
        background-color #f7f7f7
        border-radius 27px
  @media screen and (max-width: 768px) 
    .blogTitle
      text-align center 
      padding 20px 20px 0
      .pic-left
        border-radius 5px;
        width 180px
        height 180px
        float none
        margin-bottom 15px 
      .right-wrapper
        width 100%
        margin-left 0
        .title-tag
          margin-bottom 0px
        h1
          margin-bottom 0px
          font-size 24px
  @media screen and (max-width: 375px) 
    audio 
      display none
    .blogTitle
      .pic-left
      .right-wrapper
        h1
          line-height: 30px !important;
          font-size 22px
</style>