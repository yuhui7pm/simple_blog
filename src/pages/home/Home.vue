<!--
 * @Descripttion: 博客首页
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-18 16:54:45
 -->
<template>
  <div class="home-wrapper">
    <Header/>
    <Cover class="cover-pic"/>
    <div ref="blogListWrapper" :class="[sideBarDisplay?'blog-pagination-right':'blog-pagination-left','blogItemWrapper']">
      <Item 
        class="blog-lists"
        :blogsLen="blogsNum"
        :blogLists="blogsLists"
        :blogsIndex="blogsIndex"
        :blockIndex="blockIndex"
      ></Item>
    </div>
    <Bottom :toBottom="toBottom"/>
  </div>
</template>

<script>
import axios from 'axios'; 
import Header from '../header/BlogHeader.vue';
import Cover from './components/Cover.vue';
import Item from './components/Item.vue';
import Bottom from './components/Bottom.vue'
export default {
  name: 'Home', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
    Header,
    Cover,
    Item,
    Bottom
  },
  data(){
    return{
      blogsNum:0,//博客数据长度
      page:1,//博客页码数
      blogsLists:[],//博客数据
      blogsIndex:6,//每一页最多包含的博客数目
      maxPage:0,//博客最大页码数
      pageDefault:1,//默认博客页码
      sideBarDisplay:false,//sideBar的显示与隐藏
      timer:null,//用于节流函数
      scrollEvent:null, //监听事件
      toBottom:false, //判断是否滚动到页面底部
      toTopEvent:null, //判断距离页面顶部的监听事件
      blockIndex:0, 
    }
  },
  methods:{
    
    /**
     * @description: 首页获取博客列表数据，区分开发环境和线上环境
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    getBlogItem(){
      //开发环境用测试数据
      // if(process.env.NODE_ENV=="development"){
      //   const data = require('../../../static/mock/lists').data.blogLists;
      //   this.blogsNum = data.length;//获取博客列表数据的总长度
      //   this.blogsLists = data;     //湖片区博客列表数据
      //   this.maxPage = Math.ceil(this.blogsNum/this.blogsIndex); //最多能显示多少页
      // }
      axios.get('/api/blog/lists')
        .then(res=>{
          res = res.data;
          if(res.data){
            const data = res.data;
            this.blogsNum = data.length;//获取博客列表数据的总长度
            this.blogsLists = data;     //湖片区博客列表数据
            this.maxPage = Math.ceil(this.blogsNum/this.blogsIndex); //最多能显示多少页

            // 动态设置博客列表的高度
            if(!this.browserRedirect()){
              this.$refs.blogListWrapper.style.minHeight=`${this.blogsLists.length * (290 + 25)}px`;
            }
          }
      }).catch(err => {
          console.log('err:',err)
      })
    },

    /**
     * @description: 判断移动端还是pc端
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
        // console.log('移动端');//跳转移动端页面
        return true;
      } else {
        // console.log('PC端');//跳转pc端页面
        return false;
      }
    },

    /**
     * @description: 用于让首页侧标栏显示出来的节流函数
     * @param {Function} fn 需要节流的函数 
     * @param {Number} delay 函数延迟多久才执行下一次 
     * @param {Number} atLeast 函数执行一次的间隔
     * @return: 返回一个节流之后的函数
     * @author: yuhui
     */
    throttle(fn, delay, atLeast) {
        var timeout = null,
            startTime = Date.now();

        return function (event) {
            var endTime = Date.now();
            clearTimeout(timeout);

            if(endTime - startTime >= atLeast) {
                fn.call(null, event);
                startTime = endTime;
            } else {
                timeout = setTimeout(function() {
                    fn.call(null, event);
                }, delay);
            }
        };
    },
    
    /**
     * @description: 判断是否滚动到底部，以此控制底部栏文字的淡入
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    judgeToBottom(){
      let gap = this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
      if (gap > - 100) {
        this.toBottom = true;
        window.removeEventListener("scroll",this.scrollEvent,true);

        this.blockIndex = 1000; //假如一开始就是位于底部，给一个默认值，加载所有列表项
        window.removeEventListener("scroll",this.toTopEvent,true);
      }  
    },

    /**
     * @description: 判断距离顶部的高度，以此控制item块的淡入
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    judgeScrollHei(){
      const coverHei = 700; //距离顶部图片的高度
      const item = 351; //一个div块的高度加margin
      let toCoverTop = this.getScrollTop() + this.getWindowHeight() - coverHei;

      let itemIndex = Math.ceil(toCoverTop/item); //大概估算滑动到了第几个滑块那里
      let index = itemIndex;
      this.blockIndex = index;
    },
    
    /**
     * @description: 滚动条在Y轴上的滚动距离
     * @param {type} 
     * @return: scrollTop {Number} 滚动的高度
     * @author: yuhui
     */
    getScrollTop() {　　
        let scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;　　
        if (document.body) {　　　　
            bodyScrollTop = document.body.scrollTop;　　
        }　　
        if (document.documentElement) {　　　　
            documentScrollTop = document.documentElement.scrollTop;　　
        }　　
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
        return scrollTop;
    },

    /**
     * @description: 获取文档的总高度
     * @param {type} 
     * @return: scrollHeight {Number} 滚动的高度
     * @author: yuhui
     */
    getScrollHeight() {　　
      var scrollHeight = 0,
          bodyScrollHeight = 0,
          documentScrollHeight = 0;　　
      if (document.body) {　　　　
          bodyScrollHeight = document.body.scrollHeight;　　
      }　　
      if (document.documentElement) {　　　　
          documentScrollHeight = document.documentElement.scrollHeight;　　
      }　　
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
      return scrollHeight;
    },

    /**
     * @description: 获取浏览器视口的高度
     * @param {type} 
     * @return: windowHeight {Number} 屏幕的高度
     * @author: yuhui
     */
    getWindowHeight() {　　
      var windowHeight = 0;　　
      if (document.compatMode == "CSS1Compat") {　　　　
          windowHeight = document.documentElement.clientHeight;　　
      } else {　　　　
          windowHeight = document.body.clientHeight;　　
      }　　
      return windowHeight;
    }
  },
  mounted(){
    this.getBlogItem();//页面挂载的时候就获取博客列表数据

    this.scrollEvent = this.judgeToBottom
    window.addEventListener('scroll',this.scrollEvent,true);

    this.toTopEvent = this.judgeScrollHei;
    window.addEventListener('scroll',this.toTopEvent,true);
  },
  
  /**
   * @description: 使用了vue-meta插件，更新title和keywords
   * @param {type} 
   * @return: title {String}, keywords {String}
   * @author: yuhui
   */
  metaInfo: {
    title: 'Xlink Blog 一个记录日常生活的博客',
    meta: [
      { vmid: 'keywords', name: 'keywords', content: 
        '博客,个人博客,优秀的个人博客,个人网站,优秀的个人网站,记录日常生活的博客网站,Xlink Blog,个人Blog'}
    ]
  }
}
</script>

<style lang="stylus" scoped>
.blogItemWrapper
    margin-top:30px;
    margin-bottom:90px;
    height 100%;
@media screen and (min-width: 950px) 
  .sidebar
    opacity 0
    transition-duration 0.8s
    z-index 1000
    transform translateX(-150px)
  .toggleSideBar
    opacity 1
    transition-duration 0.8s
    z-index 1000
    transform translateX(0px)
  .blog-pagination-right
    transform translateX(350px)
    width calc(100% - 350px)
    transition-duration 0.8s
  .blog-pagination-left
    transform translateX(0px)
    width 100%
    transition-duration 0.8s
  .blogItemWrapper
    margin-top:60px;
@media screen and (max-width:768px)
  .blogItemWrapper
    margin-top:20px;
    margin-bottom:0px !important;
</style>