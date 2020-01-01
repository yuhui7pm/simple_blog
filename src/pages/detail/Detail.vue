<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 21:05:27
 * @LastEditors: yuhui
 * @LastEditTime: 2020-01-01 12:10:03
 -->
<template>
  <div>
    <Header></Header>
    <div class="single-episode-wrapper">
      <Title></Title>
      <Context></Context>
      <WriteComment v-show="insertStatus"></WriteComment>
      <CommentLists @removeReply="removeWrite"></CommentLists>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 
import Header from '../header/BlogHeader.vue';
import Title from './components/Title.vue';
import Context from './components/Context.vue';
import WriteComment from './components/comments/WriteComment.vue';
import CommentLists from './components/comments/CommentLists.vue';
export default {
  name: 'Detail', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
    Header,
    Title,
    Context,
    WriteComment,
    CommentLists
  },
  data(){
    return{
      blogsLists:[],
      blogId:0,
      insertStatus:true,//判断用户有没有点击回复评论，
    }
  },
  methods:{
    getBlogItem(){
      // axios.get('../../../static/mock/lists.json')
      //   .then(res=>{
      //     res = res.data;
      //     if(res.ret&&res.data){
      //       const data = res.data;
      //       this.blogsLists = data.blogLists[0];     //湖片区博客列表数据
      //     }
      // })
    },
    //不让写评论的方框显示
    removeWrite(sta){
      this.insertStatus = sta;
    }
  },
  mounted(){
    this.blogId= this.$route.query.id;
    if(this.blogId>0){
      this.getBlogItem();//页面挂载的时候就获取博客列表数据
    }
  }
}
</script>

<style lang="stylus" scoped>
  .single-episode-wrapper
    width 980px
    margin 60px auto
  //小于屏幕宽度时，图片消失
  @media screen and (max-width: 768px) 
    header
      padding-left 0
      .header-wrapper
        margin 0 auto
        text-align center
    .single-episode-wrapper
      width 100%
      margin 10px auto
</style>