// pages/index/index.js
import ltadx from '../../utils/ltadx/ltadx'; //骆驼换量
var baseConfig = require('../../utils/config.js') //配置文件
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic: null,
    picChoosed: false,
     xmad: {//小盟广告
      adData: {},
      ad: {
        banner: "xmf5e857e9662a4313b624636f77b4e9",//首页banner
        banner1: "xmbb100a928d6ea62facc87e55287681",//我的banner
        banner2: "xma6e58bd54538ae4ae507dd2e2e1e7e",//帽子banner
        banner3: "xmde2f6e240c459769d0f1d791087cbb",//签到banner
        banner4: "xmf4d0492bbe9627bd723b64d44bacef",//邀请banner
        insert: "xm60175226b5f38b104345c9329b4da0",//首页插屏幕banner
        fixed: "" //xuanfu
      },
    },

  },



  havecode: function () { //获取code
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
      }
    })

  },

  

  onLoad() {
    // this.insertscreen() //插屏广告
    wx.showShareMenu({
      withShareTicket: true
    })
  },


  onShow: function() {
    var baseConfig_cversion = baseConfig.cversion
    var cversion = wx.getStorageSync("cversion")
    if (baseConfig_cversion == cversion || cversion == null) {
      var shareid = 4
    }
    else{
      var shareid = 5
    }
    console.warn("请求id", shareid)
    wx.request({
      url: 'https://www.luojiaming.top/box/information/christmas.php',
      data: {
        id: shareid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log("配置信息", res.data.data[0])
        var shareimg = res.data.data[0].imgurl
        var sharetitle = res.data.data[0].biaoti
        var shareneirong = res.data.data[0].neirong
        var sharepath = res.data.data[0].path
        wx.setStorageSync('shareimg', shareimg) //把信息存入缓存
        wx.setStorageSync('sharetitle', sharetitle) //把信息存入缓存
        wx.setStorageSync('shareneirong', shareneirong) //把信息存入缓存
        wx.setStorageSync('sharepath', sharepath) //把信息存入缓存

      }
    })
  },

  onShareAppMessage: function() {
    let shareimg = wx.getStorageSync("shareimg")
    let sharetitle = wx.getStorageSync("sharetitle")
    let shareneirong = wx.getStorageSync("shareneirong")
    let sharepath = wx.getStorageSync("sharepath")
    return {
      title: sharetitle,
      desc: shareneirong,
      imageUrl: shareimg,
      path: sharepath,
    }

  },

    //插屏广告展示
insertscreen:function(){
  console.log("加载插屏广告")
    setTimeout(function() {　
      let insertscreen = wx.getStorageSync("appconfig").insertscreen
      if (insertscreen==1) {
      var intersitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-33910cd02c52c545'
      })

      intersitialAd.show()
        .then(() => videoAd.show())
        .catch(err => console.log("帽子插屏广告加载错误"))
       app.aldstat.sendEvent( "插屏广告展示", "帽子制作页面" )
      intersitialAd.onClose(res => {
        console.log("关闭视频广告")
      })
      }
      else{
        console.log("不展示视频广告")
      }  
    }, 2000);
},

  assignPicChoosed() {
    if (this.data.bgPic) {
      this.setData({
        picChoosed: true
      })
    } else {
      this.setData({
        picChoosed: false
      })
    }
  },
  getAvatar() {
    let touxiang = wx.getStorageSync("bgPic")
    if (touxiang) {
      console.log("if")
      this.setData({
        bgPic: touxiang,
      });
      this.assignPicChoosed();
    } else {
      console.log("else")
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          let myimg = res.userInfo.avatarUrl;
          let bgPic = myimg.substr(0, myimg.length - 3) + 0;
          wx.setStorageSync('bgPic', bgPic) //把信息存入缓存
          this.setData({
            userInfo: res.userInfo,
            bgPic: bgPic
          });
          this.assignPicChoosed();
        }
      })
    }
  },
  chooseImage(from) {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [from.target.dataset.way],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          bgPic: res.tempFilePaths[0]
        });
        this.assignPicChoosed();
      },
      fail: (res) => {
        this.assignPicChoosed();
      },
      complete: (res) => {
        this.assignPicChoosed();
      },
    })
  },
  nextPage() {
    app.globalData.bgPic = this.data.bgPic;
    wx.navigateTo({
      url: '../imageeditor/imageeditor',
    })
  }
})