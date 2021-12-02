<!--需求13 查询两条线路重复的站点名-->
<template>
  <div>
    <el-row type="flex" class="row-input" justify="center">
      <el-col :span="6">
        <el-descriptions title="线路1：" ></el-descriptions>
      </el-col>
      <el-col >
        <el-input v-model="line1" clearable style="width: 60%">
          <el-select  style="width: 100px" v-model="direction1" slot="prepend" placeholder="请选择">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-descriptions title="线路2：" ></el-descriptions>
      </el-col>
      <el-col>
        <el-input v-model="line2" clearable style="width: 60%">
          <el-select  style="width: 100px" v-model="direction2" slot="prepend" placeholder="请选择">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>

    <!--返回两条线路的重复station信息-->
    <div style="margin-top:20px">
      <el-descriptions title="两条线路的重复站点信息" >
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
      direction1: '',
      line2: '',
      direction2: '',
      tableData: [],
      error_dialog: false,
      error_msg: ''
    }
  },
  methods: {
    search () {
      console.log(this.station)
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
          this.error_dialog = true
        }
        else{
          this.tableData = res.data
          this.error_dialog = false
        }
      })
    }
  }
}
</script>

<style>

</style>
