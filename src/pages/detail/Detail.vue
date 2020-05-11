<!--
 * @Descripttion: 博客详情页
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 21:05:27
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-11 17:08:58
 -->
<template>
  <div>
    <div class="single-episode-wrapper" :key="blogId">
      <Title :blogContent="blogContent" :blogIndOrder="blogIndOrder" :key="blogId"></Title>
      <Context :blogContent="blogContent"></Context>
      <WriteComment v-show="insertStatus" :blogId="blogId"></WriteComment>
      <CommentLists class="commentList" @removeReply="removeWrite" :blogId='blogId'></CommentLists>
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
// import router from '@/router/index.js'
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
      blogId:0,
      insertStatus:true,//判断用户有没有点击回复评论，
      blogContent:{},
      blogIndOrder:0,
    }
  },
  methods:{
    /**
     * @description: 得到博客正文数据
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    getBlogContent(){
      axios.get("/api/blog/getBlogContent",{
        params:{
          blogId:this.blogId
        }
      }).then(res=>{
          if(res.status==200&&res.statusText==='OK'){
            res = res.data;
            const data = res.data;
            this.blogContent = data[0];     //博客列表数据
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
    },
    /**
     * @description: 页面路由变化，但没跳转，执行以下操作
     * @param {type} 
     * @return: 
     * @author: yuhui
     */  
    jumpToHome(){
      this.$router.push({path:'/'});
    }
  },
  activated(){
    this.insertStatus = true;
    this.blogId= parseInt(this.$route.query.id);
    this.blogIndOrder= parseInt(this.$route.query.blogInd);
    if(this.blogId>0){
      this.getBlogContent(); //博客内容
    }
    // console.log('this.blogId:',this.$route.query.id, this.blogId,this.$route.query.blogInd,this.blogIndOrder);
    //当页面没有跳转到首页时，自己主动跳转
    window.addEventListener("hashchange",this.jumpToHome, false);
  },
  mounted(){
    //当页面没有跳转到首页时，自己主动跳转
    window.addEventListener("hashchange",this.jumpToHome, false);
  },
  destroyed() {
    window.removeEventListener("hashchange",this.jumpToHome, false);
  },
}
</script>

<style lang="stylus" scoped>
  .single-episode-wrapper
    width 1020px
    margin 80px auto 140px
    box-shadow: 0px 0px 4px 1px #eeeeee;
    animation:fadein 1s ease
    @keyframes fadein{
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
  //小于屏幕宽度时，图片消失
  @media screen and (max-width: 768px) 
    header
      padding-left 0
      .header-wrapper
        margin 0 auto
        text-align center
    .single-episode-wrapper
      width 100%
      margin 0px auto
</style>