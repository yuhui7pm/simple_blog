<template>
  <div class="classify-wrapper" @mouseenter="displayList(true)" @mouseleave="displayList(false)">
    <h3>分类</h3>
    <div class="tag-wrapper" :style="{opacity:displayStatus?1:0}">
      <Tag>生活</Tag>
      <Tag>科技</Tag>
      <Tag>css</Tag>
      <Tag>java</Tag>
      <Tag>python</Tag>
      <Tag>面试</Tag>
      <Tag>毕业</Tag>
      <Tag>js</Tag>
      <Tag>生活</Tag>
      <Tag>科技</Tag>
      <Tag>css</Tag>
      <Tag>java</Tag>
      <Tag>python</Tag>
      <Tag>面试</Tag>
      <Tag>毕业</Tag>
      <Tag>js</Tag>
    </div>
  </div>
</template>

<script>
import Tag from './Tag.vue';
export default {
  name:'classify',
  data(){
    return{
      displayStatus:false
    }
  },
  components:{
    Tag,
  },
  mounted(){
    // console.log(1111111111,this.displayStatus);
  },
  methods:{
    displayList(flag){
      this.displayStatus = flag;
    }
  }
}
</script>

<style lang="stylus" scoped>
.classify-wrapper
  width 100%
  height auto
  h3
    height 50px
    line-height 50px
  .tag-wrapper
    // background white
    text-align left
    padding 10px
    max-height 100px
    overflow-y scroll
    box-sizing border-box
    transition-duration 1s
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  .tag-wrapper::-webkit-scrollbar /* Chrome Safari */
    display none
</style>