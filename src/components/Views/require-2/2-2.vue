<!--需求3 某个站停靠的所有线路-->
<template>
  <div>
    <el-row type="flex" class="row-input" justify="center">
      <el-col :span="6">
        <el-input
          v-model="station"
          placeholder="请输入要查询的站点名"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-button type="primary" @click="searchByName">搜索</el-button>
      </el-col>
    </el-row>

    <!--返回该站点的所有线路信息-->
    <div style="margin-top:20px">
      <el-descriptions title="返回该站点的所有线路信息" >
      </el-descriptions>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%; margin-left:50px; text-align: center; align-content: center">
      <el-table-column
        prop="key"
        label="id"
        width="250"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="value"
        label="站名"
        align="center"
        width="250">
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
      station: '',
      tableData:[
      ],
      error_dialog: false,
      error_msg: ''
    }
  },
  methods: {
    searchByName () {
      console.log(this.station)
      request.get('/station/allLines', { params:{
          station: this.station
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
