const baseConfig = require('./../../utils/config.js')
Page({
    data: {
        goods: {},
        appid: "",
        feed: [],
        banner: []
    },
    onLoad: function (e) {
        let appid = baseConfig.adappid
        let feed = baseConfig.join.feed
        let banner = baseConfig.join.banner
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