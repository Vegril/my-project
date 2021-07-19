import axios from 'axios'
const http = {}
const baseURL="http://192.168.180.41:8081"
const instance = axios.create({
  baseURL,
  timeout:300000,
  withCredentials: false,
  validateStatus(status) {
    switch (status) {
      case 400:
        new Error("请求出错");
        break
      case 403:
        new Error("拒绝访问");
        break
      case 404:
        new Error("请求出错");
        break
      case 500:
        new Error("服务端错误");
        break
      default:
    }
    // eslint-disable-next-line consistent-return
    return status >= 200 && status < 300
  }
})


// 响应拦截器即异常处理
instance.interceptors.response.use(
  (response) => response.data,
  (err) => {
    // eslint-disable-next-line no-empty
    if (err && err.response) {} else {
      // eslint-disable-next-line no-param-reassign
      new Error("连接服务器失败");
    }
    return Promise.reject(err.response)
  }
)

http.get = function (url, options) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, options)
      .then((response) => {
        resolve(response)
      })
      .catch((e) => {
        console.log(e)
      })
  })
}

http.post = function (url, data, options) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, options)
      .then((response) => {
        resolve(response)
      })
      .catch((e) => {
        console.log(options)
        reject(e)
      })
  })
}

export default http
