let util = require('../../utils/kaming.js')
let luo = require('../../utils/jifencaozuo.js')
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
//index.js
//获取应用实例
var sysind=0;
var time='';
const app = getApp()
Page({
  data: {

     xmad: {
      adData: {},
      ad: {
        banner1: "xmf15c65a233fd71db0c7d25e2a20833",//程序员黄历
        banner2: "xm68259e5bc52f94b364e86e1ee8aaaa",//大转盘
        banner3: "xm0d344d5e30fb21415823158b85fddb",//首页
        banner4: "xm4b6fd7c45bfc80a4e057693272702b",//猜拳banner
        banner: "xm4b6fd7c45bfc80a4e057693272702b",//banner
        insert: "",//chaping
        fixed: "xm7c761a478bdca40e6a5031bf526a9f" //xuanfuxm4b6fd7c45bfc80a4e057693272702b
      },
    },
    motto: 'Hello World',
    userInfo: {},
    imgs:['jiandao.png', 'shitou.png', 'bu.png'],
    userimg:'',
    liveimg:'../../souces/bu.png',
    start:true,
    stop:false,
    result:'',
    jifen:"",
    word:'开始'
   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '剪刀石头布，猜拳赢好礼',
      path: '/pages/caiquan/caiquan'
    }
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
   var s= wx.getStorageSync("score");
    this.setData({
      score:s
    })
  },

  Clickads: function (e) {
    var adtype
    adtype = e.currentTarget.dataset.type
    util.Adcount('猜拳', adtype)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //util.myfunc()//打印用户信息
    var jifen = wx.getStorageSync("jifen");
    this.setData({
      jifen: jifen
    })
  },
  again:function(){
      var that = this;
      if (sysind < 2) {
        sysind++;
      } else {
        sysind = 0;
      }
      that.setData({
        liveimg: '../../souces/' + that.data.imgs[sysind]
      })
  },
  chooseimg:function(e){
    if (this.data.stop){
      return;
    }
    //还未开始
    if (this.data.start) {
      return;
    }
    clearInterval(time);
    var userind = e.currentTarget.dataset.id;
    var resulttxt='';
    if (sysind ==userind){
      resulttxt='平局'
    } else if (sysind == 0 && userind == 2 || sysind == 1 && userind == 0 || sysind == 2 && userind == 1){   //剪刀是0，石头是1，布是2
      resulttxt='你输了'
      luo.jianjifen(10, '-10积分')//输了扣除积分
    }else{
      resulttxt ='你赢了';
      luo.tianjiajifen(10,'+10积分')//赢了添加积分,传入加积分的数值以及提示
      this.data.score+=10;     
    }
    var that= this;
    wx.setStorageSync('jifen',that.data.jifen);
    that.setData({
      stop:true,
      userimg: '../../souces/' + that.data.imgs[userind],
      result:resulttxt,
      jifen: this.data.jifen
    })
    
  },
  continuego:function(){
    wx.reportAnalytics('caiquan', {
      mingzi: '11',
    });

    if(this.data.stop){
      this.data.score--;      
      wx.setStorageSync('score', this.data.score);
      time=setInterval(this.again, 100);
      this.setData({
        stop:false,
        result:'',
        userimg:'',
        score: this.data.score
      })
    }
    if (this.data.start){
      this.data.score--;     
      time = setInterval(this.again, 100);
      this.setData({
        start: false,
        score: this.data.score,
        word:'继续'
      })
    }
  }
})
