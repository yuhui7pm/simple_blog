<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-14 18:11:07
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-01-01 18:27:28
 -->
<template>
  <div class="msgWrapper">
    <h3 @click="hideWrapper();">留言反馈</h3>
    <div class="text-wrapper" :style="{opacity:messageDisplay?1:0}">
      <textarea v-model="str"></textarea>
      <input value="提交反馈" type="button" @focus="postStatus=true;str=''" @blur="postStatus=false"/>
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
      hideMsgBottom:false
    }
  },
  props:{
    messageDisplay:Boolean
  },
  updated(){
    if(this.messageDisplay==true){
      this.showSta = true;
    }else{
      this.showSta = false;
    }
  },
  components:{
  },
  methods:{
    hideWrapper(){
      this.showSta=!this.showSta;
      this.$emit('toBottom',this.showSta?'messageFlag':'');
    },
  }
}
</script>

<style lang="stylus" scoped>
  .msgWrapper
    width 100%
    box-sizing border-box
    position relative
    height auto
    h3
      height 50px
      line-height 50px
    .text-wrapper
      transition-duration 1s
    textarea 
      margin 5px 7px 0px
      padding 3px
      width calc(100% - 14px)
      height 70px
      box-sizing border-box
      overflow-y scroll
      background none
      border 1px solid #25a4bb
      font-size 16px
      color #25a4bb
      clear both
      resize none
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
    textarea::-webkit-scrollbar
      display none
    input
      background none
      padding 0 10px
      border-radius 5px
      font-size 14px
      margin-right 10px
      color #25a4bb
      &:hover
        cursor pointer
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