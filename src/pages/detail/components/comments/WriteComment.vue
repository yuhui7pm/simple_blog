<!--
 * @Descripttion: 详情页评论输入框填写组件
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 16:27:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-18 18:40:09
 -->
<template>
  <div class="write-wrapper" @click="test">
    <textarea placeholder="在这里输入你的评论" v-model="str" @input="commentFlag=true" ref="commentContext"></textarea>
    <div class="but-wrapper">
      <button @click="submitComments" title="提交评论">
        <img src="../../../../assets/icons/submit.svg" width="32" height="32"/>
      </button>
      <Shaky style="float:left"></Shaky>
      <div class="writer-wrapper">
        <div class="writer-icon"></div>
        <input class="username" placeholder="昵称(必填)" maxlength="8" ref="username" @input="nameFlag=true"/>
      </div>
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
      picName:''
    }
  },
  components:{
    Shaky
  },
  props:{
    blogId:Number,
    name:String,
    order:Number
  },
  beforeMount(){
    sessionStorage.setItem('replyName', '');
    this.str = '';
  },
  mounted(){  
    this.picName = '';
    this.$refs[`commentContext`].value = '';
    this.$refs.username.value = '';
    
    let _this = this;
    eventBus.$on('writeEmoji',emoji=>{
      emoji && _this.insert(emoji,_this);
    })
  },
  methods:{
    test(){
      console.log("++++++++++",this.order);
    },
    /**
     * @description: 有可能表情会加在文字中间,一定要加这一句，否则移动端会有问题
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    async insert(myValue, _this) {
        const myField = _this.$refs[`commentContext`];
        if (myValue && myField && (myField.selectionStart || myField.selectionStart === 0)) {
            let startPos = myField.selectionStart
            let endPos = myField.selectionEnd
            _this.str = myField.value.substring(0, startPos) + myValue 
                        + myField.value.substring(endPos, myField.value.length);
            await _this.$nextTick() // 这句是重点, 圈起来
            myField.focus()
            myField.setSelectionRange(endPos + myValue.length, endPos + myValue.length)
        } else {
            _this.str += myValue
        }
    },

    /**
     * @description: 点击提交评论按钮，提交评论数据
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    submitComments(){
      let replyUser = sessionStorage.getItem('replyName');
      let username = String(this.$refs.username.value);
      const commentContext = this.$refs[`commentContext`].value;

      let nameComment = this.nullAlert(username,commentContext);
      let createTime = Date.now();

      if(replyUser && replyUser.length>0){
        username+='@'+replyUser.split('@')[0];
      }   
      
      if(nameComment&&this.websiteFlag&&this.commentFlag){
          axios.post('/api/writeComment',{
            username,
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
            if(res.status==200){
              eventBus.$emit('addNewComment',{
                username,
                comments:commentContext,
                createtime:createTime,
                iconurl:this.picName,
                blogId:this.blogId,
                likestar:0
              })
              
              //清空输入框
              sessionStorage.setItem('replyName', '');
              this.$refs[`commentContext`].value = '';
              this.$refs.username.value = '';
              this.str = '';             
              eventBus.$off('writeEmoji');
              
              this.$emit('closeComment');

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
     * @description: 生成随机的评论头像图片
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    randomPic(){
      let num = Math.ceil(Math.random()*34);
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
    padding 40px 100px 0
    border-top-left-radius 6px
    border-top-right-radius 6px
    .username
      border-color #8cc2d4
      color #8cc2d4
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
  textarea
    width 100%
    height 300px
    padding 15px
    box-sizing border-box
    resize none
    background #f6f9fa
    border-radius 10px
    box-sizing border-box
    color #8CC2D4
    box-shadow 0 0 0 1px #8cc2d4
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar /* Chrome Safari */
      display none
  textarea::placeholder
    color #8CC2D4
  .but-wrapper
    margin-top 12px
    overflow hidden
    .writer-wrapper
      height 30px
      width 200px
      overflow hidden
      margin-right 20px
      float left
      margin-top 2px
      .writer-icon
        width 30px
        height 30px
        background-color green
        background url("../../../../assets/icons/writer.svg");
        background-size contain
        background-repeat no-repeat
        float left
      input 
        margin-left 10px
        float left
        border-bottom 1px solid #8CC2D4
        color gray
        height 100%
        width calc(100% - 40px)
        padding-left 5px
        box-sizing border-box
        color #8cc2d4
      input::placeholder
        color #8cc2d4
      input:first-child
        margin-left 0px
    button
      float right
      color #888
      width 60px
      height 32px
      cursor pointer
  @media screen and (max-width: 768px) 
    .write-wrapper
      padding 0px 20px
      .writer-wrapper
        width 50% !important
        min-width 160px !important
        .username
          margin-left 5px
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
        // .shaky-wrapper 
        //   width auto !important
</style>