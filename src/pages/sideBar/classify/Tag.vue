<template>
  <div class="Tag">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'SideBarTag',
  data(){
    return{}
  },
  components:{
  }
}
</script>

<style lang="stylus" scoped>
  .Tag
    display inline-block
    padding 0 12px
    height 18px
    font-size 12px
    line-height 18px
    border 1px solid #bbb
    border-radius 10px
    margin-right 5px
    margin-bottom 10px 
    color #bbb
    &:hover
      border 1px solid #666
      color #666
      cursor pointer
</style>