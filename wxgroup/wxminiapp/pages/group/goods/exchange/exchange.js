// pages/group/goods/exchange/exchange.js

const app = getApp()
const {
  request
} = require('./../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useraddress:null,

  },

  onLoad: function (options) {
    console.log(options.goods_id)

  },

  onShow: function () {
    this.address()
  },

  address:function(){
    var user_id = wx.getStorageSync('userdata').id
    request({
      service: 'user/useraddress',
      data: {
        user_id: user_id,
      },
      success: res => {
        this.setData({
          useraddress: res.addressdata,
        })
      },
    })

  },


  modifyaddress:function(){
    wx.navigateTo({
      url: '/pages/my/my_address/my_address'
    })
  },


})