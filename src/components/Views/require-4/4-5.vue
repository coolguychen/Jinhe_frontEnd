<!--需求14 查询换乘线路。换乘线路数即线路停靠的所有站台停靠其他线路的数量的总和-->
<!--/**-->
<!--* 14.-->
<!--* @param lineName-->
<!--* @return-->
<!--*/-->
<!--@GetMapping("/getOtherLines")-->
<!--public List<String2ListDTO> findOtherLines(String lineName){-->
<!--return analysisService.findOtherLines(lineName);-->
<!--}-->
<template>
  <div>
    <div style="margin-top: 15px">
      <el-row type="flex" class="row-input" justify="center">
        <el-input class="el-input" v-model="linePath" placeholder="请输入查询的线路名" clearable>
          <template slot="append">路</template>
          <el-select class="el-select" v-model="direction" slot="prepend" placeholder="请选择" clearable>
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
        </el-input>
        <el-col :span="6" :offset="1">
          <el-button type="primary" @click="findOtherLines" >搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 输出所有可换乘的线路-->
    <subDialog v-show="dialog_visible">
      <div class="main" style="max-height:90vh; margin-top: 15px">
        <el-table :data="tableData" stripe border
                  style="width: 751px; margin-left:100px;
                text-align: center; align-content: center">
          <el-table-column
            prop="key"
            label="站台"
            width="350"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="value"
            label="换乘线路"
            width="400"
            align="center"
          >
            <template slot-scope="{row}">
              <div v-if="Array.isArray(row.value)">
                <p v-for="(item, index) in row.value" :key="index">{{item}}</p>
              </div>
              <span v-else>{{row.value}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </subDialog>

    <subDialog v-show="error_dialog">
      <el-alert
        title="错误提示："
        type="error"
        v-bind:description="msg"
        show-icon>
      </el-alert>
    </subDialog>

    <subDialog v-show="warn_dialog">
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
      tableData:[],
      line: '',
      linePath:'',
      msg:'',
      direction: '',
      error_dialog: false,
      warn_dialog: false,
      dialog_visible: false
    }
  },
  methods:{
    findOtherLines() {
      this.line = this.linePath + '路'
      console.log(this.line, this.direction)
      // 如果direction为空 只传name
      if(this.direction == '')
        request.get('/analysis/transferLines', { params:{
            line: this.line
          }}).then(res => {
          if(res.data!=null) { //环线 能搜到沿路站点
            this.tableData = res.data
            this.dialog_visible = true
            this.error_dialog = false //搜索成功 取消警告
            this.warn_dialog = false
          }
          else {
            this.warn_dialog = true
            this.error_dialog = false
            this.dialog_visible = false
          }
        })
      //direction不为空
      else{
        request.get('/analysis/transferLines', { params:{
            line: this.line,
            direction: this.direction
          }}).then(res => {
            if(res.result == false) { //不存在 提示
              this.msg = res.msg
              this.error_dialog = true
              this.dialog_visible = false
              this.warn_dialog = false
          }
          else { //搜索成功
              console.log(res)
              this.tableData = res.data
              this.dialog_visible =true
              this.error_dialog = false //搜索成功 取消警告
              this.warn_dialog = false
          }
        })
      }
    }
  }
}

</script>

<style>
.el-select .el-input {
  width: 100px;
}
.el-input{
  width: 500px;
}
.el-alert {
  margin-top: 15px;
}
.main {
  overflow-y: visible;
  overflow-x: hidden;
}
</style>
