// pages/test/test.js


const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');

const scoreOperation = require('./../../utils/score.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  increaseScore: function() {
    scoreOperation.increase(80, "积分增加测试")

  },

  reduceScore: function () {
    scoreOperation.reduce(80, "积分减少测试")

  },


  havecode:function(){
       wx.login({
      success: function (res) {
        console.log("用户code：：：：：：",res.code)
      }
       })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  onShareAppMessage: function() {

  }
})