<template>
  <div class="aboutWrapper" @mouseenter="showSta=true" @mouseleave="showSta=false">
    <h3>关于我</h3>
    <div class="text-wrapper" v-show="showSta">
      前端小白一枚，搭建此博客的目的是为了记录生活琐事。
    </div>  
  </div>
</template>

<script>
export default {
  name:'aboutWeb',
  data(){
    return{
      showSta:false
    }
  },
  components:{
  },
}
</script>

<style lang="stylus" scoped>
.aboutWrapper
  width 100%
  h3
    height 50px
    line-height 50px
</style>