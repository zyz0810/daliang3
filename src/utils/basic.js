class Base {
  /**
         * 重置页面数据
         * @param {Object} _this 页面的this
        */
  resetData (_this) {
    Object.assign(_this.$data, _this.$options.data())
  }
}

export default Base
