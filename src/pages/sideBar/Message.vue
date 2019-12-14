<template>
  <div class="msgWrapper" @mouseenter="showSta=true" @mouseleave="showSta=false">
    <h3>留言反馈</h3>
    <div class="text-wrapper" v-show="showSta">
      <textarea v-model="str"></textarea>
      <button @click="postStatus=true;str=''">提交反馈</button>
    </div>
    <div :class="[postStatus==true?'mask':'']"></div>
  </div>
</template>

<script>
export default {
  name:'message',
  data(){
    return{
      postStatus:false,
      str:'',
      showSta:false,
    }
  },
  components:{
  },
}
</script>

<style lang="stylus" scoped>
  .msgWrapper
    width 100%
    box-sizing border-box
    position relative
    h3
      height 50px
      line-height 50px
    .text-wrapper
      // opacity 0
      transition-duration 3s
      textarea 
        margin 10px 7px 5px
        padding 3px
        width calc(100% - 14px)
        height 90px
        box-sizing border-box
        overflow-y scroll
        background none
        border 1px solid #ddd
        font-size 16px 
        clear both
      textarea::-webkit-scrollbar
        display none
      button
        background #eee
        padding 0 10px
        border-radius 5px
        font-size 14px
        float right
        margin-right 10px
    .mask
      position absolute
      top 50px
      left 0 
      right 0
      bottom 0
      background url('../../assets/icons/submitSuccess.svg') no-repeat
      background-size 40px 40px
      background-position 50% 40%
      animation postSuccess 3s 1 forwards
      @keyframes postSuccess{
        0%{
          opacity 0 
        }
        40%{
          opacity 1
        }
        70%{
          opacity 1
        }
        100%{
          opacity 0 
        }
      }
    
</style>