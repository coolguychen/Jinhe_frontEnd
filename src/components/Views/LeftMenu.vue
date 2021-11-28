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
          <el-menu-item index="/2-1" >查询某线路的全部站点信息</el-menu-item>
          <el-menu-item index="/2-2">查询在某个站停靠的所有线路</el-menu-item>
          <el-menu-item index="/2-3">查询某条线路从某站到某站的具体信息</el-menu-item>
          <el-menu-item index="/2-4">查询某两个站台之间的最短路径</el-menu-item>
          <el-menu-item index="/2-5">查询某两个站台间是否存在直达线路</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>班次查询</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/3-1">查询某线路的全部班次信息</el-menu-item>
          <el-menu-item index="/3-2">查询在某个站停靠的所有线路</el-menu-item>
          <el-menu-item index="/3-3">查询某条线路从某站到某站</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>分析查询</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/4-1">统计停靠路线最多的站点并排序</el-menu-item>
          <el-menu-item index="/4-2-A">统计特殊站台</el-menu-item>
          <el-menu-item index="/4-2-B">统计某条线路单行站</el-menu-item>
          <el-menu-item index="/4-3">分组统计不同类型公交的数量</el-menu-item>
          <el-menu-item index="/4-4">查询两条线路重复的站点名</el-menu-item>
          <el-menu-item index="/4-5">查询换乘线路</el-menu-item>
          <el-menu-item index="/4-6">按线路数量排序相邻站台</el-menu-item>
          <el-menu-item index="/4-7">按站点数量对线路排序</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/5">
        <i class="el-icon-search"></i>
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
