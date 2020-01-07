const baseConfig = require('./../../utils/config.js')
const common = require('./../../utils/common.js')
Page({
    data: {
        goods: {},
        appid: "",
        feed: [],
        banner: []
    },
    onLoad: function (e) {

        let feed=common.havefeedsome()
        let banner=common.havebannersome()
        let appid = baseConfig.adappid
        this.setData({
            appid: appid,
            feed: feed,
            banner: banner,
            goods: e
        });
    },
    clickbutton() {
        swan.showToast({
            title: '参与成功',
            icon: 'success',
            mask: false,
            duration: 3000,
        })
    }
});