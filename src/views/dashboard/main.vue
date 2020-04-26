<template>
  <div class="wrapper">欢迎使用安徽大粮粮食交易所物流业务管理系统</div>
</template>

<script>
export default {
  name: "dashboard",
  activated() {
    this.$shadow.shadow(this, this.cachedViews);
  },
  computed: {
    cachedViews() {
      return this.$store.state.permission.cachedViews;
    }
  }
};
</script>
