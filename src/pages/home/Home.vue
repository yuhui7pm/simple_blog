<!--
 * @Descripttion: 博客首页
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-16 13:28:10
 -->
<template>
  <!-- <div class="home-wrapper" @mousemove="move($event)"> -->
  <div class="home-wrapper">
    <!-- <SideBar :class="[sideBarDisplay?'toggleSideBar':'sidebar']" ref="sideBar"></SideBar> -->
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
      <!-- <PagePagination
        :maxPage="maxPage"
        :pageDefault="pageDefault"
        @updatePage="change"
      ></PagePagination> -->
    </div>
    <Bottom :toBottom="toBottom"/>
  </div>
</template>

<script>
import axios from 'axios'; 
import Header from '../header/BlogHeader.vue';
import Cover from './components/Cover.vue';
import Item from './components/Item.vue';
import PagePagination from './components/PageNumber.vue';
import SideBar from '../sideBar/SideBar.vue';
import Bottom from './components/Bottom.vue'
export default {
  name: 'Home', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
    SideBar,
    Header,
    Cover,
    Item,
    PagePagination,
    Bottom
    // SidebarButton
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
            console.log('+++', this.blogsLists.length * 330);
            this.$refs.blogListWrapper.style.minHeight=`${this.blogsLists.length * (290 + 25)}px`;
          }
      }).catch(err => {
          console.log('err:',err)
      })
    },
 
    /**
     * @description: 改变页码
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    change(pages){
      if(pages!==this.page){
        this.page=pages;
        this.pageDefault = pages;
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
     * @description: 鼠标滑到屏幕左边，侧边栏显示出来
     * @param {Object} 鼠标移动所在的Dom节点
     * @return: 
     * @author: yuhui
     */
    move(event){
      if(this.timer){
        clearTimeout(this.timer)
      }
      let x = event.clientX // 获取x 坐标
      let scrolltop = document.body.scrollTop||document.documentElement.scrollTop;
      if(x<350&&scrolltop>400){
        this.sideBarDisplay = true;
      }else{
        this.sideBarDisplay = false;
      }
    },

    //判断是否滚动到底部
    judgeToBottom(){
      let gap = this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
      if (gap > - 80) {
        this.toBottom = true;
        window.removeEventListener("scroll",this.scrollEvent,true);

        this.blockIndex = 1000; //假如一开始就是位于底部，给一个默认值，加载所有列表项
        window.removeEventListener("scroll",this.toTopEvent,true);
      }  
    },

    //判断距离顶部的高度，以此控制item块的淡入
    judgeScrollHei(){
      const coverHei = 700; //距离顶部图片的高度
      const item = 351; //一个div块的高度加margin
      let toCoverTop = this.getScrollTop() + this.getWindowHeight() - coverHei;

      let itemIndex = Math.ceil(toCoverTop/item); //大概估算滑动到了第几个滑块那里
      let index = itemIndex;
      this.blockIndex = index;
      console.log('index:===',index);
    },

    // 滚动条在Y轴上的滚动距离
    getScrollTop() {　　
        var scrollTop = 0,
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

    // 获取文档的总高度
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

    // 获取浏览器视口的高度
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

  destroyed(){
    this.blockIndex = 0;
    // window.removeEventListener("scroll",this.toTopEvent,true);
  },
  computed:{

    /**
     * @description: 对原始博客数据进行过滤，然后再显示到页面，得到每一页博客列表的数据
     * @param {type} 
     * @return: 每一页博客列表的数据
     * @author: yuhui
     */
    // blogsListsFilter:function(){
    //  return this.blogsLists.filter((value,index)=>{
    //     return ((this.page-1)*this.blogsIndex<=index)&&(this.page*this.blogsIndex>index)
    //   })
    // }
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