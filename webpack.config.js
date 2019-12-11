const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//process.env包含着关于系统环境的信息。但是process.env中并不存在NODE_ENV这个东西。
//NODE_ENV是用户一个自定义的变量，在webpack中它的用途是判断生产环境或开发环境的依据的。
let isDev = process.env.NODE_ENV==="development"; //判断是否为开发模式

const config = {
  // 编译为类浏览器环境里可用（默认)
  target:"web",
  //入口文件
  entry:path.join(__dirname,'src/index.js'),
  //出口文件
  output:{ 
    filename:'bundle.js',
    path:path.join(__dirname,'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:isDev?'"development"':'"production"'//定义全局变量
      }
    }),
    new VueLoaderPlugin(), // make sure to include the plugin for the magic
    new HTMLPlugin(),
  ],
  module:{
    rules:[{
      test: /\.vue$/,
      loader:'vue-loader',//vue-loader 是一个 webpack 的 loader,可以将Vue 组件转换为 JavaScript 模块:
    },{
      test:/\.css$/,
      use:[
        'style-loader',//将js代码写到html里面去
        'css-loader',  //将vue里面的css代码写到js里面去
      ]
    },{
      test:/\.styl/, //不可以写成/\.styl$/，不然.vue文件里面的<style>无法打包
      use:[
        'style-loader', //将js代码写到html里面去
        'css-loader',   //将vue里面的css代码写到js里面去
        {
          loader:'postcss-loader',
          options:{
            sourceMap:true,//使用前面stylus-loader生成的sourceMap
          }
        },
        'stylus-loader',//使用模块化的方法去写css代码
      ]      
    },{
      test:/\.(gif|jpg|png|svg|jpeg)$/,
      loader:'url-loader',//url-loader可以设置图片大小限制，当图片超过限制时，其表现行为等同于file-loader
      options:{
        limit:1024,  //小于10kB的图片进行base64编码
        name:'[name]---yu.[ext]',
        esModule: false,//解决img属性src="[object Module]"
      }
    },{
      test:/\.(woff2|eot|ttf|otf)$/,
      loader:'url-loader',
      options:{
        limit:10000,
        name:'fonts/[name].[hash:7].[ext]'
      }
    }]
  }
}

//如果是开发环境
if(isDev){
  //我们在打包中，将开发环境中源代码经过压缩，去空格，babel编译转化，最终可以得到适用于生产环境的项目代码，
  //这样处理后的项目代码和源代码之间差异性很大，会造成无法debug的问题。
  // 在开发环境中我们使用：cheap-module-eval-source-map
  // 在生产环境中我们使用：cheap-module-source-map。
  // config.devTool = 'cheap-module-eval-source-map',
  config.devServer = {
    port:3002,
    host:'localhost',//0.0.0.0就是表示所有的IP地址
    overlay:{
      errors:true,//有错误就显示在网页上
    },
    open:true,//自动打开页面
    // historyFallback:{
    // },
    hot:true,//热加载，只渲染改变的数据
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),//热加载插件,更新局部的修改
    new webpack.NoEmitOnErrorsPlugin(),//在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
  )
}
module.exports = config;