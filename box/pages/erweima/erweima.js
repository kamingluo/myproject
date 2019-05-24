// pages/erweima/erweima.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    anniu:true,


  },
  Hxm_Adx_Callback: function (obj) {
    console.log(JSON.stringify(obj));//了解广告的行为
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let erweima = wx.getStorageSync("erweima")
    if (erweima) {
      console.log("二维码有缓存")
      that.setData({
        imageurl: erweima,
        anniu: false,
      });
    }
    else {
      console.log("二维码没有缓存")
      that.setData({
        anniu: true,
      });
    }

    
  },


  generate:function(){
    var that = this
      console.log("生成二维码")
      var userid = wx.getStorageSync("userid")
      var userchannel = wx.getStorageSync("userchannel")
      wx.request({
        url: 'https://www.luojiaming.top/box/erweima/erweima.php',
        data: {
          userid: userid,
          channel: userchannel,
        },
        header: { 'content-type': 'application/json' },
        success: function (res) {
          console.log("拿二维码回调", res)
          var erweimaurl = 'https://www.luojiaming.top/box/erweima/' + userid + '.png'
          wx.setStorageSync('erweima', erweimaurl)//erweima
          that.setData({
            imageurl: erweimaurl,
            anniu: false,
          });
        }
      })
  },




xiazai:function(){
  let erweima = wx.getStorageSync("erweima")  
    wx.previewImage({
      urls: [erweima],
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