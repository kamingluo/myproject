const baseConfig = require('./../../utils/config.js')
const common = require('./../../utils/common.js')
Page({
    data: {
        currentTab: 0,
        appid: "",
        feed: [],
        banner: [],
        score: null,
        sign: false
    },
    onLoad: function () {
        let appid = baseConfig.adappid
       let feed=common.havefeedsome()
        let banner=common.havebannersome()
        this.setData({
            appid: appid,
            feed: feed,
            banner: banner
        });
    },

    onShow: function () {
        let score = swan.getStorageSync("score");
        let sign = swan.getStorageSync("sign");
        this.setData({
            score: score,
            sign: sign
        });
    },
    sign() {
        let score = this.data.score + 1
        this.setData({
            score: score,
            sign: false
        });
        swan.showToast({
            title: '签到成功',
            icon: 'success',
            mask: false,
            duration: 2000,
        })
        swan.setStorageSync("score", score);
        swan.setStorageSync("sign", false);
    },
    //  tab切换逻辑
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    bindChange: function (e) {
        var that = this;
        that.setData({ currentTab: e.detail.current });
    },
})