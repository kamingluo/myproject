
const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
var Page = require('../../utils/sdk/xmad/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告

Page({

  data: {
    userdata:'',
    birthday:null,
    xmad: {//小盟广告
      adData: {},
      ad: {
        banner3: "xm285e32d8abf77e8ba321f97005d8f2",
        banner4: "xm4b6fd7c45bfc80a4e057693272702b",
        banner5: "xm478c5c0e15def0abcb93ccd2d57194",
      },
    },

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
            //console.log('我的页面获取用户信息', res.userdata.birthday);
            this.birthday(res.userdata.birthday)
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


  birthday:function(e){
    // console.log("11111111",e)
    if(e){
      var temp = new Date(e);
      var t = temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate(); //去除时分秒
      var format = t.replace(/-/g, '/');
      // var timestamp = Date.parse(new Date(format));
      this.setData({
        birthday: format,
      })
    }
   
  },
  exchange:function(){
    wx.navigateTo({
      url: '/pages/exchange/exchange'
    })

  },
 
  qrcode:function(){
    wx.navigateTo({
      url: '/pages/my/qrcode/qrcode'
    })

  },

  userscorerecord:function(){
    wx.navigateTo({
      url: '/pages/my/score_detailed/score_detailed'
    })
  },

  usertasklist:function(){
    wx.navigateTo({
      url: '/pages/my/score_detailed/score_detailed'
    })

  },

  testpages: function () {
    console.log("long tap")
    wx.navigateTo({
      url: '/pages/test/test'
    })

  },

  gdtbanneradclick: function (e) {
    //console.log("点击广点通banner广告", e.currentTarget)
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('我的页面点击广点通banner广告', data);
  },

  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    wx.login({
      success: res => {
        request({
          service: 'user/userbirthday',
          data: {
            code: res.code,
            birthday: e.detail.value
          },
          success: res => {
            wx.showToast({
              title: '设置成功',
              icon: 'none',
              duration: 2000,
            })
             this.birthday(e.detail.value)
            // this.setData({
            //   birthday: e.detail.value
            // })
          },
        })
      }
    })

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
   
  }
})