
let util = require('../../utils/util.js');
let utils = require('../../utils/kaming.js');
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;

Page({




  /**
   * 页面的初始数据
   */
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


  kefuzhongxin:function(){
    wx.navigateTo({
      url: '../kefu/kefu'
    })
  },
  zhuzhuxia: function () {
    wx.reportAnalytics('zhuzhuxiahutui', {
      mignzi: 'zhuzhuxia',
    });
    wx.navigateToMiniProgram({
      appId: 'wxb137dfcdf7bfc9e0',
      path: 'pages/index/index?ald_media_id=2976&ald_link_key=fc502ea677091c2d&ald_position_id=0',
      extraData: {
        
      },
      success(res) {
      }
    })
  },

  duihuanliebiao: function () {
    wx.navigateTo({
      url: '../goods/goods'
    })
  },

  hezuo: function () {
    wx.navigateTo({
      url: '../hezuo/hezuo'
    })
  },

  testclick:function(){
    wx.navigateTo({
      url: '../test/test'
    })
  },

  qiandao: function () {
    wx.navigateTo({
      url: '../qiandao/qiandao'
    })
  },
  Clickads: function (e) {
    var adtype
    adtype = e.currentTarget.dataset.type
    utils.Adcount('我的页面', adtype)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
    console.log(time)

    this.setData({ isAd: true })

    wx.showShareMenu({
      withShareTicket: true
    })

    console.log("加载插屏广告")
    setTimeout(function () {
      var intersitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-ec4de366da0738ae'
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
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },


  Adhide: function () {
    this.setData({ isAd: false })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '这里玩游戏还能拿好礼，还等什么，快来吧！',
      path: '/pages/home/home'
    }
    
  }
})