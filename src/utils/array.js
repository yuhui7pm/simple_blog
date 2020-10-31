/*
 * @Descripttion: 数组相关的公共方法
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-11 11:14:01
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-11 13:00:54
 */

function isArrayNull(arr) {
    return !arr || !arr.length
}

function arrFilterRepeate(arr) {
    return [... new Set(arr)]
}

/**
 * 根据两个数组，具有映射关系的对象
 * @param { Array } arr 对象的key值
 * @param { Array } arrCompared 对象的value值
 */
function arrayToObject(arr, arrCompared) {
    let formatedObj = {}
  
    if (isArrayNull(arr)) {
        return formatedObj
    }

    arr.forEach((item, index) => {
        formatedObj[item] = (isArrayNull(arrCompared) ? '' : arrCompared[index])
    })

    return formatedObj
}

module.exports = {
    isArrayNull,
    arrFilterRepeate,
    arrayToObject
}