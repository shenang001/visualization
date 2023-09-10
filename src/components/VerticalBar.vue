<template>
  <div>
    <div>【服务资源占用比】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
 import * as echarts from 'echarts'  
  const props =  defineProps({
  data:{
  type:Object,
   required:true
  }
})
console.log('666',props.data);

let myChart = null;
const target = ref(null)
onMounted(()=>{
  myChart = echarts.init(target.value);
  renderChart()
});
  const renderChart = ()=>{
    const options ={
      // x轴展示数据
      xAxis:{
        type:'category',
        data:props.data.servers.map(item =>item.name),
        axisLabel:{
          color:'#9eb1c8'
        }
      },
      // y轴展示数据
      yAxis:{
        type:'value',
        show:false,
        max:function(value){
          return parseInt(value.max * 1.2);
        }
      },
      // 图表位置
      grid:{
        top:16,
        right:0,
        bottom:26,
        left:-6,
        containLabel:false
      },
      // 核心配置
      series:[{
        type:'bar',
        data:props.data.servers.map(item =>({
          name:item.name,
          value:item.value
        })),
      // 样式配置
      itemStyle:{
          color:'#479AD3',
          borderRadius: 5,
           shadowColor:'raga(0,0,0,0.3)',
           shadowBlur:5,
        },
        barWidth:12,
        label:{
          show:true,
          position:'top',
          textStyle:'#fff',
           formatter:'{c}%'
        },
       
      }]
    }
    myChart.setOption(options);

  }
    // 监听数据变化
  watch(()=>props.data,()=>{
    renderChart()
  })
</script>

<style>

</style>