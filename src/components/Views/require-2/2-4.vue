<!--需求5 查询两个站之间的最短路径-->
<template>
  <div>
    <el-row type="flex" class="row-input" justify="center">
      <el-col :span="6">
        <el-descriptions title="始发站：" ></el-descriptions>
      </el-col>
      <el-col >
        <el-input v-model="begin" clearable style="width: 60%"></el-input>
      </el-col>
      <el-col :span="6">
        <el-descriptions title="终点站：" ></el-descriptions>
      </el-col>
      <el-col>
          <el-input v-model="end" clearable style="width: 60%"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>

    <subDialog v-show="dialog_visible">
      <div class="block">
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
      console.log(this.station)
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
</script>

<style>

</style>
