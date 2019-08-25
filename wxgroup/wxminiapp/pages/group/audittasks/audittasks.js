Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    minusStatus: '',
    tasksuccessmodel:false,
    taskerrreasonmodel:false,
    taskerrtext:"其他",
    testdata:{
    "state": "200",
    "message": "查询群任务成功",
    "taskdetails": {
      "id": 30917,
      "openid": "o3XMA0enuFRZsOCOCeqjB70exjr4",
      "user_id": 8,
      "channel": 0,
      "score": 0,
      "explain": "这是任务说明",
      "crowd_id": 7,
      "crowd_name": "群名称",
      "nickName": "kaming",
      "avatarUrl": null,
      "state": 0,
      "result": null,
      "create_time": "2019-08-21 16:23:29",
      "images": [
        "https://groupqiniu.luojiaming.vip/test.jpg",
        "https://groupqiniu.luojiaming.vip/adf01127b3d8f4a2392db254a2134a7.png",
        "https://groupqiniu.luojiaming.vip/test.jpg",
        "https://groupqiniu.luojiaming.vip/test.jpg",
      ]
    },

   
  }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
   * 点击任务合格按钮
   */
  tasksuccess:function(){
    this.setData({
      tasksuccessmodel:true
    })
  },


 /**
   * 点击任务不合格按钮
   */
  taskerr:function(){
    this.setData({
      taskerrreasonmodel: true
    })
  },

  hidetasksuccessmodal:function(){
    this.setData({
      tasksuccessmodel: false
    })

  },

  hidetaskerrmodal: function () {
    this.setData({
      taskerrreasonmodel: false
    })

  },

  //任务合格确定
  tasksuccesssure:function(){
    console.log(this.data.num)
    console.log(this.data.taskerrtext)
    this.hidetasksuccessmodal()
  },


  //任务不合格确定
  taskerrsure: function () {
    console.log(this.data.num)
    console.log(this.data.taskerrtext)
    this.hidetaskerrmodal()
  },


  /*点击减号*/
  bindMinus: function () {
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
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num >= 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },


  radioChange:function(e){
    // console.log("点击单选", e.currentTarget.dataset.data)
    this.setData({
      taskerrtext: e.currentTarget.dataset.data,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})