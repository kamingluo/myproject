//index.js
//获取应用实例
const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
const common = require('./../../utils/common.js') //公共函数
const task = require('./../../utils/task.js');

Page({
  data: {
    "swiperdata": [],
    "informationdata": [],
    "miniappaddata": [],
    adid: '',
    setInter: '',
    num: 0,
    taskid: '', //任务id
    tasktime: null, //任务时间
    taskscore: null, //任务奖励
    adname:"",//AD名称
  },
  onLoad: function(e) {
    this.indexData()
    this.miniappadData()
  },
  onShow: function() {
    this.playtask()
  },


  //查询首页数据
  indexData: function() {
    request({
      service: 'index/indexdata',
      method: 'GET',
      success: res => {
        //console.log('首页轮播图数据', res.swiperdata);
        //console.log('首页信息流数据', res.informationdata);
        this.setData({
          swiperdata: res.swiperdata,
          informationdata: res.informationdata
        })
      }
    })
  },

  //点击轮播图
  clickSwiper: function(e) {
    console.log("点击轮播图数据", e.currentTarget.dataset.data)
    common.insidejump(e.currentTarget.dataset.data)
  },

  clickInformation: function(e) {
    console.log("点击信息流数据", e.currentTarget.dataset.data)
    common.insidejump(e.currentTarget.dataset.data)

  },




  miniappadData: function() {
    request({
      service: 'index/miniappad',
      method: 'GET',
      success: res => {
        //console.log('首页miniapp数据', res.miniappdata);
        this.setData({
          miniappaddata: res.miniappdata
        })
      }
    })

  },
  clickminiappad: function(e) {
    var that = this
    console.log("点击miniappadclick", e.currentTarget.dataset.data)
    var jumptype = e.currentTarget.dataset.data.type
    if (jumptype == 0) {
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.data.appid,
        path: e.currentTarget.dataset.data.Jump,
        extraData: e.currentTarget.dataset.data.extradata,
        success(res) {
          console.log("跳转miniappad成功", e.currentTarget.dataset.data.Jump)
          that.startSetInter()
          that.setData({
            taskid: 0,
            taskscore: e.currentTarget.dataset.data.score,
            tasktime: e.currentTarget.dataset.data.playtime,
            adid: e.currentTarget.dataset.data.id,
            adname: e.currentTarget.dataset.data.name,
          })
        }
      })
    } else {
      console.log("打开图片")
      let path = e.currentTarget.dataset.data.Jump
      wx.previewImage({
        urls: [path],
      })
      that.startSetInter()
      that.setData({
        taskid: 0,
        taskscore: e.currentTarget.dataset.data.score,
        tasktime: e.currentTarget.dataset.data.playtime,
        adid: e.currentTarget.dataset.data.id,
        adname: e.currentTarget.dataset.data.name,
      })

    }
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
        console.log('当前计时时间==' + that.data.num);
      }, 1000);
  },
  endSetInter: function() {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },

  playtask: function() {
    var that = this
    clearInterval(that.data.setInter) //清除计时器
    console.log("onshow展示任务id", that.data.taskid)
    if (that.data.taskid == null || that.data.num == 0) {
      console.log("时间等于0或者任务id等于空")
      return;
    }
    var adid = that.data.adid || 1
    var score = that.data.score || 50
    if (that.data.taskid == 0) { //miniapp任务
      let adid = that.data.adid || 1
      let score = that.data.taskscore || 50
      let tasktime = that.data.tasktime || 15
      let adname = that.data.adname || "任务名称空"
      if (that.data.num > tasktime) {
        task.clickminiappad(adid, score, adname)
      } else {
        that.wxshowToast("体验满时间成功才能获得奖励哦！")
      }

    } else { //微量ad任务
      if (that.data.num > 15) {
        task.clickwlad(adid, score, adname)
      } else {
        that.wxshowToast("体验满15秒才能获得奖励哦！")
      }
    }

    //console.log("将时间恢复0")
    this.setData({
      num: 0,
      taskid: "",
    });

  },


  wxshowToast: function(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2500
    })

  },






  onShareAppMessage: function(options) {
    // console.log("分享掉起", options)
    // if (options.from == 'button') {
    //   let expressName = options.target.dataset.name
    //   let expressNumber = options.target.dataset.number
    //   console.log("按钮分享", expressName, expressNumber)
    //   return share(1, expressName, expressNumber);
    // } else {
    //   return share(2);
    // }
  },


})