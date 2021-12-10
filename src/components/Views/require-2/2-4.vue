<!--需求5 查询两个站之间的最短路径-->
<template>
  <div>
    <div>
      <el-row style="margin-top: 15px" type="flex" class="row-input" justify="center">
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
          <el-button type="primary" @click="search" >搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <subDialog v-show="dialog_visible">
      <div style="margin-left: 20px">
        <el-descriptions style="margin-top: 20px"  title="最短路径：">
        </el-descriptions>
      </div>
      <div style="max-height: 75vh;margin-top: 20px" class="allStation">
        <el-timeline >
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color=color>
            {{"站点id: "+activity.id}}
            <br/>
            {{activity.name}}
            <br/>
            {{activity.english}}
          </el-timeline-item>
        </el-timeline>
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
      begin: '',
      end: '',
      dialog_visible: false,
      color: "#409EFF",
      activities:[
      ],
      error_dialog: false,
      error_msg: ''
    }
  },
  methods: {
    search () {
      console.log(this.begin, this.end)
      if(this.begin =='' || this.end == ''){
        this.error_msg = "请输入站点名！"
        this.error_dialog = true
        this.dialog_visible = false
      }
      else{
        request.get('/station/shortestPath', { params:{
            begin: this.begin,
            end: this.end
          }}).then(res => {
          console.log(res)
          if(res.result === false) { //不存在 提示
            this.error_msg = res.msg
            this.error_dialog = true
            this.dialog_visible = false
          }
          else{
            this.activities = res.data
            this.dialog_visible = true
            this.error_dialog = false
          }
        })
      }
    }
  }
}
</script>

<style>
.block{
  overflow-y: visible;
}
.el-alert{
  margin-top: 15px;
}

</style>
