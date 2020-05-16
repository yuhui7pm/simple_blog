<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-03-26 13:08:59
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-16 17:25:59
 -->
<template>
  <div class="bottomWrapper">
    <toast :toastText="toastText" :toastFlag="toastFlag"></toast>
    <div :class="[toBottom?'bottomFadeIn':'','bottomCenter']">
      <div style="float:left">
        <div ref="webRuntime">
          网站运行了 天 小时 分 秒
        </div>
        <div>总访问:{{this.wholeVisitedNum}} | 今日访问:{{this.todayVisitedNum}}</div>
        <div class="contactMe">
          联系方式:
          <a @click="copyEmail()">邮箱</a>
          <span>·</span>
          <input ref="email" value="16hyu@stu.edu.cn" style="position:absolute;bottom:0;opacity:0"/>
          <a href="https://github.com/yuhui7pm" target="_blank">Github</a>
          <span>·</span>
          <a href="https://blog.csdn.net/qq_40511157" target="_blank">CSDN</a>
        </div>
        <div class="recordation">
          粤ICP备20013624号
        </div>
      </div>
      <div class="friendLink" style="float:right;text-align:left">
          <div>友情链接:</div>
          <div>
            <a href="http://javawebs.cn/?FbmNv=5eb5332a69584bd0" target="blank">贺显东的个人博客</a>
            <a href="" target="blank">虚位以待</a>
            <a href="" target="blank">虚位以待</a>
            <a href="" target="blank">虚位以待</a>
            <a href="" target="blank">虚位以待</a>
            <a href="" target="blank">虚位以待</a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Toast from '../components/toast'
export default {
  name:'page-bottom',
  components:{
    Toast
  },
  data(){
    return{
      wholeVisitedNum:0,
      todayVisitedNum:0,
      timer:null,
      toastFlag:false,
      toastText:''
    }
  },
  props:{
    toBottom:Boolean
  },
  methods:{

    /* 
      网站开始创建的时间
    */
    startTime(){
        let initData= new Date("2/17/2020");
        let today=new Date();
        let timeGap = today.getTime() - initData.getTime();
        let M = 24*60*60*1000;
        let a = timeGap/M;
        let A = Math.floor(a);
        let b = (a-A)*24;
        let B = Math.floor(b);
        let c = (b-B)*60;
        let C = Math.floor((b-B)*60);
        let D = Math.floor((c-C)*60);
        this.$refs.webRuntime.innerHTML='网站运行了' + this.checkTime(A) + '天' 
          + this.checkTime(B) + "时"+ this.checkTime(C) +"分"+ this.checkTime(D) +"秒";
    },

    /* 
        检查数字是否为个位数
    */
    checkTime(i){
        if(i<10){
            i="0"+i;
        }
        return i;
    },

    /* 
      通过缓存读取，游客访问次数，规定半小时内访问都只为1次数
    */
   getVisitedNumber(){
     const flag = false; //表示半个小时内已经访问过了，不算入统计数据中
     const visited = "yuhui7pm";
     let dateNow = Date.now();
     let getVisited = this.getCache(visited);

     // 缓存中没有，我就加1
     if(getVisited == null){
       this.updateVisitedNum(visited,dateNow);
       return;
     }

      // 过了30分钟，我就加1
      let dateGap = (dateNow - getVisited)/(1000*60);
      if(dateGap >= 30){
        this.updateVisitedNum(visited,dateNow);
        return;
      }
   },

   // 执行更新访客数的一系列操作
   updateVisitedNum(visited,dateNow){
      this.setCache(visited,dateNow);//重新赋值，刷新缓存
      this.addVisitedNum();  //往后端发送请求
      return;
   },

   // 刷新访客量，对网站文本内容加1
   updateContextVisitedNum(){
     this.wholeVisitedNum +=1;
     this.todayVisitedNum +=1;
   },

   //设置缓存
    setCache(key,value){
      if(key=='') return false;
      localStorage.setItem(key, value);
    },

    // 获取cache
    getCache(key){
      return localStorage.getItem(key);
    },

    // 移除缓存
    removeCache(key){
      localStorage.removeItem(key);
    },

    // 发送请求，要求统计数加1
    addVisitedNum(){
      let date = this.getYMDHMS();
      axios.post('/api/blog/setBlogVisited',{
          today:date.year + '-' + date.month + '-' + date.day
        },{
        headers: {
            'Access-Control-Allow-Origin':'*',  //解决cors头问题
            'Access-Control-Allow-Credentials':'true', //解决session问题
            'Content-Type': 'application/json'
        },
        withCredentials : true //跨域请求要想带上cookie
      }).then(res=>{
        if(res.status==200&&res.statusText==='OK'){
          this.updateContextVisitedNum(); //更新文本内容，加1
        }
      })
    },

    // 进入首页时获取页面总的访问数据
    initVisitedNum(){
      axios.get("/api/blog/getBlogVisited").then(res=>{
        if(res.status==200&&res.statusText==='OK'){
          res = res.data;
          const data = res.data[0];
          this.wholeVisitedNum = data.wholeVisitedNum;
          this.todayVisitedNum = data.todayVisitedNum;
        }
      })
    },

    // 根据时间戳获取年月日
    // 根据时间戳获取年月日时分秒
    getYMDHMS() {
      let time = new Date();
      let year = time.getFullYear(),
          month = time.getMonth() + 1,
          day = time.getDate(),
          hours = time.getHours(),
          minute = time.getMinutes(),
          second = time.getSeconds();
    
      if (month < 10) { month = '0' + month; }
      if (day < 10) { day = '0' + day; }
      if (hours < 10) { hours = '0' + hours; }
      if (minute < 10) { minute = '0' + minute; }
      if (second < 10) { second = '0' + second; }
  
      return {
          year: year,
          month: month,
          day: day,
          hours: hours,
          minute: minute,
          second: second
      }
    },

    //复制email地址
    copyEmail(){
      let input = this.$refs.email;
      input.value = '16hyu@stu.edu.cn'; // 修改文本框的内容
      input.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令

      this.toastFlag = true;
      this.toastText = "复制成功";
      // alert("复制成功");

      setTimeout(()=>{
        this.toastFlag = false;
      }, 2000)
    }
  },
  
  mounted(){ 
    this.timer = setInterval(()=>{
      this.startTime();
    },1000);

    //页面挂载时获取页面总的访问数据
    this.initVisitedNum();
    // 更新页面访问数据
    this.getVisitedNumber();
  },

  destroyed(){
    this.timer && clearInterval(this.timer);
  }
}
</script>

<style lang="stylus" scoped>
  .bottomWrapper
    width 100%
    color white
    font-size 20px
    font-family '楷体' 
    background #373D41
    height 300px
    overflow hidden
    position relative
    .bottomCenter
      // padding-top 200px
      opacity 0
      padding-top 40px
      width 920px /*no*/
      margin 0 auto
      overflow hidden
      text-align left
      line-height 40px
      .contactMe
        a
          color white
          &:hover
            text-decoration underline
            cursor pointer
          &:not(:first-child):hover
            color red
      &>div:first-child
        width 40%
      &>div:last-child
        width 60%
        a
          white-space:nowrap
          &:hover
            text-decoration underline 
            cursor pointer
            color red
    .bottomFadeIn
      animation bottomFade 1s ease-in forwards
      @keyframes bottomFade {
        0%{
          opacity 0
        }
        100%{
          opacity 1
        }
      }

  @media screen and (max-width: 375px) 
    .friendLink
      display none
    .bottomWrapper
      height 200px
      width 100%
      overflow hidden
      .bottomCenter
        padding 10px
        height 200px
        width 100%
        box-sizing border-box
        overflow hidden
        div
          height 100%
</style>