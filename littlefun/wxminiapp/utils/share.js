var app = getApp();

function share(type) {
  let userdata = wx.getStorageSync('userdata')
  // app.aldstat.sendEvent('分享好友', userdata);
  let userid = wx.getStorageSync('userdata').id
  let userchannel = wx.getStorageSync('userdata').channel
  if (type == 1) { //button分享
    return {
      title: "button分享",
      desc: '分享给好友',
      imageUrl: 'http://material.gzywudao.top/image/express/expressbuttonshare.jpg',
      path: '/pages/index/index?channel=' + userchannel + '&master_id=' + userid , // 路径，传递参数到指定页面。
    }
    
  } else {

    return {
      title: '顶部分享',
      desc: '顶部分享',
      imageUrl: 'http://material.gzywudao.top/image/express/expressimg.jpg',
      path: '/pages/index/index?channel=' + userchannel + '&master_id=' + userid, // 路径，传递参数到指定页面。
    }
  }
}



module.exports = {
  share: share,
}