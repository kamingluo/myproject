const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
const scoreOperation = require('./../../utils/score.js');


Page({
  data: {
    usertodaytask:"",

  },

  onLoad: function(options) {
  },

  onReady: function() {
  },

  onShow: function() {
    this.todaytask()
  },

  onHide: function() {
  },


  //查看用户今天任务完成情况
  todaytask:function(){
    wx.login({
      success: res => {
        request({
          service: 'task/index/todaytask',
          data: {
            code: res.code,
          },
          success: res => {
            console.log('用户今日任务完成状态', res);
            this.setData({
              usertodaytask: res,
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
  onShareAppMessage: function() {

  }
})