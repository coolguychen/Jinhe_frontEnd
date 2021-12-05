<!--需求12 分组统计常规公交(包括干线、支线、城乡线、驳接线、社区线)、-->
<!--快速公交(K字开头)、高峰公交(G字开头)、夜班公交(N字开头)的数量。-->
<template>
  <div>
    <div id="MyChart"
         style="width: 800px;height:600px;margin-top: 50px;margin-left: 100px"
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
  mounted() {
    this.typesOfLine()
  },
  methods:{
    typesOfLine(){
      request.get('/analysis/linesByType', {
        params:{
        }
      }).then(res => {
        console.log(res)
        let table_data = res.data
        //声明json数组对象 其中格式为 [{value: '' ,name: ''}]
        //替换json中的键名 原来是key value，现在要改成name value,值不变
        let chart_data = table_data.map(function (item){
          return{
            name: item.key,
            value: item.value
          }
        });
        //调用画Echart图的方法
        this.draw(chart_data)
      })
    },
    draw(chart_data){
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById("MyChart"));
      let option = {
        title: {
          text: '分组统计不同类型的公交的数量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: chart_data
          }
        ]
      };
      myChart.setOption(option);
    }
  }
}
</script>

<style>

</style>
