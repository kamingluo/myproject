//app.js
const common = require('./utils/common.js') //公共函数
const { request } = require('./utils/request.js')//公共请求方法
App({
  globalData: {
    //一定要，删除报错
  },
  onLaunch: function (e) {
    console.log("onLaunch打印信息", e)
    common.register(e) //用户注册
    
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  // onShow(options) {
  //   wx.login({
  //     success: function (res) {
  //       request({
  //         service: '/user/obtainopenid',
  //         data: {
  //           code: res.code,
  //         },
  //         success: res => {
  //           wx.aldstat.sendOpenid(res.openid)
  //         },
  //         fail: res => {
  //           console.log("小程序启动onshow拿到的openid错误信息", res)
  //         },
  //       })
  //     }
  //   })
  // },

})