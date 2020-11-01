/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-05 22:04:42
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-05 22:05:23
 */
import Vue from 'vue';
const ToastConstructor = Vue.extend(require('./index.vue').default);

const Toast = option => {
  const ToastInstance = new ToastConstructor({
    data: {
      toastText: option.toastText
    }
  });

  ToastInstance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
  ToastInstance.visible = true;
  let toastDom = ToastInstance.$el;
  document.body.appendChild(toastDom); // 将dom插入body
  ToastInstance.$el.style.zIndex = 10000;

  return ToastInstance;
};

export default {
  install: Vue => {
    Vue.prototype.$toast = Toast;
  }
};

