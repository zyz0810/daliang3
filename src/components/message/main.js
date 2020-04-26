import Notification from './notification.js'

let messageInstance

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance()
  return messageInstance
}

export default {
  show (name) {
    getMessageInstance()
    return messageInstance.show(name)
  },
  hidden(name) {
    getMessageInstance()
    return messageInstance.hidden(name)
  },
  resetMessageInstance() {
    return messageInstance = null
  }
}
