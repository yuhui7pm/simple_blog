<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-14 16:47:04
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-01-01 18:25:43
 -->
<template>
  <div class="classify-wrapper">
    <h3 @click="displayList()">分类</h3>
    <div class="tag-wrapper" :style="{opacity:classifyDisplay?1:0}">
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
  props:{
    classifyDisplay:Boolean,
  },
  components:{
    Tag,
  },
  updated(){
    if(this.classifyDisplay==true){
      this.displayStatus = true;
    }else{
      this.displayStatus = false;
    }
  },
  methods:{
    displayList(){
      this.displayStatus = !this.displayStatus;
      this.$emit('toBottom',this.displayStatus?'classifyFlag':'');
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