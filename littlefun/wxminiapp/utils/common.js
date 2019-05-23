var app = getApp();
const {
  request
} = require('./request.js')
import { http } from './http.js'
const baseConfig = require('./config.js')


function register(e) {
  console.log('传过来的注册信息',e);
  var channel = e.query.channel || 0
  var master_id = e.query.master_id || 0
  var scene = e.scene
  wx.login({
    success: res => {

      http({
        url: '/user/register',
        data: {
          code: res.code,
          channel: channel,
          master_id: master_id,
          scene: scene
        }
       
      })
      .then(data=>{
        console.log(data)
      })
     
    }
  })
}



















function register2(channel, master_id, scene) {
  //console.log('传过来的注册信息', channel, master_id);
  wx.login({
    success: res => {
      request({
        service: '/user/register',
        data: {
          code: res.code,
          channel: channel,
          master_id: master_id,
          scene: scene
        },
        success: res => {
          wx.setStorageSync('userdata', res.userdata)
        },
         fail: res => {
            // console.log('错误捕捉', res);
        },
           complete: res => {
            // console.log('成功不成功都执行函数', res);
        },
      })
    }
  })
}

function xmadconfig(){
  request({
    service: '/ad/xmad',
    data: {},
    success: res => {
      // console.log("小盟广告配置",res)
      wx.setStorageSync('xmadconfig', res.xmaddata)
    },
  })

}


module.exports = {
  register: register,
  xmadconfig: xmadconfig,
}