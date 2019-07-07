// pages/friends/friends.js

const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
const scoreOperation = require('./../../utils/score.js');
var Page = require('../../utils/sdk/xmad/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendsdata: "",
    scoresum: 0,
    display: false, //是否展示
    xmad: { //小盟广告
      adData: {},
      ad: {
        banner1: "xma416450d58bf78f56f0b54c487624b",
        banner2: "xm68259e5bc52f94b364e86e1ee8aaaa",
        banner3: "xm285e32d8abf77e8ba321f97005d8f2",
      },
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.friendsdata()
    this.display()

  },




  friendsdata: function() {
    var userid = wx.getStorageSync('userdata').id || 0
    request({
      service: 'friends/friendslist',
      data: {
        userid: userid
      },
      success: res => {
        console.log('获取徒弟信息', res);
        this.setData({
          friendsdata: res.miniappdata,
          scoresum: res.scoresum,

        })
      },
    })
  },


  qrcode: function () {
    wx.navigateTo({
      url: '/pages/my/qrcode/qrcode'
    })

  },

  gdtbanneradclick: function (e) {
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('好友页面点击banner广告', data);
  },


  display: function () {
    this.setData({
      display: app.globalData.display || false
    })
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
  onShareAppMessage: function(options) {
    if (app.globalData.display){
      let userdata = wx.getStorageSync('userdata')
      app.aldstat.sendEvent('点击好友页面分享', userdata);
      if (options.from == 'button') {
        return share(1);
      } else {
        return share(2);
      }

    }
    else{
      return;
    }

   


  }




})