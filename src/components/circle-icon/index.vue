<!--
 * @Descripttion: 圆圈图标
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-25 17:55:40
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-25 21:50:37
-->

<template>
    <div class="circle-icon__wrapper" :style="{width: size, height: size}">
        <div class="circle-icon__circle" :style="{backgroundImage: 'url('+ reqPicUrl + ')'}" />
        <p v-show="!!num" class="circle-icon__num">
            {{ num }}
        </p>
    </div>
</template>


<script>
export default {
    props: {
        num: {
            type: Number,
            default: 0
        },

        picUrl: {
            type: String,
            default: 'assets/icons/card_zan.svg'
        },

        size: {
            type: String,
            default: '40px'
        }
    },

    data() {
        return {
            reqPicUrl: require('../../' + picUrl)
        }
    },

    // computed: {
    //   reqPicUrl () {
    //     return require('../../' + this.picUrl);
    //   }
    // }
}
</script>

<style lang="less" scoped>
  @iconSize: 80% 80%;

  .circle-icon__wrapper {
    position: relative;
    margin-bottom: 10px;

    .circle-icon__circle {
      height: 100%;
      width: 100%;
      background-color: #eee;
      border-radius: 20px;
      opacity: 0.6;
      float: left;
      background-size: @iconSize;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .circle-icon__num {
      position: absolute;
      right: -5px;
      top: -5px;
      height: 14px;
      width: auto;
      color: #fff;
      border-radius: 7px;
      background-color: #f46;
      min-width: 15px;
      text-align: center;
    }
  }
</style>