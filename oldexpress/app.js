//app.js
const ald = require('./utils/ald-stat.js')//接入阿拉丁统计
const common = require('./utils/common.js') //公共函数
const {request} = require('./utils/request.js')//公共请求方法
var App = require('./utils/xmadx_sdk.min.js').xmad(App, 'App').xmApp;//小盟广告
const wlad = require('./utils/wlad_sdk.min.js'); //微量小程序联盟
App({
  globalData: {
    //一定要，删除报错
  },
  onLaunch: function(e) {
    console.log("onLaunch打印信息", e)
    var channel = e.query.channel || 0
    var master_id = e.query.master_id || 0
    var scene = e.scene || 0
    common.register(channel, master_id, scene) //用户注册
    common.xmadconfig()//获取小盟广告配置
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
  onShow(options){
    wx.login({
      success : function(res){
      request({
        service: '/user/obtainopenid',
        data: {
          code: res.code, 
        },
        success: res => {
          wx.aldstat.sendOpenid(res.openid)
        },
         fail: res => {
          console.log("小程序启动onshow拿到的openid错误信息",res)
        },
      })
      }
    })
  },

})