var app = getApp();
const {
  request
} = require('./request.js')
const baseConfig = require('./config.js')

function register(e) {
  var channel = e.query.channel || 0
  var master_id = e.query.master_id || 0
  var scene = e.scene
  wx.login({
    success: res => {
      request({
        service: 'user/register',
        data: {
          code: res.code,
          channel: channel,
          master_id: master_id,
          scene: scene
        },
        success: res => {
         // console.log('注册成功', res);
          wx.setStorageSync('userdata', res.userdata)
        },
        fail: res => {
          console.log('错误捕捉', res);
        },
        complete: res => {
          // console.log('成功不成功都执行函数', res);
        },
      })
    }
  })
}





module.exports = {
  register: register,
}