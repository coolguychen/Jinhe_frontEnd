<template>
  <div>
    <el-row type="flex" class="row-input" justify="center">
      <el-col :span="6">
        <el-input
          v-model="id"
          placeholder="请输入要查询的线路名"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-button type="primary" @click="searchByName">搜索</el-button>
      </el-col>
    </el-row>
    <el-descriptions title="基本路线信息" direction="vertical" :column="4" border>
      <el-descriptions-item label="路线名">name</el-descriptions-item>
      <el-descriptions-item label="线路类型">干线</el-descriptions-item>
      <el-descriptions-item label="路线走向">燎原-北路湾公交站</el-descriptions-item>
      <el-descriptions-item label="方向性">
        <el-tag size="small">双向</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="运行时间">6：30-22：30</el-descriptions-item>
      <el-descriptions-item label="单程时间">约49分</el-descriptions-item>
      <el-descriptions-item label="单向里程">12.0km</el-descriptions-item>
      <el-descriptions-item label="班次间隔">8</el-descriptions-item>

    </el-descriptions>
  </div>
</template>

<script>

import request from '../../../utils/request'

export default {
  data () {
    return {
      id: ''
    }
  },
  methods: {
    searchByName () {
      console.log(this.id)
      request.get('/basic/getLineInfo', { params:{
          id: this.id
        }}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>
