<template>
  <div>
    <router-link to='/'>
      <header>
        <div class="header-wrapper">
          <img src="../../assets/icons/coffee.svg" alt="博客icon"/>
          <p>Xlink Blog</p>
        </div>
      </header>
    </router-link>
  </div>
</template>

<script>
export default {
  name:'header',
  data(){
    return{}
  }
}
</script>

<style lang="stylus" scoped>
  header
    width 100%
    height 80px
    padding-left 40px
    box-sizing border-box
    .header-wrapper
      height 100%
      min-width 238px 
      overflow hidden
      img 
        width 40px
        height 75px
        margin-right 20px
        vertical-align top //不加这个的话，对不齐顶部
      p
        font-size 30px
        font-family Georgia, serif
        // font-style italic
        font-weight 500
        color #555
        line-height 80px  
        letter-spacing:2px
        display inline-block
  //小于屏幕宽度时，图片消失
  @media screen and (max-width: 768px) 
    header
      padding-left 0
      .header-wrapper
        margin 0 auto
        text-align center
</style>