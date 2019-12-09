const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
const scoreOperation = require('./../../utils/score.js');
let preventShake = 0; //防止快速点击
let interstitialAd = null //插屏广告

Page({
  data: {
    usertodaytask: {},
    taskconfig: null,
    adid: '',
    setInter: '',
    num: 0,
    taskid: '', //任务id
    display: false, //是否展示
    gdtaddisplay: false, //视频是否展示展示
    gdtbannerposition: null,
    addweixin: false,

  },

  onLoad: function (options) {
    this.taskconfig()
    this.addisplay()
    this.gdtbannerposition()
    this.addweixin()
  },

  onReady: function () {
  },

  onShow: function () {
    this.todaytask()
    this.playtask()
    this.gdtinsertad()


  },

  onHide: function () {
    console.log("开始隐藏了")
  },



  addisplay: function () {

    this.setData({
      display: app.globalData.display || false
    })

    let userchannel = wx.getStorageSync('userdata').channel
    let scene = wx.getStorageSync('userdata').scene
    if (userchannel == null || userchannel == 0 && scene == 1047) {
      this.setData({
        gdtaddisplay: false
      })
    } else {
      this.setData({
        gdtaddisplay: true
      })
    }

  },

  gdtbannerposition: function () {
    var that = this

    let number = Math.floor(Math.random() * 2)
    console.log(number)
    if (number == 1) {
      that.setData({
        gdtbannerposition: '9135f8cdfac7c7fd3b2ba0495d6125df'
      })
    }
    else {
      that.setData({
        gdtbannerposition: '4f5eb56dfb9f9dce256b65b622c17dd6'
      })
    }

  },



  addweixin: function () {
    var userid = wx.getStorageSync('userdata').id
    request({
      service: 'task/index/addweixin',
      data: {
        userid: userid,
      },
      method: 'GET',
      success: res => {
        this.setData({
          addweixin: res.addweixin,
        })
      }
    })

  },






  videoad: function () {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('点击看视频', userdata);
    var that = this;
    // 在页面中定义激励视频广告
    let videoAd = null
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'f1ec40b82a9fc3bc91779b0cf2066e67'
      })
      videoAd.onLoad(() => {
        //console.log("onLoad")
      })
      videoAd.onError((err) => {
        //console.log("onError")
      })
      videoAd.onClose((res) => {
        //console.log("点击关闭视频广告", res)
        if (res && res.isEnded || res === undefined) {
          that.lookvideoad('f1ec40b82a9fc3bc91779b0cf2066e67')
          //console.log("正常播放结束，可以下发游戏奖励")
        } else {
          that.wxshowToast("观看完成才能获得奖励哦！")
          //console.log("播放中途退出，不下发游戏奖励")
        }
      })
    }
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        //console.log("失败重试")
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            //console.log('激励视频 广告显示失败')
            that.wxshowToast("暂无广告,等会再试试！")
          })
      })
    }

  },




  lookvideoad: function (adid) {
    var nowTime = Date.now();
    if (nowTime - preventShake < 5000) {
      //console.log("防止短时间内多次调用")
      return
    }
    preventShake = nowTime;
    var that = this;
    wx.login({
      success: res => {
        let score = that.data.taskconfig.videoscore
        request({
          service: 'ad/gdtad/lookvideoad',
          data: {
            code: res.code,
            score: score,
            adid: adid,
          },
          success: res => {
            that.todaytask()
            that.wxshowToast("任务完成")
          },
        })
      }
    })

  },


  //签到
  sign: function () {
    var that = this;
    wx.login({
      success: res => {
        request({
          service: 'sign/signin',
          data: {
            code: res.code,
            score: 20,
          },
          success: res => {
            that.todaytask()
            that.wxshowToast("签到完成，增加金币")
            setTimeout(function () {
              that.onshowgdtinsertad()
            }, 1500);
          },
        })
      }
    })

  },

  //点击签到完成按钮
  signcomplete: function () {
    var that = this
    if (!app.globalData.display) {
      return;
    }
    that.wxshowToast("你今天已经签到过了")
    setTimeout(function () {
      that.onshowgdtinsertad()
    }, 1500);

  },

  //加载插屏广告
  gdtinsertad: function () {
    if (!app.globalData.display) {
      //审核
      return;
    }

    // console.log("加载插屏广告")
    //基础库要2.6以上

    /* 建议放在onReady里执行，提前加载广告 */
    // let InterstitialAd = qq.createInterstitialAd({
    //   adUnitId: '2a5b8e4a66a067cd1c55c47a3c815074'
    // });
    // InterstitialAd.load().catch((err) => {
    //   console.error('load', err)
    // })
    // InterstitialAd.onLoad(() => {
    //   console.log('onLoad event emit')
    // })
    // InterstitialAd.onClose(() => {
    //   console.log('close event emit')
    // })
    // InterstitialAd.onError((e) => {
    //   console.log('error', e)
    // })

  },










  //显示插屏广告
  onshowgdtinsertad: function () {

    if (!app.globalData.display || !this.data.gdtaddisplay) {
      return;
    }

    if (this.data.taskconfig.instertad != 0) {
      console.log("广告错误")
      return;
    }
    /* 建议放在需要展示插屏广告的时机执行 */
    // console.log("开启插屏广告") 基础库要2.6以上
    // InterstitialAd.show().catch((err) => {
    //   console.error('show', err)
    // })
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('任务页插屏次数', userdata);

  },

  //查看用户今天任务完成情况
  todaytask: function () {
    var that = this
    wx.login({
      success: res => {
        request({
          service: 'task/index/todaytask',
          data: {
            code: res.code,
          },
          success: res => {
            console.log('用户今日任务完成状态', res);
            that.setData({
              usertodaytask: res,
            })
          },
          fail: res => {
            //console.log('错误捕捉', res);
          },
        })
      }
    })

  },


  //查询广告配置
  taskconfig: function () {
    request({
      service: 'task/index/taskconfig',
      method: 'GET',
      success: res => {
        //console.log('任务页面配置信息', res.taskconfig);
        this.setData({
          taskconfig: res.taskconfig,
        })
      }
    })
  },



  //点击广点通广告
  gdtbannerclick: function (e) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('点击任务页面广点通bannerad', userdata);
    //console.log("点击广点通广告", e.currentTarget.dataset.adid)
    this.startSetInter()
    this.setData({
      taskid: 1,
      adid: e.currentTarget.dataset.adid,
    })

  },

  nobannerad: function () {
    //console.log("没有广告源")
    this.wxshowToast("暂无广告")
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('任务页面banner暂无广告源', userdata);

  },




  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        if (that.data.num > 40) {
          console.log('大于40啦');
          clearInterval(that.data.setInter)
        }
        var numVal = that.data.num + 1;
        that.setData({
          num: numVal
        });
        console.log('当前计时时间==' + that.data.num);
      }, 1000);
  },
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },


  playtask: function () {
    console.log("任务开始计算")
    var that = this
    clearInterval(that.data.setInter)
    //console.log("onshow展示任务id", that.data.taskid)
    if (that.data.taskid == null || that.data.num == 0) {
      //console.log("时间等于0或者任务id等于空")
      return;
    }

    let bannertime = that.data.taskconfig.bannertime || 15
    let sharetime = that.data.taskconfig.sharetime || 5

    if (that.data.taskid == 0) { //分享任务
      if (that.data.num >= sharetime) {
        that.share()
      } else {
        that.wxshowToast("分享成功才能获得奖励哦！")
      }

    } else { //广点通任务
      if (that.data.num >= bannertime) {
        that.clickbannerad()

      } else {
        that.qqshowToast("体验满15秒才能获得奖励哦！")
      }
    }

    console.log("将时间恢复0")
    this.setData({
      num: 0,
      taskid: "",
    });

  },

  wxshowToast: function (title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2500
    })

  },



  share: function () {
    var that = this
    wx.login({
      success: res => {
        let score = that.data.taskconfig.sharescore
        request({
          service: 'task/share/sharesuccess',
          data: {
            code: res.code,
            score: score,
          },
          success: res => {
            //console.log('分享任务成功', res);
            that.todaytask()
            that.wxshowToast("任务完成")
          },
        })
      }
    })
  },

  clickbannerad: function (adid, score) {
    var that = this
    wx.login({
      success: res => {
        let score = that.data.taskconfig.bannerscore
        request({
          service: 'ad/gdtad/clickbannerad',
          data: {
            code: res.code,
            score: score,
            adid: that.data.adid,
          },
          success: res => {
            //console.log('点击banner广告完成加积分', res);
            that.todaytask()
            that.wxshowToast("任务完成")
          },
        })
      }
    })

  },

  gdtbanneradclick: function (e) {
    //console.log("点击广点通banner广告", e.currentTarget)
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('任务页面点击广点通banner广告', data);
  },

  gdtvideoadclick: function (e) {
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('任务页gdt视频ad', data);
  },


  addweixinkefu: function () {
    var kefuimg = this.data.taskconfig.kefuimg
    wx.previewImage({   //点击预览图片
      urls: [kefuimg],
      success: function () {
        let userdata = wx.getStorageSync('userdata')
        app.aldstat.sendEvent('点击添加微信按钮', userdata);
      },
    });

  },




  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('点击任务页面分享', userdata);
    //console.log("分享掉起", options)
    this.startSetInter()
    this.setData({
      taskid: 0,
    })
    if (options.from == 'button') {
      return share(1);
    } else {
      return share(2);
    }

  }
})