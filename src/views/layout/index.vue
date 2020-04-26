<template>
  <el-container class="box-content">
    <el-aside width="200px">
      <div class="logo"></div>
      <menu-lists></menu-lists>
    </el-aside>
    <el-container class="bg-color">
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-main>
        <div class="judge-browser" v-show="ShowChrome">
          <div class="judge-browser-img">
            友情提示： 您的浏览器不是推荐版本，访问时可能达不到预期效果
            （ 最佳为<a target="_blank" href="https://www.google.cn/chrome/">谷歌Google Chrome浏览器</a>,建议更换 )
          </div>
          <div class="judge-browser-icon el-icon-close" @click="isShowChrome"></div>
        </div>
        <tags-view />
        <section class="content-container">
          <content-wrapper></content-wrapper>
        </section>
      </el-main>
    </el-container>
  </el-container>
</template> 

<script>
import myHeader from "./header";
import menuLists from "./menuList/index";
import contentWrapper from "./wrapper";
import path from "path";
import tagsView from "./tagView/main";
import { IEVersion } from "@/utils/isIE";
export default {
  components: {
    myHeader,
    menuLists,
    tagsView,
    contentWrapper
  },
  data() {
    return {
      tabVal: "",
      affixTags: [],
      ShowChrome: false
    };
  },
  created() {
    let version = IEVersion();
    if (version != -1 && version != "edge") {
      this.ShowChrome = true;
    }
  },
  methods: {
    // 删除tab
    removeTab(targetName) {
      this.$store.dispatch("permission/deletTabLists", targetName).then(res => {
        const latestView = this.$store.getters.tabLists.slice(-1)[0];
        if (latestView) {
          this.$router.push({ name: latestView.name });
        } else {
          this.$router.push("/");
        }
      });
    },
    isShowChrome() {
      this.ShowChrome = false;
    },
    // 跳转路由
    tabroute(item) {
      this.$router.push({
        name: item.name
      });
    },
    addTags() {
      let { name } = this.$route;
      this.tabVal = name;
      if (name) {
        this.$store.dispatch("permission/setTavLists", {
          title: this.$route.meta.title,
          name: this.$route.name,
          meta: Object.assign(this.$route.meta)
        });
      }
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        if (tag.name) {
          this.$store.dispatch("permission/setTavLists", {
            title: tag.title,
            name: tag.name,
            meta: tag.meta
          });
        }
      }
    },
    // 获取初始化路由tab
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            name: route.name,
            title: route.meta.title,
            meta: route.meta
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    }
  },
  computed: {
    tabLists() {
      let tabLists = this.$store.getters.tabLists;
      return tabLists;
    },
    routes() {
      return this.$store.state.permission.asyncRoutes;
    }
  },
  mounted() {
    this.addTags();
    this.initTags();
  },
  watch: {
    $route() {
      this.addTags();
    }
  }
};
</script>

<style lang="scss" scoped>
.box-content {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
/deep/ .el-aside {
  overflow: hidden;
  background-color: rgb(57, 56, 54);
}
.bg-color {
  background: #f9fafb;
}
.content-container {
  height: 100%;
}
.logo {
  height: 60px;
  width: 60px;
  margin: 0 auto;
  background: url("../../assets/img/logo.png") no-repeat;
  background-color: rgb(57, 56, 54);
  background-size: 56px 22px;
  background-position: center center;
  border-radius: 50%;
}
/deep/ .el-main {
  padding: 0;
}
.home-logo {
  width: 56px;
  height: 22px;
  margin-top: 18px;
}
/* 新添加判断浏览器 */
.judge-browser {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
/* 新添加判断浏览器 */
.judge-browser-img {
  background: url("/static/images/browser.jpg") no-repeat;
  background-size: 100%;
  font-size: 18px;
  text-align: center;
  line-height: 60px;
  color: white;
  a {
    text-decoration: underline;
    font-size: 18px;
    color: white;
  }
}
.judge-browser-icon {
  position: absolute;
  top: 14px;
  // bottom: 0;
  right: 16px;
  z-index: 5;
  font-size: 28px;
  color: white;
  cursor: pointer;
}
</style>