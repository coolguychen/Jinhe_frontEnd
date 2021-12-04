<template>
  <div>
    <el-row style="margin-top: 15px" type="flex" class="row-input" justify="center">
      <el-col :span="6">
        <el-input
          style="width: 300px"
          v-model="name"
          placeholder="请输入要查询的线路名"
          clearable
        ><template slot="append">路</template></el-input>
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
      <div style="margin-top: 15px">
       <el-button type="primary" @click="open">删除</el-button>
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

    <slot class="error">

    </slot>


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
      dialog_visible: false,
      error_dialog: false,
      error_msg:''
    }
  },
  methods: {
    searchByName () {
      console.log(this.id)
      request.get('/basic/lineInfo', { params:{
          name: this.name
        }}).then(res => {
        console.log(res)
        if(res.result === false) { //不存在 提示
          this.error_msg = res.msg
          this.error_dialog = true
          this.dialog_visible = false
        }
        else{
          res=res.data
          this.type = res.type
          this.name = res.name
          this.route = res.route
          this.directional = res.directional
          this.runtime = res.runtime
          this.onewayTime = res.onewayTime
          this.kilometer = res.kilometer
          this.interval = res.interval
          this.dialog_visible = true
          this.error_dialog = false
        }
      })
    },
    open(){
      this.$confirm('此操作将永久删除该路线, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用删除
        this.deleteLine()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //删除路线，传lineName
    deleteLine(){

    }
  }
}
</script>

<style>

</style>
