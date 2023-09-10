<template>
<div>
  <div>【大区数据信息】</div>
   <div ref="target" class="w-full h-full"></div>
</div>

</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
 import * as echarts from 'echarts'  
 const props = defineProps({
    data:{
      type:Object,
      required:true
    }
  })
  console.log(props.data);
  // 1.初始化echarts实例
   
   const target = ref(null);  //这一步类似于获取DOM
   let myCharts = null;
  //  要在加载时初始化
   onMounted(() =>{
    myCharts = echarts.init(target.value);
    renderChart()
   })
  // 2.构建options对象,渲染图表
  const renderChart = ()=>{
    const options ={
      // x轴展示数据
      xAxis:{
        show:false,
        type:'value',
        max:function(value){
          return parseInt(value.max * 1.2)
        }
      },
      // y轴展示数据
      yAxis:{
        type:'category',
        data:props.data.regions.map((item) =>{
          return item.name;
        }),
        inverse:true,
        // 是否展示轴线
        axisLine:{
          show:false
        },
        // 是否展示刻度
        axisTick:{
          show:false
        },
        axisLabel:{
          color:'#9eb1c8'
        }
      },
      // 绘制图表的位置 上下左右
      grid:{
        top:0,
        right:0,
        bottom:0,
        left:0,
        containLabel:true
      },
      // 核心配置
      series:[{
        type:'bar',  //柱形图
        data:props.data.regions.map(item =>({
          name:item.name,
          value:item.value
        })),
        showBackground:true,
        backgroundStyle:{
          color:'rgba(180,180,180,0.2)'
        }, 
        itemStyle:{
          color:'#479AD3',
          borderRadius: 5,
           shadowColor:'raga(0,0,0,0.3)',
           shadowBlur:5,
        },
        barWidth:12,
        label:{
          show:true,
          position:'right',
          textStyle:'#fff'
        }
      }]
    };
      // 3.通过 实例.setOption(options)
  myCharts.setOption(options);
  }


  // console.log(props.data);

  watch(()=>props.data,()=>{
        renderChart()
  })
</script>

<style>

</style>