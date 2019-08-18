// pages/groupdetails/groupdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icondata:[],
    usertype:true,
    btns: ["群消息", "群成员"],
    cons: ["群消息", "群成员"],
    active: 0,//控制当前显示盒子 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.incondata()

  },


  incondata:function(){
    let icondata=[
      {
        id:1,
        imagesurl:"../../images/common/cash.png",
        text:"介绍",
        joumurl:'/pages/index/index',
        type:1
      },
      {
        id: 2,
        imagesurl: "../../images/common/cash.png",
        text: "介绍2",
        joumurl: '/pages/index/index',
        type: 2
      },
      {
        id: 3,
        imagesurl: "../../images/common/cash.png",
        text: "介绍3",
        joumurl: '/pages/index/index',
        type: 0
      },
      {
        id: 4,
        imagesurl: "../../images/common/cash.png",
        text: "介绍4",
        joumurl: '/pages/index/index',
        type: 0
        
      },
    ];
    this.setData({
      icondata: icondata
    })

  },


  toggle: function (e) {

    //console.log(e.currentTarget.dataset.index)

    this.setData({

      //设置active的值为用户点击按钮的索引值

      active: e.currentTarget.dataset.index,

    })

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})