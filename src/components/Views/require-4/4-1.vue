<!--需求10 统计停靠路线最多的站点并排序-->

<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="图表" name="first">
        <div>
          <div style="margin-top:20px">
            <el-descriptions title="统计停靠路线最多的站点" >
            </el-descriptions>
          </div>
          <div id="MyChart"
               style="width: 800px;height:600px;margin-left: 100px"
          ></div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="详细信息" name="second">
        <el-descriptions title="停靠路线最多的站点（前15个）"></el-descriptions>
        <div class="main" style="max-height:85vh;">
          <el-table :data="tableData" stripe border
                    style="width: 902px; margin-left:100px;
                text-align: center; align-content: center">
            <el-table-column
              prop="id"
              label="站台ID"
              width="150"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="站台名"
              width="300"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="size"
              label="线路条数"
              width="150"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="lines"
              label="停靠线路"
              width="300"
              align="center"
            >
              <template slot-scope="{row}">
                <div v-if="Array.isArray(row.lines)">
                  <p v-for="(item, index) in row.lines" :key="index">{{item}}</p>
                </div>
                <span v-else>{{row.lines}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
import request from "../../../utils/request"
import * as echarts from "echarts";

export default {
  data () {
      return {
        tableData:[],
        activeName: 'first'
      }
  },
  //通常是为methods函数提前定义（类似提前声明变量 进入页面内容全部渲染完成后自动引函数）
  mounted() {
    this.init()
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
    init () {
      request.get('/analysis/mostPassedStations', {}).then(res => {
        console.log(res)
        this.tableData = res.data
        console.log(this.tableData)
        let table_data = res.data
        //声明json数组对象 其中格式为 [{value: '' ,name: ''}]
        let category = []
        let value = []
        for(let i=0; i<table_data.length; i++){
          category.push(table_data[i].name) //json数组添加值用push
          value.push(table_data[i].size)
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
          text: '停靠路线最多的站点（前15个）'
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
                color: "#afdaa0",
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
.main{
  overflow-x: hidden;
  overflow-y: visible;
  /*只显示y轴滚动条*/
}
</style>





