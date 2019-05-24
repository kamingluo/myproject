// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jifen:"",
    bannerImg: ["http://qiniu.luojiaming.vip/banner01.jpg"],
    datalist:[{
      imgsrc:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1457508865,4093892281&fm=26&gp=0.jpg',
      txt:'【爱奇艺】黄金会员月卡',
      score:'500'
    },
     {
       imgsrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545024938297&di=3b0590ad41ca233d94d5df3b774a42a8&imgtype=0&src=http%3A%2F%2Fwww.focus123.cn%2FUploads%2Fimages%2F20180621%2F1529574456285272.png',
       txt: '【优酷】黄金会员月卡',
        score: '500'
      },
     {
       imgsrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545024966116&di=9df6905e19b41478669a862068e300f2&imgtype=0&src=http%3A%2F%2Fqty83k.creatby.com%2Fmaterials%2Forigin%2Fc5debe8f3576572caceadfbfd278938d_origin.jpg',
       txt: '【腾讯】黄金会员月卡 ',
       score: '400'
     },
     {
       imgsrc: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=465467659,1063228255&fm=26&gp=0.jpg',
       txt: '【搜狐】黄金会员月卡  ',
       score: '400'
     },
     {
       imgsrc: 'http://finance.people.com.cn/NMediaFile/2014/1126/MAIN201411261051000592842841448.jpg',
       txt: '【PPTV】黄金会员月卡 ',
       score: '400'
     },
     {
       imgsrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545025078424&di=db1a42568868c34c179abd0132c0fc56&imgtype=0&src=http%3A%2F%2Fwww.ittime.com.cn%2Fuploadimage%2Fimages%2F20171201104551.jpg',
       txt: '【芒果TV】黄金会员月卡 ',
       score: '400'
     }
      ]
  },

  duihuanshangping:function(){
    wx.showToast({
      title: '积分不足',
      icon: 'none',
      duration: 2000
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
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
    var jifen = wx.getStorageSync("jifen");
    this.setData({
      jifen: jifen
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