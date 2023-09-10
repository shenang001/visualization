<template>
  <div>
    <div>【大区异常处理】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
 import * as echarts from 'echarts'  

const props = defineProps({
  data:{
    type:Object,
    required:true,
  }
})
  let myChart = null;
  const target = ref(null);

  onMounted(() =>{
     // 初始化
    myChart = echarts.init(target.value);
    renderChart();
  })

    const getSeriesData = ()=>{
      const series =[];
      props.data.abnormals.forEach((item,index) =>{
            // 上层
          series.push({
            name:item.name,
            type:'pie',
            clockWise:false,
            hoverAnimation:false,
            // 根据下标值，一次递减15%的内外径，达到一层层圆环的效果
            radius:[73 - index*15 + '%', 68 -index * 15 + '%'],
            center:['55%','55%'],
            label:{
              show:false
            },
            data:[
               {
                value:item.value,
                name:item.name
               },
               {
                  value:1000,
                  itemStyle:{
                    color:'rgba(0,0,0,0)',
                    borderWidth:0
                  },
                  tooltip:{
                    show:false 
                  },
                  hoverAnimation:false
               }
            ]
          });

          // 底层
      series.push({
        name:item.name,
        type:'pie',
        silent:true,
        z:1,
        clockWise:false,
        hoverAnimation:false,
        radius:[ 73 - index*15 +'%', 68 - index*15 +'%'],
        center:['55%','55%'],
        label:{
          show:false,
        },
        data:[
          {
            value: 7.5,
            itemStyle:{
              color:'rgb(3,31,62)',
              borderWidth:0,
            },
            tooltip:{
              show:false,
            },
             hoverAnimation:false
          },
          {
            value:2.5,
            itemStyle:{
              color:'rgba(0,0,0,0)',
              borderWidth:0
            },
            tooltip:{
              show:false,
            },
             hoverAnimation:false
          }
        ]
      })
      })
      
      
      return series

    }
  const renderChart = ()=>{
    const options ={
      // 图例配置
      legend:{
        show:true,
         icon:'circle',
          top:'14%',
           left:'60%',
            data:props.data.abnormals.map(item => item.name),
           width:-5,
          itemWidth:10,
         itemHeight:10,
        itemGap:6,
        textStyle:{
            fontSize:12,
              lineHeight:5,
              color:'rgba(255,255,255,0.8)'
        }
      },
      // 提示层
      tooltip:{
        show:true,
        trigger:'item',
        formatter:'{a}<br>{b}:{c}({d}%)'
      },
      // y轴
      yAxis:[
        {
          type:'category',
          inverse:true,
          axisLine:{
            show:false
          }
        }
      ],
      // x轴
      xAxis:[
        {
          show:false 
        }
      ],
      // 核心配置
      series:getSeriesData()

    };
    myChart.setOption(options);
  }

    // 监视数据变化，如果变化，再次渲染
  watch(() => props.data, renderChart)
</script>

<style>

</style>