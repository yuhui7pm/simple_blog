<!--
 * @Descripttion: 博客详情页
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 21:05:27
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-02-06 17:38:21
 -->
<template>
  <div>
    <Header></Header>
    <div class="single-episode-wrapper">
      <Title></Title>
      <Context></Context>
      <WriteComment v-show="insertStatus" :blogId="blogId"></WriteComment>
      <CommentLists class="commentList" @removeReply="removeWrite" :blogsLists='blogsLists' :blogId='blogId'></CommentLists>
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
import { eventBus } from '@/assets/bus';
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
    /**
     * @description: 得到所有评论数据
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    getBlogItem(){
      this.blogsLists = [];//置空
      axios.get("/api/blog/getComments",{
        params:{
          blogId:this.blogId
        }
      }).then(res=>{
          if(res.status==200&&res.statusText==='OK'){
            res = res.data;
            const data = res.data;
            this.blogsLists = data.reverse();     //博客列表数据
          }
      })
    },
    
    /**
     * @description: 移除写评论的输入框
     * @param {type} 
     * @return: 
     * @author: yuhui
     */    
    removeWrite(sta){
      this.insertStatus = sta;
    }
  },
  mounted(){
    this.insertStatus = true;
    this.blogId= parseInt(this.$route.query.id);
    if(this.blogId>0){
      this.getBlogItem();//页面挂载的时候就获取评论列表数据
    }

    eventBus.$on('addNewComment',(obj)=>{
      let arrOld = this.blogsLists.reverse();
      this.blogsLists = [];
      arrOld.push(obj);
      this.blogsLists = arrOld.reverse();
    })
  },
  // updated(){
  //   this.blogId= parseInt(this.$route.query.id);
  //   if(this.blogId>0){
  //     this.getBlogItem();//页面挂载的时候就获取博客列表数据
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
  .single-episode-wrapper
    width 980px
    margin 60px auto 140px
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