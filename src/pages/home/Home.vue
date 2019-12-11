<template>
  <div class="home-wrapper">
    <Cover class="cover-pic"/>
    <Item 
      class="blog-lists"
      :blogsLen="blogsNum"
      :blogLists="blogsListsFilter"
    ></Item>
    <PagePagination
      :maxPage="maxPage"
      @updatePage="change"
    ></PagePagination>
  </div>
</template>

<script>
import axios from 'axios'; 
import Cover from './components/Cover.vue'
import Item from './components/Item.vue'
import PagePagination from './components/PageNumber.vue'

export default {
  name: 'Home', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
    Cover,
    Item,
    PagePagination
  },
  data(){
    return{
      blogsNum:0,//博客数据长度
      page:1,//博客页码数
      blogsLists:[],//博客数据
      blogsIndex:6,//每一页最多包含的博客数目
      maxPage:0,
    }
  },
  methods:{
    getBlogItem(){
      axios.get('../../../static/mock/lists.json')
        .then(res=>{
          res = res.data;
          if(res.ret&&res.data){
            const data = res.data;
            this.blogsNum = data.blogLists.length;//获取博客列表数据的总长度
            this.blogsLists = data.blogLists;     //湖片区博客列表数据
            this.maxPage = Math.ceil(this.blogsNum/this.blogsIndex); //最多能显示多少页
          }
      })
    },
    change(pages){
      console.log('pages',pages)
      if(pages!==this.page){
        this.page=pages
      }
      console.log('this.page',this.page)
    }
  },
  mounted(){
    this.getBlogItem();//页面挂载的时候就获取博客列表数据
  },
  computed:{
    //过滤之后显示到页面的博客
    blogsListsFilter:function(){
      let ans = this.blogsLists.filter((value,index)=>{
        return ((this.page-1)*this.blogsIndex<=index)&&(this.page*this.blogsIndex>index)
      })
      console.log(ans);
      return ans;
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>