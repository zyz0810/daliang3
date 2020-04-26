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


//登录
export const requestLogin = params => { return axios.post(`${base}/api/login`, qs.stringify(params)).then(res => res.data) };

// 手机验证码登录
export const requestPhoneLogin = params => { return axios.post(`${base}/dl-userservice/external/phoneLogin`, qs.stringify(params)).then(res => res.data) };

// 获取手机验证码
export const requestPhoneCode = params => { return axios.get(`${base}/dl-userservice/external/getCode`, { params: params }).then(res => res.data) };

// 验证手机验证码
export const requestPhoneCodeValidate = params => { return axios.post(`${base}/dl-userservice/external/verifyCode`, qs.stringify(params)).then(res => res.data) };

// 注册
export const requestRegister = params => { return axios.post(`${base}/dl-userservice/external/webLogOn`, qs.stringify(params)).then(res => res.data) };

// 通过账号获取手机验证码
export const requestAccounGetCode = params => { return axios.get(`${base}/dl-userservice/external/getAccountCode`, { params: params }).then(res => res.data) };

// 验证修改密码，验证码是否正确
export const requestPhoneCodeValidateUpdatePwd = params => { return axios.post(`${base}/dl-userservice/external/verifyPasswdCode`, qs.stringify(params)).then(res => res.data) };

// 修改密码提交
export const requestUpdatePassword = params => { return axios.post(`${base}/dl-userservice/external/updatePasswoed`, qs.stringify(params)).then(res => res.data) };

// 获取路由权限
export const getRouterRole = headers => { return axios.get(`${base}/api/functions`, { headers: { 'Authorization': headers } }).then(res => res.data) };

// 根据当前方法获取按钮权限
export const getRouterRoleBtn = (params, headers) => { return axios.get(`${base}/api/functions/` + params, { headers: { 'Authorization': headers } }).then(res => res.data) };

// 本地获取省市区的数据
export const LocalhostGetData = paramsurl => { return axios.get(paramsurl) }

//添加一个机构
export const AddOrg = (params, headers) => { return axios.post(`${base}/dl-userservice/orgs`, qs.stringify(params), { headers: { 'Authorization': headers } }).then(res => res.data) };

// 图片上传
export const UploadFile = (params, headers) => { return axios.post(`${base}/api/manage/fileupload`, params, { headers: { 'Authorization': headers } }).then(res => res.data); then(res => res.data) };

// 获取交易商列表
export const getDlUserList = (params, headers) => { return axios.get(`${base}/api/dlUser/dlUserListView/getDlUserList`, { params: params, headers: { 'Authorization': headers } }); then(res => res.data) };

// 获取品类品种列表
export const getGrainList = (params, headers) => { return axios.get(`${base}/api/grain/grainListView/getGrainList`, { params: params, headers: { 'Authorization': headers } }); then(res => res.data) };

// 删除品类品种
export const delGrain = (params, headers) => { return axios.delete(`${base}/api/grain/grainListView/delGrain`, { params: params, headers: { 'Authorization': headers } }); then(res => res.data) };

// 获取仓单审核列表
export const getDepotOrderList = (params, headers) => { return axios.get(`${base}/api/depotOrder/depotOrderListView/getDepotOrderList`, { params: params, headers: { 'Authorization': headers } }); then(res => res.data) };

// 获取仓单详情
export const getDepotOrderDetail = (params, headers) => { return axios.get(`${base}/api/depotOrder/listDepotOrder/getDepotOrderDetailView`, { params: params, headers: { 'Authorization': headers } }); then(res => res.data) };

// 审核通过
export const agreeDepotOrder = (params, headers) => { return axios.post(`${base}/api/depotOrder/listDepotOrder/agreeDepotOrder`, qs.stringify(params), { headers: { 'Authorization': headers } }).then(res => res.data) };

// 驳回
export const rejectDepotOrder = (params, headers) => { return axios.post(`${base}/api/depotOrder/listDepotOrder/rejectDepotOrder`, qs.stringify(params), { headers: { 'Authorization': headers } }).then(res => res.data) };

// 获取配置交易参数
export const addDlGrainCost = (params, headers) => { return axios.get(`${base}/api/grain/listGrain/getEditTranParamsView`, { params: params, headers: { 'Authorization': headers } }); then(res => res.data) };

// 增加品类
export const addGrain = (params, headers) => { return axios.post(`${base}/api/grain/grainListView/addGrain`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data) };

// 修改交易参数
export const editDlGrainCost = (params, headers) => { return axios.post(`${base}/api/grain/grainListView/addDlGrainCost`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data) };

// 员工信息维护录入
export const addAgent = (params, headers) => { return axios.post(`${base}/api/department/addAgent`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data) };

//获取交易商列表
export const getDealerList = (params, headers) => { return axios.get(`${base}/api/dealer/getDealerList`, { params: params, headers: { 'Authorization': headers } }).then(res => res.data); };

///通过地址获取当前区域的经纪人信息
export const getDealerAgent = (params, headers) => { return axios.get(`${base}/api/dealer/getDealerAgent`, { params: params, headers: { 'Authorization': headers } }).then(res => res.data); };

//修改经纪人
export const updateDealerAgent = (params, headers) => { return axios.post(`${base}/api/dealer/updateDealerAgent`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//获取交易商权限列表数据
export const getDealerUserTranAuthList = (params, headers) => { return axios.get(`${base}/api/dealer/getDealerUserTranAuthList`, { params: params, headers: { 'Authorization': headers } }).then(res => res.data); };

//编辑交易商权
export const updateDealerUserTranAuth = (params, headers) => { return axios.post(`${base}/api/dealer/updateDealerUserTranAuth`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//获取企业/行业数据
export const getConfigType = (params, headers) => { return axios.post(`${base}/api/typeConfig/getConfigType`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//获取所有经纪人数据
export const getAllAgent = headers => { return axios.get(`${base}/api/dealer/getAllAgent`, { headers: { 'Authorization': headers } }).then(res => res.data); };

//交易商开户审核列表
export const qualityList = (params, headers) => { return axios.get(`${base}/api/quality/qualityList`, { params: params, headers: { 'Authorization': headers } }).then(res => res.data); };

//开户审核
export const agreeUserOrgDetail = (params, headers) => { return axios.post(`${base}/api/dlUser/agreeUserOrgDetail`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//获取交易商详情
export const getUserOrgDetail = (params, headers) => { return axios.post(`${base}/api/dlUser/getUserOrgDetail`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//录入个人开户信息
export const addUserPersonal = (params, headers) => { return axios.post(`${base}/api/dlUser/addUserPersonal`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//审核个人开户通过
export const agreeUserDetail = (params, headers) => { return axios.post(`${base}/api/dealer/agreeUserDetail`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//审核个人开户驳回
export const rejectUserPer = (params, headers) => { return axios.post(`${base}/api/dealer/rejectUserDetail`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//企业开户
export const addUserOrg = (params, headers) => { return axios.post(`${base}/api/dlUser/addUserOrgCommand`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//企业开户驳回
export const rejectUser = (params, headers) => { return axios.post(`${base}/api/dlUser/rejectUserOrgDetail`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

// 基本类型设置接口
//获取类型数据
export const getTypeConfigList = (params, headers) => { return axios.get(`${base}/api/typeConfig/getTypeConfigList`, { params: params, headers: { 'Authorization': headers } }).then(res => res.data); };

//新增类型数据
export const addTypeConfig = (params, headers) => { return axios.post(`${base}/api/typeConfig/addTypeConfig`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//删除类型
export const delTypeConfigById = (params, headers) => { return axios.delete(`${base}/api/typeConfig/delTypeConfigById`, { params: params, headers: { 'Authorization': headers } }); then(res => res.data); };

//获取类型数据
export const getTypeConfigById = (params, headers) => { return axios.post(`${base}/api/typeConfig/getTypeConfigById`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//修改类型数据
export const updateTypeConfigById = (params, headers) => { return axios.post(`${base}/api/typeConfig/updateTypeConfigById`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

///登录日志查询
export const getLoginLog = (params, headers) => { return axios.get(`${base}/api/user/getLoginLog`, { params: params, headers: { 'Authorization': headers } }).then(res => res.data); };

//操作日志查询
export const getOperateLog = (params, headers) => { return axios.get(`${base}/api/user/getOperateLog`, { params: params, headers: { 'Authorization': headers } }).then(res => res.data); };

//获取出入金申请列表
export const getMoneyDetailList = (params, headers) => { return axios.get(`${base}/api/money/getMoneyDetailList`, { params: params, headers: { 'Authorization': headers } }); then(res => res.data); };

//出入金申请
export const addMoneyDetail = (params, headers) => { return axios.post(`${base}/api/money/addMoneyDetail`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

//审批出入金申请
export const agreeMoneyDetail = (params, headers) => { return axios.post(`${base}/api/money/agreeMoneyDetail`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };

// 获取出入金详情
export const getMoneyDetail = (params, headers) => { return axios.post(`${base}/api/money/getMoneyDetail`, qs.stringify(params), { headers: { 'Authorization': headers } }); then(res => res.data); };
