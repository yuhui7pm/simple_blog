<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-05 22:03:13
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-11 14:48:54
-->

<template>
  <div>
    {{ msg }}
  </div>    
</template>

<script>

import { chineseGroups } from '@/i18n/zh.js';
import { englishGroups } from '@/i18n/en.js';

export default {
  props: {
    msg: {
      type: String,
      default: '测试中'
    }
  },
  data () {
    return {
      chineseGroups: chineseGroups,
      englishGroups: englishGroups
    };
  },
  mounted () {
    this.init();
  },

  methods: {
    init () {
      this.changeBraces();
      this.writeSentence();
    },

    changeBraces () {
      // let text = this.$slots.default[0].text;
      // let braces = this.$attrs;

      // let regEx = /(?<=\{)[^}]*(?=\})/g;
      // let bracesTextArr = text.match(regEx);

      // bracesTextArr.forEach(item => {
      //   text = text.replace(`{${item}}`, braces[item]);
      // })
    },

    writeSentence () {

      // 往文件里面写入key和value
      // let text = this.$slots.default[0].text;
      // let lang = this.$i18n.locale === 'zh';
      // this.chineseGroups[text] = lang ? text : '';
      // this.englishGroups[text] = lang ? '' : text; 
    
      // console.log(chineseGroups, englishGroups, this.$attrs);
    }
  }
};
</script>