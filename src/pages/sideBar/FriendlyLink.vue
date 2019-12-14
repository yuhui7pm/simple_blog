<template>
  <div class="aboutWrapper" @mouseenter="showSta=true" @mouseleave="showSta=false">
    <h3>友情链接</h3>
    <div class="text-wrapper" v-show="showSta">
      暂时还没有啦~
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