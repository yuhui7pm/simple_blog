<!--
 * @Descripttion: 博客详情页正文组件
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 16:12:24
 * @LastEditors: yuhui
 * @LastEditTime: 2020-02-22 22:38:42
 -->
<template>
  <div class="wrapper">
    <div class="context-wrapper">
      <div class="context" v-html="blogContent.context">
      </div>
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
  },
  props:{
    blogContent:Object
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  .context-wrapper
    width 100%
    min-height 30px
    background white
    border-radius 6px
    color #3d3634;
    .context
      width: 100%;
      padding: 20px 100px 10px;
      font-size: 16px;
      line-height: 30px;
      box-sizing border-box
      &>>>p
        margin 15px 0
      &>>>img 
        margin 20px 0 !important 
        max-height 500px !important
  @media screen and (max-width: 768px) 
    .wrapper
      margin-bottom 20px !important
      .context 
        width 100% !important
        margin 15px auto !important
        padding 20px !important
        line-height 24px !important
</style>