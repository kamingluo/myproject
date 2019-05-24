var baseConfig = require('../../utils/config.js')
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告
Page({

  /**
   * 页面的初始数据
   */
  data: {

    length:0,
    pay_tribute:0,
    ListArr: [],  //信息流数组
    attentionAnim: '',//动画
    kongzhi: true, //控制是否展示信息
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


  submitForm: function (e) {
    console.log(e)
    var formid = e.detail.formId;//开发工具里调试的时候显示的是the formId is a mock one，要到真机才能看到formid的值
    wx.request({
      url: 'https://www.luojiaming.top/box/temmsg/addmsgshare.php',//服务器地址
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

  suijishu:function(){
    var that =this
    setTimeout(function () {
      let suijishu = Math.floor(Math.random() * 3);
      console.warn("我是测试随机数", suijishu)
      that.suijishu()
    }, 1000)

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //this.suijishu()  //测试随机数
    var baseConfig_cversion = baseConfig.cversion
    var cversion = wx.getStorageSync("cversion")
    if (baseConfig_cversion == cversion || cversion == null) {
      this.setData({
        kongzhi: false,
      })
      return;
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var attentionAnim = wx.createAnimation({
      duration: 150,
      timingFunction: 'ease',
      delay: 0
    })
    //设置循环动画
    this.attentionAnim = attentionAnim
    var next = true;
    setInterval(function () {
      if (next) {
        //根据需求实现相应的动画
        this.attentionAnim.rotate(3).step()
        next = !next;
      } else {
        this.attentionAnim.rotate(-3).step()
        next = !next;
      }
      this.setData({
        //导出动画到指定控件animation属性
        attentionAnim: attentionAnim.export()
      })
    }.bind(this), 150)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let cons = wx.getStorageSync("cons")
    this.setData({
      jifen: cons
    })
    
    var userid = wx.getStorageSync("userid")
    var pay_tribute = wx.getStorageSync("pay_tribute")
    var that = this
    wx.request({
      url: 'https://www.luojiaming.top/box/my/apprentice.php', //接口地址
      data: {
        master_id: userid
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
       // console.log(res.data)
        var length = res.data.data.length;
        var newListArr = [];
        for (var t = 0; t < length; t++) {
          newListArr.push(res.data.data[t]);
        }
        that.setData({
          ListArr: newListArr,
          length: length,
          pay_tribute: pay_tribute,
        });
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
   * http://pfr6jnfa5.bkt.clouddn.com/image/jpg/share/8cfc41536dcd95fa99d443c123a1fae.png
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