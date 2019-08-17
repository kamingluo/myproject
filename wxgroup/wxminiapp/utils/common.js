var app = getApp();
const {
  request
} = require('./request.js')
const baseConfig = require('./config.js')

function register(e) {
  var channel = e.channel
  var scene = e.scene
  wx.login({
    success: res => {
      request({
        service: 'user/register',
        data: {
          code: res.code,
          channel: channel,
          scene: scene
        },
        success: res => {
         // console.log('注册成功', res);
          wx.setStorageSync('userdata', res.userdata)
        },
        fail: res => {
          //console.log('错误捕捉', res);
        },
        complete: res => {
          // console.log('成功不成功都执行函数', res);
        },
      })
    }
  })
}



function authorized(e) {
  var data = e
  wx.login({
    success: res => {
      data.code=res.code
      request({
        service: 'user/authorized',
        data: data,
        success: res => {
          // console.log('注册成功', res);
          wx.setStorageSync('userdata', res.userdata)
        },
        fail: res => {
          //console.log('错误捕捉', res);
        },
        complete: res => {
          // console.log('成功不成功都执行函数', res);
        },
      })
    }
  })
}

function xmaddata(){
  request({
    service: 'ad/xmad/xmadconfig',
    method: 'GET',
    success: res => {
      //console.log('小盟ad配置', res.xmaddata);
      wx.setStorageSync('xmadconfig', res.xmaddata)

    },
  })
}


function shareconfig() {
  request({
    service: 'currency/shareconfig',
    method: 'GET',
    success: res => {
      //console.log('分享配置', res.xmaddata);
      wx.setStorageSync('shareconfig', res.shareconfig)

    },
  })
}



//跳转内部页面
function insidejump (e) {
  //console.log("跳转tab页面")
  let type = e.type
  if (type == 0) {
    wx.switchTab({
      url: e.url
    })
  }
  else if (type == 1) {
    //console.log("关闭其他页面跳转")
    wx.reLaunch({
      url: e.url
    })
  }
  else {
    console.log("普通跳转",e)
    wx.navigateTo({
      url: e.url
    })
  }
}





module.exports = {
  register: register,
  authorized: authorized,
  insidejump: insidejump,
  xmaddata:xmaddata,
  shareconfig: shareconfig,
}