<!--
 * @Descripttion: 详情页评论输入框填写组件
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-13 16:27:53
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-18 18:40:09
 -->
<template>
  <div class="write-wrapper">
    <textarea
      ref="commentContext"
      v-model="comment"
      placeholder="在这里输入你的评论"
    />
    <div class="but-wrapper">
      <button title="提交评论" @click="submitComments">
        <img src="../../../../assets/icons/submit.svg" width="32" height="32">
      </button>
      <Shaky style="float:left" @write-emoji="writeEmoji" />
      <div class="writer-wrapper">
        <div class="writer-icon" />
        <input
          ref="username"
          v-model="username"
          class="username"
          placeholder="昵称(必填)"
          maxlength="8"
        >
      </div>
    </div>
  </div>
</template>

<script>
import Shaky from './Shaky.vue';
import axios from 'axios'; 
import storage from 'good-storage';

export default {
  name: 'Write',
  components: {
    Shaky
  },
  props: {
    blogId: {
      type: Number,
      default: 0
    },
    replyName: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    }
  },

  data (){
    return{
      comment: '',
      picName: '',
      username: ''
    };
  },
  watch: {
    replyName (val) {
      val && sessionStorage.setItem('replyName', val);
    }
  },

  methods: {
    /**
     * @description: 有可能表情会加在文字中间,一定要加这一句，否则移动端会有问题
     * @param {type} 
     * @return: 
     * @author: yuhui
     */
    async insert (myValue, _this) {
      const myField = _this.$refs[`commentContext`];
      if (myValue && myField && (myField.selectionStart || myField.selectionStart === 0)) {
        let startPos = myField.selectionStart;
        let endPos = myField.selectionEnd;
        _this.comment = myField.value.substring(0, startPos) + myValue 
                        + myField.value.substring(endPos, myField.value.length);
        await _this.$nextTick(); // 这句是重点, 圈起来
        myField.focus();
        myField.setSelectionRange(endPos + myValue.length, endPos + myValue.length);
      } else {
        _this.comment += myValue;
      }
    },

    submitComments (){
      let username = this.username;
      let commentContext = this.comment;
      if (this.judgeNull() !== true) {
        return;
      }

      let createTime = Date.now();
      let replyUser = sessionStorage.getItem('replyName');

      // 取出最开始写这个评论的人
      if(replyUser){
        username += '@' + replyUser.split('@')[0];
      }

      let params = {
        username,
        commentContext,
        createTime,
        iconUrl: this.randomPic(),
        blogId: this.blogId,
        likestar: 0
      };

      axios.post('/api/writeComment', params,{
        headers: {
          'Access-Control-Allow-Origin': '*',  // 解决cors头问题
          'Access-Control-Allow-Credentials': 'true', // 解决session问题
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(res => {
        let { errNum, msg } = res.data;
        if (errNum !== 0) {
          return this.$toast({
            toastText: msg || '评论失败',
            duration: 300
          });
        }

        this.$emit('add-new-comment');
        this.clearValue();
        this.deleteCommentFlag(this.blogId, createTime);// 可删除标志位保存到缓存中
      }).catch(err => {
        console.log('err:',err);
      });
    },

    deleteCommentFlag (blogid,createTime){
      let deleteKey = 'delete_blogId_' + blogid + '_createtime_' + createTime; 
      storage.set(deleteKey,true);
    },

    judgeNull (){
      let tip = ''; // 提示信息，判断用户名和评论是否为空

      // 判断用户名和评论是否为空
      if(!this.username){
        tip += '用户名不能为空';
      }
      if(!this.comment){
        tip += '，评论不能为空';
      }

      if (tip) {
        return this.$toast({
          toastText: tip,
          duration: 300
        });
      }

      return true;
    },

    randomPic (){
      const PIC_NUM = 34;
      this.picName = Math.ceil(Math.random() * PIC_NUM) + '.jpg';
      return name;
    },

    clearValue () {
      this.picName = '';
      this.username = '';
      this.comment = '';
    },

    writeEmoji (emoji) {
      emoji && this.insert(emoji,this);
    }
  }
};
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