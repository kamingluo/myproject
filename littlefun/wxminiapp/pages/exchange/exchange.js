// pages/exchange/exchange.js

const app = getApp()
const {
  request
} = require('./../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist1: [],
    goodslist2: [],
    coin: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.goodsdata()
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
    this.userdata()

  },


  //获取用户信息
  userdata: function () {
    wx.login({
      success: res => {
        request({
          service: 'user/userdata',
          data: {
            code: res.code,
          },
          success: res => {
            console.log('获取用户信息', res);
            this.setData({
              coin: res.userdata.score,
            })
            wx.setStorageSync('userdata', res.userdata)
          },
        })
      }
    })
  },


  goodsdata: function() {
    request({
      service: 'exchange/goodslist',
      method: 'GET',
      success: res => {
        console.log('兑换商品列表', res);
        this.setData({
          goodslist1: res.goodslist1,
          goodslist2: res.goodslist2,
        })
      }
    })

  },

  clickgoods: function(e) {
    var that =this
    console.log(e.currentTarget.dataset.goodsdata)
    if (that.data.coin < e.currentTarget.dataset.goodsdata.goodsPrice ){
      wx.showToast({
        title: "金币不足，快去赚金币吧！",
        icon: 'none',
        duration: 3000
      })
      return;
    }

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