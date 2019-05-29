
const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');

Page({

  data: {
    userdata:'',

  },

  onLoad: function (options) {
    

  },

  onShow: function () {
    this.userdata()

  },

 //获取用户信息
  userdata:function(){
    wx.login({
      success: res => {
        request({
          service: 'user/userdata',
          data: {
            code: res.code,
          },
          success: res => {
            console.log('我的页面获取用户信息', res);
            this.setData({
              userdata: res.userdata,
            })
          },
          fail: res => {
            console.log('错误捕捉', res);
          },
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