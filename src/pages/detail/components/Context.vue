<!--
 * @Descripttion: 博客详情页正文组件
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 16:12:24
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-18 17:37:20
 -->
<template>
  <div class="wrapper">
    <div class="context-wrapper">
      <div class="context">
        {{ blogContent.context }}
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Title', // 不能与下面组件名字重读，否则会堆栈溢出
  components: {
  },
  props: {
    blogContent: {
      type: Object,
      default: () => {
        return {
          context: ''
        };
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  /* stylelint-disable */
  .wrapper
    width 100%
    background white
    .context-wrapper
      min-height 30px
      color #3d3634;
      margin 0 100px
      //border 1px dashed #aaa
      border-left none
      border-right none
      .context
        width: 100%;
        //padding: 30px 0px;
        font-size: 16px;
        line-height: 30px;
        box-sizing border-box
        color #333
        &>>>img
          margin 20px 0
          max-height 500px
          max-width 500px !important
        &>>>a
          word-wrap break-word
  @media screen and (max-width: 768px)
    .wrapper
      .context-wrapper
        background white
        margin 0 5px !important
        border none
        .context
          width 100% !important
          padding 20px 20px 20px !important
          line-height 24px !important
          &>>>img
            margin 20px 0
            max-height auto
            width 100%
  @media screen and (max-width: 360px)
    .wrapper
      .context-wrapper
        .context
          padding: 5px 20px 20px !important;
          &>>>p
            margin 10px 0 !important
          &>>>img
            margin 10px 0 !important
</style>