//app.js
const common = require('./utils/common.js') //公共函数

App({
  onLaunch: function(e) {
    console.log("onLaunch打印信息", e)
    common.register(e) //用户注册

    // wx.login({
    //   success: res => {

    //   console.log(res)

    //   }
    // })


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
  globalData: {
    userInfo: null
  }
})