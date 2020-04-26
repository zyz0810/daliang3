import Request from '@/utils/axios'

class Http extends Request {

  // 登录
  async login(data) {
    const params = {
      url: 'api/login',
      method: 'POST',
      data
    }
    const res = await this.ajax(params, 1)
    return res
  }

  //获取路由权限
  async getRouterRole() {
    const params = {
      url: 'api/functions',
      method: 'GET'
    }
    const res = await this.ajax(params)
    return res
  }





  // ----权限管理-----

  //用户分页设置
  async getUserList(data) {
    let params = {
      url: 'api/user/userListView/getUserList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }

  //添加用户
  async addUser(data) {
    let params = {
      url: 'api/user/userListView/addUser',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }

  //获取分配角色列表数据
  async getChooseRoleView(data) {
    let params = {
      url: 'api/user/getChooseRoleView',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }

  //获取角色列表
  async getRolesList(data) {
    let params = {
      url: 'api/user/role/getRolesList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }

  //绑定选定角色列表
  async chooseRoleToUser(data) {
    let params = {
      url: 'api/user/user/chooseRoleToUser',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  // 添加角色
  async addRole(data) {
    let params = {
      url: '/api/user/role/addRole',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }

  //获取权限列表
  async getRoleFunction(data) {
    let params = {
      url: '/api/user/role/getRoleFunction',
      method: 'GET',
      data: {
        roleID: data
      }
    }
    let res = await this.ajax(params)
    return res
  }

  // 获取现货列表数据
  async grainDataList(data) {
    let params = {
      url: 'api/grain/grainDataList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  // 新增现货
  async addGrainData(data) {
    let params = {
      url: 'api/grain/addGrainData',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }

  // 更新权限
  async updateRoleFunction(data) {
    let params = {
      url: '/api/user/role/updateRoleFunction',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }


  async tradingFestivalList(data) {
    let params = {
      url: 'api/trading/tradingFestivalList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
     * 新增交易市场
     */
  async addTradingFestival(data) {
    let params = {
      url: 'api/trading/addTradingFestival',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
     * 删除交易市场
     * @param {*} data
     *
     */
  async delTradingFestival(data) {
    let params = {
      url: 'api/trading/delTradingFestival',
      method: 'DELETE',
      data: {
        tradIds: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
     *  获取交易日数据
     */
  async tradingDayList(data) {
    let params = {
      url: 'api/trading/tradingDayList',
      method: 'GET',
      data: {
        dayType: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
     * 新增交易日
     */
  async addTradingDay(data) {
    let params = {
      url: 'api/trading/addTradingDay',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
     * 取消交易日
     */
  async delTradingDay(data) {
    let params = {
      url: 'api/trading/delTradingDay',
      method: 'DELETE',
      data: {
        dayId: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  // 导入excel
  async importGrainData(data) {
    let params = {
      url: 'api/grain/importGrainData',
      method: 'POST',
      data: data
    }
    let res = await this.uploadImg(params)
    return res
  }

  // 获取品类
  async getQualityGrainnumTypet(data) {
    let params = {
      url: 'api/quality/getQualityGrainnumTypet',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }

  // 将api中接口转过来
  /**
   * 手机验证码登录
   * @param {*} data
   */
  async requestPhoneLogin(data) {
    let params = {
      url: 'dl-userservice/external/phoneLogin',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取手机验证码
   * @param {*} data
   */
  async requestPhoneCode(data) {
    let params = {
      url: 'dl-userservice/external/getCode',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 验证手机验证码
   * @param {*} data
   */
  async requestPhoneCodeValidate(data) {
    let params = {
      url: 'dl-userservice/external/verifyCode',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 注册
   * @param {*} data
   */
  async requestRegister(data) {
    let params = {
      url: 'dl-userservice/external/webLogOn',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
 * 通过账号获取手机验证码
 * @param {*} data
 */
  async requestAccounGetCode(data) {
    let params = {
      url: 'dl-userservice/external/getAccountCode',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
  * 验证修改密码，验证码是否正确
  * @param {*} data
  */
  async requestPhoneCodeValidateUpdatePwd(data) {
    let params = {
      url: 'dl-userservice/external/verifyPasswdCode',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
* 修改密码提交
* @param {*} data
*/
  async requestUpdatePassword(data) {
    let params = {
      url: 'dl-userservice/external/updatePasswoed',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
* 添加一个机构
* @param {*} data
*/
  async AddOrg(data) {
    let params = {
      url: 'dl-userservice/orgs',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
  * 获取个人注册信息管理列表
  * @param {*} data
  */
  async getDlUserList(data) {
    let params = {
      url: 'api/dlUser/dlUserListView/getDlUserList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
  * 获取个人注册信息管理列表
  * @param {*} data
  */
  async getDealerList(data) {
    let params = {
      url: 'api/dealer/getDealerList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
 * 通过地址获取当前区域的经纪人信息
 * @param {*} data
 */
  async getDealerAgent(data) {
    let params = {
      url: 'api/dealer/getDealerAgent',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
    * 通过地址获取当前区域的经纪人信息
    * @param {*} data
    */
  async updateDealerAgent(data) {
    let params = {
      url: 'api/dealer/updateDealerAgent',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取品类品种列表
   * @param {*} data
   */
  async getGrainList(data) {
    let params = {
      url: 'api/grain/grainListView/getGrainListt',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取仓库列表
   * @param {*} data
   */
  async getDepotList(data) {
    let params = {
      url: '/api/depot/getDepotList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取仓库详情
   * @param {*} data
   */
  async getDepotDetail(data) {
    let params = {
      url: '/api/depot/getDepotDetail',
      method: 'GET',
      data: {
        depotID: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   *
   *
   * 审核 type为1审核通过2驳回
   * @param {*} data
   */
  async examineDepot(data) {
    let params = {
      url: 'api/depot/examineDepot',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   *
   *
   * 获取类型配置集合
   * @param {*} data
   */
  async getConfigType(data) {
    let params = {
      url: 'api/depot/getTypeConfig',
      method: 'GET'
    }
    let res = await this.ajax(params)
    return res
  }

  /**
   *
   *
   * 获取企业/行业数据
   * @param {*} data
   */
  async getConfigTypeSelf(data) {
    let params = {
      url: 'api/typeConfig/getConfigType',
      method: 'post',
      data
    }
    let res = await this.ajax(params)
    return res
  }

  /**
   *
   *
   * 获取公告列表数据
   * @param {*} data
   */
  async getNoticeList(data) {
    let params = {
      url: 'api/notice/getNoticeList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 图片上传
   * @param {*} data
   */
  async uploadFile(data) {
    let params = {
      url: 'api/manage/fileupload',
      method: 'POST',
      data
    }
    let res = await this.uploadImg(params)
    return res
  }


  /**
   * 图片上传富文本编辑
   * @param {*} data
   */
  async publicUploadImg(data) {
    let params = {
      url: 'api/operations/uploadImg',
      method: 'POST',
      data
    }
    let res = await this.uploadImg(params)
    return res
  }

  /**
   * 新增/修改公告
   * @param {*} data
   */
  async saveNotice(data) {
    let params = {
      url: 'api/notice/saveNotice',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 删除公告
   * @param {*} data
   */
  async delNotice(data) {
    let params = {
      url: 'api/notice/delNotice',
      method: 'DELETE',
      data: {
        noticeId: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 发布撤销公告
   * @param {*} data
   */
  async modifyNotice(data) {
    let params = {
      url: 'api/notice/modifyNotice',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /** ------------------- 质检服务接口---------------- */
  /**
   * 获取质检服务管理列表数据
   * @param {*} data
   */
  async qualityList(data) {
    let params = {
      url: 'api/quality/qualityList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 根据质检服务机构的userID获取服务信息
   * @param {*} data
   */
  async getQualityOfferDetailByUserId(data) {
    let params = {
      url: 'api/quality/getQualityOfferDetailByUserId',
      method: 'GET',
      data: {
        userID: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 维护质检服务(新增、修改)
   * @param {*} data
   */
  async saveQualityOffer(data) {
    let params = {
      url: 'api/quality/saveQualityOffer',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 维护质检服务删除
   * @param {*} data
   */
  async delQualityOffer(data) {
    let params = {
      url: 'api/quality/delQualityOffer',
      method: 'DELETE',
      data: {
        offerId: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取所有品类
   * @param {*} data
   */
  async getGrainQualityList(data) {
    let params = {
      url: 'api/grain/getGrainQualityList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取交易商详情
   * @param {*} data
   */
  async getUserOrgDetail(data) {
    let params = {
      url: 'api/dlUser/getUserOrgDetail',
      method: 'POST',
      data: {
        userID: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取仓号列表
   * @param {*} data
   */
  async getSubDepotList(data) {
    let params = {
      url: 'api/depot/getSubDepotList',
      method: 'GET',
      data: {
        depotID: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 删除仓号
   * @param {*} data
   */
  async delSubDepot(data) {
    let params = {
      url: '/api/depot/delSubDepot',
      method: 'DELETE',
      data: {
        depotID: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取所有经纪人数据
   * @param {*} data
   */
  async getAllAgent(data) {
    let params = {
      url: 'api/dealer/getAllAgent',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 分配员工管理
   * @param {*} data
   */
  async getBranchList(data) {
    let params = {
      url: 'api/department/getBranchList',
      method: 'GET',
      data: {
        userID: data
      }
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 根据部门id获取所有部门成员
   * @param {*} data
   */
  async getDeparmentUser(data) {
    let params = {
      url: 'api/department/getDeparmentUser',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 给管理者分配员工
   * @param {*} data
   */
  async addBranch(data) {
    let params = {
      url: 'api/department/addBranch',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 解除员工
   * @param {*} data
   */
  async delDeparmentUser(data) {
    let params = {
      url: 'api/department/delDeparmentUser',
      method: 'DELETE',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  // 加盟商开户审核
  async agreeUserOrgDetail(data) {
    let params = {
      url: 'api/dlUser/agreeUserOrgDetail',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  // 录入开户用户
  async addUserOrgCommand(data) {
    let params = {
      url: 'api/dlUser/addUserOrgCommand',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 交易商开户驳回
   * @param {*} data
   */
  async rejectUser(data) {
    let params = {
      url: 'api/dlUser/rejectUserOrgDetail',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取交易商权限列表数据
   * @param {*} data
   */
  async getDealerUserTranAuthList(data) {
    let params = {
      url: 'api/dealer/getDealerUserTranAuthList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   *
   * @param {*} data
   */
  async updateDealerUserTranAuth(data) {
    let params = {
      url: 'api/dealer/updateDealerUserTranAuth',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取经纪部门列表数据
   * @param {*} data
   */
  async getDepartmentList(data) {
    let params = {
      url: 'api/department/departmentListView/getDepartmentList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 删除经纪部门列表
   * @param {*} data
   */
  async delDepartment(data) {
    let params = {
      url: 'api/department/departmentListView/delDepartment',
      method: 'DELETE',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 新增经纪部门
   * @param {*} data
   */
  async addDepartment(data) {
    let params = {
      url: 'api/department/departmentListView/addDepartment',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取辖区列表
   * @param {*} data
   */
  async getDepartScopeList(data) {
    let params = {
      url: 'api/department/departmentListView/getDepartScopeList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 删除辖区列表
   * @param {*} data
   */
  async delDepartScope(data) {
    let params = {
      url: 'api/department/departmentListView/delDepartScope',
      method: 'DELETE',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 新增辖区列表
   * @param {*} data
   */
  async addDepartScope(data) {
    let params = {
      url: 'api/department/departmentListView/addDepartScope',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取部门数据
   * @param {*} data
   */
  async getEditDepartmentView(data) {
    let params = {
      url: 'api/department/listDepartment/getEditDepartmentView',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }

  /**
   * 下载部门excel表格
   * @param {*} data
   */
  async exportDepExcel(data) {
    let params = {
      url: 'api/department/depExcelOut',
      method: 'POST',
      data
    }
    let res = await this.exportExcel(params)
    return res
  }

 /**
   * 下载员工管理excel表格
   * @param {*} data
   */
  async exportAgentExcel(data) {
    let params = {
      url: 'api/department/agentExcelOut',
      method: 'POST',
      data
    }
    let res = await this.exportExcel(params)
    return res
  }



  /**
   * 修改部门数据
   * @param {*} data
   */
  async updateDepartment(data) {
    let params = {
      url: 'api/department/departmentListView/updateDepartment',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }



  /**
   * 获取经纪人员工列表数据
   * @param {*} data
   */
  async getListAgent(data) {
    let params = {
      url: 'api/department/getListAgent',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取所有部门信息
   * @param {*} data
   */
  async getListEmployee(data) {
    let params = {
      url: 'api/department/getListEmployee',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 根据经纪人部门id获取辖区信息
   * @param {*} data
   */
  async getListDepartScope(data) {
    let params = {
      url: 'api/department/getListDepartScope',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 员工信息维护录入
   * @param {*} data
   */
  async addAgent(data) {
    let params = {
      url: 'api/department/addAgent',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 新增品类质量指标
   * @param {*} data
   */
  async addGrainQuality(data) {
    let params = {
      url: 'api/grain/addGrainQuality',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取新增品类质量指标详情
   * @param {*} data
   */
  async getGrainQualityByType(data) {
    let params = {
      url: 'api/grain/getGrainQualityByType',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 交收申请查询
   * @param {*} data
   */
  async getSettlementList(data) {
    let params = {
      url: 'api/settlement/getSettlementList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 交收信息跟踪查询
   * @param {*} data
   */
  async getSettlementTrackList(data) {
    let params = {
      url: 'api/settlement/getSettlementTrackList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 车辆信息跟踪列表
   * @param {*} data
   */
  async getCarTrackList(data) {
    let params = {
      url: 'api/settlement/getCarTrackList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   *
   * @param {*} data
   */
  async queryDeparmentManager(data) {
    let params = {
      url: 'api/department/queryDeparmentManager',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
  }


 /**
   *
   * 物流模块接口
   */

//物流司机管理列表
async getListDriver(data) {
    let params = {
      url: 'api/logistics/customer/listDriver',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
}

//物流司机管理详情
async getListDriverDetail(data) {
    let params = {
      url: 'api/logistics/customer/detail',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
}

//物流司机管理修改密码

async updateDriverPassword(data) {
    let params = {
      url: 'api/logistics/customer/updatePassword',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
}


//物流司机管理审核冻结

async logisticsVerify(data) {
    let params = {
      url: 'api/logistics/customer/verify',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
}


//发货用户管理
async logisticsDriverUser(data) {
    let params = {
      url: 'api/logistics/customer/listDriverUser',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
}

// 司机用户数据信息列表
async listDriverDetail(data) {
    let params = {
      url: 'api/logistics/customer/listDriverDetail',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
}


/**
 * 物流系统订单
 * @author Administrator
 *
 */
/**
	 * 查询订单列表
	 */
async getLogisticsOrderList(data) {
    let params = {
      url: 'api/logistics/order/list',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
}

//详情
async getLogisticsOrderDetail(data) {
    let params = {
      url: 'api/logistics/order/detail',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
}


//根据司机订单id获取经纬度
async getCarTrajectory(data) {
    let params = {
      url: 'api/logistics/order/carTrajectory',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
}




/**
 * 物流系统设置接口
 *
 * @author Administrator
 */

//查询物流系统配置表
async getListConfig(data) {
    let params = {
      url: 'api/logistics/system/listConfig',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
}

//修改配置参数
async updateConfig(data) {
    let params = {
      url: 'api/logistics/system/updateConfig',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
}

/**
 * 物流系统消息板块
 * @author Administrator
 *
 */
//获取当前所有的消息推送模板
async pushMessageList(data) {
    let params = {
      url: 'api/logistics/message/push',
      method: 'Get',
      data
    }
    let res = await this.ajax(params)
    return res
}


//添加推送
async addPush(data) {
    let params = {
      url: 'api/logistics/message/addPush',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
}


//删除推送消息
async delPush(data) {
    let params = {
      url: 'api/logistics/message/delPush',
      method: 'DELETE',
      data
    }
    let res = await this.ajax(params)
    return res
}
//修改推送消息
async updatePush(data) {
    let params = {
      url: 'api/logistics/message/updatePush',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
}

//发布消息
async publishMessage(data) {
    let params = {
      url: 'api/logistics/message/push',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
}

// 经纪人服务管理
async getMoneyDetailList(data) {
  let params = {
    url: 'api/money/getMoneyDetailList',
    method: 'Get',
    data
  }
  let res = await this.ajax(params)
  return res
}
// 获取发票信息
async getInvoiceInfo(data) {
  let params = {
    url: 'api/money/getInvoiceInfo',
    method: 'Get',
    data: {
      orderUserID: data
    }
  }
  let res = await this.ajax(params)
  return res
}
// 上传发票
async ocInvoice(data) {
  let params = {
    url: 'api/money/ocInvoice',
    method: 'Post',
    data
  }
  let res = await this.ajax(params)
  return res
}

// 更新员工信息
async updateAgentInfo(data) {
  let params = {
    url: 'api/department/updateAgentInfo',
    method: 'Post',
    data
  }
  let res = await this.ajax(params)
  return res
}
// 冻结员工信息
async freezeAgent(data) {
  let params = {
    url: 'api/department/freezeAgent',
    method: 'Post',
    data
  }
  let res = await this.ajax(params)
  return res
}



  /**
 * 仓单审核通过
 * @param {*} data
 */
  async agreeDepotOrder(data) {
    let params = {
      url: 'api/depotOrder/listDepotOrder/agreeDepotOrder',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 仓单审核驳回
   * @param {*} data
   */
  async rejectDepotOrder(data) {
    let params = {
      url: 'api/depotOrder/listDepotOrder/rejectDepotOrder',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   * 获取仓单详情
   * @param {*} data
   */
  async getDepotOrderDetail(data) {
    let params = {
      url: 'api/depotOrder/listDepotOrder/getDepotOrderDetailView',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }
  /**
   *
   * @param {*} data
   */
  async updatePwd(data) {
    let params = {
      url: 'api/user/updatePwd',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }


  /*--------------------- 运营管理---------------------*/


    /**
     * 获取列表
     * @param {*} data
     */
  async getFeedbackList(data) {
    let params = {
      url: 'api/operations/getFeedbackList',
      method: 'GET',
      data
    }
    let res = await this.ajax(params)
    return res
  }


 /**
     * 回复反馈
     * @param {*} data
     */

  async replyFeedback(data) {
    let params = {
      url: 'api/operations/replyFeedback',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }

 /**
     * 轮播图管理
     * @param {*} data
     */

    async getBannerList(data) {
      let params = {
        url: '/api/operations/getBannerList',
        method: 'GET',
        data
      }
      let res = await this.ajax(params)
      return res
    }

 /**
     * 新增修改轮播图
     * @param {*} data
     */
    async addBanner(data) {
      let params = {
        url: '/api/operations/addBanner',
        method: 'POST',
        data
      }
      let res = await this.ajax(params)
      return res
    }

/**
     * 删除轮播图
     * @param {*} data
     */

  async delBanner(data) {
    let params = {
      url: '/api/operations/delBanner',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }


/**
     * 获取轮播图中的资讯
     * @param {*} data
     */

  async backBanner(data) {
    let params = {
      url: '/api/operations/backBanner',
      method: 'POST',
      data
    }
    let res = await this.ajax(params)
    return res
  }

/**
     * 轮播图发布
     * @param {*} data  getBannerArticleList
     */

  async getBannerArticleList() {
    let params = {
      url: '/api/operations/getBannerArticleList',
      method: 'GET',
    }
    let res = await this.ajax(params)
    return res
  }

/**
   * 资讯管理列表
   * @param {*} data
   */

async getArticleList(data) {
   let params = {
     url: '/api/operations/getArticleList',
     method: 'GET',
     data
   }
   let res = await this.ajax(params)
   return res
 }

/**
   * 新增 /修改 资讯
   * @param {*} data
   */
async addArticle(data) {
   let params = {
     url: '/api/operations/addArticle',
     method: 'POST',
     data
   }
   let res = await this.ajax(params)
   return res
 }

/**
    * 撤销资讯发布
    * @param {*} data
    */
  async backArticle(data) {
     let params = {
       url: '/api/operations/backArticle',
       method: 'POST',
       data
     }
     let res = await this.ajax(params)
     return res
   }
/**
      * 删除资讯
      * @param {*} data
      */

   async delArticle(data) {
      let params = {
        url: '/api/operations/delArticle',
        method: 'POST',
        data
      }
      let res = await this.ajax(params)
      return res
    }


/**
      * 置顶和取消置顶
      * @param {*} data
      */

    async articleTop(data) {
       let params = {
         url: '/api/operations/articleTop',
         method: 'POST',
         data
       }
       let res = await this.ajax(params)
       return res
     }
     // 车辆管理-列表
      async listCarDetail(data) {
        let params = {
          url: 'api/logistics/customer/listCarDetail',
          method: 'GET',
          data
        }
        let res = await this.ajax(params)
        return res
      }
      //车辆管理-列表-同意
      async agreeCarDetail(data) {
        let params = {
          url: 'api/logistics/customer/agreeCarDetail',
          method: 'POST',
          data
        }
        let res = await this.ajax(params)
        return res
      }
      //车辆管理-列表-拒绝
      async noPassCarDetail(data) {
        let params = {
          url: 'api/logistics/customer/noPassCarDetail',
          method: 'POST',
          data
        }
        let res = await this.ajax(params)
        return res
      }
      //车辆信息
      async listDriverCarDetail(data) {
        let params = {
          url: 'api/logistics/customer/listDriverCarDetail',
          method: 'GET',
          data
        }
        let res = await this.ajax(params)
        return res
      }
      //车辆信息
      async driverOrderList(data) {
        let params = {
          url: 'api/logistics/order/driverOrderList',
          method: 'GET',
          data
        }
        let res = await this.ajax(params)
        return res
      }
      // 导入excel
      async exportListDriver(data) {
        let params = {
          url: 'api/export/exportListDriver',
          method: 'POST',
          data: data
        }
        let res = await this.exportExcel(params)
        return res
      }

      async exportListDriverDetail(data) {
        let params = {
          url: 'api/export/exportListDriverDetail',
          method: 'POST',
          data: data
        }
        let res = await this.exportExcel(params)
        return res
      }

      async exportListDriverUser(data) {
        let params = {
          url: 'api/export/exportListDriverUser',
          method: 'POST',
          data: data
        }
        let res = await this.exportExcel(params)
        return res
      }

      async exportOrderAndDriverList(data) {
        let params = {
          url: 'api/export/exportOrderAndDriverList',
          method: 'POST',
          data: data
        }
        let res = await this.exportExcel(params)
        return res
      }

}






export default new Http()
