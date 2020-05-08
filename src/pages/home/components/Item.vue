<!--
 * @Descripttion: 首页博客的列表项组件
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-08 20:16:27
 -->
<template>
  <ol>
    <router-link
      tag="li"
      v-for="(list,index) of blogLists"
      :key="list.id"
      class="item-wrapper"
      :to="{path:'/detail',query:{id:list.id,blogInd:blogsLen-index}}"
    >
    <img class="item-left" :src="list.picurl" alt="博客列表图片"/>
    <!-- <img class="item-left" src="@/assets/images/meinv.jpg" alt="博客列表图片"/> -->
    <div class="item-right">
      <p class="createTime">No.{{blogLists.length - index}} | {{timestampToTime(list.createtime)}}</p>
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
    blogsIndex:Number
  },
  data(){
    return{

    }
  },
  methods:{
    timestampToTime(timestamp) {
      // console.log('timestamp:',timestamp);
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
    box-shadow 0px 5px 15px rgba(0,0,0,0.3);
  .item-wrapper
    width 920px /*no*/
    height auto 
    background white
    border-radius 8px
    padding 45px
    margin 0 auto 25px
    overflow hidden
    box-sizing border-box
    transition-duration 0.5s
    &:hover
      cursor pointer
    .item-left
      width 200px /*no*/
      height 200px /*no*/
      float left
      border-radius 4px
      object-fit cover
    .item-right
      float right
      width 580px
      .createTime
        font-size 13px
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
        margin-bottom 20px
        width auto
        max-width 100%
        height 24px
        overflow hidden
        text-overflow ellipsis
        white-space no-wrap
      .introduction
        margin-bottom 20px
        font-size: 15px;
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
          margin-bottom 5px
        h2 
          margin-bottom 8px
          font-size 18px
        .article-header
          display block
          color #3D3634
          font-size 22px
          margin-bottom 8px
          height auto !important 
          line-height 26px
</style>