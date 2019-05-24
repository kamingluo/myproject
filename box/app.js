//app.js
const ald = require('./utils/ald-stat.js')
var utils = require('./utils/common/basic.js');
var App = require('./utils/ltadx/ltadx.js').ltApp;//骆驼换量
const wlad = require('./utils/wlad_sdk.min.js');//微量小程序
var App = require('./utils/xmadx_sdk.min.js').xmad(App,'App').xmApp; //小盟广告

//下面是接入听云APM性能检测工具
const monitor = require('./utils/common/tingyun-mp-agent.js');
monitor.config({
  beacon: 'https://beacon-mp.tingyun.com',
  key: '31tJdLqLqWM',
  id: 'dUFHBu91V6M',
  sampleRate: 1
})
//上面是听云APM性能检测工具

App({
  globalData: {
    userid: null,
    userchannel: null,
  },

  onLaunch: function (options) {
    console.warn("打开链接", options)
    var Invitation_channel= options.query.channel;//邀请进来的时候的时候的渠道，
    var Invitation_id = options.query.id;
    wx.setStorageSync('Invitation_channel', Invitation_channel)
    wx.setStorageSync('Invitation_id', Invitation_id)
     
    utils.peizhi()  //修改配置
    utils.Obtaintoken()  //拿token
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        utils.useropenid(code)
      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

   

  },
})