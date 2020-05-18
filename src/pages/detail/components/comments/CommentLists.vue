<!--
 * @Descripttion: 文章评论列表和其对应的输入框
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 21:00:47
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-18 18:38:20
 -->
<template>
  <div class="comments-wrapper">
    <div class="comments">
      <!-- 在父组件中给子组件绑定一个原生的事件，就将子组件变成了普通的HTML标签，不加“”.native“”事件是无法触发的。
　　  可以理解为该修饰符的作用就是把一个vue组件转化为一个普通的HTML标签，并且该修饰符对普通HTML标签是没有任何作用的。 -->
      <div class="comment-write" v-for="(item,index) in commentsLists" :key="item.createtime">
        <div style="transition-duration:2s;" :class='"deleteWrapper"+index'>
          <Comment class="commentOne" :insert="index" :item='item' :blogId='blogId' @replyComment="replyIt" :key="index"></Comment>
          <WriteComment :id="item.createtime" :class='["writeComment","addWrite"+index]' @closeComment='closeOther' :blogId='blogId' :order="index"></WriteComment>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import WriteComment from './WriteComment.vue';
import Comment from './Comment.vue';
import { eventBus } from '@/assets/bus';
import axios from 'axios';
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
      commentsLists:[],
      ind:null,
    }
  },
  props:{
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
        document.getElementsByClassName('addWrite'+i)[0].style.paddingTop = 0;
        document.getElementsByClassName('addWrite'+i)[0].style.margin = '5px 0 10px';
  
        if(this.statusArr[i] === true){
          document.getElementsByClassName('addWrite'+i)[0].style.display = 'block';
          document.getElementsByClassName('addWrite'+i)[0].style.opacity = 0;
          setTimeout(()=>{
            document.getElementsByClassName('addWrite'+i)[0].style.transition = "opacity 0.5s";
            document.getElementsByClassName('addWrite'+i)[0].style.opacity = 1;
          },5)
        }else{
          document.getElementsByClassName('addWrite'+i)[0].style.transition = "opacity 0.5s";
          document.getElementsByClassName('addWrite'+i)[0].style.opacity = 0;
          setTimeout(()=>{
            document.getElementsByClassName('writeComment')[i].style.display = 'none';
          },500);
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
      let newName;
      if(this.replyName===name){
        this.replyName='';
        newName = '';
      }else{
        this.replyName=name;
        newName = name;
      }
      this.ind = ind;
      let replyUser = sessionStorage.setItem('replyName', newName);
      this.insertReply(ind);

      // document.getElementsByClassName('addWrite'+ind)[0].style.display = 'block';
    },

    /**
     * @description: 得到所有评论数据,开发环境与线上环境
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    getCommentsItem(){
      this.commentsLists = [];//置空
      axios.get("/api/blog/getComments",{
        params:{
          blogId:this.blogId
        }
      }).then(res=>{
          if(res.status==200&&res.statusText==='OK'){
            res = res.data;
            const data = res.data;
            this.commentsLists = data.reverse();     //博客列表数据
          }
      })
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
      this.$emit('removeReply',true);
    },

    /**
     * @description: 修改评论点赞的数据
     * @param {Object} obj 需要修改的点赞数据
     * @param {Object} list 所有的评论数据
     * @return: {Object} newArr 修改了点赞信息之后的评论数据
     * @author: yuhui
     */
    changeListsStatus(obj,list){
      let newArr = list.map(function(value,index){
        if(value.createtime==obj.createtime){
          //IE11 这里有问题
          value.likestar = obj.likeNum;
        }
        return value
      })
      return newArr
    },

    /**
     * @description: 删除评论数据
     * @param {Object} obj 需要删除的评论数据 
     * @param {Object} list 所有的评论数据
     * @return: {Object} deleteArr 删除某一项之后的评论数据
     * @author: yuhui
     */
    deleteLists(obj,list){
      let deletedArr = list;
      for(let i=0; i<list.length; i++) {
    　　if (list[i].createtime==obj.createtime) {
    　　　deletedArr.splice(i,1);
    　　}
      }
      return deletedArr;
    },
  },

  mounted(){
    this.getCommentsItem();//页面挂载的时候就获取评论列表数据

    eventBus.$on('changeCommentsLists',obj=>{
      let commentsLists = this.commentsLists;
      // console.log('obj===',obj)
      let arr = this.changeListsStatus(obj,commentsLists);
      this.commentsLists = arr;
    })

    eventBus.$on('addNewComment',obj=>{
      let arrOld = this.commentsLists.reverse();
      this.commentsLists = [];
      arrOld.push(obj);
      this.commentsLists = arrOld.reverse();
    })
    
    eventBus.$on('deleteCommentsLists',obj=>{
      let deletedArr = this.deleteLists(obj,this.commentsLists);
      this.commentsLists = deletedArr;
    })
  },
  
  beforeDestroy () {
    eventBus.$off('addNewComment')
    eventBus.$off('changeCommentsLists')
    eventBus.$off('deleteCommentsLists')
  },
}
</script>

<style lang="stylus" scoped>
  .comments-wrapper
    padding 20px 0
    background white
    border-bottom-left-radius 6px
    border-bottom-right-radius 6px
    .comments-lists-title
      margin 0 100px 20px
      font-size 20px
      &:hover
        cursor default
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
      padding 15px 100px
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
      padding 0 0 10px
      .commentOne
        padding 8px 10px
  @media screen and (max-width: 375px) 
    .comments-wrapper
      padding 0 0 30px !important
      .commentOne
        padding 5px 15px 0
</style>