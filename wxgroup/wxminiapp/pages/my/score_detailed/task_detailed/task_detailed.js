const {
  request
} = require('./../../../../utils/request.js');
const app = getApp();
Page({
  data: {
    num: 1,
    minusStatus: '',
    taskerrtext: "其他",
    crowd_id: 0,
    crowd_name: null,
    taskdata: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log("任务操作页面",options)
    // this.setData({
    //   crowd_id: options.crowd_id,
    //   crowd_name: options.crowd_name
    // })
    this.havetaskdata()
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
   * 拿任务数据
   */
  havetaskdata: function () {
    var that = this
    var crowd_id = that.data.crowd_id
    request({
      service: 'task/handletask/querytaskdetails',
      method: 'GET',
      data: {
        id: 30943
      },
      success: res => {
        console.log("这是id拿到的任务数据啊",res)
        that.setData({
          taskdata: res,
        })
      },
    })
  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})