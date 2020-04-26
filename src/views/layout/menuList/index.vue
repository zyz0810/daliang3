<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" class="scrollbar">
    <el-menu :default-active="$route.path" :collapse-transition="false" mode="vertical">
      <sidebar-item v-for="route in routeLists" :key="route.functionPath" :item="route" :base-path="route.functionPath" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from "./sidebarItem";
import http from "@/api/common";
let count = 0
export default {
  components: { SidebarItem },
  data() {
    return {
      routeLists: []
    };
  },
  methods: {
    dealData(routes) {
      routes.forEach(item => {
        let length = `${item.functionID}`.length;
        if (!item.functionPath) {
          count ++
          item.functionPath = `${length == 3 ? `/blank${count}` : `blank${count}`}`;
        }
        if (item.menuList && item.menuList.length > 0) {
          this.dealData(item.menuList);
        }
      });
      return routes
    }
  },
  mounted() {
    http.getRouterRole().then(res => {
      if (res.statusCode == 200) {
        // 需要将数据进行处理
        this.dealData(res.message)
        this.routeLists = res.message;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.scrollbar {
  height: calc(100% - 60px);
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/ .el-menu {
  border-right: none;
  background-color: #393836;
}
</style>
