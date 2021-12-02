<!--需求16 根据站点数量对线路进行排序-->

<!--/**-->
<!--* 16. 根据站点数量对线路进行排序-->
<!--* @return 线路名&相应站点数-->
<!--*/-->
<!--Map<String, Integer> sortLinesByStations();-->
<!--尝试用柱状图-->

<template>
  <div>
    <div id="MyChart"
         style="width: 800px;height:800px;margin-left: 100px"
    ></div>
  </div>

</template>

<script>
import request from "../../../utils/request"
import * as echarts from 'echarts';

export default {
  data () {
    return {
    }
  },
  //通常是为methods函数提前定义（类似提前声明变量 进入页面内容全部渲染完成后自动引函数）
  mounted() {
    this.sortLinesByStations()
  },
  methods:{
    sortLinesByStations(){
      request.get('/analysis/linesByStationNum', {
        params:{
        }
      }).then(res => {
        console.log(res.data[0])
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
          text: '站点数量最多的15条线路'
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
            name: '站点数量',
            type: 'bar',
            data: value,
            itemStyle: {        //上方显示数值
              normal: {
                color: "#9bd3e8",
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
