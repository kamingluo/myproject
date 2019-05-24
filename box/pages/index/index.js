let utils = require('../../utils/common/basic.js');
var baseConfig = require('../../utils/config.js')
var information = require('../../utils/common/user_information.js');
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告
import ltadx from '../../utils/ltadx/ltadx';
//index.js
//获取应用实例
//const app = getApp()
var app = getApp();

Page({
  data: {
    indexadall:false,
    tankuangzhanshi: false,
    lunbotu: true,
    msad: false,
    bannerAds: [], 
    topAds: [], //骆驼换量
    kongzhi: false, //控制是否展示信息
    openId: 0,
    showView: true, //添加引导展示
    iconListArr: [], //icon数组
    todayListArr: [], //信息流数组
    boxlist: [], //盒子信息流
    indexvideoad:false,//首页中间视频广告
    indexvideoadimg:"",//首页中间视频广告图片
    indexgdtad:false,//首页中间banner
    indexgdtadimg: "",//首页中间图片
    jishi:0,
    timer:'',
    adid:"",
    adname:"",
    score:0,
    wladlist:[],
    indexmsad:" ",//盟数广告
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
   
    wlad: { //微量小程序广告
      adData: {},
      ad: {
        banner: ["banner0", "banner1", "banner2", "banner3", "banner4", "banner5"], //是否展示banner⼴告
        insert: "insert", //是否展示插屏⼴告，如不需展示删掉该字段即可
        fixed: "fixed" //是否展示右下⻆悬浮⼴告，如不需展示删掉该字段即可
      }
    },
    pirce: 50,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    qudao: null
  },
  //事件处理函数
  onLoad: function() {

    var baseConfig_cversion = baseConfig.cversion
    var cversion = wx.getStorageSync("cversion")
    if (baseConfig_cversion == cversion || cversion == null) {
      return;
    } else {
      var that = this

      that.setData({ //alladzhanshi
        indexadall: true,
      });

      wx.request({
        url: 'https://www.luojiaming.top/box/information/tankuang.php',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          let tankuanghide = res.data.data[0].kongzhi
          if (tankuanghide == 0 || tankuanghide == null) {
            that.setData({
              tankuangzhanshi: true,
              
            });
          }
          that.setData({
            tankuangdata: res.data.data[0],
          });
        }
      })

      wx.request({
        url: 'https://www.luojiaming.top/box/index/index_data.php', //接口地址
        data: {},
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {
          // console.log('我是index.js中拿首页数据', res.data)
          var length = res.data.data.length;
          var length2 = res.data.data2.length;
          var length3 = res.data.data3.length;
          var length4 = res.data.data4.length;
          var newimgUrls = [];
          var newlinks = [];
          var newiconListArr = [];
          var newtodayListArr = [];
          var newboxlist = [];

          for (var i = 0; i < length; i++) {
            newimgUrls.push(res.data.data[i].imgurl);
            newlinks.push(res.data.data[i].Jump);
          }
         // console.warn("轮播图", newimgUrls)
          if (length == 0) {
            that.setData({
              lunbotu: false
            });
          } else {
            that.setData({
              imgUrls: newimgUrls,
              links: newlinks,
            });
          }


          for (var j = 0; j < length2; j++) {
            newiconListArr.push(res.data.data2[j]);
          }
          that.setData({
            iconListArr: newiconListArr,
          });

          for (var v = 0; v < length3; v++) {
            newtodayListArr.push(res.data.data3[v]);
          }
          that.setData({
            todayListArr: newtodayListArr,
          });
          let Shield = wx.getStorageSync("Shield")
          if (Shield == 0 && Shield != null) {
            for (var t = 0; t < length4; t++) {
              newboxlist.push(res.data.data4[t]);
            }
            that.setData({
              boxlist: newboxlist,
              msad: true,
            });
          }
        }
      })

      //中间广点通
      var indexgdtadimg = wx.getStorageSync("appconfig").indexgdtadimg
      if (indexgdtadimg == 0 || indexgdtadimg == null || indexgdtadimg == ""){
        that.setData({
          indexgdtad: false,
        });
      }else{
        that.setData({
          indexgdtad: true,
          indexgdtadimg: indexgdtadimg,
        });

      }


      //中间视频广告
      var indexvideoadimg = wx.getStorageSync("appconfig").indexvideoadimg
      if (indexvideoadimg == 0 || indexvideoadimg == null || indexvideoadimg == ""){
        that.setData({
          indexvideoad: false,
        });
      }else{
        that.setData({
          indexvideoad: true,
          indexvideoadimg: indexvideoadimg,
        });

      }

     
     
      
     
     //微量换量接入
      var wladnumber = wx.getStorageSync("appconfig").wladnumber
      var newwladlist =[]
      for (var wl = 0; wl < wladnumber; wl++) {
        newwladlist.push([wl]);
      }
      that.setData({
        wladlist: newwladlist,
      });

    }

    //this.insertscreen()  //插屏广告加载
  },

  dianjiadceshi: function(e) {
    var that = this
    console.warn("点击了官方banner广告",e)
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


    wx.request({
      url: 'https://www.luojiaming.top/box/common/addgdt.php', //服务器地址
      data: {
        userid: userid,
        channel: channel,
        master_id: master_id,
        openid: openid,
        location: '首页' + adname
      },
      header: {
        "Content-type": "application/json",
      },
      success: function(res) {},
      fail: function(err) {}
    })
  },

  activity: function(e) {
    //console.log(e.currentTarget.dataset.type)
    let leixin = e.currentTarget.dataset.type
    if (leixin == 1) {
      let url = e.currentTarget.dataset.url
      wx.switchTab({
        url: url,
      });
    } else {
      let jumpurl = e.currentTarget.dataset.url
      wx.navigateTo({
        url: jumpurl
      })
    }
  },

  submitForm: function(e) {
    // console.log(e.detail.formId)
    var formid = e.detail.formId; //开发工具里调试的时候显示的是the formId is a mock one，要到真机才能看到formid的值
    wx.request({
      url: 'https://www.luojiaming.top/box/temmsg/addmsg.php', //服务器地址
      data: {
        formid: formid,
        openid: wx.getStorageSync("openid"),
      },
      header: {
        "Content-type": "application/json",
      },
      success: function(res) {},
      fail: function(err) {}
    })
  },

  wladClick:function(e) {
   //  console.warn("微量点击测试",e)
    var that = this
    let adid = e.currentTarget.dataset.id
    let adname = "微量" + e.currentTarget.dataset.id
    let score = wx.getStorageSync("appconfig").wladscore
    that.setData({
      adid: adid,
      adname: adname,
      score: score
    })
    this.startTiming()
  },

  startTiming:function(){
    this.setData({  //每次调用之前初始化计时值为0
      jishi: 0,
    });
    //console.warn("开始调用计时方法")
    this.countdown()

  },


  countdown:function(){
    var that=this
    var timer = setTimeout(  function () {
     var jishi = that.data.jishi
     that.setData({
       jishi: jishi+1,
     });
     console.warn(jishi);
     if (jishi >= 60) {
       //console.warn("时间到了，关闭啦")
       clearTimeout(timer);
     }
     else{
       that.countdown();
     }
    }, 1000)
    this.timer = timer
  },
    

  onChangeShowState: function() { //点击隐藏引导添加
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  youxi: function(e) {
    var that = this
    let adid = e.currentTarget.dataset.id
    let adname = e.currentTarget.dataset.name
    let score = e.currentTarget.dataset.score
    that.setData({
      adid: adid,
      adname: adname,
      score: score
    })


    var version = e.currentTarget.dataset.version
    var appId = e.currentTarget.dataset.appId
    var path = e.currentTarget.dataset.path
    var extraData = e.currentTarget.dataset.extraData
    //console.warn("点击了游戏类型", e.currentTarget.dataset.version)
    if (version == 1 || version == null) {
      let path = e.currentTarget.dataset.path
      wx.previewImage({
        urls: [path],
      })
      that.startTiming()
    } else {
      //  console.warn("直接跳转")
      wx.navigateToMiniProgram({
        appId: appId,
        path: path,
        extraData: extraData,
        envVersion: 'release',
        success(res) {
          that.startTiming()
        }
      })
    }
  },

  adclicksuccess:function(){
    var that =this
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
        //console.log('点击游戏加金币回调', res.data)
        if (res.data.state == 200) {
          let clickadsuccesstoast = wx.getStorageSync("appconfig").clickadsuccesstoast
          if (clickadsuccesstoast == "" || clickadsuccesstoast == null || clickadsuccesstoast == " ") {
            //console.warn("游戏时间达到要求提示没配置")
          } else {
            wx.showToast({
              title: clickadsuccesstoast,
              icon: 'none',
              duration: 2500
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


  onShow: function() {
    var that =this
    utils.Obtaintoken() //拿token
    clearTimeout(this.timer); //先关计时器先
    setTimeout(function() {
      information.query_user_information() //拿用户的信息，渠道号等，id等给全局变量
    }, 2000) //延迟时间 避免没注册成功去拿数据
    let indexmsad = wx.getStorageSync("appconfig").indexmsad
      this.setData({
        indexmsad: indexmsad,
      })
    var  jieshujishi = this.data.jishi
    let clickadtime = wx.getStorageSync("appconfig").clickadtime
    //console.warn("onshow开始看时间是否合适", jieshujishi)
    if (jieshujishi == 0 || jieshujishi ==null){
      //console.warn("时间等于0，没开始吧")

    } else if (jieshujishi < clickadtime){
      that.setData({   //虽然秒数不够，但是也是给他关弹框
        tankuangzhanshi: false,
      })
      let clickadfailtoast = wx.getStorageSync("appconfig").clickadfailtoast
      if (clickadfailtoast == "" || clickadfailtoast == null || clickadfailtoast==" "){
       // console.warn("游戏时间不够提示没配置", this.data.jishi)
        that.setData({   
          jishi: 0,
        })
      }else{
        that.setData({
          jishi: 0,
        })
        wx.showToast({
          title: clickadfailtoast,
          icon: 'none',
          duration: 3000
        })
      }
    }else{
      // console.warn("开始发奖")
      that.adclicksuccess()
      that.setData({
        jishi: 0,
      })
      
    }


  },

//插屏广告展示
insertscreen:function(){
  console.log("加载插屏广告")
    setTimeout(function() {　
      let insertscreen = wx.getStorageSync("appconfig").insertscreen
      if (insertscreen==1) {
      var intersitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-b65782afc8bb4b3c'
      })

      intersitialAd.show()
        .then(() => videoAd.show())
        .catch(err => console.log(err.errMsg))
        
      
      app.aldstat.sendEvent( "插屏广告展示", "首页" )

      intersitialAd.onClose(res => {
        console.log("关闭视频广告")
      })
      }
      else{
        console.log("不展示视频广告")
      }  
    }, 2000);
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
        that.setData({
          adid: "00000",
          adname: "indexshipinad",
          score: 150
        })
        that.adclicksuccess()
        console.log("正常播放结束，可以下发游戏奖励")
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


  colsetankuang: function(e) {
    //console.warn("点击关闭弹框",e)
    let indextankuangclose = wx.getStorageSync("appconfig").indextankuangclose
    var that = this
    if (indextankuangclose ==1){
      let adid = e.currentTarget.dataset.id
      let adname = e.currentTarget.dataset.name
      let score = e.currentTarget.dataset.score
      that.setData({
        adid: adid,
        adname: adname,
        score: score
      })


      var version = e.currentTarget.dataset.version
      var appId = e.currentTarget.dataset.appId
      var path = e.currentTarget.dataset.path
      var extraData = e.currentTarget.dataset.extraData
      if (version == 1 || version == null) {
        let path = e.currentTarget.dataset.path
        wx.previewImage({
          urls: [path],
        })
        that.startTiming()
      } else {
        //  console.warn("直接跳转")
        wx.navigateToMiniProgram({
          appId: appId,
          path: path,
          extraData: extraData,
          envVersion: 'release',
          success(res) {
            that.startTiming()
          }
        })
      }

    }
    


    wx.reportAnalytics('tankuangcolse', {
      userid: wx.getStorageSync("userid"),
      channel: wx.getStorageSync("userchannel"),
    });
    this.setData({
      tankuangzhanshi: false,
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      openId: wx.getStorageSync("openid"),
      qudao: wx.getStorageSync("userchannel")
    })
  },

  imagebig: function() {
    wx.previewImage({
      urls: ["http://littlebox.luojiaming.vip/1545118935%281%29.jpg"],
    })

  }, //带点击放大整个图片

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