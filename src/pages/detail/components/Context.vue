<template>
  <div class="wrapper">
    <div class="context-wrapper">
      <div class="context">
  很多年以前，我曾经看到过这样一则新闻，说的是谷歌搜索结果页上的那个链接颜色，是通过一个严密的实验，用数据来最终决定的。他们测试了整整 41 种蓝色，最终选出了那个表现指标最好的蓝色。选用这种蓝色要比其他的蓝色每年多为谷歌带来两亿美元的利润。

  2015 年夏天，我来到了硅谷，加入了谷歌的广告与商业部门。我终于可以亲身体验到，在谷歌这样的公司，这些设计决定是怎么做出来的。入职第一个月我就发现，那则新闻报道很有可能是真实的。实际上我很快发现，在很多硅谷的科技公司里，用科学实验、用数字指标来做设计决定是一种越来越流行的做法，他们把它叫做「数据驱动的设计方法」……

  在这期节目里，我们和来自谷歌、Facebook、以及苹果的设计师和数据科学家，一起来探讨了这样一系列问题：数据，为什么成为了如今互联网公司的主宰？一个好的产品设计一定会从数字指标上反映出来吗？为什么有时候我们觉得更好的设计方案，产品指标却没有获得增长呢？作为身处数据驱动的公司员工个体，我们是否能找到一条行为准则来指导我们的工作？

  出场嘉宾
  Aris Chen: https://www.linkedin.com/in/aris-chen-36b34115/
  张胜杰: https://www.linkedin.com/in/shengjzh/
  龚子仪: https://www.linkedin.com/in/子仪-龚-68a78114a/
  Laurent Baumann: https://www.linkedin.com/in/laurentbaumann/
  Ellen Dong: https://www.linkedin.com/in/ellen-dong-4aa56561/
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Title', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
  },
  data(){
    return{
    }
  },
  methods:{
  },
  mounted(){
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    margin-bottom 50px
    padding-bottom 20px
    border-bottom 1px solid #ddd
    .context-wrapper
      width 100%
      min-height 30px
      background white
      border-radius 6px
      color #3d3634
      .context
        width: 640px;
        padding: 60px 40px;
        margin 40px auto
        font-size: 16px;
        line-height: 28px;
        margin-bottom 70px
        box-sizing border-box
  @media screen and (max-width: 768px) 
    .wrapper
      margin-bottom 20px !important
      .context 
        width 100% !important
        margin 20px auto !important
        padding 20px !important
</style>