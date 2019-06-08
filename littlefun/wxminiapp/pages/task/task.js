const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
const scoreOperation = require('./../../utils/score.js');
let preventShake = 0; //防止快速点击


Page({
  data: {
    usertodaytask: "",
    adid: '',
    setInter: '',
    num: 0,
    taskid: '', //任务id

  },

  onLoad: function(options) {

  },

  onReady: function() {},

  onShow: function() {
    this.todaytask()

    this.playtask()

  },

  onHide: function() {},


  videoad: function() {
    var that = this;
    // 在页面中定义激励视频广告
    let videoAd = null
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-0560e4c071403ecd'
      })
      videoAd.onLoad(() => {
        console.log("onLoad")
      })
      videoAd.onError((err) => {
        console.log("onError")
      })
      videoAd.onClose((res) => {
        console.log("点击关闭视频广告", res)
        if (res && res.isEnded || res === undefined) {
          that.lookvideoad('adunit-0560e4c071403ecd', 20)
          console.log("正常播放结束，可以下发游戏奖励")
        } else {
          that.wxshowToast("观看完成才能获得奖励哦！")
          console.log("播放中途退出，不下发游戏奖励")
        }
      })
    }
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        console.log("失败重试")
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
            that.wxshowToast("暂无广告")
          })
      })
    }

  },




  lookvideoad: function(adid, score) {
    var nowTime = Date.now();
    if (nowTime - preventShake < 5000) {
      console.log("防止短时间内多次调用")
      return
    }
    preventShake = nowTime;

    var that = this;
    wx.login({
      success: res => {
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


  //查看用户今天任务完成情况
  todaytask: function() {
    wx.login({
      success: res => {
        request({
          service: 'task/index/todaytask',
          data: {
            code: res.code,
          },
          success: res => {
            console.log('用户今日任务完成状态', res);
            this.setData({
              usertodaytask: res,
            })
          },
          fail: res => {
            console.log('错误捕捉', res);
          },
        })
      }
    })

  },


  //点击广点通广告
  gdtbannerclick: function(e) {
     console.log("点击广点通广告", e.currentTarget.dataset.adid)
    this.startSetInter()
    this.setData({
      taskid: 1,
      adid: e.currentTarget.dataset.adid,
    })

  },

  nobannerad:function(){
    console.log("没有广告源")
    this.wxshowToast("暂无广告")

  },




  startSetInter: function() {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function() {
        if (that.data.num > 40) {
          console.log('大于40啦');
          clearInterval(that.data.setInter)
        }
        var numVal = that.data.num + 1;
        that.setData({
          num: numVal
        });
        //console.log('当前计时时间==' + that.data.num);
      }, 1000);
  },
  endSetInter: function() {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },


  playtask: function() {
    var that = this
    clearInterval(that.data.setInter)
    //console.log("onshow展示任务id", that.data.taskid)
    if (that.data.taskid == null || that.data.num == 0) {
      //console.log("时间等于0或者任务id等于空")
      return;
    }

    if (that.data.taskid == 0) { //分享任务
      if (that.data.num > 5) {
        that.share()
      } else {
        that.wxshowToast("分享成功才能获得奖励哦！")
      }

    } else { //广点通任务
      if (that.data.num > 15) {
        that.clickbannerad()

      } else {
        that.wxshowToast("体验满15秒才能获得奖励哦！")
      }
    }

    //console.log("将时间恢复0")
    this.setData({
      num: 0,
      taskid:"",
    });

  },

  wxshowToast: function(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2500
    })

  },



  share: function() {
    var that = this
    wx.login({
      success: res => {
        request({
          service: 'task/share/sharesuccess',
          data: {
            code: res.code,
            score: 30,
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

  clickbannerad: function(adid, score) {
    var that = this
    wx.login({
      success: res => {
        request({
          service: 'ad/gdtad/clickbannerad',
          data: {
            code: res.code,
            score: 40,
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



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
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