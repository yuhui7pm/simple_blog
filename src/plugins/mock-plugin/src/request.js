/*
 * @Descripttion: 通过express中间件发送http请求，获取数据
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-03 20:40:29
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-04 00:00:08
 */

let url = require('url'),
 http = require('http');

const REQ_TIME_OUT = 5000,
  RES_TIME_OUT = 6000;

module.exports = function (host, req) {
  let body = null, proxy = null;

  // 请求超过5s当做超时
  let requestTimer = setTimeout(function() {
    proxy.abort();
    console.error('请求超时!');
  }, REQ_TIME_OUT);

  return new Promise ((resolve, reject) => {

    /// 将一个URL字符串转换成对象并返回。
    let parse = url.parse(host);

    proxy = http.request({
      host: host.hostname,
      port: parse.port,
      method: req.method,
      path: req.path,
      headers: req.headers
    }, proxyRes => {

      clearTimeout(request_timer);

      // 等待响应60秒超时
      let responseTimer = setTimeout(function() {
        proxy.destroy();
        console.log('Response Timeout.');
      }, RES_TIME_OUT);
      
      // 非200字段内直接响应错误 ， 在主逻辑里处理
      if (proxyRes.statusCode < 200 || proxyRes.statusCode > 300) {
        reject(proxyRes)
      }

      proxyRes.on('data', chunk => {
        body += chunk.toString();
      });

      proxyRes.on('end', () => {
        try {
          resolve(JSON.parse(body));
          clearTimeout(responseTimer);
        } catch (e) {
          reject(proxyRes)
        }
      });
      
      proxyRes.on('error', err => {
        console.log(`error is`, err);
      })
    });

    proxy.on('error', err => {
      console.error(`请求错误：${err.message}`)
    })

    proxy.end;
  })
}