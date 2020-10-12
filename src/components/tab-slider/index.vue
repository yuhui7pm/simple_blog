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
    <div class="tab-slider__row-wrapper" @click="changeTab($event)">
      <div v-for="(tab, index) in tabs" 
          class="tab-slider"
          :key="uuid(index)">
        <p class="tab-slider__name" :class="tabValue === tab.name ? 'tab-clicked' : ''">
          {{ tab.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @sliderHeight: 50px;
  @sliderWidth: 80px;
  @blogItemWidth: 920px;

  .tabs-slider__wrapper {
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: @sliderHeight;
    
    .tab-slider__row-wrapper {
      width: @blogItemWidth;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center; 

      .tab-slider {
        height: @sliderHeight;
        width: @sliderWidth;

        .tab-slider__name {
          font-size: 20px;
          color: #AAA;
          cursor: pointer;
          transition: 1s;
        }
      }
    }
  }

  .tab-clicked {
    color: black;
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
        name: '文章',
        iconCls: '',
        img: '@/assets/icons/coffee.svg'
      }, {
        name: '图片',
        iconCls: '',
        img: '@/assets/icons/coffee.svg'
      }, {
        name: '音频',
        iconCls: '',
        img: '@/assets/icons/coffee.svg'
      }]
    }
  },
  data: {
    tabValue: ''
  },
  created () {

  },

  methods: {
    uuid,

    changeTab (e) {
      console.log(e.target.innerHtml)
      this.tabValue = e.target.innerHtml;
    }
  }
}
</script>