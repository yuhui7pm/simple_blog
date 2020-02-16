<!--
 * @Descripttion: 详情页的评论列表项组件
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 21:17:40
 * @LastEditors: yuhui
 * @LastEditTime : 2020-02-09 23:01:29
 -->
<template>
  <div class="comment-wrapper" ref="commentItem" @mouseover="hoverStatus=true;" @mouseout="hoverStatus=false" @click="replyComments">
    <div class="comment">
      <img class='user-icon' :src="(item.iconurl!==null)?userIconUrl(item.iconurl):iconUrl" alt="用户头像">
      <div class="comment-right">
        <div style="float:left;">
          <div class="top-wrapper">
            <div class="writer">{{item.username}}</div>
            <div class="time" style="">{{timestampToTime(item.createtime)}}</div>
          </div>
          <div class="context">{{item.comments}}</div>
        </div>
        <div class="comment-bar" style="float:right">
          <img 
            :class="[heartChange?'changHeart':'']"
            @click.stop="changeHeart"
            :src="heartChange?heart_click:heart_unclick"
            alt="回复评论"
          >
          <span ref="praiseNum">{{item.likestar}}</span>
          <img 
            :class="[(smallScreenDeleteIconShow&&deleteIconShow||hoverStatus&&deleteIconShow)?'testList':'','deleteIcon',]" 
            @click.stop="deleteIconShow&&deleteComments(item.username,item.createtime)"
            src="../../../../assets/icons/delete_comment.svg" 
            alt="删除评论"
          >
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import axios from 'axios'; 
import qs from 'qs';
import heart_click from '@/assets/icons/heart_click.svg';
import heart_unclick from '@/assets/icons/heart_unclick.svg';
import storage from 'good-storage';
export default {
  name: 'Comment', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
  },
  data(){
    return{
      hoverStatus:false,
      heartChange:false,
      iconUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579534969&di=3833a2461681cd7dafdfcd19e3afc5c1&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F14%2F20151214104025_NytJX.jpeg',
      heart_click,
      heart_unclick,
      initLikeStatus:false,
      deleteIconShow:false,
      smallScreenDeleteIconShow:false
    }
  },
  props:{
    insert: Number,
    item: Object,
    blogId:Number,
  },
  methods:{
    
    /**
     * @description: 移动端，显示出删除评论的icon
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    deleteIcon(){
      let deleteKey = 'delete_blogId_' + this.blogId + '_createtime_' + this.item.createtime; 
      let sta = storage.get(deleteKey);
      if(sta===true){
        this.deleteIconShow = true
      }else{
        this.deleteIconShow = false
      }
    },

    /**
     * @description: 时间戳转换函数
     * @param {Number} timestamp 时间戳
     * @return: 格式化之后的时间戳
     * @author: yuhui
     */
    timestampToTime(timestamp) {
      let date =new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear();
      let M = (date.getMonth() +1 <10 ?'0' + (date.getMonth() +1) : date.getMonth() +1);
      let D = date.getDate()<10?'0'+date.getDate():date.getDate();
      let h = (date.getHours()<10?'0'+date.getHours():date.getHours()) +':';
      let m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) +':';
      let s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
      return (Y + '-' + M + '-' + D + ' ' + h  + m  + s);//时分秒可以根据自己的需求加上
    },

    /**
     * @description: 点击删除icon，删除自己写的评论
     * @param {String} name 写该评论的用户
     * @param {Number} time 该评论创建的时间
     * @return: 
     * @author: yuhui
     */
    deleteComments(name,time){
      //非测试环境数据
      // if(process.env.NODE_ENV!=="development"){
      //   axios.post('/api/deleteComment',{
      //       username: name,
      //       createtime: time
      //     },{
      //     headers: {
      //         'Access-Control-Allow-Origin':'*',  //解决cors头问题
      //         'Access-Control-Allow-Credentials':'true', //解决session问题
      //         'Content-Type': 'application/json'
      //     },
      //     withCredentials : true
      //   }).then(res=>{
      //     if(res){
      //       this.$refs.commentItem.style.display = 'none';

      //       let likeKey = 'blogId_' + this.blogId + '_time_' + time;
      //       storage.remove(likeKey);
      //     }
      //   })
      // }

        axios.post('/api/deleteComment',{
            username: name,
            createtime: time
          },{
          headers: {
              'Access-Control-Allow-Origin':'*',  //解决cors头问题
              'Access-Control-Allow-Credentials':'true', //解决session问题
              'Content-Type': 'application/json'
          },
          withCredentials : true
        }).then(res=>{
          if(res){
            this.$refs.commentItem.style.display = 'none';

            let likeKey = 'blogId_' + this.blogId + '_time_' + time;
            storage.remove(likeKey);
          }
        })
    },

    /**
     * @description: 点击评论，评论输入框显示在评论下面
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    replyComments(){
      this.$emit("replyComment",this.insert,this.item.username);
    },

    /**
     * @description: 评论的点赞功能
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    changeHeart(){
      // 点击切换爱心图片
      this.heartChange=!this.heartChange

      let likeKey = 'blogId_' + this.blogId + '_time_' + this.item.createtime;
      let likeStatus = this.heartChange;

      // 首先从缓存读取点赞数据，看有没有已经点赞了的
      let status = storage.get(likeKey); 
      let num = parseInt(this.$refs.praiseNum.innerText);
      if(status!==true){
        this.$refs.praiseNum.innerText = num + 1;
        storage.set(likeKey,true)
      }else{
        this.$refs.praiseNum.innerText = num - 1;
        storage.set(likeKey,false);
      }

      //向后端发送请求，保存数据
      axios.post('/api/clickLikeIcon',{
          username: this.item.username,
          createtime: this.item.createtime,
          likeStatus:storage.get(likeKey)
        },{
        headers: {
            'Access-Control-Allow-Origin':'*',  //解决cors头问题
            'Access-Control-Allow-Credentials':'true', //解决session问题
            'Content-Type': 'application/json'
        },
        withCredentials : true //跨域请求要想带上cookie
      }).then(res=>{
        if(res){
          // console.log('点赞成功',res);
        }
      })
    },
    
    /**
     * @description: 将后端返回的图片名字拼接成新的路径
     * @param {String} name 后端返回的图片名字 
     * @return: 返回新的图片路径
     * @author: yuhui
     */
    userIconUrl(name){
      return require('../../../../assets/userIcon/'+name);
    },

    /**
     * @description: 跳转到详情页要在缓存中本机用户有没有点赞，有就将已经点赞的爱心显示出来
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    checkZan(){
      let likeKey = 'blogId_' + this.blogId + '_time_' + this.item.createtime;
      let initStatus = storage.get(likeKey); 
      if(initStatus===true){
        this.heartChange = true; 
      }
      this.browserRedirect();
    },
    // 判断移动端还是pc端
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
        // console.log('移动端');//跳转移动端页面
        this.smallScreenDeleteIconShow = true;
      } else {
        // console.log('PC端');//跳转pc端页面
        this.smallScreenDeleteIconShow = false;
      }
    }
  },
  mounted(){
    this.checkZan();
    this.deleteIcon();
  }
}
</script>

<style lang="stylus" scoped>
.comment
  width 100%
  display flex
  padding 5px 0
  .user-icon   
    height 60px
    width 60px
    border-radius 50%
    margin-right 30px
  .comment-right
    margin 5px 0
    flex 1
    .top-wrapper
      font-size 16px
      height 20px
      line-height 20px
      width 340px
      overflow hidden
      .writer
        font-weight bold
        display inline-block
        margin-right 20px
        height 100%
        color #666
      .time
        height 100%
        display inline-block
        color #666
        float right
    .comment-bar
      display table-cell
      vertical-align: top;
      height 25px
      img
        cursor pointer
        width 25px
        height 25px
        &.deleteIcon
          opacity 0
          transition-duration 0.2s
          margin-left 10px
          width 16px
          height 16px
      .testList
        opacity 1 !important
      span
        color #D81E06
        text-align center
        display inline-block
        font-size 16px
        vertical-align:bottom;
    .context
      margin-top 10px
      color #666
      font-size 18px
      max-width 700px
      line-height 24px
      white-space normal
      font-family Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif
      cursor default
@media screen and (max-width: 768px) and (min-width:375px)
  .comment
    img   
      height 40px
      width 40px
      border-radius 50%
      margin-right 10px
    .comment-right
      margin 0px 0
      flex 1
      .context
        margin-top 5px
        color #666
        font-size 16px
@media screen and (max-width: 375px) 
  .comment
    display flex
    align-items center
    &>img 
      width 50px !important
      height 50px !important
      margin-right 15px !important
    .comment-right
      width 200px !important 
      &>div:first-child
        width 200px !important
      .context
        width 200px !important
        overflow: hidden;
        text-overflow: ellipsis;
    .top-wrapper
      height 40px !important
      &>div
        height 20px !important
        display block !important
        &.time
          float left !important
  .comment-bar
    span 
      font-size 10px !important
    img 
      &:first-child
        width 18px !important
        height 18px !important
        margin-right 0
      &:last-child
        width 14px !important
        height 14px !important
        margin-left 4px !important
</style>