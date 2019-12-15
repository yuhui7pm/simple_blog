<template>
  <div class="write-wrapper">
   <h2>发表评论</h2>
   <div class="input-wrapper">
      <input placeholder="昵称(必填)"/>
      <input placeholder="电子邮件(选填不公开)"/>
      <input placeholder="网站(选填不公开)"/>
   </div>
    <textarea placeholder="在这里输入你的评论" v-model="str"></textarea>
    <div class="but-wrapper">
      <button>发表</button>
      <Shaky></Shaky>
    </div>
  </div>
</template>

<script>
import Shaky from './Shaky.vue';
import { eventBus } from '../../../../assets/bus';
export default {
  name:'Write',
  data(){
    return{
      str:"",
    }
  },
  components:{
    Shaky
  },
  mounted(){
    eventBus.$on('writeEmoji',emoji=>{
      this.str+=emoji;
    })
  }
}
</script>

<style lang="stylus" scoped>
  *
    background none
    font-size 16px
    font-family "Arial, Helvetica, sans-serif"
  .write-wrapper
    box-sizing border-box
  h2
    padding 15px 0px
    font-size 25px
    color #ccc
    box-sizing border-box
  .input-wrapper
    width 100%
    height 60px
    display flex
    color #ccc
    input 
      padding 15px
      flex 1
      margin-left 10px
      border 1px solid #ccc
      margin-bottom 10px
      box-sizing border-box
      color #ccc
    input::placeholder
      color #ccc
    input:first-child
      margin-left 0px
  textarea
    width 100%
    height 300px
    padding 15px
    box-sizing border-box
    resize none
    border 1px solid #ccc
    box-sizing border-box
    color #ccc
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar /* Chrome Safari */
      display none
  textarea::placeholder
    color #ccc
  .but-wrapper
    margin-top 20px
    overflow hidden
    button
      float right
      color #888
      width 60px
      height 30px
      border 1px solid #ddd
      cursor pointer
  @media screen and (max-width: 768px) 
    .write-wrapper
      margin-left 10px
      margin-right 10px
      .input-wrapper
        display block
        height auto
        input
          width 100% !important
          margin-left 0
          padding 5px
      textarea
        height 150px
        padding 5px
      .but-wrapper
        margin-top 10px
        button
          height 24px
          line-height 24px
          font-size 16px
</style>