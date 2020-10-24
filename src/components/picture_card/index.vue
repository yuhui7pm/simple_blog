<template>
  <div @mouseover="showMask=true"
       @mouseout="showMask=false">
      <div class="pic-card" 
          :style="{width: cardWidth}">
        <img :src="picUrl"
              :alt="picture.name"
              class="pic-card__img"/>
    
        <div v-show="showMask" :class="showMask && 'pic-card__mask'"></div>

        <div class="pic-card__icon-wrapper">
          <div class="pic-card__vedio-icon"></div>
          <div class="pic-card__zan-msg-wrapper" v-show="showMask">
            <div class="pic-card__zan-icon-wrapper">
                <div class="pic-card__zan-icon"></div>
                <p class="pic-card__zan-num">111</p>
            </div>
              <div class="pic-card__msg-icon-wrapper">
                <div class="pic-card__msg-icon"></div>
                <p class="pic-card__msg-num">2</p>
            </div>
          </div>
        </div>

        <p class="pic-card__content-introduce">这里是商品介绍</p>
      </div>
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
  @cardBorder: 1px solid #eee;
  @iconBgBack: #000;
  @iconBgOpacity: 0.6;
  @iconSize: 80% 80%;
  @imgMinHei: 120px;

  .pic-card {
    border-radius: 9px;
    overflow: hidden;
    margin: 20px 0;
    height: auto;
    position: relative;
    border: @cardBorder;
    transition: @maskShowtime;
    cursor: default;

    &:hover {
      transform: translateY(-8px);
    }

    &__img {
      width: 100%;
      object-fit: cover;
      object-position: left center;
      height: auto;
      animation: fade-in;/*动画名称*/
      animation-duration: 2s;/*动画持续时间*/
      min-height: @imgMinHei;
    }

    &__mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: @maskShowtime;
      background: @iconBgBack;
      opacity: @iconBgOpacity;
      // &:hover {
      //   background: @iconBgBack;
      //   opacity: @iconBgOpacity;
      // }
    }

    &__icon-wrapper {
      width: 100%;
      height: @imgMinHei;
      position: absolute;
      top: 0;
      z-index: 20;
      padding: 15px 30px;
      box-sizing: border-box;
      overflow: hidden;

      .pic-card__vedio-icon {
          height: 22px;
          width: 22px;
          background-color: #eee;
          border-radius: 11px;
          opacity: 0.6;
          float: left;
          background-image: url('../../assets/icons/card_vedio.svg');
          background-size: @iconSize;
          background-repeat: no-repeat;
          background-position: center center;
      }

      .pic-card__zan-msg-wrapper {
          float: right;
          width: 30px;
          height: 100%;

          .pic-card__zan-icon-wrapper {
            height: 40px;
            width: 40px;
            position: relative;
            margin-bottom: 10px;

            .pic-card__zan-icon {
              height: 100%;
              width: 100%;
              background-color: #eee;
              border-radius: 20px;
              opacity: 0.6;
              float: left;
              background-image: url('../../assets/icons/card_zan.svg');
              background-size: @iconSize;
              background-repeat: no-repeat;
              background-position: center center;
            }

            .pic-card__zan-num {
              position: absolute;
              right: -5px;
              top: -5px;
              height: 14px;
              width: auto;
              color: #fff;
              border-radius: 7px;
              background-color: #ff4466;
            }
          }

          .pic-card__msg-icon-wrapper {
            height: 40px;
            width: 40px;
            position: relative;
            margin-bottom: 10px;

            .pic-card__msg-icon {
              height: 100%;
              width: 100%;
              background-color: #eee;
              border-radius: 20px;
              opacity: 0.6;
              float: left;
              background-image: url('../../assets/icons/card_message.svg');
              background-size: @iconSize;
              background-repeat: no-repeat;
              background-position: center center;
            }

            .pic-card__msg-num {
              position: absolute;
              right: -5px;
              top: -5px;
              height: 14px;
              width: auto;
              color: #fff;
              border-radius: 7px;
              background-color: #ff4466;
            }
          }
      }
    }

    .pic-card__content-introduce {
      font-size: 18px;
      color: #AAA;
      position: absolute;
      bottom: 0;
      z-index: 10;
      // margin: 15px;
      width: 100%;
      height: 56px;
      line-height: 56px;
      background-color: #fff;
      padding: 0 15px;
      border-top: @cardBorder;
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
