<template>
  <div class="dialog" v-show="show"></div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    showDialog(name) {
      let dialogRouteNames = JSON.parse(localStorage.getItem('dialogRouteNames')) || []
      dialogRouteNames.push(name)
      dialogRouteNames = Array.from(new Set([...dialogRouteNames]))
      localStorage.setItem('dialogRouteNames', JSON.stringify(dialogRouteNames))
      this.show = true
    },
    hiddenDialog(name) {
      let dialogRouteNames = JSON.parse(localStorage.getItem('dialogRouteNames')) || []
      let index = dialogRouteNames.indexOf(name)
      if (index > -1) {dialogRouteNames.splice(index, 1)}
      localStorage.setItem('dialogRouteNames', JSON.stringify(dialogRouteNames))
      this.show = false
    }
  }
}
</script>


<style>
.dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0.5;
  z-index: 999;
}
</style>
