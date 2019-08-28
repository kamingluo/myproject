const {
  request
} = require('./../../../utils/request.js');
const app = getApp();
Page({
  data: {
    num: 1,
    minusStatus: '',
    tasksuccessmodel: false,
    taskerrreasonmodel: false,
    taskerrtext: "其他",
    crowd_id: 0,
    crowd_name: null,
    taskdata: null,
    loadModal: false,
    tankuang:false,
    taskimageurl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log("任务操作页面",options)
    this.setData({
      crowd_id: options.crowd_id,
      crowd_name: options.crowd_name
    })
    this.havetaskdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 拿任务数据
   */
  havetaskdata: function() {
    var that = this
    var crowd_id = that.data.crowd_id
    request({
      service: 'task/handletask/taskdetails',
      method: 'GET',
      data: {
        crowd_id: crowd_id
      },
      success: res => {
        //console.log("这是拿到的任务数据啊",res)
        that.setData({
          taskdata: res,
          loadModal: false,
          tankuang: false,
        })
      },
    })
  },

  /**
   * 点击任务合格按钮
   */
  tasksuccess: function() {
    this.setData({
      tasksuccessmodel: true
    })
  },

  /**
   * 点击任务不合格按钮
   */
  taskerr: function() {
    this.setData({
      taskerrreasonmodel: true
    })
  },

  hidetasksuccessmodal: function() {
    this.setData({
      tasksuccessmodel: false
    })
  },

  hidetaskerrmodal: function() {
    this.setData({
      taskerrreasonmodel: false
    })
  },

  closetankuang:function(){
    this.setData({
      tankuang: false
    })
  },

  //任务合格确定
  tasksuccesssure: function() {
    this.hidetasksuccessmodal()
    this.setData({
      loadModal: true
    })
    var that = this
    var crowd_id = that.data.crowd_id //群id
    var score = this.data.num //分数
    var id = this.data.taskdata.taskdetails.id //任务id
    var user_id = this.data.taskdata.taskdetails.user_id //提交任务用户id
    request({
      service: 'task/handletask/handletask',
      data: {
        id: id,
        crowd_id: crowd_id,
        score: score,
        user_id: user_id,
        result: "任务合格",
        taskstate: 1,
      },
      success: res => {
        console.log("任务合格返回", res)
        that.audittasks()
        that.havetaskdata()
      },
    })

  },


  //任务不合格确定
  taskerrsure: function() {
    this.hidetaskerrmodal()
    this.setData({
      loadModal: true
    })
    var that = this
    var crowd_id = that.data.crowd_id //群id
    var score = this.data.num //分数
    var id = this.data.taskdata.taskdetails.id //任务id
    var user_id = this.data.taskdata.taskdetails.user_id //提交任务用户id
    var result = this.data.taskerrtext //不合格说明
    request({
      service: 'task/handletask/handletask',
      data: {
        id: id,
        crowd_id: crowd_id,
        score: score,
        user_id: user_id,
        taskstate: 2,
        result: result
      },
      success: res => {
        console.log("任务不合格返回", res)
        that.audittasks()
        that.havetaskdata()
      },
    })

  },

  audittasks:function(){
    wx.showToast({
      title: '审核完成',
      icon: 'success',
      duration: 1500,
    })

  },


  clicktaskimage:function(e){
    console.log(e.currentTarget.dataset.data)
    this.setData({
      tankuang: true,
      taskimageurl: e.currentTarget.dataset.data
    })

  },

  /*点击减号*/
  bindMinus: function() {
    var num = this.data.num;
    if (num >= 1) {
      num--;
    }
    var minusStatus = num >= 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function() {
    var num = this.data.num;
    num++;
    var minusStatus = num >= 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },


  radioChange: function(e) {
    // console.log("点击单选", e.currentTarget.dataset.data)
    this.setData({
      taskerrtext: e.currentTarget.dataset.data,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})