<template>
  <div class="listWrapper">
    <ol>
      <li :style="{overflow:firstLi?'visible':'hidden'}">
        <Classify @changeOverflow="changeOverflow"></Classify>
      </li>
      <li>
        <Message></Message>
      </li>
      <li>
        <AboutMe></AboutMe>
      </li>
      <li>
        <FriendlyLink></FriendlyLink>
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
      firstLi:false,
    }
  },
  components:{
    Classify,
    Message,
    AboutMe,
    FriendlyLink
  },
  mounted(){
    console.log('this.firstLi,',this.firstLi);
  },
  methods:{
    overflowWait(){
      this.firstLi = false;
    },
    //后面要优化，设置节流函数
    changeOverflow(flag){
      // if(flag==true){
      //   this.firstLi = true;
      // }else{
      //   console.log('设置定时器');
      //   setTimeout(this.overflowWait,1000);
      // }
      // console.log('清除定时器');
      // clearTimeout(this.overflowWait);//清除定时器
      this.firstLi = flag;
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
      border-top 1px solid #ddd
      font-size 18px
      color #999999
      background #CCFFCC
      transition-duration 1s  
      &:hover
        cursor default
      &:hover
        margin-bottom 140px
</style>