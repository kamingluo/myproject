let luo = require('../../utils/jifencaozuo.js')
//index.js
//获取应用实例
var app = getApp();
var calendarSignData;
var date;
var calendarSignDay;
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
      xmad: {
      adData: {},
      ad: {
        banner1: "xmf15c65a233fd71db0c7d25e2a20833",//程序员黄历
        banner2: "xm285e32d8abf77e8ba321f97005d8f2",//大转盘
        banner3: "xm0d344d5e30fb21415823158b85fddb",//首页
        banner4: "xm4b6fd7c45bfc80a4e057693272702b",//猜拳banner
        banner: "xm68259e5bc52f94b364e86e1ee8aaaa",//banner
        insert: "",//chaping
        fixed: "xm7c761a478bdca40e6a5031bf526a9f" //xuanfu
      },
    },
  },


  //事件处理函数
    calendarSign: function() {
    calendarSignData[date]=date;
    console.log(calendarSignData);
    calendarSignDay=calendarSignDay+1;
   wx.setStorageSync("calendarSignData",calendarSignData);
   wx.setStorageSync("calendarSignDay",calendarSignDay);
   luo.tianjiajifen(10, '+10积分')//签到成功，加积分
 
   
  this.setData({
      
        calendarSignData:calendarSignData,
        calendarSignDay:calendarSignDay
      })
  },
  onLoad: function () {

    var openid = wx.getStorageSync('openid')
    console.log('首页获得缓存', openid)
    this.setData({
      openid: openid,
    });


    console.log("加载插屏广告")
    setTimeout(function () {
      var intersitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-e28d208bd04d83cb'
      })

      intersitialAd.show()
        .then(() => videoAd.show())
        .catch(err => console.log(err.errMsg))

      intersitialAd.onClose(res => {
        console.log("关闭视频广告")
      })
    }, 2000);


    wx.showShareMenu({
      withShareTicket: true
    })


    var that = this

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                textdata: res.userInfo,
              });
              console.log(res.userInfo)
            }
          })
        }
      }
    })


    var mydate=new Date();
    var year=mydate.getFullYear();
    var month=mydate.getMonth()+1;
    date=mydate.getDate();
    console.log("date"+date)
    var day=mydate.getDay();
    console.log(day)
    var nbsp;
    if(date<=7){
      nbsp=day;
    }else{
      nbsp=7-((date-day)%7)
    }
    console.log("nbsp"+nbsp);
    var monthDaySize;
    if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
      monthDaySize=31;
    }else if(month==4||month==6||month==9||month==11){
      monthDaySize=30;
    }else if(month==2){
       // 计算是否是闰年,如果是二月份则是29天
      if((year-2000)%4==0){
        monthDaySize=29;
      }else{
        monthDaySize=28;
      }
    };
    // 判断是否签到过
    if(wx.getStorageSync("calendarSignData")==null||wx.getStorageSync("calendarSignData")==''){
      wx.setStorageSync("calendarSignData",new Array(monthDaySize));
    };
     if(wx.getStorageSync("calendarSignDay")==null||wx.getStorageSync("calendarSignDay")==''){
      wx.setStorageSync("calendarSignDay",0);
    }
     calendarSignData=wx.getStorageSync("calendarSignData")
      calendarSignDay=wx.getStorageSync("calendarSignDay")
    console.log(calendarSignData);
    console.log(calendarSignDay)
    this.setData({
        year:year,
        month:month,
        nbsp:nbsp,
        monthDaySize:monthDaySize,
        date:date,
        calendarSignData:calendarSignData,
        calendarSignDay:calendarSignDay
      })
  },

  onShow: function () {
    var openid = wx.getStorageSync('openid')
    console.log('首页获得缓存', openid)
    this.setData({
      openid: openid,
    });

  },


  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  }


})
