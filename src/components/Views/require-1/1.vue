<template>
  <div>
    <el-row type="flex" class="row-input" justify="center">
      <el-col :span="6">
        <el-input
          v-model="input"
          placeholder="请输入要查询的线路名"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-button type="primary" @click="searchByName">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import request from '../../../utils/request'

export default {
  data () {
    return {
      input: ''
    }
  },
  methods: {
    searchByName () {
      request.get('/basic/get?id=17', {}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>
