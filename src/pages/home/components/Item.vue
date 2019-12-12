<template>
  <ol>
    <router-link
      tag="li"
      v-for="(list,index) of blogLists"
      :key="index"
      class="item-wrapper"
      :to="{path:'/detail',query:{id:list.id}}"
    >
    <img class="item-left" :src="list.picUrl" alt="博客列表图片"/>
    <div class="item-right">
      <p class="createTime">No.{{blogsLen-((page-1)*blogsIndex+index)}} | {{list.createTime}}</p>
      <h2>{{list.title}}</h2>
      <p class="introduction">{{list.context}}</p>
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

  },
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
  .item-wrapper:hover
    cursor default
    box-shadow #eee 0px 0px 10px 8px
  .item-wrapper
    width 864px /*no*/
    height auto 
    background white
    border-radius 8px
    padding 40px
    margin 0 auto 20px
    overflow hidden
    box-sizing border-box
    transition-duration 0.5s
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
      h2
        color #3D3634
        font-size 24px
        margin-bottom 30px
        width 100%
        height 24px
        overflow hidden
        text-overflow ellipsis
        white-space no-wrap
      // h2:hover
      //   cursor pointer
      .introduction
        margin-bottom 20px
        font-size: 14px;
        line-height: 24px;
  //小于屏幕宽度时，博客列表左边的图片消失
  @media screen and (max-width: 768px) 
    .item-wrapper
      padding 20px
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
</style>