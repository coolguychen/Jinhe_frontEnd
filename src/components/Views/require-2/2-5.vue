<!--需求6 查询某两个站台间是否存在直达线路-->
<!--@GetMapping("/getDirectPath")-->
<!--public List<String> getDirectPath(String begin, String end){-->
<!--return lineService.queryDirectLineByStations(begin, end);-->
<!--}-->

<!--说明：存在返回线路方向，不存在给出提示。-->

<template>
<div>
  <!--input:两个站台-->
  <!--input-->
  <div>
    <el-row style="margin-top: 20px" type="flex" class="row-input" justify="center">
      <el-col :span="6">
        <el-input style="width: 250px" placeholder="请输入起始站名" v-model="begin" clearable>
          <template slot="append">站</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input style="width: 250px" placeholder="请输入终止站名" v-model="end" clearable>
          <template slot="append">站</template>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="findDirectionLine" >搜索</el-button>
      </el-col>
    </el-row>
  </div>

  <!--output:存在则返回线路名和线路方向，不存在则给出提示-->
  <div style="margin-left: 20px">
    <subDialog v-show="dialog_visible">
      <el-descriptions title="存在直达线路：" style="margin-top: 20px;margin-left: 50px">
      </el-descriptions>
      <div class="main" style="margin-left: 50px">
        <el-table
          :data="tableData"
          stripe
          border
          style="width:601px; margin-left:120px; text-align: center; align-content: center">
          <el-table-column
            prop="key"
            label="站名"
            align="center"
            width="300">
          </el-table-column>
          <el-table-column
            prop="value"
            label="方向"
            align="center"
            width="300">
          </el-table-column>
        </el-table>
      </div>
    </subDialog>

    <subDialog v-show="hint_msg">
      <el-alert
        title="提示："
        type="error"
        v-bind:description="msg"
        show-icon>
      </el-alert>
    </subDialog>
  </div>

</div>
</template>

<script>
import request from "../../../utils/request"

export default {
  data () {
    return {
      begin:'',
      end:'',
      msg:'',
      hint_msg: false,
      dialog_visible: false,
      tableData:[

      ]
    }
  },
  methods:{
    findDirectionLine() {
      request.get('/station/directLine', {
        params:{
          begin: this.begin,
          end: this.end
        }
      }).then(res => {
        console.log(res)
        if(res.result == false){
          this.hint_msg = true
          this.dialog_visible = false //搜索失败 不显示表格
          this.msg = res.msg
        }
        else{ //搜索成功
          console.log(res.data)
          this.tableData = res.data
          this.dialog_visible = true //显示直达路径
          this.hint_msg = false //取消错误提示信息
        }
      })
    }
  }
}
</script>

<style>

</style>
