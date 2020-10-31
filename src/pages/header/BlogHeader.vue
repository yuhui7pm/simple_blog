<!--
 * @Descripttion: 首页顶部 Xlink Blog
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-12 21:52:04
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-11 15:19:24
 -->
<template>
    <div>
        <router-link to="/">
            <header>
                <div class="header-wrapper">
                    <img src="../../assets/icons/coffee.svg" alt="博客icon">
                    <p>Xlink Blog</p>
                    <switch-button v-model="value" text="Ch|En" class="switch-botton" />
                </div>
            </header>
        </router-link>
    </div>
</template>

<script>
import SwitchButton from '@/components/switch/index.vue'
export default {
    name:'Header',
    components: {
        SwitchButton
    },
    data(){
        return{
            value: ''
        }
    }
}
</script>

<style lang="stylus" scoped>
/* stylelint-disable */
  header
    width auto
    height 80px
    margin 0 40px
    box-sizing border-box
    position relative
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
      .switch-botton {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }

  @media screen and (max-width: 768px) 
    header
      padding-left 0
      height 60px
      margin-top 20px
      p
        line-height 60px !important
      .header-wrapper
        margin 0 auto
        text-align center
      img
        width 30px !important
        height 60px !important
      p
        font-size 26px !important
</style>
