<template>
  <div>
  <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup>
 import {ref, onMounted, watch} from 'vue';
import * as echarts from 'echarts'
// 引入中国地图Json文件
import mapJson from '@/assets/mapData/china.json';
 const props = defineProps({
  data:{
    type:Object,
    required:true
  }
 })
 let myChart = null;
 const target = ref(null);
 onMounted(()=>{
  // 注册中国地图
  myChart = echarts.init(target.value) ;
  echarts.registerMap('china',mapJson)
  renderChart()
 })
 const renderChart = ()=>{
  const options ={
    // 时间线
    timeline:{
      data:props.data.voltageLevel,
      // 类目轴
      axisType:'category',
      autoPlay:true,
      playInterval:3000,
      left:'10%',
      right:'10%',
      bottom:'0%',
      width:'80%',
      label:{
        // 默认状态下的文本
        noraml:{
          textStyle:{
            color:'#ddd',
          }
        },
        emphasis:{
          // 高亮的文本设置
          textStyle:{
            color:'#fff'
          }
        }
      },
      symbolSize:10,
      lineStyle:{
        color:'#555'
      },
      // 选中状态的配置
      checkpointStyle:{
        borderColor:'#888',
        borderWidth:2,
      },
      // 控件的配置
      controlStyle:{
        // 左右按钮
        showNextBtn:true,
        showprevBtn:true,
        // 默认状态下颜色
        normal:{
          color:'#666',
          borderColor:'#666'
        },
        // 高亮状态下
        emphasis:{
          color:'#aaa',
           borderColor:'#aaa'
        },

      }
    },
    baseOption:{
     grid:{
      right:'2%',
      bottom:'10%',
      top:'15%',
      width:'20%'
     } ,
     geo:{
      show:true,
      map:'china',
      roam:true,
      // 缩放比例
      zoom:0.9,
      // 中心点，经纬度
      center:[113.83531246, 34.0267395887],
      itemStyle:{
        normal:{
          borderColor:'rgba(147,235,248,1)',
          borderWidth:1,
          // 区域颜色
          areaColor:{
            type:'radial',
             x:0.5,
             y:0.5,
             r:0.5,
          colorStops:[
            {
              // 0%处的颜色
            offset:0,
            color:'rgba(147, 235, 248, 0)'
          },
          {
            // 100%处的颜色 
            offset:1,
            color:'rgba(147, 235, 248, .2)'
          }
          ],
          }
        },
      emphasis:{
     areaColor: '#389BB7',
			borderWidth: 0
    }
  },
}
},
 options:[],
  };
  
	// 为每一年度的图表添加数据
  props.data.voltageLevel.forEach((item,index) =>{
    // 第一个为总的options，第二个为options数组
    options.options.push({
        backgroundColor:'rgba(20,32,55,.1)',
        title:[
          {
            // 大的标题 对应中国地图
            text:'2019-2023 年度数据统计',
            left:'0%',
            top:'0%',
            textStyle:{
              color:'#ccc',
              fontSize:30
            }
          },
          {
            // 小的标题，对应柱形图
            id:'statistic',
            text:item + '年统计信息',
            right:'0%',
            top:'4%',
            textStyle:{
              color:'#ccc',
              fontSize:20,
            }
            
          }
        ],
        // x轴
        xAxis:{
          type:'value',
          // 不包含0
          scale:true,
          position:'top',
          splitLine:{
            show:false,
          },
          axisLine:{
            show:false,
          },
          axisTick:{
            show:false
          },
          axisLabel:{
            margin:'12',
            textStyle:{
              color:'#aaa',
            }
          }
        },
        // y轴
        yAxis:{
          type:'category',
          // 是否展示轴线
          axisLine:{
            show:true,
            lineStyle:{
              color:'#ddd'
            }
          },
          // 刻度尺
          axisTick:{
            show:false
          },
          axisLabel:{
            interval:0,
            textStyle:{
              color:'#fff',
              // fontSize:11
            }
          },
          data:props.data.categoryData[item].map(item =>item.name)
        },
        series:[
          {
            type:'bar',
            zlevel:1.5,
            itemStyle:{
              normal:{
                color: props.data.colors[index]
              }
            },
            data:props.data.categoryData[item].map(item => item.value)
          },
          {
            type:'effectScatter',
            coordinateSystem:'geo',
            data:props.data.topData[item],
            symbolSize:function(val){
              return val[2]/5
            },
            showEffectOn:'render',
            rippleEffect:{
              brushType:'stroke',
            },
            label:{
              // 高亮的显示出省份名字
              normal:{
                formatter:'{b}',
                position:'right',
                show:true
              }
            },
            itemStyle:{
              color:props.data.colors[index],
              shadowBlur:5,
              shadowColor:props.data.colors[index]
            }
          }
        ]
    })
  })
  myChart.setOption(options);
 }
 watch(()=>props.data, renderChart)
</script>

<style>

</style>