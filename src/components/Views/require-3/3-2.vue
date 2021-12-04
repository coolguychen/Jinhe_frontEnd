<!--8.查询某个时刻某个站台某个时段内即将停靠的线路-->
<!--/**-->
<!--* 8.查询某个时刻某个站台某个时段内即将停靠的线路-->
<!--* @param id 站台id-->
<!--* @param time 当前时间-->
<!--* @param interval 时段长度-->
<!--* @return 线路名，几分钟后到站-->
<!--*/-->
<template>
  <div style="margin-left: 30px">
    <!--input-->
    <!--某个站台-->
    <div >
      <el-descriptions title="请输入站台ID：">
      </el-descriptions>
      <el-input style="width: 250px" clearable v-model="id" placeholder="请输入站台ID，如16147">
      </el-input>
    </div>

    <div style="margin-top: 15px">
      <el-row type="flex" class="row-input" >
        <el-col span="6">
          <!--某个时刻-->
          <el-descriptions title="请选择时间：">
          </el-descriptions>
          <el-time-picker
            style="width: 250px;"
            v-model="time"
            format='HH:mm'
            value-format="HH:mm"
            clearable
            :picker-options="{
              selectableRange:'00:00:00 - 23:59:00'
            }">
          </el-time-picker>
        </el-col>

        <el-col span="6" offset="1">
          <!--某个时段-->
          <el-descriptions title="请选择时段长度：">
          </el-descriptions>
          <el-time-picker
            style="width: 250px;"
            v-model="interval"
            format='mm'
            value-format="mm"
            clearable
            :picker-options="{
              selectableRange:'00:00:00 - 00:59:00'
            }">
          </el-time-picker>
        </el-col>
      </el-row>
    </div>

    <el-button style="margin-top: 20px" type="primary" @click="queryNextLinesToCome" >搜索</el-button>

    <!--    输出即将停靠的线路-->
    <subDialog v-show="dialog_visible">
      <el-descriptions style="margin-top: 20px" title="最近班次：">
      </el-descriptions>
      <div class="next" style="max-height: 50vh; margin-left: 20px">
        <el-table :data="tableData"
                  stripe border
                  style="width:801px; margin-left:30px; text-align: center;
                align-content: center"
        >
          <el-table-column
            prop="key"
            label="线路名"
            width="400"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="value"
            label="到站时间"
            align="center"
            width="400">
            <template slot-scope="scope">
              {{ scope.row.value == 0 ? '即将到站' : scope.row.value + '分钟后到站' }}
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
      error_dialog: false,
      interval:'',
      msg:'',
      tableData:[]
    }
  },
  methods:{
    queryNextLinesToCome() {
      console.log(this.time,this.interval)
      request.get('/station/nextLines', {
        params:{
          id: this.id,
          time: this.time,
          interval: this.interval
        }
      }).then(res => {
        console.log(res)
        if(res.result == false){
          this.msg = res.msg
          //搜索失败，隐藏表格并提示错误
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
.next{
  overflow-x: hidden;
  overflow-y: visible;
}
</style>
