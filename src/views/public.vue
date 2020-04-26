<template>
  <keep-alive :include="cachedViews">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  computed: {
    cachedViews() {
      return this.$store.state.permission.cachedViews
    }
  }
};
</script>

<style>
</style>
