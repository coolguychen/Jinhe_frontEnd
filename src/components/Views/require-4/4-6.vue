<!--需求15 根据连接两个相邻站台之间线路数量排序两个相邻站台。-->
<template>
  <div>
    <div id="MyChart"
         style="width: 800px;height:700px;margin-left: 100px"
    ></div>
  </div>
</template>

<script>
import request from '../../../utils/request'
import * as echarts from 'echarts'

export default {
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      console.log(this.station)
      request.get('/analysis/stationsByLineNum', {
      }).then(res => {
        //console.log(res.data[0])
        let chart_data = res.data
        //声明json数组对象
        let category = []
        let value = []
        for(let i=0; i<chart_data.length; i++){
          category.push(chart_data[i].key) //json数组添加值用push
          value.push(chart_data[i].value)
        }
        //降序排序
        category = category.reverse()
        value = value.reverse()
        console.log(category,value)
        this.draw(category,value)
      })
    },
    draw(category, value){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("MyChart"));
      let option = {
        title: {
          text: '两个相邻站台之间线路数量'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: category
        },
        series: [
          {
            name: '线路数量',
            type: 'bar',
            data: value,
            itemStyle: {        //上方显示数值
              normal: {
                color: "#f7c47a",
                label: {
                  show: true, //开启显示
                  position: 'right', //在上方显示
                  textStyle: { //数值样式
                    color: 'grey',
                    fontSize: 12
                  }
                }
              }
            }
          }
        ]
      };
      myChart.setOption(option)
    }
  }
}
</script>

<style>

</style>
