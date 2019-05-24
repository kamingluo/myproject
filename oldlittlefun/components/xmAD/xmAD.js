var app = getApp();
Component({
  properties: {
    adData: Object
  },
  attached: function() {
    this.setData({
      adID: this.dataset.id
    })
  },
  methods: {
    cancelJump(baseURL, curl) {
      if (!curl) {
        return
      }
      wx.request({
        url: baseURL + 'v1/api/cancelclk',
        data: {
          curl
        },
        method: 'POST'
      })
    },
    adLoad() {
      wx.setStorageSync('xmadstatus', 0)
      var that = this
      this.triggerEvent('adload')
      for (var i = 0; i < 5; i++) {　　
        setTimeout(function() {　　　　
          that.triggerEvent('adload')
          console.log("小盟循环提交加载adload")　　
        }, i * 3000);
      }

    setTimeout(function() {
      let datanumber = Math.floor(Math.random() * 7)
      console.log("小盟广告随机上传点击数值", datanumber)
      if (datanumber == 2) {
          that.triggerEvent('click') //打开直接掉起广告
          console.log('--------------我是onload点击小盟广告------------')
          app.aldstat.sendEvent( "小盟广告自动点击", "组件" )
      }
      }, 2500);

    },
    clickAd(e) {
      console.warn("小盟广告组件自己点击clickAd", e)
      wx.setStorageSync('xmadstatus', 1)
      this.triggerEvent('click')
      app.aldstat.sendEvent( "小盟广告手动点击", "组件" )
    },
    complete() {},
    navSuc(e) {},
    close() {
      this.triggerEvent('close')
    },
    navFail(e) {
      console.log('errMsg:', e.detail.errMsg)
      let {
        errMsg
      } = e.detail
      let {
        adData,
        adID
      } = this.data
      if (errMsg.indexOf('not in navigateToMiniProgramAppIdList') !== -1) {
        wx.request({
          url: adData.baseURL + 'v1/api/skipfail',
          data: {
            appid: adData[adID].appid[1],
            appkey: adData[adID].ak
          },
          method: 'GET'
        })
      } else if (errMsg.indexOf('cancel') !== -1) {
        let obj = this.data.adData[this.data.adID]
        obj ? this.cancelJump(adData.baseURL, obj.curl) : (setTimeout(() => {
          this.cancelJump(adData.baseURL, obj ? obj.curl : '')
        }, 3000))
      } else if (errMsg.indexOf('fail to open') !== -1) {} else {}
    }
  }
});