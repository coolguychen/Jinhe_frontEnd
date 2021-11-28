<!--8.查询某个时刻某个站台某个时段内即将停靠的线路-->
<!--/**-->
<!--* 8.查询某个时刻某个站台某个时段内即将停靠的线路-->
<!--* @param id 站台id-->
<!--* @param time 当前时间-->
<!--* @param interval 时段长度-->
<!--* @return 线路名，几分钟后到站-->
<!--*/-->
<template>
  <div>
    <div>
      <el-descriptions title="请选择时间：">

      </el-descriptions>

      <!--    某个时刻--><!--当前时间-->
      <el-time-picker
        v-model="time"
        format='HH:mm'
        value-format="HH:mm"
        clearable
        :picker-options="{
        selectableRange:'00:00:00 - 23:59:00'
    }">
      </el-time-picker>
    </div>

    <!--    某个站台-->
    <div style="margin-top: 15px">
      <el-descriptions title="请输入站台ID：">

      </el-descriptions>
      <el-input style="width: 250px" clearable v-model="id" placeholder="请输入站台ID，如16147">

      </el-input>
    </div>

    <!--    某个时段-->
    <div style="margin-top: 15px">
      <el-descriptions title="请输入时段：">
      </el-descriptions>
      <el-time-picker
        v-model="interval"
        format='mm'
        value-format="mm"
        clearable
        :picker-options="{
        selectableRange:'00:00:00 - 00:59:00'
    }">
      </el-time-picker>
    </div>
    <el-button style="margin-top: 15px" type="primary" @click="queryNextLinesToCome" >搜索</el-button>
    <!--    输出即将停靠的线路-->

    <el-descriptions style="margin-top: 15px" title="最近班次：" direction="vertical" column="2" border>
      <el-descriptions-item label="班次">{{lineName}}</el-descriptions-item>
      <el-descriptions-item label="信息">{{msg}}</el-descriptions-item>
    </el-descriptions>

  </div>
</template>

<script>
import request from "../../../utils/request"

export default {
  data () {
    return {
      id:'',
      time:'',
      interval:'',
      lineName:'',
      tmp:'',
      msg:''
    }
  },
  methods:{
    queryNextLinesToCome() {
      console.log(this.time,this.interval)
      request.get('/station/nextLines', {
        params:{
          id: this.id,
          time: this.time,
          interval: this.interval
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
