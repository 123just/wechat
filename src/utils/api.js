import requestAll from './request'
const apiUrl = 'http://139.199.88.87:9001/'

class api {
  register (userInfo, token) {
    let data = {
      userInfo
    }
    return requestAll.postRequest(apiUrl + '/login/register', data, token)
  }
  sign (token) {
    let data = {}
    return requestAll.postRequest(apiUrl + '/api/user/sign', data, token)
  }
}
export default {
  api: api
}
