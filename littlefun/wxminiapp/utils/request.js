let baseConfig = require('./config.js')
const request = (config) => {
  if (config == null) {
    return false;
  }
  const data = config.data
  config.loading && wx.showLoading({
    title: '正在加载',
    mask: true
  });
  wx.showNavigationBarLoading();
  wx.request({
    url: config.url || (baseConfig.host + config.service),
    data: data,
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
            config.showToast && wx.showToast({
              title: '状态异常',
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