var information = require('../../utils/common/user_information.js');
var baseConfig = require('../../utils/config.js')
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:null,
    userscore:null,
    kongzhi: true, //控制是否展示信息
    signing: false,
    indexgdtad: false, //ad中间banner
    tankuangadtype:false,//弹框广告类型
    indexgdtadimg: "", //ad中间图片
    tankuang: false,
    rewardcons: "",
    indexgdtadimg: "",//首页中间图片
    jishi: 0,
    timer: '',
    adid: "",
    adname: "video",
    score: 0,
    share: true,
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

  havecode:function(){ //获取code
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
      }
    })

  },

  jump:function(e){
    //console.log(e.currentTarget.dataset.jump)
    let jumpurl = e.currentTarget.dataset.jump
    wx.navigateTo({
      url: jumpurl
    })
  },
  duihuan:function(){
    console.log("点击兑换按钮")
    var userid = wx.getStorageSync("userid")
    wx.reportAnalytics('duihuananniu', {
      userid: userid,
      ceshi: '11122',
    });
    wx.navigateTo({
      url: '/pages/exchange/exchange',
    })

  },

  kefu:function(){
    wx.navigateTo({
      url: '/pages/my/customer_service/customer_service',
    })

  },

  imagebig: function () {
    wx.previewImage({
      urls: ["http://littlebox.luojiaming.vip/1545118935%281%29.jpg"],
    })

  }, 

  dianjiadceshi: function (e) {
    let userid = wx.getStorageSync("userid")
    let channel = wx.getStorageSync("userchannel")
    let master_id = wx.getStorageSync("master_id")
    let openid = wx.getStorageSync("openid")
    wx.request({
      url: 'https://www.luojiaming.top/box/common/addgdt.php',//服务器地址
      data: {
        userid: userid,
        channel: channel,
        master_id: master_id,
        openid: openid,
        location: '我的页面'
      },
      header: {
        "Content-type": "application/json",
      },
      success: function (res) {
      },
      fail: function (err) {
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var timestamp = Date.parse(new Date())  //拿到当前的系统时间
    var mysteriousTime = wx.getStorageSync("mysteriousTime")  //拿到mysteriousTime缓存



    var baseConfig_cversion = baseConfig.cversion
    var cversion = wx.getStorageSync("cversion")
    if (baseConfig_cversion == cversion || cversion == null) {
      this.setData({
        kongzhi: false,
      })
      return;
    }
    else{
      var mysteriousTimeset = timestamp - mysteriousTime
      console.warn("-----------------")
      console.warn(mysteriousTimeset)
      if (mysteriousTimeset > 6000000){
        var mymysterious = wx.getStorageSync("appconfig").mymysterious
        if (mymysterious == 1) {
          wx.setStorageSync('mysteriousTime', timestamp)//讲openid设置为缓存
          this.setData({
            tankuang: true,
          })
        }

      }

     information.query_user_information() //再次更新下信息
    }

    //弹框广告类型
      var mytankuangadtype = wx.getStorageSync("appconfig").mytankuangadtype
      var that =this
    if (mytankuangadtype == 0 || mytankuangadtype == null || mytankuangadtype == ""){
        that.setData({
          tankuangadtype: false,
        });
      }else{
        that.setData({
          tankuangadtype: true,
        });

      }

  
   
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.onShow()
    }, 2000) //再次拿下信息，避免信息错误
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userid = wx.getStorageSync("userid")
    var userscore = wx.getStorageSync("userscore")
    var that = this;
    that.setData({
      userid: userid,
      userscore: userscore,
    })



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



  closetankuang: function () {
    this.setData({
      tankuang: false,
    });

  },


  shipinguanggao:function(){
    var that = this
    let openid = wx.getStorageSync("openid")
    wx.reportAnalytics('videoclick', {
       openid:openid,
     });
    
    console.log("点击视频广告")
    let videoAd = wx.createRewardedVideoAd({
      adUnitId: 'adunit-2063e547774339fd'
    })
    videoAd.load()
      .then(() => videoAd.show(  console.log("打开广告") ))
      .catch(err => console.log(err.errMsg))

    videoAd.onClose(res => {
      if (res && res.isEnded || res === undefined) {
        console.log("正常播放结束，可以下发游戏奖励")
        // console.warn("开始发奖")
         that.adclicksuccess()
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

  adfail:function(err){
    console.warn("我的页面弹框加载失败", err)
    this.setData({
      tankuang: false,
    });

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
      score: 111
    })
    this.startTiming()
    this.setData({
      tankuang: false,
    });
     
    wx.reportAnalytics('mytangkuangadclick', {
      userid: wx.getStorageSync("userid"),
      channel: wx.getStorageSync("userchannel"),
    });
      

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