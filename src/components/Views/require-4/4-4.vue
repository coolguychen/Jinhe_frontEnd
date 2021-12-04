<!--需求13 查询两条线路重复的站点名-->
<template>
  <div>
    <el-row style="margin-top: 15px" type="flex" class="row-input" justify="center">
      <el-col :span="8">
        <el-input  style="width: 400px" placeholder="请输入线路1" v-model="lineName1" clearable>
          <el-select  clearable style="width: 100px" v-model="direction1" slot="prepend" placeholder="请选择">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
          <template slot="append">路</template>
        </el-input>
      </el-col>
      <el-col :span="8" offset="1">
        <el-input  style="width: 400px" placeholder="请输入线路2" v-model="lineName2" clearable>
          <el-select  clearable style="width: 100px" v-model="direction2" slot="prepend" placeholder="请选择">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
          <template slot="append">路</template>
        </el-input>
      </el-col>
      <el-col :span="2" offset="1">
        <el-button type="primary" @click="search" >搜索</el-button>
      </el-col>
    </el-row>

    <!--返回两条线路的重复station信息-->
    <subDialog v-show="dialog_visible">
      <div style="margin-top:20px; margin-left: 20px">
        <el-descriptions title="两条线路的重复站点信息" >
        </el-descriptions>
      </div>
      <div style="margin-left: 50px;margin-top: 15px">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 901px; margin-left:50px; text-align: center; align-content: center">
          <el-table-column
            prop="id"
            label="id"
            width="300"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="站名"
            align="center"
            width="300">
          </el-table-column>
          <el-table-column
            prop="english"
            label="站名（英文）"
            width="300"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>

    </subDialog>

    <subDialog v-show="error_dialog">
      <el-alert
        title="错误提示："
        type="error"
        v-bind:description="error_msg"
        show-icon>
      </el-alert>
    </subDialog>
  </div>

</template>

<script>

import request from '../../../utils/request'

export default {
  data () {
    return {
      line1: '',
      lineName1:'',
      lineName2:'',
      direction1: '',
      line2: '',
      direction2: '',
      tableData: [],
      error_dialog: false,
      dialog_visible: false,
      error_msg: ''
    }
  },
  methods: {
    search () {
      console.log(this.station)
      this.line1 = this.lineName1+'路'
      this.line2 = this.lineName2+'路'
      request.get('/analysis/repeatedStations', { params:{
          line1: this.line1,
          direction1: this.direction1,
          line2: this.line2,
          direction2: this.direction2
        }}).then(res => {
        console.log(res)
        if(res.result === false) { //不存在 提示
          this.tableData = null
          this.error_msg = res.msg
          this.dialog_visible = false
          this.error_dialog = true
        }
        else{
          this.tableData = res.data
          this.error_dialog = false
          this.dialog_visible = true
        }
      })
    }
  }
}
</script>

<style>

</style>
