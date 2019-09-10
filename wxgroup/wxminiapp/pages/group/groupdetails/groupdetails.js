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
        id: 1,
        imagesurl: "http://qiniu.luojiaming.vip/image/group/icon/uptask.png",
        text: "提交任务",
        joumurl: '/pages/group/uptask/uptask',
        type: 0
      },
      {
        id: 2,
        imagesurl: "http://qiniu.luojiaming.vip/image/group/icon/audittasks.png",
        text: "任务审核",
        joumurl: '/pages/group/audittasks/audittasks',
        type: 1
      },
      {
        id: 3,
        imagesurl: "http://qiniu.luojiaming.vip/image/group/icon/pushnews.png",
        text: "发布消息",
        joumurl: '/pages/group/pushnews/pushnews',
        type: 0
      },
      {
        id: 4,
        imagesurl: "http://qiniu.luojiaming.vip/image/group/icon/useroperation1.png",
        text: "群用户",
        joumurl: '/pages/group/user/user',
        type: 1
      }
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
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/group/newsdetailed/newsdetailed' + '?id=' + e.currentTarget.dataset.id ,
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



  qrcode: function () {
    wx.navigateTo({
      url: '/pages/group/qrcode/qrcode' + '?crowd_id=' + this.data.crowd_id + '&crowd_name=' + this.data.crowddata.groupdata.crowd_name,
    })
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
   * pages/index/index?channel=1000&ald_media_id=26447&ald_link_key=6f92ad04b6256d10
   */
  onShareAppMessage: function () {
    let userchannel = wx.getStorageSync('userdata').channel
    let nickName = wx.getStorageSync('userdata').nickName
    let crowd_id = this.data.crowd_id
    let crowd_name = this.data.crowddata.groupdata.crowd_name
    return {
      title: nickName + "邀请你加入群" + "《" + crowd_name + "》",
      desc: nickName + "邀请你加入群" + "《" + crowd_name + "》",
      imageUrl: 'http://588ku.izihun.com/element_origin_min_pic/18/07/07/f7c2df27ff4d14cd4bb92054ff1dad3e.jpg%21/fw/820/quality/100/unsharp/true/compress/true/format/jpeg',
      path: '/pages/index/index?channel=1000&ald_media_id=26447&ald_link_key=6f92ad04b6256d10' +  '&crowd_id=' + crowd_id, // 路径，传递参数到指定页面。
    }

  }
})