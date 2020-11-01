/*
 * @Descripttion: util方法
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-11 16:07:44
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-11 16:12:01
 */

//用于生成uuid
function S4 () {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function uuid (index = null) {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4() + (index ? `-${index}` : null));
}

module.exports = {
  uuid
};