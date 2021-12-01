<!--需求2：查询某条线路方向的全部站点信息-->

<template>
  <div>
    <el-row type="flex" class="row-input" justify="center">
        <el-input style="width: 500px" v-model="linePath" placeholder="请输入查询的线路名" clearable>
          <template slot="append">路</template>
          <el-select  style="width: 100px" v-model="direction" slot="prepend" placeholder="请选择">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
        </el-input>
      <el-col :span="6" :offset="1">
        <el-button type="primary" @click="getByLineName" >搜索</el-button>
      </el-col>
    </el-row>

    <div style="margin-top:20px">
      <el-descriptions title="该线路方向上的全部站点信息" >
      </el-descriptions>
    </div>

    <!--返回该线路的全部station信息-->
    <subDialog v-show="dialog_visible">
      <div style="margin-top: 20px" class="block">
        <el-timeline >
          <el-timeline-item
            v-for="(item, index) in tableData"
            :key="index"
            :color=color>
            {{"站点id: "+ item.id}}
            <br/>
            {{item.name}}
            <br/>
            {{item.english}}
          </el-timeline-item>
        </el-timeline>
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

    <subDialog v-show="dialog_visible1">
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
      dialog_visible: false,
      error_dialog: false,
      dialog_visible1: false,
      line: '',
      color: "#409EFF",
      linePath:'',
      msg:'',
      direction: '',
      tableData:[
      ]
    }
  },
  methods:{
    getByLineName() {
      console.log(this.linePath,this.direction)
      this.line = this.linePath + '路'
      // 如果direction为空 只传name
      if(this.direction == '')
        request.get('/station/allStations', { params:{
            line: this.line
          }}).then(res => {
          console.log(res)
          this.dialog_visible1 = true
        })
      else{
        request.get('/station/allStations', { params:{
            line: this.line,
            direction: this.direction
          }}).then(res => {
          console.log(res)
          if(res.result == false) { //不存在 提示
            this.msg = res.msg;
            this.error_dialog = true;
          }
          else {
            this.tableData = res.data
            this.error_dialog = false //搜索成功 取消警告
            this.dialog_visible = true
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
