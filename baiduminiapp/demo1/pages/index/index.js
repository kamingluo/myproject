const app = getApp()
const baseConfig = require('./../../utils/config.js')
const common = require('./../../utils/common.js')
Page({
    data: {
        adlist: [],
        appid: "",
        feed: [],
        banner: []
    },
    onLoad() {
        let feed = common.havefeedsome()
        let banner = common.havebannersome()
        let adlist = common.updated()
        let appid = baseConfig.adappid
        this.setData({
            appid: appid,
            adlist: adlist,
            feed: feed,
            banner: banner
        });
    },
    clickcard(e) {
        let goods = e.currentTarget.dataset.data;
        let rand = Math.floor(Math.random() * (3)) + 1;
        if (rand == 1) {
            swan.navigateTo({
                url: '/pages/join/join?goodsName=' + goods.goodsName + '&goodsImage=' + goods.goodsImage + '&people=' + goods.people + '&time=' + goods.time
            });
        }
        else if (rand == 2) {
             swan.navigateTo({
                url: '/pages/join2/join2?goodsName=' + goods.goodsName + '&goodsImage=' + goods.goodsImage + '&people=' + goods.people + '&time=' + goods.time
            });
        }
        else {
             swan.navigateTo({
                url: '/pages/join3/join3?goodsName=' + goods.goodsName + '&goodsImage=' + goods.goodsImage + '&people=' + goods.people + '&time=' + goods.time
            });
        }
    }
});