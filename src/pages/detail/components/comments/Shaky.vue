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
import axios from 'axios';
import { eventBus } from '../../../../assets/bus';
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
    //获取表情包列表数据
    getEmojiItem(){
      axios.get('../../../../../static/mock/emoji.json')
        .then(res=>{
          res = res.data;
          if(res.ret&&res.data){
            const data = res.data;
            this.emojiLists = data.emojiLists; 
            this.isShow = true;
          }
      })
    },
    //监听表情栏点击事件
    emojiDisplay(e){
      if((e.target.className=='emoji-wrapper'||e.target.className=="shaky shakyInner")&&this.isShow!==true){
        this.isShow=true;
      }else{
        this.isShow=false;
      }
    },
    //将表情传过去给textarea
    writeEmoji(emoji){
      eventBus.$emit('writeEmoji', emoji)
    }
  },
  mounted(){
    //点击颜色其它区域隐藏
    // console.log('正在挂载监听事件：',this.$refs.emojiWrapper)
    document.addEventListener('click', this.emojiDisplay,true);
    document.addEventListener('touchstart', this.emojiDisplay,true);
  },
  destroyed(){
    // console.log('正在销毁监听事件：',this.$refs.emojiWrapper)
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
    border 1px solid #ccc
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
    border 1px solid #ddd
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
@media screen and (max-width: 768px) 
  .shaky-wrapper
    height 24px
    line-height 24px
    width 80px
    font-size 16px
    .shakyInner
      font-size 12px !important
      padding 5px !important 
  .emoji-wrapper
    width calc(100% - 20px) !important
    padding 5px !important
</style>