<!--需求4 查询某条线路从某站到某站，线路的运行方向、沿路站点和运行时长-->
<!--1/查询某条线路从某站到某站线路的运行方向-->
<!--2/沿路站点-->
<!--3/运行时长-->
<template>
  <div>
    <!--input-->
    <div>
      <el-row style="margin-top: 15px" type="flex" justify="center">
        <el-col :span="6">
          <el-input placeholder="请输入线路名" v-model="linePath">
            <template slot="append">路</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入起始站名" v-model="begin">
            <template slot="append">站</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入终止站名" v-model="end">
            <template slot="append">站</template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="queryPathByStations">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <!--output-->
    <div style="margin-left: 15px">
      <subDialog v-show="dialog_visible">
        <el-descriptions style="margin-top: 20px" title="基本线路信息" direction="vertical" :column="2" border>
          <el-descriptions-item label="运行方向">{{lineName}}</el-descriptions-item>
          <el-descriptions-item label="运行时长">{{interval}}</el-descriptions-item>
        </el-descriptions>
      </subDialog>
      <!--返回该线路的全部station信息-->
      <subDialog v-show="dialog_visible">
        <div style="margin-top:20px">
          <el-descriptions title="沿路站点" >
          </el-descriptions>
        </div>
        <div class="passStation" style="max-height: 60vh;margin-top: 20px" >
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

      <subDialog v-show="error_msg">
        <el-alert
          title="错误提示："
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
      interval:'',
      lineName:'',
      line:'',
      linePath:'',
      begin:'',
      color: "#409EFF",
      end:'',
      msg:'',
      dialog_visible: false,
      error_msg: false,
      tableData: [

      ]
    }
  },
  methods:{
    queryPathByStations() {
      console.log(this.begin,this.end,this.linePath)
      this.line = this.linePath + '路'
      request.get('/station/path', {
        params:{
          begin: this.begin ,
          end: this.end,
          line: this.line
        }
        }).then(res => {
        console.log(res)
        if(res.result == true){
          this.lineName = res.data.lineName
          this.interval = res.data.interval
          this.tableData = res.data.stationList
          this.dialog_visible = true
          this.error_msg = false //搜索成功 取消警告
        }
        else{
          this.msg = res.msg
          this.error_msg = true
        }
      })
    }
  }
}
</script>

<style>
.el-input {
  width: 250px;
}
.passStation {
  overflow-x: hidden;
  overflow-y: visible;
}
</style>
