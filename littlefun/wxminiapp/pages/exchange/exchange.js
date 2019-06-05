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
    goodsdata:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goodsdata()

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


  goodsdata: function () {
    request({
      service: 'exchange/goodslist',
      method: 'GET',
      success: res => {
        console.log('兑换商品列表', res.goodslist);
        let scene = wx.getStorageSync('userdata').scene
        if (scene==1001){
          console.log('屏蔽');
        }
        else{
          console.log('不屏蔽');
        }

        // this.setData({
        //   goodsdata: res.miniappdata
        // })
      }
    })

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

  }
})