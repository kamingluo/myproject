//index.js
//获取应用实例
const app = getApp()
const {
  request
} = require('./../../utils/request.js');

Page({
  data: {
    usercar:[],
    cardCur: 0,
    swiperList: [{
      id: 2,
      type: 'image',
      url: 'http://qiniu.luojiaming.vip/carimagebanner.jpg'
    }, ],
  },

  onLoad: function () {
  },
  onShow:function(){
    this.cardata()
  },


  //查询违章信息跳转
  query: function() {
    wx.navigateTo({
      url: '../carViolation/carViolation'
    })
  },
  //添加车辆
  addcar:function(){
    wx.navigateTo({
      url: '../queryviolation/queryviolation'
    })
  },
 
 //查询用户车辆信息
  cardata:function(){
    wx.login({
      success: res => {
        request({
          service: '/car/usercar',
          showToast: true,
          data: {
            code: res.code,
          },
          success: res => {
            console.log('打印车辆信息', res);
            this.setData({
              usercar: res.usercar
            })
          },
        })
      }
    })
 },

  
})
