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
         :style="{width: cardColumnWidth}"
         class="pic-container__column-wrapper">
    </div>
  </div>
</template>

<script>
import pictureCard from '@/components/picture_card/index.vue';
import Vue from 'vue';
import { uuid } from '@/utils/util.js';
import axios from 'axios'; 

const COLUMN_WIDTH = 10;

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

          this.setPicData(data);
      }).catch(err => {
          console.log('err:',err)
      })
    },

    setPicData (data) {
      data.forEach((picData, picDataInd) => {
        let comps = this.$refs.picColumns;
        let compInfo = comps.map((item, index) => {
          // console.log('节点：', item);
          return {
            dom: item,
            height: item.offsetHeight,
            index
          }
        });

        let minHei = Math.min.apply(Math, compInfo.map(obj => obj.height));
        let PicCardCmp = Vue.extend(pictureCard);
        let minHeiDomIndex = compInfo.find(item => item.height === minHei).index;

        console.log(compInfo, minHei,PicCardCmp,' -=-=' ,minHeiDomIndex);
        let picElInd = `#picCard${picDataInd}`;
        let mountPicCard = new PicCardCmp({
          el: picElInd,
          propsData: {
            cardWidth: this.cardColumnWidth,
            picture: picData
          }
        }).$mount(this.$refs.picColumns[minHeiDomIndex]);

        // console.log('document.getElementById(picElInd):', document.getElementById(picElInd));        
        this.$refs.picColumns[minHeiDomIndex].appendChild(mountPicCard.$el);
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .pic-container {
    width: 100%;
    display: flex !important;
    min-height: 200px;
    justify-content: space-between;
      
    &__column-wrapper {
      min-height: 200px;
      display: inline-block;
      justify-content: space-between;
    }
  }
</style>