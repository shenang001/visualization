<template>
  <div
    class="bg-[url('assets/imgs/bg.png')] bg-cover bg-center h-screen
     text-white p-2 flex overflow-hidden" v-if="data">
    <!-- 左 -->
    <div class="flex-1 mr-2 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- 横向柱状图 -->
      <HorizontalBar class=" h-1/3 box-border pb-4" :data="data.regionData"/>
      
      <!-- 雷达图 -->
      <RadarBarVue class=" h-1/3 box-border pb-4" :data="data.riskData"/>
      <!-- 关系图 -->
      <RelationVue class=" h-1/3" :data="data.relationData"/>
    </div>

    <!-- 中间 -->
    <div class="w-1/2 mr-2 flex flex-col">
    <!-- 数据总览图 -->
      <TotalDataVue class=" bg-opacity-50 bg-slate-800 p-3" :data="data.totalData"/>
      <!-- 数据可视化 -->
      <MapChartVue class="bg-opacity-30 bg-slate-800 p-3 mt-2 flex-1" :data="data.mapData"/>
    </div>

    <!-- 右边 -->
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- 竖向柱状图 -->
      <VerticalBarVue class=" h-1/3 box-border pb-4 " :data="data.serverData"/>
      <!-- 环形图 -->
      <RingBarVue class=" h-1/3 box-border pb-4 " :data="data.abnormalData"/>
      <!-- 文档云图 -->
      <WordCloudVue class=" h-1/3 " :data="data.wordCloudData"/>
    </div>
  </div>
</template>

<script setup>
import HorizontalBar from "./components/HorizontalBar.vue";
import MapChartVue from "./components/MapChart.vue";
import RadarBarVue from "./components/RadarBar.vue";
import RelationVue from "./components/Relation.vue";
import RingBarVue from "./components/RingBar.vue";
import TotalDataVue from "./components/TotalData.vue";
import VerticalBarVue from "./components/VerticalBar.vue";
import WordCloudVue from "./components/WordCloud.vue";
import {ref} from 'vue';  //引入v3的ref
import {getVisualization} from './api/visualization'
const data =ref(null);
const loadData = async ()=>{
  // ref的value值是响应式的
 data.value = await getVisualization();
 console.log(data.value);
}
loadData();
// 设置隔一段时间自动获取,后期动态显示
setInterval(()=>{
loadData();
},3000)

</script>

<style>
</style>