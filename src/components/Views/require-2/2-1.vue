<!--需求2：查询某条线路方向的全部站点信息-->
<!--/**
     * 2. 获取某条线路的全部站点信息
     * @param name 线路名
     * @param direction 方向（上行/下行）
     * @return
     */
    @GetMapping("/getStations")
    public List<Station> getStationsByLineName(String name, String direction){
        String lineName = name+direction;
        return stationService.queryPathByLineName(lineName);
    }
-->
<template>
  <div>
    <el-row style="width: auto" type="flex" class="row-input" justify="center">
      <div>
        <el-input  v-model="line" placeholder="请输入查询的线路名" clearable>
          <el-select  style="width: 100px" v-model="direction" slot="prepend" placeholder="请选择">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
        </el-input>
      </div>
      <el-col :span="6" :offset="1">
        <el-button type="primary" @click="getByLineName" >搜索</el-button>
      </el-col>
    </el-row>

    <!--返回该线路的全部station信息-->
    <div style="margin-top:20px">
      <el-descriptions title="该线路方向上的全部站点信息" >
      </el-descriptions>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%; margin-left:50px; text-align: center; align-content: center">
      <el-table-column
        prop="id"
        label="id"
        width="250"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="站名"
        align="center"
        width="250">
      </el-table-column>
      <el-table-column
        prop="english"
        label="站名（英文）"
        width="250"
        align="center"
      >
      </el-table-column>
    </el-table>
<!--    <template>-->
<!--      <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>-->
<!--    </template>-->
    <subDialog v-show="dialog_visible">
      <el-alert
        title="错误提示："
        type="error"
        description="该线路不存在"
        show-icon>
      </el-alert>
    </subDialog>

    <subDialog v-show="dialog_visible1">
      <el-alert
        title="警告:"
        type="warning"
        description="请指定线路方向！"
        show-icon>
      </el-alert>
    </subDialog>


  </div>
</template>

<script>
import request from "../../../utils/request"

export default {
  data () {
    return {
      dialog_visible: false,
      dialog_visible1: false,
      line: '',
      direction: '',
      tableData:[
      ]
    }
  },
  methods:{
    getByLineName() {
      console.log(this.line,this.direction)
      // 如果direction为空 只传name
      if(this.direction == '')
        request.get('/station/allStations', { params:{
            line: this.line
          }}).then(res => {
          console.log(res)
          this.tableData = res
          this.dialog_visible1 = true
        })
      else{
        request.get('/station/allStations', { params:{
            line: this.line,
            direction: this.direction
          }}).then(res => {
          console.log(res)
          if(res.result == false) { //不存在 提示
            this.dialog_visible = true;
          }
          else this.tableData = res.data
        })
      }
    }
  }
}
</script>

<style>
</style>
