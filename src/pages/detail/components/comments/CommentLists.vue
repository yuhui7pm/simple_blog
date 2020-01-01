<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 21:00:47
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-01-01 22:25:28
 -->
<template>
  <div class="comments-wrapper">
    <h2>已有13条评论</h2>
    <div class="comments">
      <!-- 在父组件中给子组件绑定一个原生的事件，就将子组件变成了普通的HTML标签，不加“”.native“”事件是无法触发的。
　　  可以理解为该修饰符的作用就是把一个vue组件转化为一个普通的HTML标签，并且该修饰符对普通HTML标签是没有任何作用的。 -->
      <div class="comment-write" v-for="(item,index) in 5" :key="index">
        <div class="second-comment-wrapper" v-for="(ite,ind) in [10,11,12]" :key="ite">
          <Comment @click.native="insertReply(index,ind)" :insert="insert" :class="[ind!=0?'second-comment':'']"></Comment>
        </div>
        <WriteComment v-if="statusArr[index]" class="add-write"></WriteComment>
      </div>
    </div>
  </div>  
</template>

<script>
import WriteComment from './WriteComment.vue';
import Comment from './Comment.vue';
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
    }
  },
  methods:{
    insertReply(index,ind){
      console.log('ind',ind)

      this.statusArr[index] = !this.statusArr[index]; //评论底部显示评论框
      console.log('index',index,this.statusArr[index])
      this.insert = !this.insert;
      this.$emit('removeReply',!this.statusArr[index]); //最开始的时候肯定是显示的
      if(index!==this.count){
        this.statusArr[this.count]=false //点击另一个评论，上一个评论的点评输入框消失
      }
      this.count = index;
    },
  },
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
  .comments-wrapper
    padding 50px
    background white
    border-bottom-left-radius 6px
    border-bottom-right-radius 6px
    h2
      color #5fbf5e
      font-size 25px
      margin-bottom 20px
    .comment-write
      border-bottom 1px dashed #ddd
      padding 10px 0
      overflow hidden
      &:last-child
        border-bottom none
      .add-write
        width calc(100% - 90px)
        float right
      .second-comment
        width calc(100% - 90px)
        float right
  @media screen and (max-width: 768px) 
    .comments-wrapper 
      margin-left 10px
      margin-right 10px
      .add-write
        width calc(100% - 20px) !important
      .second-comment
        width calc(100% - 50px) !important
</style>