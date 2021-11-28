<template>
  <div id="app">
    <el-container>
        <el-aside width="isCollapse ? '64px' : '200px' ">
          <!--引入自定义左侧菜单栏-->
          <left-menu></left-menu>
        </el-aside>
        <el-main>
          <!--引入跳转路由-->
          <router-view ></router-view>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from './components/Views/LeftMenu.vue'

export default {
  name: 'App',
  components: {
    LeftMenu
  }
}
</script>
