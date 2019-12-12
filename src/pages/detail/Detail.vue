<template>
  <div>
    这里是博客详情页
  </div>
</template>

<script>
export default {
  name: 'Detail', //不能与下面组件名字重读，否则会堆栈溢出
  components:{
  },
  data(){
    return{
    }
  },
  mounted(){
    const id = this.$route.query.id;
    console.log('id',id);
  }
}
</script>

<style lang="stylus" scoped>
</style>