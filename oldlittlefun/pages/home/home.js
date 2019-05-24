
let util = require('../../utils/kaming.js')
var Page= require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
let luo = require('../../utils/jifencaozuo.js')


var app = getApp();
Page({

  data: {
    xmad: {
      adData: {},
      ad: {
        banner: "xm0d344d5e30fb21415823158b85fddb",//首页banner1
        banner2: "xm478c5c0e15def0abcb93ccd2d57194",//签到banner
        banner3: "xm4b6fd7c45bfc80a4e057693272702b",//猜拳banner
        banner4: "xm285e32d8abf77e8ba321f97005d8f2",//大转盘banner
        banner5: "xm68259e5bc52f94b364e86e1ee8aaaa",//我的banner
        insert: "xmc794fd53ce532b8144ae7a9c4ad538",//chaping
        fixed: "xmd68ff209c0757d320ceeb6629eb2b5" //xuanfu
      },
    },



    jifen: "",
    
    imgUrls: [
      'http://img2.imgtn.bdimg.com/it/u=888348881,1176056835&fm=27&gp=0.jpg',
      'http://img0.imgtn.bdimg.com/it/u=4204984068,3896675956&fm=27&gp=0.jpg',
      'http://img0.imgtn.bdimg.com/it/u=1602918986,2473641472&fm=27&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=8956839,3794843791&fm=27&gp=0.jpg'
    ],
    swiperIndex: 0
   
   

  },
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  Clickads:function(e){
    var adtype
    adtype =e.currentTarget.dataset.type
    util.Adcount('首页', adtype)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid')
    console.log('首页获得缓存',openid)
    this.setData({
      openid: openid,
    });
   
    this.setData({ isAd: true })
    //util.zhuce()
    this.insertscreen()//插屏广告
    
  },

  shipinad:function(){
    let wxopenid = wx.getStorageSync("openid")
    wx.reportAnalytics('shipinadclick', {
      openid: wxopenid,
    });

    let videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-0560e4c071403ecd'
    })

    videoAd.load()
      .then(() => videoAd.show())
      .catch(err => console.log(err.errMsg))

    //捕捉错误
    videoAd.onError(err => {
      console.log("shipinaderr"+ err)
    })

    videoAd.onClose(res => {
      if (res && res.isEnded || res === undefined) {
        console.log("正常播放结束，可以下发游戏奖励")
        luo.tianjiajifen(10, '+10积分')
        wx.showToast({
          title: "获得奖励积分",
          icon: 'none',
          duration: 2500
        })
      } else {
        wx.showToast({
          title: "观看完成才能获得奖励哦！",
          icon: 'none',
          duration: 2500
        })
        console.log("播放中途退出，不下发游戏奖励")
      }
    })
  },

    //插屏广告展示
insertscreen:function(){
  console.log("加载插屏广告")
    setTimeout(function() {　
      var intersitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-f61ebf9cf0e4db46'
      })
      intersitialAd.show()
        .then(() => videoAd.show())
        .catch(err => console.log(err.errMsg))
        app.aldstat.sendEvent( "插屏广告展示", "首页" )
      intersitialAd.onClose(res => {
        console.log("关闭视频广告")
      })
     
    }, 1500);
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


    var openid = wx.getStorageSync('openid')
    console.log('首页获得缓存', openid)
    this.setData({
      openid: openid,
    });
    
    setTimeout(function () {
      util.chaxunxinxi()
    }, 2000) //延迟执行，避免渲染界面过程中，使用了还在加载的变量导致报错

   // util.chaxunxinxi()
    var jifen = wx.getStorageSync("jifen");
    this.setData({
      jifen: jifen
    })
    console.log('从缓存拿积分' + jifen)
  
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

  Adhide:function(){
    this.setData({ isAd: false })

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
    return {
      title: '玩游戏赚积分兑爱奇艺优酷等视频会员好礼',
      path: '/pages/home/home'
    }
  },
  tiyantuisong: function () {
    wx.navigateTo({
      url: '../ence_push/ence_push',
    })
    
  },
  caiquan:function(){
    wx.switchTab({
      url: '../caiquan/caiquan',
    })
  },
  dazhuanpan: function () {
    wx.switchTab({
      url: '../bigWheel/bigWheel',
    })
  }
})