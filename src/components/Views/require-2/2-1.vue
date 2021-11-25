<!--需求2：查询某条线路方向的全部站点信息-->
<template>
  <div style="margin-top: 200px; margin-left:200px">
  <el-input style ="width:500px" placeholder="请输入内容" v-model="input1" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="上行" value="1"></el-option>
      <el-option label="下行" value="2"></el-option>
    </el-select>
    <el-button slot = "append" type="primary" icon="el-icon-search"></el-button>
  </el-input>
</div>
</template>

<script>
export default {
  data () {
    return {
      input1: '',
      select: ''
    }
  }
}
</script>

<style>
 .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
