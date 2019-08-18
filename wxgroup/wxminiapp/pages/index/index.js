const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
const common = require('./../../utils/common.js') //公共函数
var Page = require('../../utils/sdk/xmad/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperdata:[],//首页轮播图数据
    usergrouplist:[],//用户加入群列表
    ifauthorized:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.indexData() //拿到首页轮播图数据
    this.getUserInfoif() //判断用户有没有授权
    
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
    this.usergroup()
    
  },

  //查询轮播图首页数据
  indexData: function () {
    request({
      service: 'appdata/home/swiperdata',
      method: 'GET',
      success: res => {
        this.setData({
          swiperdata: res.swiperdata,
        })
      }
    })
  },

  //点击轮播图
  clickSwiper: function (e) {
    //console.log("点击轮播图数据", e.currentTarget.dataset.data)
    common.insidejump(e.currentTarget.dataset.data)
  },


  //用户加入群列表
  usergroup:function(){
    var that =this
    wx.login({
      success: res => {
        request({
          service: 'group/usergroup/usergroup',
          data: {
            code: res.code,
          },
          success: res => {
            that.setData({
              usergrouplist: res.usergrouplist,
            })
          },
        })
      }
    })

  },
  clickusergrouplist:function(e){
    console.log("点击群列表",e)
    wx.navigateTo({
      url: '/pages/creategroup/creategroup'
    })
  },


 //判断用户有没有授权
  getUserInfoif:function(){
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            ifauthorized: true ,
          })
        }
      }
    })

  },



  getUserInfo: function (e) {
    let that = this;
    var data = {
      channel: wx.getStorageSync('userdata').channel,
      crowd_id: 0,
      scene: wx.getStorageSync('userdata').scene,
    }
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              //console.log("更新信息啦")
              let userdata = Object.assign(data, res.userInfo);
              common.authorized(userdata) //用户注册已经授权
              that.setData({
                ifauthorized: true,
              })
            }
          })
        }
      }
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
   */
  onShareAppMessage: function () {
    
  }
})