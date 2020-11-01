<!--
 * @Descripttion: 详情页的博客title显示
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 15:31:36
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-17 17:20:54
 -->
<template>
  <div class="blogTitle">
    <img :src="blogContent.picurl" class="pic-left" alt="封面图片">
    <div class="right-wrapper">
      <div class="title-tag">
        {{ `NO.${blogIndOrder} | ${timestampToTime(blogContent.createtime,'toDay')}` }}
      </div>
      <h1>{{ blogContent.title }}</h1>
      <audio
        ref="audioMusic" :src="blogContent.musicurl" controls="controls"
        preload
      />
    </div>
  </div>  
</template>

<script>
import { timestampToTime } from '@/utils/time';

export default {
  name: 'Title', // 不能与下面组件名字重读，否则会堆栈溢出
  components: {
  },
  props: {
    blogContent: {
      type: Object,
      default: () => {
        return {};
      }
    },
    blogIndOrder: {
      type: Number,
      default: 0
    }
  },
  methods: {
    timestampToTime
  }
};
</script>

<style lang="stylus" scoped>
  /* stylelint-disable */
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
      margin-bottom 40px
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
        width 100%
        outline none
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