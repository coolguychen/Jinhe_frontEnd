<!--需求7 查询某线路全部班次-->
<template>
  <div>
    <el-row style="width: auto" type="flex" class="row-input" justify="center">
      <div>
        <el-input  v-model="line" placeholder="请输入查询的线路名" clearable>
          <el-select  style="width: 100px" v-model="direction" slot="prepend" placeholder="请选择">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
        </el-input>
      </div>
      <el-col :span="6" :offset="1">
        <el-button type="primary" @click="getByLineName" >搜索</el-button>
      </el-col>
    </el-row>

    <!--返回该线路的全部班次信息-->
    <div style="margin-top:20px">
      <el-descriptions title="该线路方向上的全部班次信息" >
      </el-descriptions>
    </div>
    <table>
      <tr>
        <th v-for='(item,ind) in cols' :key="ind">{{item}}</th>
      </tr>
      <tr v-for='(item,index) in data' :key="index">
        <td v-for='(it,ind) in item' :key="ind">{{item[it]}}</td>
      </tr>
    </table>

<!--    <el-table-->
<!--      stripe-->
<!--      border-->
<!--      height="500"-->
<!--      style="width: 100%; margin-left:50px; text-align: center; align-content: center">-->
<!--      <el-table-column-->
<!--        type="index"-->
<!--        width="50">-->
<!--      </el-table-column>-->
<!--      <template v-for="(col, index) in cols">-->
<!--        <el-table-column-->
<!--          :prop="col"-->
<!--          :label="col">-->
<!--          <template slot-scope="scope">-->
<!--            {{scope.tableData[index]}}-->
<!--          </template>-->
<!--        </el-table-column>-->

<!--      </template>-->
<!--      <template v-for="(data, index) in tableData">-->

<!--      </template>-->
<!--    </el-table>-->

<!--    <el-table-->
<!--      :data="tableData"-->
<!--      stripe-->
<!--      style="width: 100%; margin-left:50px; text-align: center; align-content: center">-->
<!--      <el-table-column-->
<!--        prop="key"-->
<!--        label="站台名"-->
<!--        width="250"-->
<!--        align="center"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="value"-->
<!--        label="时间表"-->
<!--        align="center"-->
<!--        width="250">-->
<!--        <template v-for="(item, index) in data">-->
<!--                  <el-table-column-->
<!--                    :prop="index"-->
<!--                    :label="index">-->
<!--                    <template slot-scope="scope">-->
<!--                      {{scope.row[index]}}-->
<!--                    </template>-->
<!--                  </el-table-column>-->

<!--                </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

    <subDialog v-show="dialog_error">
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
import request from "../../../utils/request"

export default {
  data () {
    return {
      dialog_error: false,
      error_msg: '',
      line: '',
      direction: '',
      cols: [
      ],
      tableData:[
      ],
      data: []
    }
  },
  methods:{
    getByLineName() {
      console.log(this.line,this.direction)
      request.get('/station/timetable', { params:{
          line: this.line,
          direction: this.direction
      }}).then(res => {
          console.log(111111111)
          console.log(res)
          if(res.result == false) { //不存在 提示
            this.error_msg = res.msg
            this.error_dialog = true
          }
          else {
            this.dialog_error = false
            this.tableData = res.data

            res.data.forEach((item) => {
              this.cols.push(item.key)
              this.data.push(item.value)
            })


            console.log(this.cols)
            console.log(this.data)
            console.log(res.data)


          }
        })
    }

  }
}
</script>

<style>
</style>
