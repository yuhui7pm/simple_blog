<template>
  <div class="wrapper">
   <div class="shaky-wrapper">
     <span class="shaky" @click="getEmojiItem">（○｀ 3′○）</span>
   </div>
   <div class="emoji-wrapper" v-show="isShow" ref="emojiWrapper">
      <span 
        class="shaky shakyInner"
        v-for="value of emojiLists"
        :key="value.id"
        @click="writeEmoji(value.font)"
      >
        {{value.font}}
      </span>
   </div>
  </div>
</template>

<script>

import { eventBus } from '../../../../assets/bus';
let EmojiUrl = require('../../../../../static/mock/emoji.json');
export default {
  name:'shaky',
  data(){
    return{
      emojiLists:[],//表情包列表数据
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
      this.isShow = true;
    },
    
    /**
     * @description: 监听表情栏点击事件
     * @param {Object} e 鼠标点击的对象 
     * @return: 
     * @author: yuhui
     */
    emojiDisplay(e){
      if((e.target.className=='emoji-wrapper'||e.target.className=="shaky shakyInner")&&this.isShow!==true){
        this.isShow=true;
      }else{
        this.isShow=false;
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
    }
  },
  mounted(){
    //点击颜色其它区域隐藏
    document.addEventListener('click', this.emojiDisplay,true);
    document.addEventListener('touchstart', this.emojiDisplay,true);
  },
  destroyed(){
    document.removeEventListener('click',this.emojiDisplay,true);
    document.addEventListener('touchstart', this.emojiDisplay,true);
  }
}
</script>

<style lang="stylus" scoped>
@import url('../../../../assets/styles/shaky.css');
  .shaky-wrapper
    display inline-block
    height 30px
    line-height 30px
    width 100px
    border 1px solid #AEDD81
    box-sizing border-box
    overflow hidden
    text-align center
    background #fafafa
    cursor pointer
    border-radius 2px
    .shaky
      font-size 14px
      color #888
      display inline-block
  .emoji-wrapper
    width 400px 
    opacity 1
    border 1px solid #AEDD81
    box-sizing border-box
    padding 10px
    margin-top -2px
    border-radius 5px
    border-top-left-radius 0px
    position absolute
    z-index 10
    background #f7f7f7
    .shakyInner
      font-size 14px
      background #f1f1f1 
      padding 8px 4px
      border-radius 5px
      display inline-block
      margin 10px 0 0 12px
      cursor pointer
      &:hover
        box-shadow #ddd 0 2px 4px 0px
    .shakyInner:last-child
      margin-bottom 10px
@media screen and (max-width: 768px) and (min-width :375px)
  .shaky-wrapper
    height 24px
    line-height 24px
    width 80px
    font-size 16px
    .shakyInner
      font-size 12px !important
      padding 5px !important 
  .emoji-wrapper
    width auto !important
    padding 0px !important
    margin 0px 30px 0 0 !important
  @media screen and (max-width: 375px) 
    .emoji-wrapper
      height 150px !important
      margin 0px 20px 0 0 !important
      overflow-y scroll
      .shakyInner
        font-size 10px
</style>