let baseConfig = require('./config.js')
const request = (config) => {
  if (config == null) {
    return false;
  }
  // console.log("config", channel)
  const data = config.data || {}
  const adddata={
    channel: wx.getStorageSync('userdata').channel || 0,
    master_id: wx.getStorageSync('userdata').master_id || 0,
    test: wx.getStorageSync('userdata').test || 0
  }

  const requestdata = Object.assign(adddata, data);//合并的时候adddata放前面,是后面的data覆盖前面的adddata
  //console.log("data", requestdata)
  config.loading && wx.showLoading({
    title: '正在加载',
    mask: true
  });
  wx.showNavigationBarLoading();
  wx.request({
    url: config.url || (baseConfig.host + config.service),
    data: requestdata,
    method: config.method || 'POST',
    success: function(res) {
      config.loading && wx.hideLoading();
      wx.hideNavigationBarLoading();
      if (res.statusCode != 200) {
        config.fail();
        wx.showToast({
          title: '网络异常',
          icon: 'none'
        })
      } else {
        const data = res.data;
        if (data.state == 200) {
          config.success && config.success(data);
        } else {
          if (config.fail) {
            config.fail && config.fail(data);
          } else {
            wx.showToast({
              title: data.message,
              icon: 'none'
            })
          }
        }
      }
    },
    fail: function(res) {
      config.loading && wx.hideLoading();
      wx.hideNavigationBarLoading();
      if (config.fail) {
        config.fail && config.fail(res);
      } else {
        config.showToast && wx.showToast({
          title: '网络异常',
          icon: 'none'
        })
      }
    },
    complete: function(res) {
      config.complete && config.complete(res);
    }
  })
}

module.exports = {
  request: request
}