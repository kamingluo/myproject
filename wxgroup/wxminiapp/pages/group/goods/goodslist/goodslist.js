// pages/exchange/exchange.js

const app = getApp()
const {
  request
} = require('./../../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    crowd_id:null,
    goodslist:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      crowd_id: 5
    })
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
    //this.userdata()

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
            //console.log('获取用户信息', res);
            this.setData({
              coin: res.userdata.score,
            })
            wx.setStorageSync('userdata', res.userdata)
          },
        })
      }
    })
  },


  goodsdata: function () {
    var crowd_id = this.data.crowd_id
    request({
      service: 'group/groupgoods/goodslist',
      method: 'GET',
      data: {
        crowd_id: crowd_id
      },
      success: res => {
        console.log('兑换商品列表', res);
        this.setData({
          goodslist: res.data
        })
       
      }
    })

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})