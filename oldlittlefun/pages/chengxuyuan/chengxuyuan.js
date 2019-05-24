
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
let util = require('../../utils/kaming.js')
var app = getApp()
Page({

  data: {
    xmad: {
      adData: {},
      ad: {
        banner: "xmf15c65a233fd71db0c7d25e2a20833",//banner
        insert: "",//chaping
        fixed: "" //xuanfu
      },
    },


  },




  onShareAppMessage: function () {
    return {
      title: '不求生老病死，只求程序无BUG，需求无更改',
      path: '/pages/chengxuyuan/chengxuyuan'
    }
  

  },


  ceshi:function(){
    wx.reportAnalytics('qiuqian', {
      click: 1,
      mingzi: 'luojiaming',
    });
    wx.showToast({
      title: '分享成功',
      icon: 'success',
      duration: 2000
    });
  },

  Clickads: function (e) {
    var adtype
    adtype = e.currentTarget.dataset.type
    util.Adcount('程序员老黄历', adtype)
  },



  /**
   * //AppID(小程序ID)	wxc335c3cf09a7a39c
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(this)
    wx.request({
      // url: 'http://news-at.zhihu.com/api/4/news/latest', 
      url: 'https://www.luojiaming.top/laohuangli/laohuangli001.php',
      data: {
        // 不用传参数
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        // console.log(res.data)
        that.setData({
          textdata: res.data,
        });
        console.log(res.data)
      }
    })
    
  },


  onLaunch: function (){
    wx.showShareMenu({
      withShareTicket: true
    })
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
    
  }

  /**
   * 用户点击右上角分享
   */
  
})