<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 21:17:40
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-01-01 22:26:00
 -->
<template>
  <div class="comment-wrapper">
    <div class="comment" @mouseover="hoverStatus=true" @mouseout="hoverStatus=false">
      <img :class="['user-icon',hoverStatus===true?'rotateImg':'']" src="https://secure.gravatar.com/avatar/062529d759a207d325167516dd980e5a?s=64&r=G&d=" alt="用户头像">
      <div class="comment-right">
        <div class="top-wrapper">
          <span class="writer">张三</span>
          <span class="time">2019-08-17  21:00</span>
        </div>
        <div class="context">今天真开心~</div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'Comment', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
  },
  data(){
    return{
      hoverStatus:false
    }
  },
  methods:{
  },
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
.comment
  width 100%
  display flex
  padding 5px 0
  img   
    height 60px
    width 60px
    // border-radius 50%
    margin-right 30px
    // transition-duration 1s
  .rotateImg
      transform: rotate(360deg);
  .comment-right
    margin 5px 0
    flex 1
    .top-wrapper
      font-size 16px
      height 20px
      line-height 20px
      .writer
        font-weight bold
        display inline-block
        margin-right 20px
        height 100%
        color #666
      .time
        height 100%
        display inline-block
        color #666
    .context
      margin-top 10px
      color #666
      font-size 18px
      line-height 24px
      font-family Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif
@media screen and (max-width: 768px) 
  .comment
    img   
      height 40px
      width 40px
      border-radius 50%
      margin-right 10px
    .comment-right
      margin 0px 0
      flex 1
      .context
        margin-top 5px
        color #666
        font-size 16px
</style>