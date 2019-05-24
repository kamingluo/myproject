let util = require('../../utils/kaming.js')
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;

Page({
  data: {
     xmad: {
      adData: {},
      ad: {
        banner1: "xmf15c65a233fd71db0c7d25e2a20833",//程序员黄历
        banner2: "xm285e32d8abf77e8ba321f97005d8f2",//大转盘
        banner3: "xm0d344d5e30fb21415823158b85fddb",//首页
        banner4: "xm4b6fd7c45bfc80a4e057693272702b",//猜拳banner
        banner: "xm68259e5bc52f94b364e86e1ee8aaaa",//banner
        insert: "",//chaping
        fixed: "xm7c761a478bdca40e6a5031bf526a9f" //xuanfu
      },
    },
  },
  //事件处理函数
  submitForm: function (e) {
    console.log(e.detail.formId)
    var formid = e.detail.formId;//开发工具里调试的时候显示的是the formId is a mock one，要到真机才能看到formid的值
    wx.request({
      url: 'https://www.luojiaming.top/box/temmsg/msglittle.php',//服务器地址
      data: {
        formid: formid,
        openid: wx.getStorageSync("openid"),
      },
      header: {
        "Content-type": "application/json",
      },
      success: function (res) {
      },
      fail: function (err) {
      }
    })

  },
getUserInfo: function (e) {
  console.log(e)
  util.zhuce()
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
})
