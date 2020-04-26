import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { Message } from 'element-ui'

import { devBaseUrl } from '@/config'
let base = devBaseUrl


axios.interceptors.response.use(res => {
    if (res.status == 200) {
        if (res.data.statusCode == '1001' || res.data.statusCode == '1002' || res.data.statusCode == '1003') {
            sessionStorage.removeItem('user')
            Message.error(res.data.message)
            router.push('/')
        }
    }
    return res
})


//excel表格下载部门管理
export const exportExcel = (params) => {
  return axios.post(`${base}/api/department/depExcelOut`, qs.stringify(params),{
    headers: {
      'Authorization': JSON.parse(sessionStorage.getItem('user')).usertoke,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    "responseType": 'blob'
  }).then( res =>  res.data)
}


export const exportExcelBroker = (params) => {
  return axios.post(`${base}/api/department/agentExcelOut`, qs.stringify(params),{
    headers: {
      'Authorization': JSON.parse(sessionStorage.getItem('user')).usertoke,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    "responseType": 'blob'
  }).then( res =>  res.data)
}
