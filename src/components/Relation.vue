<template>
  <div>
   <div>【数据传递信息】</div>
   <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup>
import {ref ,onMounted, watch} from 'vue';
import * as echarts from 'echarts'

  const target = ref(null);
  let myChart = null;
  const props = defineProps({
    data:{
      type:Object,
      required:true
    }
  })
  onMounted(() =>{
    // 初始化echarts
    myChart = echarts.init(target.value);
    renderChart()
  })
  const renderChart = ()=>{
    // 设置options属性
    const options ={
      // x轴
      xAxis:{
        show:false,
        type:'value'
      },
      // y轴
      yAxis:{
        // 是否展示
         show:false,
        type:'value'
      },
      // 核心数据
	series: [
			{
				// 用于展现节点以及节点之间的关系数据
				type: 'graph',
				// 不采用任何布局
				layout: 'none',
				// 使用二维的直角坐标系
				coordinateSystem: 'cartesian2d',
				// 节点标记的大小
				symbolSize: 16,
				// z-index
				z: 3,
				// 边界标签（线条文字）
				edgeLabel: {
					normal: {
						show: true,
						color: '#fff',
						textStyle: {
							fontSize: 12
						},
						formatter: function (params) {
							let txt = ''
							if (params.data.speed !== undefined) {
								txt = params.data.speed
							}
							return txt
						}
					}
				},
				// 圆饼下文字
				label: {
					normal: {
						show: true,
						position: 'bottom',
						color: '#fff'
					}
				},
				// 边两端的标记类型
				edgeSymbol: ['none', 'arrow'],
				// 边两端的标记大小
				edgeSymbolSize: 8,
				// 圆数据
				data: props.data.relations.map((item) => {
					// id 为 0 ，表示数据中心，数据中心单独设置
					if (item.id !== 0) {
						return {
							name: item.name,
							category: 0,
							active: true,
							speed: `${item.speed}kb/s`,
							// 位置
							value: item.value
						}
					} else {
						return {
							name: item.name,
							// 位置
							value: item.value,
							// 数据中心圆的大小
							symbolSize: 100,
							// 圆的样式
							itemStyle: {
								normal: {
									// 渐变色
									color: {
										colorStops: [
											{ offset: 0, color: '#157eff' },
											{ offset: 1, color: '#35c2ff' }
										]
									}
								}
							},
							// 数据中心字体
							label: { normal: { fontSize: '14',color:'#fff' } }
						}
					}
				}),
				// 线
				links: props.data.relations.map((item, index) => ({
					// 方向
					source: item.source,
					target: item.target,
					// 线上的文字
					speed: `${item.speed}kb/s`,
					// 线的样式
          // curveness曲线的弯曲程度
					lineStyle: { normal: { color: '#12b5d0', curveness: 0.2 } },
					// 文字位置
					label: {
						show: true,
						position: 'middle',
						offset: [10, 0]
					}
				}))
			},
			{
				// 用于带有起点和终点信息的线数据的绘制
				type: 'lines',
				// 使用二维的直角坐标系
				coordinateSystem: 'cartesian2d',
				// z-index
				z: 1,
				// 线特效的配置
				effect: {
					show: true,
					smooth: false,
					trailLength: 0,
					symbol: 'arrow',
					color: 'rgba(55,155,255,0.5)',
					symbolSize: 12
				},
				// 线的样式
				lineStyle: {
					normal: {
						curveness: 0.2
					}
				},
				// 线的数据级，前后线需要重合。数据固定
				data: [
					[{ coord: [0, 300] }, { coord: [50, 200] }],
					[{ coord: [0, 100] }, { coord: [50, 200] }],
					[{ coord: [50, 200] }, { coord: [100, 100] }],
					[{ coord: [50, 200] }, { coord: [100, 300] }]
				]
			}
		]
	}
// 设置setOptions
    myChart.setOption(options);
  
    };
    
    // 监视数据的变化
  watch(()=>props.data,renderChart)
</script>

<style>

</style>