<!--
 * @Descripttion: 首页博客的列表项item组件
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 14:59:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-18 13:24:30
 -->
<template>
  <ol>
    <!-- <router-link
      tag="li"
      v-for="(list,index) of blogLists"
      :key="list.id"
      :style="(blockIndex>index)?'background:white':''"
      :class="[(blockIndex>index)&&(index>0)?'animate__fadeInUp animate__slow':'',
        index===0?'animate__fadeInUp animate__slow':'','animate__animated item-wrapper']"
      :to="{path:'/detail',query:{id:list.id,blogInd:blogsLen-index}}"
    > -->
    <router-link
      tag="li"
      v-for="(list,index) of blogLists"
      :key="index"
      :class="['animate__fadeInUp animate__slow','animate__animated item-wrapper']"
      :to="{path:'/detail',query:{id:list.id,blogInd:blogsLen-index}}"
    >
    <div>
      <img class="item-left" :src="list.picurl" alt="博客列表图片"/>
      <div class="item-right">
        <p class="createTime">No.{{blogLists.length - index}} | {{common.timestampToTime(list.createtime,'toDay')}}</p>
        <h2 class="article-header">{{list.title}}</h2>
        <p class="introduction">{{list.introduction}}</p>
      </div>
    </div>
    </router-link>
  </ol>
</template>

<script>

import { WOW } from 'wowjs';
import 'animate.css';

export default {
  name:'article',
  props:{
    blogsLen:Number,
    blogLists:Array,
    blogsIndex:Number,
    blockIndex:Number
  },
  data(){
    return{
    }
  },
  mounted(){
    // 在项目加载完成之后初始化wow
    let wow = new WOW({
      offset: 100,
      mobile: true,
      live:false
    })
    wow.init();
  }
}
</script>

<style lang="stylus" scoped>
  .item-wrapper:hover
    cursor default
    box-shadow 0px 5px 15px rgba(0,0,0,0.3);
  .item-wrapper
    height auto 
    border-radius 8px
    padding 45px
    margin 0 auto 25px
    overflow hidden
    box-sizing border-box
    transition-duration 0.5s
    background white
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