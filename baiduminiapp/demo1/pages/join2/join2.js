const baseConfig = require('./../../utils/config.js')
const common = require('./../../utils/common.js')
Page({
    data: {
        goods: {},
        appid: "",
        feed: [],
        banner: [],
        setInter: '',
        time: 0,
    },
    onShow: function (e) {
        this.startSetInter()
        this.setData({
            time: 0
        });
    },

    startSetInter() {
        var that = this;
        //将计时器赋值给setInter
        that.data.setInter = setInterval(
            function () {
                if (that.data.time > 20) {
                    that.endSetInter()
                }
                else {
                    var timeVal = that.data.time + 1;
                }
                that.setData({
                    time: timeVal
                });
            }
            , 1000);
    },

    endSetInter() {
        var that = this;
        clearInterval(that.data.setInter)
        swan.navigateBack({//返回
            delta: 1
        })
    },
    onHide: function () {
        var that = this;
        clearInterval(that.data.setInter)
    },
    onUnload: function () {
        var that = this;
        clearInterval(that.data.setInter)
    },

    onLoad: function (e) {
        let feed = common.havefeedsome()
        let banner = common.havebannersome()
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