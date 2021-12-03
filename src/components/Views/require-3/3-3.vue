<!--需求9 查询某个时刻某个站台线路最近的3趟班次信息。-->
<template>
  <div style="margin-left: 30px">
    <div>
      <el-descriptions title="请选择时间：">
      </el-descriptions>
      <!--    某个时刻--><!--当前时间-->
      <el-time-picker
        v-model="time"
        format='HH:mm'
        value-format="HH:mm"
        clearable
        :picker-options="{
        selectableRange:'00:00:00 - 23:59:00'
        }">
      </el-time-picker>
    </div>
    <!-- 某个站台-->
    <div style="margin-top: 15px">
      <el-descriptions title="请输入站台ID：">
      </el-descriptions>
      <el-input style="width: 250px" clearable v-model="id" placeholder="请输入站台ID，如59760">
      </el-input>
    </div>
    <el-button style="margin-top: 20px" type="primary" @click="getNextLines" >搜索</el-button>
    <!-- 输出即将停靠的线路-->
    <subDialog v-show="dialog_visible">
      <div style="margin-top: 20px">
        <el-descriptions title="最近3趟班次：">
        </el-descriptions>
      </div>
      <div style="max-height: 60vh; margin-left: 20px;  overflow-y: visible; overflow-x: hidden">
        <el-table :data="tableData"
                  stripe border
                  style="width:801px; margin-left:50px; text-align: center;
                align-content: center"
        >
          <el-table-column
            prop="key"
            label="线路班次"
            width="400"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="value"
            label="到站时间"
            align="center"
            width="400">
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
  </div>
</template>

<script>
import request from "../../../utils/request"

export default {
  data () {
    return {
      id:'',
      time:'',
      dialog_visible: false,
      error_dialog:false,
      msg:'',
      tableData:[]
    }
  },
  methods:{
    getNextLines() {
      console.log(this.time,this.interval)
      request.get('/station/nextShifts', {
        params:{
          id: this.id,
          time: this.time,
        }
      }).then(res => {
        console.log(res)
        if(res.result == false){
          this.msg = res.msg
          this.error_dialog = true
          this.dialog_visible = false
        }
        else{
          this.tableData = res.data
          this.dialog_visible = true
          this.error_dialog = false //搜索成功 取消错误提示
        }
      })
    }
  }
}
</script>

<style>
</style>
