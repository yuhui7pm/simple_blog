<!--
 * @Descripttion: 详情页评论输入框填写组件
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 16:27:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-02-23 10:53:37
 -->
<template>
  <div class="write-wrapper">
   <!-- <p class="show-speech"></p> -->
   <div class="input-wrapper">
      <input placeholder="昵称(必填)" maxlength="8" ref="username" @input="nameFlag=true" :style="nameFlag?'':'border-color:red'"/>
      <input placeholder="电子邮件(选填保密)" @input="clearError" @blur="validateEmail" ref="email" :style="emailFlag?'':'border-color:red'"/>
      <input placeholder="网站(选填保密,以http/https开头)" @input="clearError" @blur="validateWeb" ref="website" :style="websiteFlag?'':'border-color:red'"/>
   </div>
    <textarea placeholder="在这里输入你的评论" v-model="str" @input="commentFlag=true" ref="commentContext" :style="commentFlag?'':'border-color:red'"></textarea>
    <div class="but-wrapper">
      <button @click="submitComments">发表</button>
      <Shaky></Shaky>
    </div>
  </div>
</template>

<script>
import Shaky from './Shaky.vue';
import { eventBus } from '@/assets/bus';
import axios from 'axios'; 
import storage from 'good-storage';
export default {
  name:'Write',
  data(){
    return{
      str:"",
      nameFlag:true,//用户名是否为空
      emailFlag:true,//email格式校验
      websiteFlag:true,//网站格式校验
      commentFlag:true,//评论是否为空
      replyWho:'',
      picName:'',
    }
  },
  components:{
    Shaky
  },
  props:{
    blogId:Number,
  },
  mounted(){
    eventBus.$on('writeEmoji',emoji=>{
      this.insert(emoji)
    })
    eventBus.$on('replyName',name=>{
      this.replyWho = name;
    });
  },
  methods:{
    /**
     * @description: 有可能表情会加在文字中间
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    async insert(myValue) {
        const myField = this.$refs.commentContext;
        if (myField.selectionStart || myField.selectionStart === 0) {
            var startPos = myField.selectionStart
            var endPos = myField.selectionEnd
            this.str = myField.value.substring(0, startPos) + myValue 
                        + myField.value.substring(endPos, myField.value.length)
            await this.$nextTick() // 这句是重点, 圈起来
            myField.focus()
            myField.setSelectionRange(endPos + myValue.length, endPos + myValue.length)
        } else {
            this.str += myValue
        }
    },
    /**
     * @description: 点击提交评论按钮，提交评论数据
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    submitComments(){
      let replyUser = this.replyWho;
      let username = String(this.$refs.username.value);
      const email = this.$refs.email.value;
      const website = this.$refs.website.value;
      const commentContext = this.$refs.commentContext.value;
      // console.log('replyUser:',replyUser);
      if(this.replyWho.length>0){
        username+=' @'+replyUser.split('@')[0];
      }   

      let nameComment = this.nullAlert(username,commentContext);
      let createTime = Date.now();
      
      if(nameComment&&this.websiteFlag&&this.commentFlag){
          axios.post('/api/writeComment',{
            username,
            email,
            website,
            commentContext,
            createTime,
            iconUrl:this.randomPic(),
            blogId:this.blogId,
          },{
              headers: {
                'Access-Control-Allow-Origin':'*',  //解决cors头问题
                'Access-Control-Allow-Credentials':'true', //解决session问题
                'Content-Type': 'application/json'
            },
            withCredentials : true
          }).then(res=>{
            if(res){
              eventBus.$emit('addNewComment',{
                username,
                email,
                website,
                comments:commentContext,
                createtime:createTime,
                iconurl:this.picName,
                blogId:this.blogId,
                likestar:0
              })
              this.$emit('closeComment');
              
              //清空输入框
              this.$refs.username.value = '';
              this.$refs.email.value = '';
              this.$refs.website.value = '';
              this.$refs.commentContext.value = '';
              this.replyWho = '';

              //可删除标志位保存到缓存中
              this.deleteCommentFlag(this.blogId,createTime);
            }
          }).catch(err => {
            console.log('err:',err)
          })
        }   
    },
    
    /**
     * @description: 写了哪一条评论，就保存到缓存中，判断该用户是否可以删除
     * @param {Number} blogid 该篇博客的id 
     * @param {Number} createTime 该条评论的创建时间 
     * @return: 
     * @author: yuhui
     */
    deleteCommentFlag(blogid,createTime){
      let deleteKey = 'delete_blogId_' + blogid + '_createtime_' + createTime; 
      storage.set(deleteKey,true)
    },

    /**
     * @description: 提交时，用户名和评论为空校验
     * @param {String} username 评论输入框所填写的用户名 
     * @param {String} commentContext 评论输入框所填写的评论内容
     * @return: 
     * @author: yuhui
     */
    nullAlert(username,commentContext){
      let tip = ''; //提示信息，判断用户名和评论是否为空
      //判断用户名和评论是否为空
      if(username.length===0){
        this.nameFlag=false;
        tip+='用户名不能为空 ';
      }
      if(commentContext.length===0){
        this.commentFlag=false;
        tip+='评论不能为空'
      }
      if(username.length===0||commentContext.length===0){
        alert(tip)
        return false;
      }else{
        return true;
      }
    },

    /**
     * @description: 校验所填写的邮箱是否合法
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    validateEmail(){
      let str = this.$refs.email.value;
      const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if(str.length>0&&!emailReg.test(str)){
        this.emailFlag = false;
      }else if(emailReg.test(str)){
        this.emailFlag = true;
      }
    },

    /**
     * @description: 检测网站格式
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    validateWeb(){
      let str = this.$refs.website.value;
      const webReg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
      if(str.length>0&&!webReg.test(str)){
        this.websiteFlag = false;
      }else if(webReg.test(str)){
        this.websiteFlag = true;
      }
    },
    
    /**
     * @description: 输入框清零时,消除警告
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    clearError(){
      if(this.$refs.email.value.length===0){
        this.emailFlag = true;
      }
      if(this.$refs.website.value.length===0){
        this.websiteFlag = true;
      }
    },

    /**
     * @description: 生成随机的评论头像图片
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    randomPic(){
      let num = Math.ceil(Math.random()*11);
      let name = num + '.jpg';
      this.picName = name;
      return name;
    }
  }
}
</script>

<style lang="stylus" scoped>
  *
    background none
    font-size 16px
    font-family "Arial, Helvetica, sans-serif"
  .write-wrapper
    box-sizing border-box
    background white
    padding 50px 100px 0
    border-top-left-radius 6px
    border-top-right-radius 6px
    .show-speech
      position: relative;
      margin: 20px 0;
      border-top: 1px solid #999;
      clear: both;
      &::before
        content: "发表评论";
        font-family: "Microsoft Yahei";
        position: absolute;
        top: -14px;
        left: 50%;
        margin-left: -50px;
        width: 100px;
        background-color: rgb(255, 255, 255);
        font-size: 16px;
        color: #888
        text-align: center;
  .input-wrapper
    width 100%
    height 60px
    display flex
    color #ccc
    input 
      padding 15px
      flex 1
      margin-left 10px
      // border 1px solid #5fbf5e
      border 1px solid #AEDD81
      margin-bottom 10px
      box-sizing border-box
      color #666
    input::placeholder
      color #666
    input:first-child
      margin-left 0px
  textarea
    width 100%
    height 300px
    padding 15px
    box-sizing border-box
    resize none
    // border 1px solid #5fbf5e
    border 1px solid #AEDD81
    box-sizing border-box
    color #666
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar /* Chrome Safari */
      display none
  textarea::placeholder
    color #666
  .but-wrapper
    margin-top 20px
    overflow hidden
    button
      float right
      color #888
      width 60px
      height 30px
      border 1px solid #AEDD81
      cursor pointer
  @media screen and (max-width: 768px) 
    .write-wrapper
      padding 20px 10px
      .input-wrapper
        display block
        height auto
        input
          width 100% !important
          margin-left 0
          padding 5px
      textarea
        height 100px
        padding 5px
      .but-wrapper
        margin-top 10px
        button
          height 24px
          line-height 24px
          font-size 16px
</style>