function tianjiajifen(e,tit){
  console.log(e)
  console.log(tit)
  var score = e
  var titel  = tit
   wx.getUserInfo({
    success: function (res) {
      var that = this
      var name
      name = res.userInfo.nickName
      console.log(name)
      wx.request({
        url: 'https://www.luojiaming.top/php/jiajifen.php',
        data: {
          name:name,
          score: score
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log("加积分成功")
          wx.showToast({
            title: titel,
            icon: 'none',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log("不成功")
        },
        complete: function (res) {
          //console.log("都会执行")
        },
      })
    }
  })
}


function jianjifen(e,tit) {
  console.log(tit)
  console.log(e)
  var score = e
  var titel = tit
  wx.getUserInfo({
    success: function (res) {
      var that = this
      var name
      name = res.userInfo.nickName
      console.log(name)
      wx.request({
        url: 'https://www.luojiaming.top/php/jianjifen.php',
        data: {
          name: name,
          score: score
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log("扣除积分成功")
          wx.showToast({
            title: titel,
            icon: 'none',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log("不成功")
        },
        complete: function (res) {
          //console.log("都会执行")
        },
      })
    }
  })
}



module.exports = {
  tianjiajifen: tianjiajifen,//暴露一下接口
  jianjifen: jianjifen,
}