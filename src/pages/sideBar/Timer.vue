<template>
  <div class="counter">{{nowTime}}</div>
</template>

<script>
  export default{
    data () {
      return {
       nowTime:'',
       beginTime:1576310456000,
      }
    },
    mounted(){
      this.nowTimes();
    },
    methods:{
        //显示当前时间（年月日时分秒）
      timeFormate() {
        var date1= this.beginTime;  //开始时间  
        var date2 = new Date();    //结束时间  
        var date3 = date2.getTime() - date1;   //时间差的毫秒数        
        //计算出相差天数  
        var days=Math.floor(date3/(24*3600*1000))  
        //计算出小时数  
        var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数  
        var hours=Math.floor(leave1/(3600*1000))  
        //计算相差分钟数  
        var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数  
        var minutes=Math.floor(leave2/(60*1000))  
        //计算相差秒数  
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数  
        var seconds=Math.round(leave3/1000)  
        this.nowTime = "运行了 "+days+"天"+hours+"时"+minutes+"分"+seconds+"秒" 
      },
      nowTimes(){
        this.timeFormate();
        setInterval(this.nowTimes,1000);
        this.clear()
      },
      clear(){
        clearInterval(this.nowTimes)
        this.nowTimes = null;
      }
    }
  }
</script>

<style lang="stylus" scoped>
.counter
  position absolute
  font-size 16px
  color #666
  width 100%
  bottom 120px
  left 50%
  text-align center
  transform translateX(-50%)
</style>
