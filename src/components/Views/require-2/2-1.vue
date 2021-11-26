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
      <el-col :span="6">
        <el-input  v-model="name" placeholder="请输入查询的线路名" clearable>
          <el-select  v-model="direction" slot="prepend" placeholder="请选择">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
        </el-input>

      </el-col>
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
  </div>
</template>

<script>
import request from "../../../utils/request"

export default {
  data () {
    return {
      name: '',
      direction: '',
      tableData:[
      ]
    }
  },
  methods:{
    getByLineName() {
      console.log(this.name,this.direction)
      request.get('/station/getStations', { params:{
          name: this.name,
          direction: this.direction
        }}).then(res => {
        console.log(res)
        this.tableData = res
      })
    }
  }
}
</script>

<style>
 .el-select  {
    width: 100px;
  }
  .input-with-select  {
    background-color: #fff;
  }
</style>
