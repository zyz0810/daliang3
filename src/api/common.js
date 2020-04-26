import Request from '@/utils/axios'
class Common extends Request {
  /**
       * 登录
       * @param {*} data
       */
  async login(data) {
    const params = {
      url: 'api/login',
      method: 'POST',
      data
    }
    const res = await this.ajax(params, 1)
    return res
  }
  /**
     * 获取权限菜单列表表
     * @param {*} data
     */
  async getRouterRole() {
    const params = {
      url: 'api/functions',
      method: 'GET'
    }
    const res = await this.ajax(params)
    return res
  }
}
export default new Common()
