<template>
  <ol class="page-pagination">
    <li
      v-for="value of maxPage"
      :key="value"
      :class="[value===pageDefault?'seleced':'']"
      @click="changePage(value)"
    >
      {{value}}
    </li>
  </ol>
</template>

<script>
import { eventBus } from '../../../assets/bus';
export default {
  name:"pagePagination",
  data(){
    return{
      hei:0
    }
  },
  props:{
    maxPage:Number,
    pageDefault:Number
  },
  methods:{
    changePage(val){
      if(val!==this.pageDefault){
        this.$emit("updatePage",val);
        document.body.scrollTop = this.hei/2;
        document.documentElement.scrollTop = this.hei/2;
      }
    }
  },
  created() {
    eventBus.$on('getCoverHei', message => {
        this.hei = message
    })
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
      color  #aaa
      font-weight bold
      border-radius 50%
      transition-duration 0.5s; //停留时间显示
      transition-timing-function: ease-out;
    li:first-child
      border-right 0
    li:hover
      font-size 20px
      cursor pointer
    li:not(:last-child)
      border-right 0
    .seleced
      color #555
      font-size 20px
</style>