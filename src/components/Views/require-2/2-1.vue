<!--需求2：查询某条线路方向的全部站点信息-->
<template>
  <div>
    <div style="margin-top: 15px">
      <el-row type="flex" class="row-input" justify="center">
        <el-input class="el-input1" style="width: 500px" v-model="linePath" placeholder="请输入查询的线路名" clearable>
          <el-select style="width: 100px" class="el-select1" v-model="direction" slot="prepend" placeholder="请选择" clearable>
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
          <template slot="append">路</template>
        </el-input>
        <el-col :span="6" :offset="1">
          <el-button type="primary" @click="getByLineName" >搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <!--返回该线路的全部station信息-->
    <subDialog v-show="dialog_visible">
      <div style="margin-top:20px">
        <el-descriptions title="该线路方向上的全部站点信息" >
        </el-descriptions>
      </div>
      <div style="max-height: 75vh;margin-top: 20px" class="allStation">
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
      dialog_visible: false,
      error_dialog: false,
      warn_dialog: false,
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
      else{
        request.get('/station/allStations', { params:{
            line: this.line,
            direction: this.direction
          }}).then(res => {
          console.log(res)
          if(res.result == false) { //不存在 提示
            this.msg = res.msg
            this.error_dialog = true
            //其余两个设为false
            this.warn_dialog = false
            this.dialog_visible = false
          }
          else {
            this.tableData = res.data
            this.error_dialog = false //搜索成功 取消警告
            this.warn_dialog = false
            this.dialog_visible = true
          }
        })
      }
    }
  }
}
</script>

<style>
.el-alert{
  margin-top: 15px;
}
.allStation{
  overflow-y: visible;
  overflow-x: hidden;
}
</style>
