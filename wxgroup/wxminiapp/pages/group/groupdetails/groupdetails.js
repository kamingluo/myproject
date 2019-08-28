// pages/groupdetails/groupdetails.js
const {
  request
} = require('./../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icondata:[],
    usertype:false,
    btns: ["群消息", "群成员"],
    active: 0,//控制当前显示盒子 
    isCard: false,
    groupnewslist:null,
    user_type:null,
    crowddata: null,
    crowd_id:null,
    score: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("跳转携带过来的参数", options)
    if (options.user_type == 1 || options.user_type == 2 ){
      this.setData({
        user_type: options.user_type,
        score: options.score,
        usertype:true,
        crowd_id: options.id
      })
    }
    else{
      this.setData({
        score: options.score,
        user_type: options.user_type,
        crowd_id: options.id
      })
    }
    this.incondata()
    this.groupdata(options.id)
    
  },


  incondata:function(){
    let icondata=[
      {
        id:1,
        imagesurl:"../../../images/common/erweima.svg",
        text:"群管理",
        joumurl:'/pages/index/index',
        type:1
      },
      {
        id: 2,
        imagesurl: "../../../images/common/liwu.png",
        text: "提交任务",
        joumurl: '/pages/group/uptask/uptask',
        type: 0
      },
      {
        id: 3,
        imagesurl: "../../../images/common/wxlogo.png",
        text: "任务审核",
        joumurl: '/pages/group/audittasks/audittasks',
        type: 1
      },
      {
        id: 4,
        imagesurl: "../../../images/common/loading.svg",
        text: "发布消息",
        joumurl: '/pages/group/pushnews/pushnews',
        type: 0
        
      },
    ];
    this.setData({
      icondata: icondata
    })

  },

  groupdata:function(crowd_id){
    request({
      service: 'group/groupinformation/groupdetails',
      method: 'GET',
      data: {
        crowd_id: crowd_id,
      },
      success: res => {
        this.setData({
          crowddata: res,
        })
      }
    })
  },


  groupnewslist: function (crowd_id) {
    request({
      service: 'group/groupnews/groupnewslist',
      method: 'GET',
      data: {
        crowd_id: crowd_id,
        pages:1
      },
      success: res => {
        console.log("----------------------")
        console.log(res)
        this.setData({
          groupnewslist: res.data,
        })
      }
    })
  },



  toggle: function (e) {
   // console.log(e.currentTarget.dataset.index)
      this.setData({
        //设置active的值为用户点击按钮的索引值
        active: e.currentTarget.dataset.index,
      })

  },



  clickicon:function(e){
    console.log("点击icon", e.currentTarget.dataset.data.joumurl)
    let joumurl = e.currentTarget.dataset.data.joumurl
    let crowd_id = this.data.crowddata.groupdata.id
    let crowd_name = this.data.crowddata.groupdata.crowd_name
    let user_type = this.data.user_type
    wx.navigateTo({
      url: joumurl + '?crowd_id=' + crowd_id + '&user_type=' + user_type + '&crowd_name=' + crowd_name,
    })
  },



  clicknewslist:function(e){
    wx.showToast({
      title: '跳转还没做呢',
      duration: 2000,
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
    let id = this.data.crowd_id
    this.groupnewslist(id)
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