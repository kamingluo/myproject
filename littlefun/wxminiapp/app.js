//app.js
const common = require('./utils/common.js') //公共函数
const { request } = require('./utils/request.js')//公共请求方法
const ald = require('./utils/sdk/ald/ald-stat.js') //阿拉丁统计
const wlad = require('./utils/sdk/wlad/wlad_sdk.min.js'); //微量广告
var App = require('./utils/sdk/xmad/xmadx_sdk.min.js').xmad(App, 'App').xmApp; //小盟广告
App({
  globalData: {
    //一定要，删除报错
  },
  onLaunch: function (e) {
    console.log("onLaunch打印信息", e)
    common.register(e) //用户注册
    common.xmaddata() //小盟ad配置
    this.scene(e.scene)//传入入口值判断
    
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

  scene: function(scene){
    if (scene == 1001) {
      console.log("隐藏")
      this.globalData.display = false;
    }
    else {
      console.log("显示")
      this.globalData.display = true;
    }
    if (scene == 1089 || scene == 1001 ){
      this.globalData.addapptips = false;
    }
    else{
      this.globalData.addapptips = true;
    }

  },


  onShow(options) {
    wx.login({
      success: function (res) {
        request({
          service: 'user/obtainopenid',
          data: {
            code: res.code,
          },
          success: res => {
            wx.aldstat.sendOpenid(res.openid) //阿拉丁统计需要
          },
          fail: res => {
            console.log("小程序启动onshow拿到的openid错误信息", res)
          },
        })
      }
    })
  },

})