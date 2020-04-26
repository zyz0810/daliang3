<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="
        hasOneShowingChild(item.menuList, item) &&
          (!onlyOneChild.menuList || onlyOneChild.noShowingChildren)
      ">
      <app-link :to="resolvePath(onlyOneChild.functionPath)">
        <el-menu-item :index="resolvePath(onlyOneChild.functionPath)" :class="{ 'submenu-title-noDropdown': !isNest }" @click="reload(item)">
          <item :meta="{
            title: onlyOneChild.functionName,
            icon: onlyOneChild.functionIcon
          }" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.functionPath)" popper-append-to-body>
      <template slot="title">
        <item :meta="{
          title: item.functionName,
          icon: item.functionIcon
        }" />
      </template>
      <sidebar-item v-for="child in item.menuList" :is-nest="true" :item="child" :key="child.functionPath" :base-path="resolvePath(child.functionPath)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      if (children == null) children = []
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, functionPath: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath, type) {
      if (type == 1) {
        return routePath
      }
      if (isExternal(routePath)) {
        return routePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    // 点击重载
    reload(item) {
      // if (path !== item.functionPath) {
      //   this.$store.dispatch("permission/setTavLists", {
      //     name: item.name,
      //     meta: item.meta
      //   });
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  border-right: none;
  /deep/ .el-submenu__title {
    color: rgb(167, 167, 167);
    &:hover,&:focus {
      background-color: rgb(46, 45, 43);
    }
  }

  /deep/ .el-menu-item.is-active {
    color: rgb(253, 209, 0);
  }
  /deep/ .el-menu-item {
    color: rgb(167, 167, 167);
    overflow: hidden;
    &:hover,&:focus {
      background-color: rgb(46, 45, 43);
    }
  }
}
</style>
