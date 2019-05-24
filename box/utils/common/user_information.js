var app = getApp();
function query_user_information() {
  let openid = wx.getStorageSync('openid')
  wx.request({
    url: 'https://www.luojiaming.top/box/information/information.php', //接口地址
    data: {
      openid:openid,
    },
    header: {
      'content-type': 'application/json' //默认值
    },
    success: function (res) {
     // console.warn("ceshi渠道",res.data.data)
      if (res.data.data.length == 0 ){
        //console.warn("我等于空啊，不执行啦") //避免没信息报错
        return;
      }
      let userchannel = res.data.data[0].channel;
      let userscore = res.data.data[0].score;
      let userid = res.data.data[0].id;
      let master_id = res.data.data[0].master_id;
      let pay_tribute = res.data.data[0].pay_tribute;
      app.globalData.userchannel = res.data.data[0].channel;//取到用户渠道赋值给全局变量，避免用户扫描其他渠道的二维码或链接进来导致分享的渠道不对
      wx.setStorageSync('userchannel', userchannel)
      wx.setStorageSync('userscore', userscore)
      wx.setStorageSync('userid', userid)
      wx.setStorageSync('master_id', master_id)
      wx.setStorageSync('pay_tribute', pay_tribute)
    }
  })

}

function coin_operation(score,type) {
  let userid = wx.getStorageSync('userid')
  wx.request({
    url: 'https://www.luojiaming.top/box/common/cons.php', //接口地址
    data: {
      userid:userid,
      score:score,
      type:type,
    },
    header: {
      'content-type': 'application/json' //默认值
    },
    success: function (res) {
    }
  })
}








module.exports = {
  query_user_information: query_user_information,
  coin_operation: coin_operation,
}