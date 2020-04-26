import axios from 'axios'
import Base from './basic'
import qs from 'qs'
import router from '@/router'
import {Message} from 'element-ui'
import {
  devBaseUrl
} from '@/config'

class Request extends Base {
  constructor () {
    super()
    if (process.env.NODE_ENV === 'development') {
      this.requestBaseUrl = devBaseUrl
    } else if (process.env.NODE_ENV === 'production') {
      this.requestBaseUrl = devBaseUrl
    }
  }
  ajax (opt = {}, type) {
    return new Promise((resolve, reject) => {
      let header = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      if (type !== 1) { header['Authorization'] = JSON.parse(sessionStorage.getItem('user')).usertoke }
      let config = {
        url: opt.url || '',
        method: opt.method || 'GET'
      }
      // 处理请求参数
      if (config.method.toUpperCase() === 'GET') {
        config.params = opt.data
      } else if (config.method.toUpperCase() === 'POST') {
        config.data = qs.stringify(opt.data)
      } else {
        config.params = opt.data
      }
      let instance = axios.create({
        baseURL: this.requestBaseUrl,
        headers: header,
      })
      instance.request(config).then(res => {
        filterData(res.data).then((data)=>resolve(data))
        .catch(()=>reject())
      }).catch(err=>{
        Message.error(err.message)
        reject()
      })
    })
  }
  uploadImg (opt = {}) {
    return new Promise((resolve, reject) => {
      let header = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': JSON.parse(sessionStorage.getItem('user')).usertoke
      }
      let config = {
        url: opt.url || '',
        method: 'POST',
        data: opt.data
      }
      let instance = axios.create({
        baseURL: this.requestBaseUrl,
        headers: header
      })
      instance.request(config).then(res => {
        filterData(res.data).then((data)=>resolve(data))
        .catch(()=>reject())
      })
    })
  }

  exportExcel(opt = {}){
    return new Promise((resolve, reject) => {
      let header = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': JSON.parse(sessionStorage.getItem('user')).usertoke
      }
      let config = {
        url: opt.url || '',
        method: 'POST',
        data: qs.stringify(opt.data)
      }
      let instance = axios.create({
        baseURL: this.requestBaseUrl,
        headers: header,
        responseType:'blob'
      })
      instance.request(config).then(res => {
        console.log(res.status)
        if(res.status == 200){
          resolve(res.data)
        }else{ reject()}
      }).catch(err=>{
        Message.error(err.message)
        reject()
      })
    })
  }


}


function filterData (data) {
  return new Promise((resolve, reject)=>{
    if (data.statusCode === 200) {
      resolve(data)
    } else if (data.statusCode === 1003 || data.statusCode === 1001 || data.statusCode === 1002) {
      Message.error(data.message)
      sessionStorage.removeItem('user')
      localStorage.setItem('dialogRouteNames', JSON.stringify([]))
      router.push('/login')
      reject()
    } else {
      Message.error(data.message)
      reject()
    }
  })
}

export default Request
