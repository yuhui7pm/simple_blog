/*
 * @Descripttion: 国际化操作：提取中文函数的脚本
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-11 11:02:28
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-11 14:14:50
 */
let fs = require("fs")
let path = require('path')
let {
    isArrayNull,
    arrFilterRepeate,
    arrayToObject
} = require('../../utils/array.js')

let filePath = path.resolve(__dirname, '../', '../')
let chineseFilePath = path.resolve(__dirname, '../', '../', './i18n', 'zh.js')
let englishFilePath = path.resolve(__dirname, '../', '../', './i18n', 'en.js')
let filePathArr = []
let filteredAllLang = []

findPath(filePath)
filterData()
writeI18Data()

/**
 * 查找目录下的文件或者文件
 * @param {String} rootPath 需要查找的目录或者文件路径
 */
function findPath(rootPath) {
    let dirRegEx = /^((?!i18n|abstract_lang).)*$/
    let pathRegEx = /^.*\.(js|vue)$/
    let files = fs.readdirSync(rootPath)

    if (files) {
        files.forEach(fileName => {
            if (fileName.match(dirRegEx)) {
                let fileDir = path.join(rootPath, fileName)

                //根据文件路径获取文件信息，返回一个fs.Stats对象

                let status = fs.statSync(fileDir)
                if (status) {
                    let isFile = status.isFile()
                    let isDir = status.isDirectory()

                    if (isFile && fileDir.match(pathRegEx)) {

                        // 读取文件内容
                        // var content = fs.readFileSync(filedir, 'utf-8');
                        // console.log(content);

                        filePathArr.push(fileDir)
                    }

                    //递归，如果是文件夹，就继续遍历该文件夹下面的文件.
                    if (isDir) {
                        findPath(fileDir)
                    }
                }
            }
        })
    }
}

/**
 * 取出src目录下所有被中文翻译函数包裹着的文本数据
 */
function filterData() {
    let langFunRegEx =  /(?<=_\(["']).*?(?=(['"]\s*,?.*\)))/gm   // 匹配_('翻译函数')
    let langHtmlRegEx = /(?<=<lang[^>]*?>).*?(?=<\/lang>)/gm  // 匹配<lang>翻译函数</lang>

    filePathArr.forEach(item => {
        let text = fs.readFileSync(item, 'utf-8')
        let langFunParse = text.match(langFunRegEx)
        let langHtmlParse = text.match(langHtmlRegEx)

        if (langFunParse && !isArrayNull(langFunParse)) {
            filteredAllLang = filteredAllLang.concat(langFunParse)
        }

        if (langHtmlParse && !isArrayNull(langHtmlParse)) {
            filteredAllLang = filteredAllLang.concat(langHtmlParse)
        }
    })
}

/**
 * 将数据写进i18目录下的ch.js和en.js文件里
 */
function writeI18Data() {
    if (isArrayNull(filteredAllLang)) {
        return
    }

    let delRepeateArr = arrFilterRepeate(filteredAllLang)
    let chineseObj = arrayToObject(delRepeateArr, delRepeateArr)
    let englishObj = arrayToObject(delRepeateArr)

    fs.writeFileSync(chineseFilePath, 'exports.data =' + JSON.stringify(chineseObj))
    fs.writeFileSync(englishFilePath, 'exports.data =' + JSON.stringify(englishObj))

    console.log('===========翻译函数已经提取完毕========== \n')
}
