var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
let util = require('../../utils/kaming.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xmad: {
      adData: {},

      ad: {
        banner: "xm0d344d5e30fb21415823158b85fddb", //banner
        banner1: "xma416450d58bf78f56f0b54c487624b", //ceshi
        banner2: "xm285e32d8abf77e8ba321f97005d8f2", //大转盘
        banner3: "xm68259e5bc52f94b364e86e1ee8aaaa", //我的页面
        banner4: "xm4b6fd7c45bfc80a4e057693272702b", //猜拳banner
      },
    },

     wlad: {
        adData: {},
        ad: {
            banner: ["banner"],   //是否展示banner⼴广告，如不不需展示删掉该字段即可
            insert: "insert",     //是否展示插屏⼴广告，如不不需展示删掉该字段即可
            ﬁxed: "ﬁxed"        //是否展示右下⻆角悬浮⼴广告，如不不需展示删掉该字段即可
        }
    },

  },

  Clickads: function(e) {
    var adtype
    adtype = e.currentTarget.dataset.type
    util.Adcount('合作', adtype)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("加载插屏广告")
    setTimeout(function() {　　　　
      var intersitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-087ac402f2352606'
      })

      intersitialAd.show()
        .then(() => videoAd.show())
        .catch(err => console.log(err.errMsg))

      intersitialAd.onClose(res => {
        console.log("关闭视频广告")
      })
    }, 2000);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showToast({
      title: '加载中...',
      icon: 'none',

    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})