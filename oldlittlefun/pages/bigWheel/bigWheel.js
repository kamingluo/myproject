
let util = require('../../utils/kaming.js')
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;

// pages/bigWheel/bigWheel.js
var timer;
var n = 1; //旋转圈数
var whichdegs = "";//中奖项
var luck = ["谢谢参与", "谢谢参与", "谢谢参与", "谢谢参与", "谢谢参与", "谢谢参与"];//定义奖项
var degs = [60, 120, 180, 240, 300, 360];// 定义旋转度数
Page({
  data: {

    xmad: {
      adData: {},
      ad: {
        banner: "xm285e32d8abf77e8ba321f97005d8f2",//banner
      },
    },
 



    animationData: {},//动画
    isclick: "start",//按钮事件  默认开始事件
    hiddenModal: true,//弹框是否隐藏
    detail: "恭喜您获得",//弹框内容
    topval:0,
    name:"",
    jifen:"",
    winnerdata:[{
      tel:"kaming",
      txt:"京东E卡",
      time:'08/01'
    }, {
      tel: "希洪",
        txt:"1000理财红包",
        time:'08/01'
      }, 
      {
        tel: "147****87462",
        txt: "2000理财红包",
        time: '08/01'
      },{
        tel:"杨咩里",
        txt:"京东E卡",
        time:'08/01'
    }, {
      tel:"西虹市",
        txt:"5200理财红包",
        time: '08/01'
      },
      {
        tel:"151****8945",
        txt:"1000理财红包",
        time: '08/01'
      }, {
        tel:"anna",
        txt:"京东E卡",
        time: '08/01'
    }, {
      tel:"我爱TNT",
        txt:"京东E卡",
        time: '08/01'
      }, {
        tel:"呵呵哒",
        txt:"2000理财红包",
        time: '08/01'
    }, {
      tel:"努力赚钱",
        txt:"5200理财红包",
        time: '08/01'
      },
      {
        tel:"176****0622",
        txt:"京东E卡",
        time: '08/01'
      }, {
        tel:"未命名",
        txt:"1000理财红包",
        time:'08/01'
    }, {
      tel:"玩玩而已",
      txt:"2000理财红包",
        time: '08/01'
      }, {
        tel:"吸螺没吸",
        txt:"京东E卡",
        time: '08/01'
      }
    ]
  },

  Clickads: function (e) {
    var adtype
    adtype = e.currentTarget.dataset.type
    util.Adcount('大转盘', adtype)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.chaxunxinxi()
    wx.showShareMenu({
      withShareTicket: true
    })
     this.scroll();
    this.setData({ isAd: true })
  },


  Adhide: function () {
    this.setData({ isAd: false })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  
  },
  start: function (e) {
    wx.reportAnalytics('dazhuanpan', {
      choujiang: '1',
    });
    var _this = this;
    n = 1;
    //开始事件以后置为停止事件（改为自动停止）
    this.setData({
      isclick: ""
    })
    //重置动画
   // _this.reset.call(_this);

    timer = setInterval(function () {
      //开始旋转
      star.call(_this);
      //
      n++;
    } , 300);
    //启动动画
    function star() {
      //开始旋转动画
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 300,
        timingFunction: "linear"
      });
      animation.rotate(360 * n).step();
      this.setData({
        animationData: animation.export()
      })
    }

    //多久以后自动停止
    setTimeout(_this.stop,3000);
  },
  stop: function (e) {
    var _this = this;
    clearInterval(timer);
    timer = null;
    //结束动画
    //动画越来越慢直到停止
    sto.call(_this);
    function sto() {
      //算概率
     //随机概率 var gailv = parseInt(Math.random() * 100);
      var gailv = 40;
      console.log(gailv);
      if (gailv < 15) {
        whichdegs = degs[0];
        _this.data.detail += luck[0];
      } else if (15 < gailv&&gailv < 55) {
        whichdegs = degs[1];
        _this.data.detail += luck[1];
      } else if (55 < gailv && gailv  <80) {
        whichdegs = degs[2]
        _this.data.detail += luck[2];
      } else if (80 < gailv && gailv < 95) {
        whichdegs = degs[3]
        _this.data.detail += luck[3];
      } else if (95 < gailv && gailv < 100) {
        whichdegs = degs[4]
        _this.data.detail += luck[4];
      } else if (gailv == 99) {
        whichdegs = degs[5]
        _this.data.detail += luck[5];
      }
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 4 * 300 + whichdegs * 1.4,
        timingFunction: "ease-out"
      });
      animation.rotate(n * 360 + whichdegs).step();//d转到哪个盘
      this.setData({
        animationData: animation.export()
      })
    }
    //显示弹出框
    timer = setTimeout(function () {
      _this.setData({
        hiddenModal: false,
        detail: _this.data.detail,
      })
    }, 4 * 300 + whichdegs * 1.4);
  },
  listenerConfirm: function (e) {
    var _this = this;
    this.setData({
      hiddenModal: true,
      isclick: "start",
      detail: "获得",
      isclick: "start"
    })
    _this.reset();
  },
  //重置动画
  reset: function () {
    //重置动画 度数重置为0
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "linear"
    });
    animation.rotate(0).step();
    this.setData({
      animationData: animation.export()
    })
  },
  scroll:function(){
    var that=this;
    setInterval(function(){
      if (that.data.topval ==-384){
        that.data.topval=0;
      }else{
        that.data.topval-=1;
      }
      that.setData({
        topval: that.data.topval
      })
    },30)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var jifen = wx.getStorageSync("jifen");
    this.setData({
      jifen: jifen
    })
    console.log('从缓存拿积分'+jifen)
    
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
      title: '转盘转好礼，大奖等着你',
      path: '/pages/bigWheel/bigWheel'
    }
  }
})