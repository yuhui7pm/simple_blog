<!--
 * @Descripttion: 评论的表情项
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-05-17 12:25:55
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-18 17:41:36
--> 
<template>
  <div class="wrapper">
   <div class="shaky-wrapper">
     <span @click="getEmojiItem()"><img style="margin-top:-2px" src="../../../../assets/icons/emoji.svg" width="30" height="30"></span>
   </div>
   <div class="emoji-wrapper" v-show="isShow" ref="emojiWrapper">
     <div class="emoji-classification">
       <span class="emojiTitle" @click="emojiFlag=true" :style="emojiFlag?'color:#F4606C':''">emoji表情</span>
       <span class="emojiTitle" @click="emojiFlag=false" :style="!emojiFlag?'color:#F4606C':''">颜表情</span>
     </div>
      <!-- 颜表情 -->
      <span 
        v-show="!emojiFlag"
        class="shaky shakyInner"
        v-for="value of emojiLists"
        :key="value.id"
        @click.stop="writeEmoji(value.font)"
        @touchmove.prevent
      >
        {{value.font}}
      </span>
      <!-- emoji表情 -->
      <span 
        v-show="emojiFlag"
        class="shaky shakyInner"
        v-for="value of qqEmojiLists"
        :key="value.id"
        @click.stop="writeEmoji(value.font)"
        @touchmove.prevent
      >
        {{value.font}}
      </span>
   </div>
  </div>
</template>

<script>

import { eventBus } from '@/assets/bus';
let EmojiUrl = require('../../../../../static/mock/emoji.json');
export default {
  name:'shaky',
  data(){
    return{
      emojiLists:[],//颜表情列表数据
      qqEmojiLists:[],//qq表情包
      emojiFlag:true,
      status:false,//表情选项框的显示与隐藏
      isShow:false,
    }
  },
  methods:{
    
    /**
     * @description: 获取表情包列表数据
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    getEmojiItem(){
      const data = EmojiUrl.data;
      this.emojiLists = data.emojiLists; 
      this.qqEmojiLists = data.emojiPic;
      this.isShow = true;
    },
    
    /**
     * @description: 监听表情栏点击事件
     * @param {Object} e 鼠标点击的对象 
     * @return: 
     * @author: yuhui
     */
    emojiDisplay(e){
      let _this = this;
      if((e.target.className=='emoji-wrapper'||e.target.className=="shaky shakyInner")
        &&this.isShow!==true){
        this.isShow=true;
      }else if(e.target.className=="emojiTitle"){
        this.isShow=true;
      }else{
        _this.isShow=false;
      }
    },
    
    /**
     * @description: 将表情传过去给textarea
     * @param {String} emoji 鼠标所点击的emoji表情 
     * @return: 
     * @author: yuhui
     */
    writeEmoji(emoji){
      eventBus.$emit('writeEmoji', emoji)
    },
  },
  mounted(){
    //点击颜色其它区域隐藏
    document.addEventListener('click', this.emojiDisplay,true);
  },
  destroyed(){
    document.removeEventListener('click',this.emojiDisplay,true);
  }
}
</script>

<style lang="stylus" scoped>
@import url('../../../../assets/styles/shaky.css');
  .shaky-wrapper
    display inline-block
    height 34px
    line-height 34px
    width 80px
    box-sizing border-box
    overflow hidden
    text-align left
    cursor pointer
    border-radius 2px
    .shaky
      font-size 14px
      color #888
      display inline-block
  .emoji-wrapper
    width 820px 
    opacity 1
    border 1px solid #8CC2D4
    box-sizing border-box
    padding 10px
    margin-top 5px
    border-radius 5px
    position absolute
    z-index 10
    background #f7f7f7
    .emoji-classification
      width calc(100% - 24px)
      margin 0px auto
      padding 0px 0 10px
      border-bottom 1px solid #8CC2D4 
      span
        text-align left
        width 100px
        display inline-block
        font-weight bold
        &:hover
          cursor pointer
          color #F4606C
    .shakyInner
      font-size 14px
      background #f1f1f1 
      padding 8px 4px
      border-radius 5px
      display inline-block
      margin 10px 0 0 12px
      border 1px solid #dedede
      cursor pointer
      &:hover
        box-shadow #ddd 0 2px 4px 0px
    .shakyInner:last-child
      margin-bottom 10px
@media screen and (max-width: 768px) and (min-width :375px)
  .shaky-wrapper
    height 34px
    line-height 34px
    width auto
    font-size 16px
    margin-right 20px
    .shakyInner
      font-size 12px !important
      padding 5px !important 
  .emoji-wrapper
    width auto
    padding 0px !important
    height 400px
    overflow-y scroll
    margin 0px 30px 0 0 !important
    .emoji-classification
      margin-top 10px
@media screen and (max-width: 375px) 
  .shaky-wrapper
    width 40px
  .emoji-wrapper
    width 320px !important
    height 150px !important
    padding 0px
    overflow-y scroll
    .shakyInner
      font-size 10px
    .emoji-classification
      margin-top 10px
</style>