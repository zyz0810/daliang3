<template>
  <div class="wrapper">
    <div>
      <!-- <p>安徽大粮粮食交易所业务管理系统</p> -->
      <span class="label_btn">安徽大粮粮食交易所物流业务管理系统</span>
      <div class="userinfo">
        <!-- <hamburger :toggle-click="toggleSideBar" :is-active="isOpened" class="hamburger-container" /> -->
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">{{sysUserName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {resetRouter} from '@/router'
import DialogMessage from '@/components/message/main'
export default {
  methods: {
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("user");
          DialogMessage.resetMessageInstance()
          resetRouter()
          this.$store.dispatch('permission/generateRoutes', [])
          this.$store.dispatch('permission/delFunctionId')
          this.$store.dispatch('permission/delAllTabs')
          localStorage.setItem('dialogRouteNames', JSON.stringify([]))
          _this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  computed:{
    sysUserName(){
      if(sessionStorage.getItem('user')) {
        return JSON.parse(sessionStorage.getItem('user')).userName
      } else {
        return '张三'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.label_btn {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  background-color: #f7f7f7;
  padding: 0 13px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  position: relative;
  margin-left: 15px;
  &:before {
    content: "";
    width: 9px;
    height: 14px;
    background: url(/static/images/jt_left.png) no-repeat;
    position: absolute;
    left: -8px;
    top: 50%;
    margin-top: -7px;
  }
}
</style>>
