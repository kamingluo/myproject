
const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');

Page({

  data: {
    userdata:'',

  },

  onLoad: function (options) {
    

  },

  onShow: function () {
    this.userdata()

  },

 //获取用户信息
  userdata:function(){
    wx.login({
      success: res => {
        request({
          service: 'user/userdata',
          data: {
            code: res.code,
          },
          success: res => {
           // console.log('我的页面获取用户信息', res);
            this.setData({
              userdata: res.userdata,
            })
            wx.setStorageSync('userdata', res.userdata)
          },
          fail: res => {
            //console.log('错误捕捉', res);
          },
        })
      }
    })

  },

  exchange:function(){
    wx.navigateTo({
      url: '/pages/exchange/exchange'
    })

  },


  userscorerecord:function(){
    wx.navigateTo({
      url: '/pages/my/score_detailed/score_detailed'
    })
  },

  userchangelist:function(){
    wx.navigateTo({
      url: '/pages/my/exchange_detailed/exchange_detailed'
    })

  },

  gdtbanneradclick: function (e) {
    //console.log("点击广点通banner广告", e.currentTarget)
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('我的页面点击广点通banner广告', data);
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})