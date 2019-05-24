function zhuce() {
  wx.getUserInfo({
    success: function (res) {
      //app.aldpush.pushuserinfo(res, jscode);
      var name
      var city
      var province
      var avatarUrl
      var that = this
      console.log(res.userInfo)
      console.log('授权成功拿到用户名：'+res.userInfo.nickName)
      name =res.userInfo.nickName
      city = res.userInfo.city
      avatarUrl = res.userInfo.avatarUrl
      province = res.userInfo.province
      console.log('用户名传入接口注册')
      wx.request({
        // url: 'http://news-at.zhihu.com/api/4/news/latest', 
        url: 'https://www.luojiaming.top/php/zhuce.php',
        data: {
          name:name,
          city: city,
          province: province,
          avatarUrl: avatarUrl
          
          // 不用传参数
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log('新用户注册成功')
        }
      })
    }
  })
}


function chaxunxinxi() {
  wx.getUserInfo({
    success: function (res) {
      var that = this
      var name
      name = res.userInfo.nickName
      wx.request({
        url: 'https://www.luojiaming.top/php/chaxunxinxi.php',
        data: {
          name:name
        },
        header: {'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res.data)
          var jifen = res.data.data[0].score
          wx.setStorageSync('jifen', jifen)
          console.log('把接口拿到的积分存入缓存'+jifen)
        },
        fail: function(res) {
          console.log("不成功")
        },
        complete: function(res) {
          //console.log("都会执行")
        },
      })
    }
  })
}



function Adcount(position,adtype) {
  console.log(position)
  console.log(adtype)
  var position = position
  var adtype = adtype
  wx.getUserInfo({
    success: function (res) {
      var that = this
      var name
      name = res.userInfo.nickName
      console.log(name)
      wx.request({
        url: 'https://www.luojiaming.top/php/Adcount.php',
        data: {
          name: name,
          position: position,
          adtype: adtype
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          
        },
        fail: function (res) {
          
        },
        complete: function (res) {
          //console.log("都会执行")
        },
      })
    }
  })
}







module.exports = {
  Adcount: Adcount,//暴露一下接口
  zhuce: zhuce,
  chaxunxinxi: chaxunxinxi,
}