<template>
  <div>
    <el-row type="flex" class="row-input" justify="center">
      <el-col :span="6">
        <el-input
          v-model="name"
          placeholder="请输入要查询的线路名"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-button type="primary" @click="searchByName">搜索</el-button>
      </el-col>
    </el-row>

    <subDialog v-show="dialog_visible">
      <el-descriptions title="基本路线信息" direction="vertical" :column="4" border>
        <el-descriptions-item label="路线名">{{name}}</el-descriptions-item>
        <el-descriptions-item label="线路类型">{{type}}</el-descriptions-item>
        <el-descriptions-item label="路线走向">{{route}}</el-descriptions-item>
        <el-descriptions-item label="方向性">
          <el-tag size="small">{{ directional ? '双向' : '单向/环线' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="运行时间">{{runtime}}</el-descriptions-item>
        <el-descriptions-item label="单程时间">{{onewayTime}}</el-descriptions-item>
        <el-descriptions-item label="单向里程(km)">{{kilometer}}</el-descriptions-item>
        <el-descriptions-item label="班次间隔">{{interval}}</el-descriptions-item>

      </el-descriptions>

    </subDialog>


  </div>
</template>

<script>

import request from '../../../utils/request'

export default {
  data () {
    return {
      name: '',
      route: '',
      onewayTime: '',
      directional: '',
      kilometer: '',
      runtime: '',
      interval: '',
      type: '',
      dialog_visible: false
    }
  },
  methods: {
    searchByName () {
      console.log(this.id)
      request.get('/basic/getLineInfo', { params:{
          name: this.name
        }}).then(res => {
        console.log(res)
        this.type = res.type
        this.name = res.name
        this.route = res.route
        this.directional = res.directional
        this.runtime = res.runtime
        this.onewayTime = res.onewayTime
        this.kilometer = res.kilometer
        this.interval = res.interval
        this.dialog_visible = true
      })
    }
  }
}
</script>

<style>

</style>
