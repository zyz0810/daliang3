<template>
  <el-input :disabled="isDisable" v-model="value" :placeholder="placeholder"></el-input>
</template>

<script>
export default {
  props: {
    placeholder: {
      tyepe: String,
      default: '请输入'
    },
    price: {
      type: [String, Number],
      default: ''
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    // 整数最大位数
    maxLength: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      value: this.price
    }
  },
  watch: {
    'value' (newVal, oldVal) {
      let ret = new RegExp(`^\\d{1,${this.maxLength}}(\\.(\\d{1,2})?)?$`)
      if (newVal !== '' && !ret.test(newVal)) {
        setTimeout(() => {
          this.value = oldVal
        }, 100)
      }
      this.$emit('update:price', this.value)
    },
    'price' (newVal, oldVal) {
      this.value = newVal
    }
  }
}
</script>
