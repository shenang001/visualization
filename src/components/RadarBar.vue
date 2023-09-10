<template>
<div>
  <div>【云端报警风险】 </div>
  <div ref="target" class=" w-full h-full"></div>
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
  const target = ref(null);
  let myChart = null;
  onMounted(()=>{
    // 1.初始化echarts实例
    myChart = echarts.init(target.value);
    renderChart()
  })
  const renderChart = ()=>{
    // 2.配置optios
    const options ={
      // 雷达图的坐标系配置
      radar:{
        name:{
          textStyle:{
            color:'#05d5ff',
            fontSize:14
          }
        },
        shape:'polygon',
        center:['50%','50%'],
        radius:'80%',
        startAngle:120,
        axisLine:{
          lineStyle:{
            color:'rgba(5,213,255,.8)'
          }
        },
        splitLine:{
          show:true,
          lineStyle:{
            width:1,
            color:'rgba()5,213,255,.8'
          }
        },
        indicator:props.data.risks.map(item =>({
          name:item.name,
          max:100
        })),
        splitArea:{
          show:false 
        }

      },
      // 坐标极点
      polar:{
        center:['50%','50%'],
        radius:'0%',
        
      },
      // 坐标角度
      angleAxis:{
        angleAxis:{
          min:0,
          interval:5,
          clockwise:false
        }
      },
      // 径向轴
      radiusAxis:{
        radius:0,
        interval:20,
        // 展示分割线。
        splitLine:{
          show:true
        }
      },
      // 核心配置
      series:{
        type:'radar',
        symbol:'circle',
        symbolSize:10,
        itemStyle:{
          normal:{
            color:'#05d5ff'
          }
        },
        areaStyle:{
          normal:{
            color:'#05d5ff',
            opacity:0.5,
          }
          },
          lineStyle:{
            width:2,
            color:'#05d5ff',
          },
            label:{
              normal:{
                show:true,
                color:'#fff',

              }
            },
            data:[{
              value:props.data.risks.map(item =>{
                return item.value;
              })
            }]
        
      }

    }
  // 3.设置setOption
  myChart.setOption(options)

  }
  watch(()=>props.data,renderChart)
</script>

<style>

</style>