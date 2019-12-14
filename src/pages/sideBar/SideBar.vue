<template>
  <div class="sideWrapper">
    <img class="head-icon" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1333857903,826749854&fm=11&gp=0.jpg" alt="博主头像"/>
    <h2>Mr Yu</h2>
    <input placeholder="站内搜索~" autofocus="false"/>
    <List></List>
    <Timer></Timer>
  </div>
</template>

<script>
import List from './Lists.vue'
import Timer from './Timer.vue'
export default {
  name:'SideBar',
  data(){
    return{}
  },
  components:{
    List,
    Timer
  }
}
</script>

<style lang="stylus" scoped>
  .sideWrapper
    width 280px
    height 100%
    background-color #CCFFCC
    position fixed 
    left 0
    top 0
    bottom 0
    text-align center
    padding-top 60px
    .head-icon
      width 120px
      height 120px
      border-radius 50%
      box-shadow: 0px 0px 8px 2px #FFEFDB;
    h2 
      font-size 26px
      margin-top 20px
      margin-bottom 30px
      font-family Georgia, serif
    input
      width 100%
      height 40px
      padding 0 10px
      box-sizing border-box
      margin-bottom 0px
      overflow hidden
      background none
      font-size 18px
      position relative
      text-align center
      // background url('../../assets/icons/searchBut.svg') no-repeat;
      // background-size 25px 25px
      // background-position 10px 50%
      // background-position 50% 50%
      margin-bottom 50px
  @media screen and (max-width: 768px) 
    .sideWrapper  
      display none
</style>