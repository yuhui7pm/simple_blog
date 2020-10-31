/*
 * @Descripttion: 抽离公共方法
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-02-16 17:01:16
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-17 10:50:21
 */


// export default 是ES6语法，表示指定默认输出。import的时候不用带大括号
	
export default {
    /**
   * @description: 时间戳转换函数
   * @param {Number} timestamp 时间戳
   * @return: 格式化之后的时间戳
   * @author: yuhui
   */
    timestampToTime(timestamp,mode='') {
        let date = new Date(timestamp)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear()
        let M = (date.getMonth() +1 <10 ?'0' + (date.getMonth() +1) : date.getMonth() +1)
        let D = date.getDate()<10?'0'+date.getDate():date.getDate()
        let h = (date.getHours()<10?'0'+date.getHours():date.getHours()) +':'
        let m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) +':'
        let s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()

        let output
        mode == 'toDay' ? output=(Y + '-' + M + '-' + D) : output=(Y + '-' + M + '-' + D + ' ' + h  + m  + s)
        return output//时分秒可以根据自己的需求加上
    },
}