const Promise = require('es6-promise').Promise

function wxPromisify (fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res.data)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}
// 无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  )
}
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
*/
function getRequest (url, token) {
  let getRequest = wxPromisify(wx.request)
  if (token) {
    return getRequest({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'token': token
      }
    })
  } else {
    return getRequest({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }
    })
  }
}
/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
*/
function postRequest (url, data, token) {
  let postRequest = wxPromisify(wx.request)
  if (token) {
    return postRequest({
      url: url,
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json',
        'token': token
      }
    })
  } else {
    return postRequest({
      url: url,
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json'
      }
    })
  }
}
module.exports = {
  postRequest: postRequest,
  getRequest: getRequest
}
