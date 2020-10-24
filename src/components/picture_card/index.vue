<template>
    <div class="pic-card" :style="{width: cardWidth}">
    <transition name="pic">
        <img :src="picUrl"
              :alt="picture.name"
              class="pic-card__img"/>
    </transition>
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
  computed: {
    picUrl () {
      let url = this.picture.url;
      return require(`../../assets/images/pic_demo${Math.floor(Math.random()*6)}.jpg`);
    }
  }
}
</script>

<style lang="less" scoped>
  .pic-card {
    border-radius: 9px;
    overflow: hidden;
    margin: 10px 0;
    height: auto;

    &__img {
      width: 100%;
      object-fit: cover;
      object-position: left center;
      height: auto;
      animation: fade-in;/*动画名称*/  
      animation-duration: 3s;/*动画持续时间*/
    }

    @keyframes fade-in {  
      0% {opacity: 0;};/*初始状态 透明度为0*/  
      100% {opacity: 1;};/*结束状态 透明度为1*/  
    }  
  }
</style>
