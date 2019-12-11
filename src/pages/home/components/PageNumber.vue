<template>
  <ol class="page-pagination">
    <li
      v-for="value of maxPage"
      :key="value"
      @click="changePage(value)"
    >
      {{value}}
    </li>
  </ol>
</template>

<script>
export default {
  name:"pagePagination",
  data(){
    return{
    }
  },
  props:{
    maxPage:{
      type:Number
    },
  },
  methods:{
    changePage(val){
      this.$emit("updatePage",val);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang="stylus" scoped>
  .page-pagination
    height 42px
    text-align center
    width 100%
    margin-top 30px
    margin-bottom 40px
    li
      display inline-block
      width 42px
      height 100%
      line-height 42px
      color  #555
      font-weight bold
      border 1px solid #555 
      box-sizing border-box
    li:first-child
      background #555 
      color white
    li:hover
      background #555 
      color white
      cursor pointer
</style>