const app = getApp()
const {
  request
} = require('./../../../utils/request.js');
const {
  share
} = require('./../../../utils/share.js');

var Page = require('../../../utils/sdk/xmad/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: null,
    crowd_id: 0,
    crowd_name: null,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myqrcode(options.crowd_id)
    wx.showLoading({
      title: '生成中..',
    })

    this.setData({
      crowd_id: options.crowd_id,
      crowd_name: options.crowd_name
    })
  },

  myqrcode: function (crowd_id) {
    var crowd_id = crowd_id
    if (crowd_id == null) {
      wx.showToast({
        title: "生成失败",
        icon: 'none'
      })
      return;
    }
    request({
      service: 'currency/getqrcode',
      data: {
        crowd_id: crowd_id,
      },
      success: res => {
        console.log('生成二维码成功', res);
        wx.hideLoading()
        this.setData({
          imgurl: 'https://group.gzywudao.top/php/public/qrcode/' + crowd_id + '.png',
        })
      },
    })

  },


  dowloadimg: function () {
    var that = this
    var imgSrc = this.data.imgurl
    wx.getSetting({
      success(res) {
        console.log(res)
        var writePhotosAlbum = wx.getStorageSync('writePhotosAlbum')
        if (!res.authSetting['scope.writePhotosAlbum'] && writePhotosAlbum) {
          that.openSetting()
          wx.showToast({
            title: "请打开权限",
            icon: 'none'
          })
        }
        else {
          wx.downloadFile({
            url: imgSrc,
            success: function (res) {
              console.log("下载图片成功", res);
              //图片保存到本地
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (data) {
                  console.log(data);
                  wx.showToast({
                    title: "下载成功",
                    icon: 'none'
                  })
                },
                fail: function (res) {
                  console.log(res)
                  wx.setStorageSync('writePhotosAlbum', true)
                }
              })
            }
          })
        }
      }
    })
  },

  openSetting: function () {
    //console.log("打开设置")
    wx.openSetting()
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