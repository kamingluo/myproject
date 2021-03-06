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
    this.autoUpdate()
    console.log("onLaunch打印信息", e)
    wx.aldstat.sendEvent('入口值统计', e.query);
    var channel = e.query.channel || 0
    var master_id = e.query.master_id || 0
    var scene = e.scene || 0
    common.register(channel, master_id, scene) //用户注册
    common.xmadconfig()//获取小盟广告配置
    wx.setStorageSync('gdtinsertstatus', 0)//先把插屏状态置为0
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



  autoUpdate: function () {
    var self = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否启用新版本？',
            success: function (res) {
              if (res.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                self.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本访问可能存在问题哦~',
                  showCancel: false,//隐藏取消按钮
                  confirmText: "确定更新",//只保留确定更新按钮
                  success: function (res) {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      self.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate: function (updateManager) {
    var self = this
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  }






})