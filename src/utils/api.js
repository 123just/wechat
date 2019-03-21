import requestAll from './request'
const apiUrl = 'http://139.199.88.87:9001/'

class api {
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
}
export default {
  api: api
}
