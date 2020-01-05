const app = getApp()
const baseConfig = require('./../../utils/config.js')
Page({
    data: {
        adlist:[],
        appid: "",
        feed: [],
        banner: []
    },
    onLoad(){
        let appid=baseConfig.adappid
        let adlist=baseConfig.adlist
        let feed=baseConfig.index.feed
        let banner=baseConfig.index.banner
         this.setData({
            appid: appid,
            adlist: adlist,
            feed: feed,
            banner: banner
        });
    },
    clickcard(e){
        let goods=e.currentTarget.dataset.data;
         swan.navigateTo({
            url: '/pages/join/join?goodsName='+goods.goodsName +'&goodsImage='+ goods.goodsImage +'&people='+ goods.people +'&time='+ goods.time
        });
    }
});