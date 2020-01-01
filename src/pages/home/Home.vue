<template>
  <div class="home-wrapper" @mousemove="move($event)">
    <SideBar :class="[sideBarDisplay?'toggleSideBar':'sidebar']" ref="sideBar"></SideBar>
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
// import SidebarButton from './components/SidebarButton.vue'
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
    //首页挂载获取博客数据
    getBlogItem(){
      axios.get('/api/blog/lists')
        .then(res=>{
          res = res.data;
          if(res.data){
            const data = res.data;
            this.blogsNum = data.length;//获取博客列表数据的总长度
            this.blogsLists = data;     //湖片区博客列表数据
            this.maxPage = Math.ceil(this.blogsNum/this.blogsIndex); //最多能显示多少页
          }
      })
    },
    // 改变页码
    change(pages){
      if(pages!==this.page){
        this.page=pages;
        this.pageDefault = pages;
      }
    },
    //节流函数
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
    //让侧边栏显示出来
    move(event){
      if(this.timer){
        clearTimeout(this.timer)
      }
      // this.timer=setTimeout(()=>{
      //   let x = event.clientX // 获取x 坐标
      //   let scrolltop = document.body.scrollTop||document.documentElement.scrollTop;
      //   if(x<250&&scrolltop>400){
      //     this.sideBarDisplay = true;
      //   }else{
      //     this.sideBarDisplay = false;
      //   }
      // },50)
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
    //过滤之后显示到页面的博客
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