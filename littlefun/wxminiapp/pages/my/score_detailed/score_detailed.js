
const {
  request
} = require('./../../../utils/request.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userscorerecord: [],  //信息流数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
        request({
          service: 'score/userscorerecord',
          data: {
            code: res.code,
          },
          success: res => {
            console.log('用户积分', res);
            this.setData({
              userscorerecord: res.userscorerecord,
            })
          },
        })
      }
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let userchannel = wx.getStorageSync("userchannel")
    let userid = wx.getStorageSync("userid")
    let shareimg = wx.getStorageSync("shareimg")
    let sharetitle = wx.getStorageSync("sharetitle")
    return {
      title: sharetitle,
      desc: '点点好玩',
      imageUrl: shareimg,
      path: '/pages/index/index?channel=' + userchannel + '&id=' + userid, // 路径，传递参数到指定页面。
    }
    
  }
})