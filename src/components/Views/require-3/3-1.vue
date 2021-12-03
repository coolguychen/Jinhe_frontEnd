<!--需求7 查询某线路全部班次-->
<template>
  <div>
    <el-row style="width: auto" type="flex" class="row-input" justify="center">
      <div>
        <el-input  v-model="lineName" placeholder="请输入查询的线路名" clearable>
          <el-select  style="width: 100px" v-model="direction" slot="prepend" placeholder="请选择">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
          <template slot="append">路</template>
        </el-input>
      </div>
      <el-col :span="6" :offset="1">
        <el-button type="primary" @click="getByLineName" >搜索</el-button>
      </el-col>
    </el-row>

    <subDialog v-show="dialog_table">
      <!--返回该线路的全部班次信息-->
      <div style="margin-top:20px">
        <el-descriptions title="该线路方向上的全部班次信息" >
        </el-descriptions>
      </div>
      <div>
        <el-table
          :data="tableData"
          stripe
          height="100vh"
          style="width: 100%; margin-left:30px; text-align: center; align-content: center">
          <el-table-column
            prop="key"
            fixed
            label="站台名"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="value"
            label="班次"
            align="center"
            width="250">
            <template v-for="(index) in length"> <!--length的范围是1-length-->
              <el-table-column
                :prop="'index'"
                :label="'班次'+(index).toString()">
                <template slot-scope="{row}">
                  {{row.value[index-1]}}
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </subDialog>

    <subDialog v-show="dialog_error">
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
import request from "../../../utils/request"

export default {
  data () {
    return {
      dialog_error: false,
      dialog_table: false,
      error_msg: '',
      line: '',
      lineName:'',
      direction: '',
      cols: [
      ],
      data: [
      ],
      tableData: [
      ],
      length: ''
    }
  },
  methods:{
    getByLineName() {
      this.line = this.lineName + '路'
      console.log(this.line,this.direction)
      request.get('/station/timetable', { params:{
          line: this.line,
          direction: this.direction
      }}).then(res => {
          console.log(res)
          if(res.result == false) { //不存在 提示
            this.error_msg = res.msg
            this.dialog_error = true
            this.dialog_table = false
          }
          else {
            this.dialog_error = false
            this.dialog_table = true
            this.tableData = res.data
            res.data.forEach((item) => {
              this.cols.push(item.key)
              this.data.push(item.value)
            })
            // console.log(this.cols)
            // console.log(this.data)
            // console.log(this.data[0])
            this.length = this.data[0].length
          }
        })
    }

  }
}
</script>

<style>
</style>
