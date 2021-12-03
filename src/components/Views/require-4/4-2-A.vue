<!--需求11A.统计特殊站台。-->
<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="图表" name="first">
      <div>
        <div style="margin-top:20px">
          <el-descriptions title="统计所有特殊站台" >
          </el-descriptions>
        </div>
        <div id="MyChart"
             style="width: 800px;height:600px;margin-top: 50px;margin-left: 100px"
        ></div>
      </div>
    </el-tab-pane>

    <el-tab-pane label="详细信息" name="second">
      <div style="margin-top:20px">
        <el-descriptions title="统计所有特殊站台" >
        </el-descriptions>
      </div>
          <el-table
            :data="tableData"
            stripe
            height="80vh"
            style="width: 100%; margin-left:50px; text-align: center; align-content: center">
            <el-table-column
              prop="key"
              label="类型"
              width="250"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="value"
              label="站名"
              align="center"
              width="250">
              <template slot-scope="{row}">
                <div v-if="Array.isArray(row.value)">
                  <p v-for="(item, index) in row.value" :key="index">{{item}}</p>
                </div>
                <span v-else>{{row.value}}</span>
              </template>
            </el-table-column>
          </el-table>
    </el-tab-pane>
  </el-tabs>

</template>

<script>

import request from '../../../utils/request'
import * as echarts from 'echarts';

export default {
  data () {
    return {
      station: '',
      tableData:[
      ],
      activeName: 'first'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    init () {
      request.get('/analysis/specialStations', {}).then(res => {
        console.log(res)
        this.tableData = res.data
        console.log(this.tableData)
        let table_data = res.data
        //声明json数组对象 其中格式为 [{value: '' ,name: ''}]
        //替换json中的键名 原来是key value，现在要改成name value,值不变
        let chart_data = table_data.map(function (item) {
          return {
            name: item.key,
            value: item.value.length,
            data: item.value
          }
        });
        this.draw(chart_data)
      })
    },
    draw(chart_data){
      const myChart = echarts.init(document.getElementById("MyChart"));
      let option = {
        title: {
          text: '统计所有特殊站台',
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
