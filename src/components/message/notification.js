import Alert from './main.vue'
import Vue from 'vue'

Alert.newInstance = properties => {
  const props = properties || {}

  const Instance = new Vue({
    render(h) {
      return h(Alert, {
        props: props
      })
    }
  })

  const component = Instance.$mount()
  document.getElementById('appMain').appendChild(component.$el)
  console.log(document.getElementById('appMain'))
  const alert = Instance.$children[0]

  return {
    show(name) {
      alert.showDialog(name)
    },
    hidden(name) {
      alert.hiddenDialog(name)
    }
  }
}

export default Alert
