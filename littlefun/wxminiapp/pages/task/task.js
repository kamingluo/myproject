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
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   success: res => {
    //     console.log("withShareTicket",res)
    //   }
    // })
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


  //点击广点通广告
  gdtbannerclick:function(){
    console.log("点击广点通广告")

  },

  buttonshare:function(){
    console.log("点击下面分享按钮")
  },





  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log("分享掉起", options)
    if (options.from == 'button') {
      return share(1);
    } else {
      return share(2);
    }

  }
})