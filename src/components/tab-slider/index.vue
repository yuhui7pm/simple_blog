<!--
 * @Descripttion: tab页面滑动条
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-11 15:54:28
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-11 17:11:07
-->
<template>
  <div class="tabs-slider__wrapper">
    <div class="tab-slider__row-wrapper">
      <div v-for="(item, index) in tabs" 
          class="tab-slider"
          :key="uuid(index)">

      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @sliderHeight: 160px;

  .tabs-slider__wrapper {
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: @sliderHeight;
    
    .tab-slider__row-wrapper {
      max-width: @blogItemWidth;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      .tab-slider {
        background-color: #DDD;
        display: inline-block;
        height: @sliderHeight;
        width: 100px;
      }
    }
  }
</style>

<script>
import { uuid } from '@/utils/util.js';
export default {
  name: "tabSlider",    
  props: {
    tabs: {
      type: Array,
      default: [{
        name: '博客首页',
        iconCls: '',
        img: '@/assets/icons/coffee.svg'
      }, {
        name: '博客首页',
        iconCls: '',
        img: '@/assets/icons/coffee.svg'
      }, {
        name: '博客首页',
        iconCls: '',
        img: '@/assets/icons/coffee.svg'
      }]
    }
  },
  created () {
    console.log(this);
  },
  methods: {
    uuid,
  }
}
</script>