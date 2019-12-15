<template>
  <div class="listWrapper">
    <ol>
      <li>
        <Classify></Classify>
      </li>
      <li :style="{overflow:messageHover?'visible':'hidden'}">
        <Message @hideIt="hideSideBar"></Message>
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
      classifyHover:false,
      messageHover:true,
      aboutMeHover:false,
      friendLinkHover:false,
    }
  },
  components:{
    Classify,
    Message,
    AboutMe,
    FriendlyLink
  },
  mounted(){
  },
  methods:{
    hideSideBar(msg){
      switch(msg){
        case "messageHide-false":
            this.messageHover = false
          break;
        case "messageHide-true":
          this.messageHover = true;
          break;
      }
    }
    // 函数防抖：规定函数至少间隔多久执行;函数节流：规定函数在某时间段内最多执行一次
    // 1s之后才设置overflowhidden
    // overflowHideFun(index,cls){
    //   if(1){
    //     this.classifyHover=false;
    //     console.log('已经设置隐藏1',this.classifyHover)
    //   }else if(2){
    //     this.messageHover=false;
    //     console.log('已经设置隐藏2',this.messageHover)
    //   }else if(3){
    //     this.aboutMeHover=false;
    //     console.log('已经设置隐藏3',this.aboutMeHover)
    //   }else if(4){
    //     this.friendLinkHover=false;
    //     console.log('已经设置隐藏4',this.friendLinkHover)
    //   }
    // },
    // 事件委托完成子组件hover判断
    // hoverLi(event,flag){
    //   let cls = (event||window.event).target.className;
    //   console.log('类名：：：：',cls);
    //   let reg1 = new RegExp(/.*classify.*/g);
    //   let reg2 = new RegExp(/.*message.*/g);
    //   let reg3 = new RegExp(/.*aboutMe.*/g);
    //   let reg4 = new RegExp(/.*friendLink.*/g);
      
    //   if(flag=="moveIn"){
    //     if(reg1.test(cls))
    //       this.classifyHover=true;
    //     else if(reg2.test(cls))
    //       this.messageHover=true;
    //     else if(reg3.test(cls))
    //       this.aboutMeHover=true;
    //     else if(reg4.test(cls))
    //       this.friendLinkHover=true;
    //   }else if(flag=="moveOut"){
        // if(reg1.test(cls)){
        //   this.classifyHover=false;
        // }else if(reg2.test(cls)){
        //   this.messageHover=false;
        // }else if(reg3.test(cls)){
        //   this.aboutMeHover=false;
        // }else if(reg4.test(cls)){
        //   this.friendLinkHover=false;
        // }
    //   }
    // },
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
      border-top 1px solid #666
      font-size 18px
      color #666
      background #CCFFCC
      transition-duration 1s  
      &:hover
        cursor default
      &:hover
        margin-bottom 100px
</style>