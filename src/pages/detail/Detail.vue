<!--
 * @Descripttion: 博客详情页
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 21:05:27
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-25 17:55:06
 -->
<template>
  <div>
    <div :key="blogId" class="single-episode-wrapper">
      <Title
        :key="blogId"
        :blog-content="blogContent"
        :blog-ind-order="blogIndOrder"
      />
      <Context :blog-content="blogContent" />
      <transition>
        <WriteComment
          v-if="insertStatus"
          :blog-id="blogId"
          :name="'initial'"
        />
      </transition>
      <CommentLists
        class="commentList"
        :blog-id="blogId"
        @remove-reply="removeWrite"
      />
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
  name: 'Detail', // 不能与下面组件名字重读，否则会堆栈溢出
  components: {
    Title,
    Context,
    WriteComment,
    CommentLists
  },

  data (){
    return{
      insertStatus: true,// 判断用户有没有点击回复评论，
      blogContent: {}
    };
  },

  computed: {
    blogId () {
      return +this.$route.query.id || 0;
    },

    blogIndOrder () {
      return +this.$route.query.blogInd || 0;
    }
  },

  watch: {
    blogId (val) {
      if (val) {
        this.getBlogContent(); // 博客内容
      }
    }
  },

  activated (){
    this.insertStatus = true;

    // 当页面没有跳转到首页时，自己主动跳转
    window.addEventListener("hashchange",this.jumpToHome, false);
  },

  mounted (){
    this.getBlogContent();
    window.addEventListener("hashchange",this.jumpToHome, false);
  },

  destroyed () {
    window.removeEventListener("hashchange",this.jumpToHome, false);
  },

  methods: {
    getBlogContent (){
      axios.get("/api/blog/getBlogContent",{
        params: {
          blogId: this.blogId
        }
      }).then(res=>{
        if((res.status === 200) && (res.statusText === 'OK')){
          res = res.data;
          const data = res.data;
          this.blogContent = data[0];     // 博客列表数据
        }
      });
    },

    removeWrite (sta){
      this.insertStatus = sta;
    },

    jumpToHome (){
      this.$router.push({path: '/'});
    }
  },

  metaInfo () {
    return {
      title: 'Xlink Blog|' + this.blogContent.title,
      meta: [
        { vmid: 'keywords', name: 'keywords', content:
          '博客,个人博客,优秀的个人博客,个人网站,优秀的个人网站,记录日常生活的博客网站,Xlink Blog,个人Blog' + this.blogContent.title }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
  /* stylelint-disable */
  .single-episode-wrapper {
    width: 1020px;
    margin: 80px auto 140px;
    box-shadow: 0 0 4px 1px #eee;
    animation: fadein 1s ease;
    background: white;
    @keyframes fadein{
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
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