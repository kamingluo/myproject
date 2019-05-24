var app = getApp();
let baseConfig = require('./../config.js')

function useropenid(res) {
 // console.warn('进来了调接口拿openid', res)
  wx.request({
    url: 'https://www.luojiaming.top/box/openid.php', //接口地址
    data: { code: res },
    header: {
      'content-type': 'application/json' //默认值
    },
    success: function (res) {
      // console.log(res.data)
      var Invitation_channel = wx.getStorageSync('Invitation_channel')
      var Invitation_id = wx.getStorageSync('Invitation_id')
      var openid = res.data.openid //拿到openid
     // console.log('拿到openid', openid)
      wx.setStorageSync('openid', openid)//讲openid设置为缓存
      wx.request({
        url: 'https://www.luojiaming.top/box/register.php', //接口地址
        data: { 
          openid: openid ,
          channel: Invitation_channel ,
          master_id: Invitation_id ,
          },
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function (res) {
          // console.log("注册成功拿到回调",res.data)
        }
      })



    }
  })

}

function Obtaintoken() {
  var timestamp = Date.parse(new Date())  //拿到当前的系统时间
  var token = wx.getStorageSync("token")  //拿到token缓存
  var token_data = wx.getStorageSync("token_data")  //拿到过期时间
  if (!token || !token_data) { //token为空或者过期时间为空，就调接口拿token
    // console.log("token没有或者过期时间没有，重新拿")
    wx.request({
      url: 'https://www.luojiaming.top/little_fun/wxtoken.php',
      data: {
        id: 1,
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var token = res.data.access_token
        wx.setStorageSync('token', token)//把token存入缓存
        var expiration = timestamp + 1800000;//这里是1800秒
        //var expiration = timestamp + 180000;//这里是180秒
        wx.setStorageSync('token_data', expiration)//把过期时间存入缓存
      }
    })
  }
  else if (token_data > timestamp) {  //token不为空或者过期时间不为空，这里判断时间
    // console.log('token存在且没有失效，可以继续使用')
  }
  else {
    // console.log("token过期啦，重新拿")
    wx.request({
      url: 'https://www.luojiaming.top/little_fun/wxtoken.php',
      data: {
        id: 1,
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var token = res.data.access_token
        wx.setStorageSync('token', token)//把token存入缓存
        var expiration = timestamp + 1800000;//过期时间加1800秒，这里是1800秒
        // var expiration = timestamp + 180000;//这里是180秒
        wx.setStorageSync('token_data', expiration)//把过期时间存入缓存
      }
    })
  }
}



function peizhi() {
  //console.log("banbenpeizhi", baseConfig.cversion)
  
    wx.request({
      url: 'https://www.luojiaming.top/box/information/peizhi.php',
      data: {
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
       // console.log("配置信息", res.data.data[0])
        var appconfig = res.data.data[0]
        var cons = res.data.data[0].cons
        var Shield = res.data.data[0].Shield
        var cversion = res.data.data[0].cversion
        var thirdcons = res.data.data[0].thirdcons //第三方奖励金额数
        var tabmsad = res.data.data[0].tabmsad //第三方奖励金额数
        var sharetitle = res.data.data[0].sharetitle //分享标题
        var shareimg = res.data.data[0].shareimg //分享图片
        wx.setStorageSync('appconfig', appconfig)
        wx.setStorageSync('cversion', cversion)
        wx.setStorageSync('tabmsad', tabmsad)
        wx.setStorageSync('shareimg', shareimg)
        wx.setStorageSync('sharetitle', sharetitle)
        if (cons>50){
          wx.setStorageSync('cons', cons)//把cons存入缓存
        }
        else{
          wx.setStorageSync('cons', 50)//把cons存入缓存
        }
        wx.setStorageSync('Shield', Shield)//把Shield存入缓存，控制信息是否展示，0是开，1是关
        wx.setStorageSync('thirdcons', thirdcons)//把第三方奖励金额数放入缓存
        //控制版本配置展示
        var baseConfig_cversion = baseConfig.cversion
        if (cversion == null || cversion== baseConfig_cversion){
          console.log("版本相同")
          wx.reLaunch({
            url: '/pages/maozi/index',
          }) 
          // wx.switchTab({
          //   url: '/pages/index/index'
          // })
        }
        else{
          wx.switchTab({
            url: '/pages/index/index'
          })
        }

      
      }
    })
  
}




module.exports = {
  useropenid: useropenid,
  Obtaintoken: Obtaintoken,
  peizhi:peizhi,
}