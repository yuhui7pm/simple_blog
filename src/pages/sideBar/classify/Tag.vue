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
    border 1px solid #25a4bb
    border-radius 10px
    margin-right 5px
    margin-bottom 10px 
    color #25a4bb
    &:hover
      border 1px solid red
      color red
      cursor pointer
</style>