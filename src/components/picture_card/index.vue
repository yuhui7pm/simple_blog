<template>
  <div class="pic-card" :style="{width: cardWidth}">
    <img :src="picUrl" 
          :alt="picture.name" 
          class="pic-card__img"/>
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
      let url = this.picture.url
      return require(url);
    }
  }
}
</script>

<style lang="less" scoped>
  .pic-card {
    border-radius: 9px;
    overflow: hidden;
    height: auto;

    &__img {
      width: 100%;
      object-fit: cover;
      object-position: left center;
      height: auto;
    }
  }
</style>