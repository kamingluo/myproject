//app.js
const ald = require('./utils/ald-stat.js');
var App = require('./utils/xmadx_sdk.min.js').xmad(App, 'App').xmApp;
var push = require('./utils/pushsdk.js');
const wlad = require('./utils/wlad_sdk.min.js'); //微量联盟
App({

  globalData: {
  
    openid: null, //直接拿整个用户信息保存


  },
  onLaunch: function (opts) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function (res) {
     // console.log('拿到code',res.code)
        if (res.code) {
          wx.request({
            url: 'https://www.luojiaming.top/php/openid.php', //接口地址
            data: { code: res.code },
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
              var openid = res.data.openid //拿到渠道号
              console.log(res.data)
              console.log(openid)
              wx.setStorageSync('openid', openid)

            }
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
       }
         
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: function(res){
        if (!res.authSetting['scope.userInfo']) {     // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('授权不成功，跳转授权页面')
          wx.showToast({
            title: '加载中...',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {  //加入延迟执行代码，避免页面未渲染完成就跳转导致报错
            //要延时执行的代码
            wx.reLaunch({
              url: '/pages/shouquan/shouquan',
            })
          }, 1000) //延迟时间 这里是1秒

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        }
        else{
          console.log('授权成功')
          wx.reLaunch({
            url: '/pages/home/home',
          })

        }
      }
    })
  }
})