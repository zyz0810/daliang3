<template>
  <div id="app">
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}
</style>

<style lang="scss" scoped>
#app::-webkit-scrollbar {
  width: 0 !important;
}
#app {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  // max-height: 500px;
  overflow: auto;
  scrollbar-width: none;
}
</style>>
