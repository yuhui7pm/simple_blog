<template>
    <div class="pic-card" 
        :style="{width: cardWidth}"
        @mouseover="showMask=true"
        @mouseout="showMask=false">
      <img :src="picUrl"
            :alt="picture.name"
            class="pic-card__img"/>
   
      <div v-show="showMask" :class="showMask && 'pic-card__mask'"></div>
      <p class="pic-card__content-introduce">这里是商品介绍</p>
    </div>
</template>

<script>
import picTest from '@/assets/images/pic_demo.jpg';

export default {
  name: 'Card',
  props: {
    cardWidth: {
      type: String,
      default: '220px'
    },
    picture: {
      type: Object,
      default: {
        url: picTest,
        name: '图片demo'
      }
    }
  },
  data () {
    return {
      showMask: false
    }
  },
  computed: {
    picUrl () {
      let url = this.picture.url;
      return require(`../../assets/images/pic_demo${Math.floor(Math.random()*6)}.jpg`);
    }
  }
}
</script>

<style lang="less" scoped>
  @maskShowtime: 1s;

  .pic-card {
    border-radius: 9px;
    overflow: hidden;
    margin: 20px 0;
    height: auto;
    position: relative;
    border: 1px solid gray;

    &__img {
      width: 100%;
      object-fit: cover;
      object-position: left center;
      height: auto;
      animation: fade-in;/*动画名称*/
      animation-duration: 2s;/*动画持续时间*/
    }

    &__mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: @maskShowtime;

      &:hover {
        background: #000;
        opacity: 0.5;
      }
    }
    
    // &__content {
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    //   bottom: 0;
    //   left: 0;
    // }

    .pic-card__content-introduce {
      font-size: 18px;
      color: #AAA;
      position: absolute;
      bottom: 0;
      z-index: 10;
      // margin: 15px;
      width: 100%;
      height: 60px;
      line-height: 60px;
      background-color: #fff;
      padding: 0 20px;
      box-sizing: border-box;

      // opacity: 0;
      // animation: fade-in;/*动画名称*/
      // animation-duration: @maskShowtime;/*动画持续时间*/
    }

    @keyframes fade-in {
      0% {opacity: 0;};/*初始状态 透明度为0*/
      100% {opacity: 1;};/*结束状态 透明度为1*/
    }
  }
</style>
