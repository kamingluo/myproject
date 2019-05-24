Page({

  /**
   * 页面的初始数据
   */
  data: {
    length:1,
    ListArr: [],  //信息流数组
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
    var userid = wx.getStorageSync("userid")
    var that = this
    wx.request({
      url: 'https://www.luojiaming.top/box/my/gold_notes.php', //接口地址
      data: {

        userid: userid


      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        var length = res.data.data.length;
        var newListArr = [];
        for (var t = 0; t < length; t++) {
          newListArr.push(res.data.data[t]);
        }
        that.setData({
          ListArr: newListArr,
          length: length,
        });
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
    let userchannel = wx.getStorageSync("userchannel")
    let userid = wx.getStorageSync("userid")
    let shareimg = wx.getStorageSync("shareimg")
    let sharetitle = wx.getStorageSync("sharetitle")
    return {
      title: sharetitle,
      desc: '点点好玩',
      imageUrl: shareimg,
      path: '/pages/index/index?channel=' + userchannel + '&id=' + userid, // 路径，传递参数到指定页面。
    }
    
  }
})