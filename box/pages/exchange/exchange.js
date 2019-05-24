let information = require('../../utils/common/user_information.js');
var baseConfig = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundcolor1: '#ffe153', 
    kongzhi: true, //控制是否展示信息
    color1: 'white',
    cash_data:2000,
    score:0,
    money:0,
    getInput_name: '',
    getInput_id: ''
  },

  getInput_name: function (e) {       //方法1
   // console.log(e.detail.value)
    this.data.getInput_name = e.detail.value;
  },
  
  getInput_id: function (e) {       //方法1
    //console.log(e.detail.value)
    this.data.getInput_id = e.detail.value;
  },

  submitForm: function (e) {
    console.log(e.detail.formId)
    var formid = e.detail.formId;//开发工具里调试的时候显示的是the formId is a mock one，要到真机才能看到formid的值
    wx.request({
      url: 'https://www.luojiaming.top/box/temmsg/addmsg.php',//服务器地址
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
      }
    })

  },


  reduction:function(){
    //console.log("方法进来了")
    this.setData({
      backgroundcolor1: 'white',
      color1: 'black',
      backgroundcolor2: 'white',
      color2: 'black',
      backgroundcolor3: 'white',
      color3: 'black',
      backgroundcolor4: 'white',
      color4: 'black',
      backgroundcolor5: 'white',
      color5: 'black',
      backgroundcolor6: 'white',
      color6: 'black',
    });

  },






  change1:function(){
    this.reduction();
    this.setData({
      backgroundcolor1: '#ffe153' ,
      color1:'white',
      cash_data:2000,
    });
  },



  change2: function () {
    this.reduction();
    this.setData({
      backgroundcolor2: '#ffe153',
      color2: 'white',
      cash_data:5000,
    });
  },

  change3: function () {
    this.reduction();
    this.setData({
      backgroundcolor3: '#ffe153',
      color3: 'white',
      cash_data:10000,
    });
  },

  change4: function () {
    this.reduction();
    this.setData({
      backgroundcolor4: '#ffe153',
      color4: 'white',
      cash_data:20000,
    });
  },

  change5: function () {
    this.reduction();
    this.setData({
      backgroundcolor5: '#ffe153',
      color5: 'white',
      cash_data:50000,
    });
  },
  

  change6: function () {
    this.reduction();
    this.setData({
      backgroundcolor6: '#ffe153',
      color6: 'white',
      cash_data:100000,
    });
  },

  
  put_forward:function(){
    //console.log("点击了按钮")
    let cash = this.data.cash_data;
    let score = wx.getStorageSync("userscore")
    let userid = wx.getStorageSync("userid")
    let alipay_name = this.data.getInput_name
    let alipay_id = this.data.getInput_id
    if (score >= cash){
      if (!alipay_name || !alipay_id){
        wx.showToast({
          title: '提现信息不能为空',
          icon: 'none',
          duration: 2000
        })
      }
      else{
       // console.log("可提现")
       var that = this
        wx.request({
          url: 'https://www.luojiaming.top/box/present/record.php', //接口地址
          data: {
            userid: userid,
            cash: cash,
            alipay_name: alipay_name,
            alipay_id: alipay_id,
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log("成功拿到回调",res.data)
            wx.showModal({
              title: '提现成功',
              content: '提现申请已提交，将在两个工作日内到账，请留意支付宝到账信息',
              success: function (res) {
                if (res.confirm) {
                  that.onShow();
                } else {
                  that.onShow();
                }
              }
            })
          }
        })

      }

    }
    else{
      //console.log("不可提现")
      wx.showToast({
        title: '金币不足提现金额',
        icon: 'none',
        duration: 2000
      })

    }

  },




  refresh:function(){
    var that = this
    setTimeout(function () {
     // console.log("22222")
      let score = wx.getStorageSync("userscore")
      let money = score / 1000
      that.setData({
        score: score,
        money: money,
      }); 
    }, 3000) 

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var baseConfig_cversion = baseConfig.cversion
    var cversion = wx.getStorageSync("cversion")
    if (baseConfig_cversion == cversion || cversion == null) {
      this.setData({
        kongzhi: false,
      })
      return;
    }


    let score = wx.getStorageSync("userscore")
    let money = score / 1000
    this.setData({
      score: score,
      money: money,
    }); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log("再次更新缓存")
    information.query_user_information()//再次更新缓存
    this.refresh();//再次拿数据
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