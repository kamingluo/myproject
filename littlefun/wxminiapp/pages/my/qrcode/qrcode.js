

const app = getApp()
const {
  request
} = require('./../../../utils/request.js');
const {
  share
} = require('./../../../utils/share.js');
var Page = require('../../../utils/sdk/xmad/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告


Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myqrcode()
    
  },

  myqrcode:function(){
    let userid = wx.getStorageSync('userdata').id
    // if (userid==null){
    //   // wx.showToast({
    //   //   title: "生成失败",
    //   //   icon: 'none'
    //   // })
    //   return ;
    // }
    request({
      service: 'currency/getqrcode',
      data: {
        userid: userid,
      },
      success: res => {
        console.log('生成二维码成功', res);
        // this.setData({
        //   exchangelist: res.exchangelist,
        //   loadModal: false,
        // })
      },
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
    
  }
})