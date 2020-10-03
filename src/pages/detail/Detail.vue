<!--
 * @Descripttion: 博客详情页
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 21:05:27
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-04 00:13:01
 -->
<template>
  <div>
    <div class="single-episode-wrapper" :key="blogId">
      <Title :blogContent="blogContent" :blogIndOrder="blogIndOrder" :key="blogId"></Title>
      <Context :blogContent="blogContent"></Context>
      <transition>
        <WriteComment v-if="insertStatus" :blogId="blogId" :name="'initial'"></WriteComment>
      </transition>
      <CommentLists class="commentList" @removeReply="removeWrite" :blogId='blogId'></CommentLists>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 
import Title from './components/Title.vue';
import Context from './components/Context.vue';
import WriteComment from './components/comments/WriteComment.vue';
import CommentLists from './components/comments/CommentLists.vue';
export default {
  name: 'Detail', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
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

  /**
   * @description: 异步更新页面的title和meta属性
   * @param {type} 
   * @return: title {String}, meta {String}
   * @author: yuhui
   */
  metaInfo () {
    return {
      title: 'Xlink Blog|' + this.blogContent.title,
      meta: [
        { vmid: 'keywords', name: 'keywords', content: 
          '博客,个人博客,优秀的个人博客,个人网站,优秀的个人网站,记录日常生活的博客网站,Xlink Blog,个人Blog' + this.blogContent.title }
      ]
    }
  },
  activated(){
    this.insertStatus = true;
    this.blogId= parseInt(this.$route.query.id);
    this.blogIndOrder= parseInt(this.$route.query.blogInd);
    if(this.blogId>0){
      this.getBlogContent(); //博客内容
    }
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
    background white
    @keyframes fadein{
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }

  .v-enter,.v-leave-to{
      opacity: 0;
  }
  .v-enter-to,.v-leave{
      opacity: 1;
  }
  .v-enter-active,.v-leave-active{
      transition: all 0.5s;
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