import requestAll from './request'
const apiUrl = 'http://192.168.43.60:9001/'

class api {
  login (code) {
    return requestAll.getRequest(apiUrl + '/login/check_code/' + code)
  }
  register (userInfo, token) {
    return requestAll.postRequest(apiUrl + '/login/register', userInfo, token)
  }
  sign (token) {
    let data = {}
    return requestAll.postRequest(apiUrl + '/api/user/sign', data, token)
  }
  signStatus (token) {
    return requestAll.getRequest(apiUrl + '/api/user/sign/status', token)
  }
  returnUmbrella (data, token) {
    return requestAll.postRequest(apiUrl + '/api/borrow/return', data, token)
  }
  repairUmbrella (data, token) {
    return requestAll.postRequest(apiUrl + '/api/borrow/repair', data, token)
  }
  // 志愿者获取自己负责的未还伞记录
  borrowExpire (pageNum, pageSize, token) {
    return requestAll.getRequest(apiUrl + '/api/borrow/expire/' + pageNum + '/' + pageSize, token)
  }
  // 志愿者获取自己负责的所有借还伞记录
  borrowHistory (pageNum, pageSize, token) {
    return requestAll.getRequest(apiUrl + '/api/borrow/' + pageNum + '/' + pageSize, token)
  }
  // 获取超时记录详细信息
  borrowDetails (id, token) {
    return requestAll.getRequest(apiUrl + '/api/borrow/borrow/' + id, token)
  }
  // 借伞接口
  borrowUmbrella (data, token) {
    return requestAll.postRequest(apiUrl + '/api/borrow/', data, token)
  }
  // 筛选个人借伞记录接口
  personBorrow (pageNum, pageSize, token) {
    return requestAll.getRequest(apiUrl + '/api/borrow/person/' + pageNum + '/' + pageSize, token)
  }
  // 学院信息
  academyAll (token) {
    return requestAll.getRequest(apiUrl + '/api/class/academy/all', token)
  }
  // 班级信息
  classInfo (academyId, token) {
    return requestAll.getRequest(apiUrl + '/api/class/' + academyId, token)
  }
  // 修改用户信息
  userInfo (data, token) {
    return requestAll.postRequest(apiUrl + '/api/user/update', data, token)
  }
  // 获取用户所有签到记录
  signInfo (pageNum, pageSize, token) {
    return requestAll.getRequest(apiUrl + '/api/user/signInfo/all/' + pageNum + '/' + pageSize, token)
  }
  // 获取负责人信息
  inCharge (token) {
    return requestAll.getRequest(apiUrl + '/api/user/inCharge', token)
  }
}
export default {
  api: api
}
