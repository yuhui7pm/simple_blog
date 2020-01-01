<template>
  <ol>
    <router-link
      tag="li"
      v-for="(list,index) of blogLists"
      :key="list.id"
      class="item-wrapper"
      :to="{path:'/detail',query:{id:list.id}}"
    >
    <img class="item-left" :src="list.picurl" alt="博客列表图片"/>
    <div class="item-right">
      <p class="createTime">No.{{blogsLen-((page-1)*blogsIndex+index)}} | {{timestampToTime(list.createtime)}}</p>
      <h2 class="article-header">{{list.title}}</h2>
      <p class="introduction">{{list.introduction}}</p>
    </div>
    </router-link>
  </ol>
</template>

<script>

export default {
  name:'items',
  props:{
    blogsLen:Number,
    blogLists:Array,
    page:Number,
    blogsIndex:Number
  },
  data(){
    return{

    }
  },
  methods:{
    timestampToTime(timestamp) {
      let date =new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear();
      let M = (date.getMonth() +1 <10 ?'0' + (date.getMonth() +1) : date.getMonth() +1);
      let D = date.getDate();
      let h = date.getHours() +':';
      let m = date.getMinutes() +':';
      let s = date.getSeconds();
      return (Y + '-' + M + '-' + D);//时分秒可以根据自己的需求加上
    }
  },
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
  .item-wrapper:hover
    cursor default
    box-shadow #ddd 0px 0px 10px 8px
  .item-wrapper
    width 900px /*no*/
    height auto 
    background white
    border-radius 8px
    padding 40px
    margin 0 auto 20px
    overflow hidden
    box-sizing border-box
    transition-duration 0.5s
    &:hover
      cursor pointer
    .item-left
      width 192px /*no*/
      height 192px /*no*/
      float left
      border-radius 4px
    .item-right
      float right
      width 552px
      .createTime
        font-size 12px
        line-height 16px
        text-transform uppercase
        display inline-block
        letter-spacing 0.8px
        margin-bottom 16px
        font-family IBMPlexSans
        color gray
      .article-header
        display block
        color #3D3634
        font-size 24px
        margin-bottom 30px
        width auto
        max-width 100%
        height 24px
        overflow hidden
        text-overflow ellipsis
        white-space no-wrap
      .introduction
        margin-bottom 20px
        font-size: 14px;
        line-height: 24px;
  //小于屏幕宽度时，博客列表左边的图片消失
  @media screen and (max-width: 768px) 
    .item-wrapper
      padding 20px
      padding-bottom 0
      width 100%
      .item-left
        float none
        width 0
        height 0
        display none
        visibility none
      .item-right
        float none
        width 100% !important
        .createTime
          margin-bottom 10px
        h2 
          margin-bottom 15px
          font-size 20px
</style>