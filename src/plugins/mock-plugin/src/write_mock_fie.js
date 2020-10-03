/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-03 20:55:46
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-03 23:44:15
 */

 /**
  * 如果mock数据不存在，那么请求真实数据时，就把数据保存到mock文件夹对应的js文件里
  * @param {*} data 要写入js文件的格式化数据 
  */
const echoTpl = data => {
  return `
    exports.check = () => {
      return false;
    }

    exports.mockData = () => {
      return ${data};
    }
  `
}

const dirExists = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, err => {
      if (err) {
        fs.appendFileSync(filePath, '', 'utf-8', (err) => {
          if (err) {
            return console.log('该文件不存在，重新创建失败！')
          }
          console.log("文件不存在，已新创建");
        });
        reject(false);
      } else {
        resolve(true);
      }
    })
  })
}

const writeMockFile = async function (filePath, body) {
  await dirExists(path.dirname(filePath));
  
  fs.writeFile(filePath, echoTpl(JSON.stringify(body)), function (err) {
   if (err) {
    console.log(`写入文件失败`)
   }
  });
 }

 module.exports = {
  echoTpl,
  writeMockFile
 }