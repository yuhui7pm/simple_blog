/*
 * @Descripttion: 实现一个高阶函数：mock-plugin
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-03 19:37:03
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-03 23:57:56
 */

let valid = require('./src/valid.js');
let request = require('./src/request.js');

/**
  * 获取mock文件的mock数据
  * @param {*} moduleName 需要获取数据的api请求
  */
const setMockData = (moduleName) => {
  const { mockData } = require(moduleName);
  return mockData();
};

module.exports = options => {
  const { routes, root } = options;
  return async (req, res, next) => {
    let { isReq, host } = valid.isRequestPath(routes, req);

    // 不是请求地址直接return掉
    if (!isReq) {
      return;
    }

    // 如果存在Mock对应的文件
    let filePath = await valid.isMockFileName(root, req.path);

    if (filePath) {

      // 检验本地mock文件开关是否开启
      let check = await valid.inspectMockCheck(filePath);
      if (check) {
        return res.send(setMockData(filePath));
      } else {

        // 请求结果
        let body = await request(host, req).catch(proxyRes => {
          res.status(proxyRes.statusCode);
        });

        // 发送请求的结果信息
        return res.send(body);
      }
    } else {
      // 请求返回主体
      let body = await request(host, req).catch(proxyRes => {
        res.status(proxyRes.statusCode);
        next();
      });

      if (body) {
        // 定义需要写入文件路径
        const filePath = path.resolve(root, `mock${req.path}.js`);
        // 写入mock文件
        writeMockFile(filePath, body);
        // 响应返回主体
        return res.send(body);
      }
    }
  };
};