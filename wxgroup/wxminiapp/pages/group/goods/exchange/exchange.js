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
    goods_id:null,
    goodsdata:null

  },

  onLoad: function (options) {
    console.log(options.goods_id)
    this.setData({
      goods_id: options.goods_id,
    })

  },

  onShow: function () {
    this.address()
    this.goodsdata()
  },

  address:function(){
    var user_id = wx.getStorageSync('userdata').id
    request({
      service: 'user/useraddress',
      method: 'GET',
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

  goodsdata:function(){
    let goods_id = this.data.goods_id
    request({
      service: 'group/groupgoods/goodsdetails',
      method: 'GET',
      data: {
        goods_id: goods_id,
      },
      success: res => {
        console.log(res)
        this.setData({
          goodsdata: res.data,
        })
      },
    })
  },


})