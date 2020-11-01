/*
 * @Descripttion: 获取mock数据之前，需要对请求进行有效性验证
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-03 20:18:12
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-03 23:41:46
 */

const path = require('path');
const fs = require('fs');

const isRequestPath = routes => ({
  // eslint-disable-next-line
    isReq: (routes).hasOwnProperty('/api'),
  host: routes['/api']
});

const isMockFileName = (root, mockPath) => {
  // eslint-disable-next-line
    let mockFileNmae = path.join(root.split('\servers')[0], 'src', 'mock', mockPath + '.js')
  return fs.existsSync(mockFileNmae) ? mockFileNmae : '';
};

const inspectMockCheck = (mockName) => {
  let exist = fs.existsSync(mockName);

  let checkFlag = false;

  if (exist) {
    if (require.cache[require.resolve(mockName)]) {
      delete require.cache[require.resolve(mockName)];
    }

    checkFlag = require(mockName).check();
  }

  return checkFlag;
};

module.exports = {
  isRequestPath,
  isMockFileName,
  inspectMockCheck
};