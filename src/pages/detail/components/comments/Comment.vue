<!--
 * @Descripttion: 详情页的评论列表项组件
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 21:17:40
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-16 14:56:31
 -->
<template>
  <div class="comment-wrapper" ref="commentItem" @mouseover="hoverStatus=true;" @mouseout="hoverStatus=false" @click="replyComments">
    <div class="comment" :key="item.createtime">
      <img class='user-icon' :src="(item.iconurl!==null)?userIconUrl(item.iconurl):iconUrl" alt="用户头像">
      <div class="comment-right">
        <div class="comment_context" style="float:left;">
          <div class="top-wrapper">
            <div class="writer">{{item.username}}</div>
            <div class="time" style="">{{timestampToTime(item.createtime)}}</div>
          </div>
          <div class="context">{{item.comments}}</div>
        </div>
        <div class="comment-bar" style="float:right">
          <img 
            :class="[(smallScreenDeleteIconShow&&deleteIconShow||hoverStatus&&deleteIconShow)?'testList':'','deleteIcon',]" 
            @click.stop="deleteIconShow&&deleteComments(item.username,item.createtime)"
            src="../../../../assets/icons/delete_comment.svg" 
            alt="删除评论"
          >
          <img 
            @click.stop="changeHeart"
            :src="heartChange?heart_click:heart_unclick"
            alt="回复评论"
            style="margin-left:10px"
          >
          <span ref="praiseNum">{{item.likestar}}</span>
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
import { eventBus } from '@/assets/bus';
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
      smallScreenDeleteIconShow:false,
      initStatus:false
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
          if(res.status == 200){
            this.$refs.commentItem.style.display = 'none';

            let likeKey = 'blogId_' + this.blogId + '_time_' + time;
            storage.remove(likeKey);

            eventBus.$emit('deleteCommentsLists',{
              username: name,
              createtime: time
            })
          }
        }).catch(err => {
          console.log('err:',err)
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
          eventBus.$emit('changeCommentsLists',{
            username: this.item.username,
            createtime: this.item.createtime,
            likeStatus:storage.get(likeKey),
            likeNum:this.$refs.praiseNum.innerText
          })
        }
      }).catch(err => {
          console.log('err:',err)
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
      this.initStatus = storage.get(likeKey); 
      if(this.initStatus){
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
    },
    nameRandom(){
      const name = [
        "满香天",
        "隗华晖",
        "达雅志",
        "智静逸",
        "通以彤",
        "盘叶农",
        "畅春竹",
        "邛雯华",
        "风萦思",
        "合鹤梦",
        "勤浩阔",
        "肖从筠",
        "麦子",
        "孔梦寒",
        "邗天",
        "经妙思",
        "典若雁",
        "弭小凝",
        "卜秋华",
        "寿馨逸",
        "百里华乐",
        "香和平",
        "蒉涵畅",
        "逄觅双",
        "茹又柔",
        "亓秋灵",
        "扶秀梅",
        "潭温",
        "周好",
        "司徒笑柳",
        "许冰安",
        "敖布侬",
        "镜尔芙",
        "荆依波",
        "麻茗",
        "徐紫",
        "台白凝",
        "田长星",
        "裴品",
        "呼延凝旋",
        "性梓暄",
        "徭梓馨",
        "随思菱",
        "建悦可",
        "方智志",
        "邓胤骞",
        "斐又香",
        "蓝优",
        "袭永康"
      ];

      const adj = [
        "郁郁寡欢",
        "悲观失意", 
        "好吃懒做",
        "疑神疑鬼", 
        "患得患失", "异想天开","多愁善感","狡猾多变","贪小便宜","见异思迁","情绪多变","脾气暴躁","重色轻友","胆小怕事", 
        "好吃懒做","成熟稳重","幼稚调皮","温柔体贴","诚实坦白","婆婆妈妈", "活泼可爱","普普通通","内向害羞","外向开朗", 
        "心地善良","聪明伶俐","善解人意","风趣幽默","思想开放","积极进取","小心谨慎", "郁郁寡欢","正义正直", "悲观失意",
        "好吃懒做","处事洒脱","疑神疑鬼","患得患失","异想天开","多愁善感", "淡泊名利", "见利忘义","瞻前顾后", "循规蹈矩",
        "热心助人","快言快语","少言寡语","爱管闲事","追求刺激","豪放不羁","狡猾多变","贪小便宜","见异思迁","情绪多变", 
        "水性扬花","重色轻友","胆小怕事","积极负责","勇敢正义", "聪明好学","实事求是","务实实际","老实巴交","圆滑老练","脾气暴躁",
        "慢条斯理","冲动","任性","神经质","暴躁","善变","难以琢磨","患得患失","浮躁","见异思迁","莽撞","易怒","犹豫不决","轻率", "善变"
      ] 
    }
  },
  activated(){
    this.checkZan();
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
        width 150px
        overflow hidden
        text-overflow ellipsis
        white-space: nowrap;
        font-weight bold
        display inline-block
        margin-right 20px
        height 100%
        color #666
        float left
      .time
        height 100%
        display inline
        color #666
        float left
    .comment-bar
      display table-cell
      vertical-align: top;
      height 25px
      margin-top -2px
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
      max-width 660px
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
      .comment_context
        width:calc(100% - 90px)
        .top-wrapper
          width 320px
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
      width 250px !important 
      &>div:first-child
        width 200px !important
      .context
        width 250px !important
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