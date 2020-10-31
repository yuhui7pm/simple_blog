<template>
    <div
        @mouseover="showMask=true"
        @mouseout="showMask=false"
    >
        <div
            class="pic-card" 
            :style="{width: cardWidth}"
        >
            <img
                :src="picUrl"
                :alt="picture.name"
                class="pic-card__img"
            >
    
            <div v-show="showMask" :class="showMask && 'pic-card__mask'" />

            <div class="pic-card__icon-wrapper">
                <div class="pic-card__vedio-icon" />
                <div v-show="showMask" class="pic-card__zan-msg-wrapper">
                    <circle-icon key="zan" pic-url="assets/icons/card_zan.svg" :num="22" />
                    <circle-icon key="msg" pic-url="assets/icons/card_msg.svg" :num="1" />
                </div>
            </div>

            <p class="pic-card__content-introduce">
                这里是商品介绍
            </p>
        </div>
    </div>
</template>

<script>
import picTest from '@/assets/images/pic_demo.jpg'
import CircleIcon from '@/components/circle-icon/index.vue'

export default {
    name: 'Card',
    components: {
        CircleIcon
    },
    props: {
        cardWidth: {
            type: String,
            default: '220px'
        },
        picture: {
            type: Object,
            default: () => {
                return {
                    url: picTest,
                    name: '图片demo'
                }
            }
        }
    },
    data() {
        return {
            showMask: false
        }
    },
    computed: {
        picUrl() {
            // let url = this.picture.url
            return require(`../../assets/images/pic_demo${Math.floor(Math.random()*6)}.jpg`)
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
    box-shadow: 0 0 4px 2px #eee;
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
      animation: fade-in;/* 动画名称 */
      animation-duration: 2s;/* 动画持续时间 */
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
      }
    }

    .pic-card__content-introduce {
      font-size: 18px;
      color: #aaa;
      position: absolute;
      bottom: 0;
      z-index: 10;
      width: 100%;
      height: 56px;
      line-height: 56px;
      background-color: #fff;
      padding: 0 15px;
      border-top: @cardBorder;
      box-sizing: border-box;
    }

    @keyframes fade-in {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }
</style>
