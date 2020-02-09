<!--
 * @Descripttion: 博客首页
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-02-09 22:27:36
 -->
<template>
  <!-- <div class="home-wrapper" @mousemove="move($event)"> -->
  <div class="home-wrapper">
    <!-- <SideBar :class="[sideBarDisplay?'toggleSideBar':'sidebar']" ref="sideBar"></SideBar> -->
    <Header/>
    <Cover class="cover-pic"/>
    <div :class="sideBarDisplay?'blog-pagination-right':'blog-pagination-left'">
      <Item 
        class="blog-lists"
        :blogsLen="blogsNum"
        :blogLists="blogsListsFilter"
        :page="page"
        :blogsIndex="blogsIndex"
      ></Item>
      <PagePagination
        :maxPage="maxPage"
        :pageDefault="pageDefault"
        @updatePage="change"
      ></PagePagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 
import Header from '../header/BlogHeader.vue';
import Cover from './components/Cover.vue';
import Item from './components/Item.vue'
import PagePagination from './components/PageNumber.vue'
import SideBar from '../sideBar/SideBar.vue'
export default {
  name: 'Home', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
    SideBar,
    Header,
    Cover,
    Item,
    PagePagination,
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
      if(process.env.NODE_ENV=="development"){
        const data = require('../../../static/mock/lists').data.blogLists;
        this.blogsNum = data.length;//获取博客列表数据的总长度
        this.blogsLists = data;     //湖片区博客列表数据
        this.maxPage = Math.ceil(this.blogsNum/this.blogsIndex); //最多能显示多少页
        console.log('测试数据');
      }else{
        axios.get('/api/blog/lists')
          .then(res=>{
            res = res.data;
            if(res.data){
              const data = res.data;
              this.blogsNum = data.length;//获取博客列表数据的总长度
              this.blogsLists = data;     //湖片区博客列表数据
              this.maxPage = Math.ceil(this.blogsNum/this.blogsIndex); //最多能显示多少页
            }
            console.log(this.blogsLists);
        })
      }
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
    }
  },
  mounted(){
    this.getBlogItem();//页面挂载的时候就获取博客列表数据
  },
  computed:{

    /**
     * @description: 对原始博客数据进行过滤，然后再显示到页面，得到每一页博客列表的数据
     * @param {type} 
     * @return: 每一页博客列表的数据
     * @author: yuhui
     */
    blogsListsFilter:function(){
     return this.blogsLists.filter((value,index)=>{
        return ((this.page-1)*this.blogsIndex<=index)&&(this.page*this.blogsIndex>index)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
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
</style>