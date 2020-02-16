<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 21:00:47
 * @LastEditors: yuhui
 * @LastEditTime : 2020-02-09 22:57:53
 -->
<template>
  <div class="comments-wrapper">
    <p class="comments-lists-title"></p>
    <div class="comments">
      <!-- 在父组件中给子组件绑定一个原生的事件，就将子组件变成了普通的HTML标签，不加“”.native“”事件是无法触发的。
　　  可以理解为该修饰符的作用就是把一个vue组件转化为一个普通的HTML标签，并且该修饰符对普通HTML标签是没有任何作用的。 -->
      <div class="comment-write" v-for="(item,index) in commentsLists" :key="index">
        <div style="transition-duration:0.5s;" :class='"deleteWrapper"+index'>
          <Comment class="commentOne" :insert="index" :item='item' :blogId='blogId' @replyComment="replyIt"></Comment>
          <WriteComment :class='["writeComment","addWrite"+index]' @closeComment='closeOther' :blogId='blogId'></WriteComment>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import WriteComment from './WriteComment.vue';
import Comment from './Comment.vue';
import axios from 'axios';
import { eventBus } from '@/assets/bus';
export default {
  name: 'CommetsList', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
    Comment,
    WriteComment
  },
  data(){
    return{
      statusArr:[],
      count:-1,//用于计数
      insert:true,//顶部评论框的显示与隐藏
      displayIcon:false,
      listNum:'',
      replyName:'',
    }
  },
  props:{
    commentsLists:Array,
    blogId:Number,
  },
  methods:{
    /**
     * @description: 点击评论时，只在该条评论下面显示输入框，其他地方不显示
     * @param {Number} index 第几条评论 
     * @return: 
     * @author: yuhui
     */
    insertReply(index){
      this.statusArr[index] = !this.statusArr[index]; //评论底部显示评论框
      this.$emit('removeReply',!this.statusArr[index]); //最开始的时候肯定是显示的
      if(index!==this.count){
        this.statusArr[this.count]=false //点击另一个评论，上一个评论的点评输入框消失
      }
      this.count = index;

      // 评论区域的显示与隐藏
      for(let i=0;i<this.commentsLists.length;i++){
        if(this.statusArr[i] === true){
          document.getElementsByClassName('addWrite'+i)[0].style.display = 'block';
          document.getElementsByClassName('addWrite'+i)[0].style.paddingTop = '20px';
        }else{
          document.getElementsByClassName('writeComment')[i].style.display = 'none';
        }
      }
    },

    /**
     * @description: 点击评论操作，触发insertReply()方法
     * @param {Number} ind 点击的第几条评论
     * @param {String} name 该条评论的评论者
     * @return: 
     * @author: yuhui
     */
    replyIt(ind,name){
      // 两次点击同一个评论，理应不出现@
      // console.log(this.replyName,'+++',name);

      if(this.replyName===name){
        this.replyName='';
      }else{
        this.replyName=name;
      }
      eventBus.$emit('replyName',this.replyName); 
      this.insertReply(ind);
    },
    
    /**
     * @description: 关闭其他的评论输入框,置顶输入框
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    closeOther(){
      for(let i=0;i<this.commentsLists.length-1;i++){
        this.statusArr[i] === false;
        document.getElementsByClassName("addWrite"+i)[0].style.display = 'none';
      }
      this.$emit('removeReply',true)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .comments-wrapper
    padding 50px 0
    background white
    border-bottom-left-radius 6px
    border-bottom-right-radius 6px
    .comment-write
      overflow hidden
      &:last-child
        border-bottom none
      .add-write
        padding 0
        margin-top 20px
        margin-left 50px
        margin-right 50px
    .commentOne
      padding 15px 50px
      box-sizing border-box
      transition-duration 0.2s
      &:hover
        background #f6f9fa
    .writeComment
      display none
    .removeComment
      transition-duration 0.2s
      height 0
  @media screen and (max-width: 768px) 
    .comments-wrapper 
      padding 20px 0
      margin-left 10px
      margin-right 10px
      .commentOne
        padding 8px 10px
  @media screen and (max-width: 375px) 
    .comments-wrapper
      padding 0px 0 60px !important
</style>