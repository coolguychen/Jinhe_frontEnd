<!--需求3 某个站停靠的所有线路-->
<template>
  <div>
    <el-row style="margin-top: 15px" type="flex" class="row-input" justify="center">
      <el-col :span="6">
        <el-input
          style="width: 300px"
          v-model="station"
          placeholder="请输入要查询的站点名"
          clearable
        > <template slot="append">站</template></el-input>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-button type="primary" @click="searchByName">搜索</el-button>
      </el-col>
    </el-row>

    <!--返回该站点的所有线路信息-->
    <subDialog v-show="dialog_visible">
      <div style="margin-left: 50px">
        <div style="margin-top:15px">
          <el-descriptions title="该站点的所有线路信息" >
          </el-descriptions>
        </div>
        <div style="margin-top: 15px">
          <el-table
            :data="tableData"
            stripe
            border
            style="width:601px; margin-left:80px; text-align: center; align-content: center">
            <el-table-column
              prop="key"
              label="id"
              width="300"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="value"
              label="站名"
              align="center"
              width="300">
              <template slot-scope="{row}">
                <div v-if="Array.isArray(row.value)">
                  <p v-for="(item, index) in row.value" :key="index">{{item}}</p>
                </div>
                <span v-else>{{row.value}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      station: '',
      tableData:[
      ],
      dialog_visible : false,
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
          this.dialog_visible = false
        }
        else{
          this.tableData = res.data
          this.dialog_visible = true
          this.error_dialog = false
        }
      })
    }
  }
}
</script>

<style>

</style>
