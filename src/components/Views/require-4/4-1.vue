<!--需求10 统计停靠路线最多的站点并排序-->

<template>
  <div>
    <el-descriptions title="停靠路线最多的站点（前15个）"></el-descriptions>
    <div class="main" style="max-height:90vh;">
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
  </div>

</template>

<script>
import request from "../../../utils/request"

export default {
  data () {
      return {
      tableData:[]
      }
  },
  //通常是为methods函数提前定义（类似提前声明变量 进入页面内容全部渲染完成后自动引函数）
  mounted() {
    this.getMostPassedStations()
  },
  methods:{
    getMostPassedStations(){
      request.get('/analysis/mostPassedStations', {
        params:{
        }
      }).then(res => {
        console.log(res.data[0])
        this.tableData = res.data
    })
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





