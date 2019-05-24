// pages/sign/sign.js
var baseConfig = require('../../utils/config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signing: false,
    indexgdtad: false, //ad中间banner
    indexgdtadimg: "", //ad中间图片
    tankuang: false,
    rewardcons:"",
    indexgdtadimg: "",//首页中间图片
    jishi: 0,
    timer: '',
    adid: "",
    adname: "",
    score: 0,
    share:true,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var baseConfig_cversion = baseConfig.cversion
    var cversion = wx.getStorageSync("cversion")
    if (baseConfig_cversion == cversion || cversion == null) {
      that.setData({
        share: false
      })
      return;
    }
    else{
      var userid = wx.getStorageSync("userid")
      wx.request({
        url: 'https://www.luojiaming.top/box/sign/inspect_sign.php',
        data: {
          userid: userid,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.warn("签到状态", res)
          if (res.data.state == 200) {
            that.setData({
              signing: true
            })

          }

        }
      })

      //中间广点通
      var indexgdtadimg = wx.getStorageSync("appconfig").indexgdtadimg
      if (indexgdtadimg == 0 || indexgdtadimg == null || indexgdtadimg == "") {
        this.setData({
          indexgdtad: false,
        });
      } else {
        this.setData({
          indexgdtad: true,
          indexgdtadimg: indexgdtadimg,
        });
      }

    }
 
    this.insertscreen() //插屏广告

  },

  startSign: function() {
    var that = this
    var userid = wx.getStorageSync("userid")
    var openid = wx.getStorageSync("openid")
    var channel = wx.getStorageSync("userchannel")
    wx.request({
      url: 'https://www.luojiaming.top/box/sign/sign.php',
      data: {
        userid: userid,
        openid: openid,
        channel: channel
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.warn("点击签到结果", res.data)
        if (res.data.state == 200) {
          that.setData({
            signing: false,
            tankuang: true,
            rewardcons: res.data.score
          })
        } else {
          wx.showToast({
            title: '系统繁忙，请刷新',
            icon: 'none',
            duration: 3000
          })
        }

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    var that = this
    clearTimeout(this.timer); //先关计时器先
    var jieshujishi = this.data.jishi
    let clickadtime = wx.getStorageSync("appconfig").clickadtime
    //console.warn("onshow开始看时间是否合适", jieshujishi)
    if (jieshujishi == 0 || jieshujishi == null) {
      //console.warn("时间等于0，没开始吧")

    } else if (jieshujishi < clickadtime) {
      that.setData({   //虽然秒数不够，但是也是给他关弹框
        tankuangzhanshi: false,
      })
      let clickadfailtoast = wx.getStorageSync("appconfig").clickadfailtoast
      if (clickadfailtoast == "" || clickadfailtoast == null || clickadfailtoast == " ") {
        // console.warn("游戏时间不够提示没配置", this.data.jishi)
        that.setData({
          jishi: 0,
        })
      } else {
        that.setData({
          jishi: 0,
        })
        wx.showToast({
          title: clickadfailtoast,
          icon: 'none',
          duration: 3000
        })
      }
    } else {
      // console.warn("开始发奖")
      that.adclicksuccess()
      that.setData({
        jishi: 0,
      })
     
    }

  },


  closetankuang: function() {
    this.setData({
      tankuang: false,
    });

  },

  alreadyclick:function(){ //已经拆红包的点击
    wx.showToast({
      title: '今天拆过啦，明天再来吧',
      icon: 'none',
      duration: 3000
    })

  },

  //插屏广告展示
  insertscreen:function(){
    setTimeout(function() {　
      let insertscreen = wx.getStorageSync("appconfig").insertscreen
      if (insertscreen==1) {
      var intersitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-202b6255ffaf5c73'
      })

      intersitialAd.show()
        .then(() => videoAd.show())
        .catch(err => console.log(err.errMsg))
        app.aldstat.sendEvent( "插屏广告展示", "拆红包页面" )
      intersitialAd.onClose(res => {
        
      })
      }
      else{
        
      }  
    }, 2000);
},




  submitForm: function (e) {
    console.warn(e)
    var formid = e.detail.formId;//开发工具里调试的时候显示的是the formId is a mock one，要到真机才能看到formid的值
    wx.request({
      url: 'https://www.luojiaming.top/box/sign/message/signaddmsg.php',//服务器地址
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




  adclicksuccess: function () {
    var that = this
    let adid = that.data.adid
    let adname = that.data.adname
    let score = that.data.score

    let userid = wx.getStorageSync("userid")
    let channel = wx.getStorageSync("userchannel")
    let master_id = wx.getStorageSync("master_id")
    let openid = wx.getStorageSync("openid")

    wx.request({
      url: 'https://www.luojiaming.top/box/click_ad.php', //接口地址
      data: {
        adid: adid,
        adname: adname,
        score: score,
        userid: userid,
        channel: channel,
        master_id: master_id,
        openid: openid,
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.warn('点击游戏加金币回调', res.data)
        if (res.data.state == 200) {
          let clickadsuccesstoast = wx.getStorageSync("appconfig").clickadsuccesstoast
          if (clickadsuccesstoast == "" || clickadsuccesstoast == null || clickadsuccesstoast == " ") {
            //console.warn("游戏时间达到要求提示没配置")
          } else {
            wx.showToast({
              title: clickadsuccesstoast,
              icon: 'none',
              duration: 3000
            })
          }

        }

        that.setData({
          tankuangzhanshi: false,
        })
        wx.reportAnalytics('adclik', {
          userid: wx.getStorageSync("userid"),
          channel: wx.getStorageSync("userchannel"),
        });
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },


  dianjiadceshi: function (e) {
    var that = this
    console.warn("点击了官方banner广告", e)
    let userid = wx.getStorageSync("userid")
    let channel = wx.getStorageSync("userchannel")
    let master_id = wx.getStorageSync("master_id")
    let openid = wx.getStorageSync("openid")
    let adname = e.currentTarget.dataset.name

    that.setData({
      adid: 999,
      adname: adname,
      score: 150
    })
    this.startTiming()
    this.setData({
      tankuang: false,
    });

    wx.request({
      url: 'https://www.luojiaming.top/box/common/addgdt.php', //服务器地址
      data: {
        userid: userid,
        channel: channel,
        master_id: master_id,
        openid: openid,
        location: '拆红包' + adname
      },
      header: {
        "Content-type": "application/json",
      },
      success: function (res) { },
      fail: function (err) { }
    })
  },




  startTiming: function () {
    this.setData({  //每次调用之前初始化计时值为0
      jishi: 0,
    });
    //console.warn("开始调用计时方法")
    this.countdown()

  },


  countdown: function () {
    var that = this
    var timer = setTimeout(function () {
      var jishi = that.data.jishi
      that.setData({
        jishi: jishi + 1,
      });
      console.warn(jishi);
      if (jishi >= 60) {
        //console.warn("时间到了，关闭啦")
        clearTimeout(timer);
      }
      else {
        that.countdown();
      }
    }, 1000)
    this.timer = timer
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
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