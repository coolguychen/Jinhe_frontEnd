<!--自定义左边菜单栏-->
<template>
  <div>
    <div class="toggle-button" style="background-color:#545c64 " @click="toggleCollapse">
      <i style="margin-left: 20px; color: white" class="el-icon-more"></i>
    </div>
    <el-menu
      :collapse="isCollapse"
      :collapse-transition="false"
      style = "min-height: 100vh"
      :default-active ="this.$route.path"
      class="el-menu-vertical-demo"
      unique-opened = "true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <!--基本路线查询作为主板块-->
      <el-menu-item index="/1">
        <i class="el-icon-search"></i>
        <span slot="title">基本线路查询</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <span>站点查询</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/2-1" >线路站点信息</el-menu-item>
          <el-menu-item index="/2-2">站点停靠线路</el-menu-item>
          <el-menu-item index="/2-3">起止沿线站点</el-menu-item>
          <el-menu-item index="/2-4">最短路径</el-menu-item>
          <el-menu-item index="/2-5">直达线路判断</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>班次查询</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/3-1">线路班次信息</el-menu-item>
          <el-menu-item index="/3-2">站点某时线路</el-menu-item>
          <el-menu-item index="/3-3">站点某时某线</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>分析查询</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/4-1">统计停靠路线</el-menu-item>
          <el-menu-item index="/4-2-A">统计特殊站台</el-menu-item>
          <el-menu-item index="/4-3">统计路线类型</el-menu-item>
          <el-menu-item index="/4-4">查询重复站点</el-menu-item>
          <el-menu-item index="/4-5">查询换乘线路</el-menu-item>
          <el-menu-item index="/4-6">统计站点连接</el-menu-item>
          <el-menu-item index="/4-7">统计路线站点</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/5">
        <i class="el-icon-monitor"></i>
        <span slot="title">线路管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style>
  .el-menu-vertical-demo{
    height: 645px
  }
</style>

<script>
export default {
  data (){
    return{
      name: 'LeftMenu',
      isCollapse: false
    }

  },
  methods:{
    //点击按钮折叠菜单
    toggleCollapse(){
      this.isCollapse = !this.isCollapse;	//点击折叠按钮后，对isCollapse进行取反
    }
  }
}
</script>
