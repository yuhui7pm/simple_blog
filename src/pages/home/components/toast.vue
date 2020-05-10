<!--
 * @Descripttion: 提示框
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-05-08 18:51:26
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-09 19:09:03
 -->

<template>
  <div v-show="toastFlag" class="toast">
    {{toastText}}
  </div>
</template>

<script>
export default {
  name:'Toast',
  data() {
    return {
    }
  },
  props:{
    toastText: String,
    toastFlag:Boolean
  }
}
</script>

<style scoped>
  .toast {
      opacity: 1;
      position: fixed;
      z-index: 2000;
      left: 50%;
      transform: translateX(-50%);
      bottom: 320px;
      transition:all 2s;
      /* -webkit-transform: translateX(-50%) translateY(-50%);
          -moz-transform: translateX(-50%) translateY(-50%);
          -ms-transform: translateX(-50%) translateY(-50%);
            -o-transform: translateX(-50%) translateY(-50%);
              transform: translateX(-50%) translateY(-50%); */
      text-align: center;
      border-radius: 5px;
      color:#FFF;
      background: rgba(17, 17, 17, 0.7);
      height: 45px;
      line-height: 45px;
      padding: 0 15px;
      max-width: 150px;
  }

  /* .fadeToast {
      animation: toastFade 2s ease-in-out;
      @keyframes toastFade {
        0% {
          opacity: 0;
        }
        25% {
          opacity: 0.5;
        }
        50% {
          opacity: 1;
        }
        75% {
          opacity: 0.5;
        }
        100% {
          opacity: 0;
        }
      }
  } */
</style>