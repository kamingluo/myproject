Page({

  /**
   * 页面的初始数据
   */
  data: {

    length:0,
    pay_tribute:0,
    ListArr: [],  //信息流数组

  },


  submitForm: function (e) {
    console.log(e)
    var formid = e.detail.formId;//开发工具里调试的时候显示的是the formId is a mock one，要到真机才能看到formid的值
    wx.request({
      url: 'https://www.luojiaming.top/box/temmsg/addmsgshare.php',//服务器地址
      data: {
        formid: formid,
        openid: wx.getStorageSync("openid"),
      },
      header: {
        "Content-type": "application/json",
      },
      success: function (res) {
      },
      fail: function (err) {
      },
      complete: function (res) {
        
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Shield = wx.getStorageSync("Shield")
    if (Shield == 0 && Shield != null) {
      this.setData({
        kongzhi: true,
      });
    }
    
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
    let cons = wx.getStorageSync("cons")
    this.setData({
      jifen: cons
    })
    var userid = wx.getStorageSync("userid")
    var pay_tribute = wx.getStorageSync("pay_tribute")
    var that = this
    wx.request({
      url: 'https://www.luojiaming.top/box/my/apprentice.php', //接口地址
      data: {
        master_id: userid
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
       // console.log(res.data)
        var length = res.data.data.length;
        var newListArr = [];
        for (var t = 0; t < length; t++) {
          newListArr.push(res.data.data[t]);
        }
        that.setData({
          ListArr: newListArr,
          length: length,
          pay_tribute: pay_tribute,
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
   * http://pfr6jnfa5.bkt.clouddn.com/image/jpg/share/8cfc41536dcd95fa99d443c123a1fae.png
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