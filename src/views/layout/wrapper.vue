<template>
  <transition name="fade-transform" mode="out-in">
    <section class="app-main" id="appMain">
      <keep-alive :include="cachedViews">
        <router-view />
      </keep-alive>
    </section>
  </transition>
</template>

<script>
// import Vue from 'vue'
// import Alert from '@/components/message/main'
// Vue.prototype.$Alert = Alert
export default {
  name: "AppMain",
  computed: {
    // cachedViews() {
    //   return this.$store.state.permission.cachedViews.includes(
    //     this.$route.name
    //   );
    // }
    cachedViews() {
      return this.$store.state.permission.cachedViews
    },
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100% - 60px);
  // max-width: 1700px;
  position: relative;
  padding: 20px;
}
</style>
