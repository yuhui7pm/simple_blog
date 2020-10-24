<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-18 12:20:22
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-18 17:51:39
-->
<template>
  <div class="pic-container">
    <div v-for="item in columnNum" 
         :key="uuid(item)"
         ref="picColumns"
         :style="{width: cardColumnWidth, marginRight: (item === columnNum ? 0 : columnMarginRight) + 'px'}"
         class="pic-container__column-wrapper">
    </div>
  </div>
</template>

<script>
import pictureCard from '@/components/picture_card/index.vue';
import Vue from 'vue';
import { uuid } from '@/utils/util.js';
import axios from 'axios'; 

const COLUMN_WIDTH = 20,
      INTERVAL_TIME = 300;

export default {
  name: 'picture',
  components: {
    pictureCard
  },

  props: {
    columnNum: {
      type: Number,
      default: 4
    }
  },

  computed: {
    cardColumnWidth () {
      let num = this.columnNum,
          { blogItemWidth } = this.$store.state;
          
      return Math.floor((blogItemWidth - COLUMN_WIDTH * (num - 1)) / num) + 'px';
    },
    columnMarginRight () {
      return COLUMN_WIDTH;
    }
  },

  mounted () {
    this.init();
  },
  
  methods: {
    uuid,
    
    init () {
      this.loadData();
    },

    async loadData () {
      await axios.get('/api/blog/pictures')
        .then(res=>{
          let { success, data } = res.data;

          if (!success) {
            return;
          }

          data.forEach((data, index) => {
            setTimeout(() => {
              this.setPicData(data, index);
            }, INTERVAL_TIME * index);
          })

      }).catch(err => {
          console.log('err:',err)
      })
    },

    setPicData (picData, picDataInd) {
        this.$nextTick(() => {
          let comps = this.$refs.picColumns;
          let compInfo = comps.map((item, index) => {
            return {
              dom: item,
              height: item.offsetHeight,
              index
            }
          });

          let minHei = Math.min.apply(Math, compInfo.map(obj => obj.height));
          let PicCardCmp = Vue.extend(pictureCard);
          let minHeiDomIndex = compInfo.find(item => item.height === minHei).index;

          let picElInd = `#picCard${picDataInd}`;
          let mountPicCard = new PicCardCmp({
            el: picElInd,
            propsData: {
              cardWidth: this.cardColumnWidth,
              picture: picData
            }
          }).$mount(this.$refs.picColumns[minHeiDomIndex]);

          this.$refs.picColumns[minHeiDomIndex].appendChild(mountPicCard.$el);
        });
    }
  }
}
</script>

<style lang="less" scoped>
  .pic-container {
    width: 100%;
    min-height: 500px;

    &__column-wrapper {
      display: inline-block;
      vertical-align:top;

      div {
        height: auto;
      }
    }
  }
</style>