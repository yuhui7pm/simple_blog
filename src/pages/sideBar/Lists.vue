<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-14 14:56:36
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-16 16:29:37
 -->
<template>
  <div class="listWrapper">
    <ol>
      <li :style="{marginBottom:flagList['classifyFlag']?'100px':'0px',overflow:classifyHover?'visible':'hidden'}">
        <Classify @toBottom='toBot' :classifyDisplay="flagList['classifyFlag']"></Classify>
      </li>
      <li :style="{marginBottom:flagList['messageFlag']?'100px':'0px',overflow:messageHover?'visible':'hidden'}">
        <Message @toBottom='toBot' :messageDisplay="flagList['messageFlag']"></Message>
      </li>
      <li :style="{marginBottom:flagList['aboutFlag']?'100px':'0px',overflow:aboutMeHover?'visible':'hidden'}">
        <AboutMe @toBottom='toBot' :aboutDisplay="flagList['aboutFlag']"></AboutMe>
      </li>
      <li :style="{marginBottom:flagList['friendLinkFlag']?'100px':'0px',overflow:friendLinkHover?'visible':'hidden'}">
        <FriendlyLink @toBottom='toBot' :friendLinkDisplay="flagList['friendLinkFlag']"></FriendlyLink>
      </li>
      <li></li>
    </ol>
  </div>
</template>

<script>
import Classify from './classify/Classify.vue';
import Message from './Message.vue';
import AboutMe from './AboutMe.vue';
import FriendlyLink from './FriendlyLink.vue';
export default {
  name:'lists',
  data(){
    return{
      classifyHover:false,
      messageHover:false,
      aboutMeHover:false,
      friendLinkHover:false,
      flagList:{
        'classifyFlag':false,
        'messageFlag':false,
        'aboutFlag':false,
        'friendLinkFlag':false,
      }
    }
  },
  components:{
    Classify,
    Message,
    AboutMe,
    FriendlyLink
  },
  methods:{
    toBot(flag){
      for(let key in this.flagList){
        this.flagList[key] = false;
      }
      //点击了的这项置为true
      this.flagList[flag] = true;

      //overflow判断显示隐藏
      this.messageHover = false;
      this.classifyHover = false;
      this.aboutMeHover = false;
      this.friendLinkHover = false;
      if(flag==='messageFlag'){
        this.messageHover = true;
      }else if(flag==='classifyFlag'){
        this.classifyHover = true;
      }else if(flag==='aboutFlag'){
        this.aboutMeHover = true;
      }else if(flag==='friendLinkFlag'){
        this.friendLinkHover = true;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.listWrapper
  width 100%
  ol
    width 100%
    background 	#FFFFCC 
    li 
      width 100%
      height 50px
      border-top 1px solid #333
      font-size 18px
      color #333
      background #CCFFCC
      transition-duration 1s  
      &:hover
        cursor default
      // &:hover
      //   margin-bottom 100px
.toBotcls 
  margin-bottom 100px
</style>