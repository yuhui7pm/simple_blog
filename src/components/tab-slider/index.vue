<!--
 * @Descripttion: tab页面滑动条
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-11 15:54:28
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-18 12:07:33
-->
<template>
  <div class="tabs-slider__wrapper">
    <div class="tab-slider__row-wrapper" @click="changeTab($event)">
      <div v-for="(tab, index) in tabs" 
          class="tab-slider"
          :key="uuid(index)">
        <a class="tab-slider__name" :class="tabValue == tab.name ? 'tab-clicked' : ''">
          {{ tab.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import '@/common/style/variables.less';
  
  @sliderHeight: 50px;
  @sliderWidth: 80px;
  @tabColor: #BBB;

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
          color: @tabColor;
          cursor: pointer;
        }

        .tab-clicked {
          animation: tabChange 0s forwards;
        }

        @keyframes tabChange{
          from { 
            color: @tabColor;
          }
          to { 
            color: #333;
          }
        }
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
      default: []
    }
  },
  data () {
    return {
      tabValue: ''
    }
  },

  watch: {
    tabs: {
      deep: true,
      immediate: true,
      handler (val) {
        val.length && (this.tabValue = val[0].name);
      }
    },

    tabValue (val) {
      this.$emit('tab-click', val);
    }
  },
  
  methods: {
    uuid,

    changeTab (e) {
      this.tabValue = e.target.innerText.trim();
    }
  }
}
</script>