//index.js
//获取应用实例
const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');

Page({
  data: {
    "swiperdata":[],
    "informationdata":[],
    "miniappaddata":[],
  },
  onLoad: function(e) {
    this.indexData()
    this.miniappadData()
  },
  onShow: function() {

  },


 //查询首页数据
  indexData:function(){
    request({
      service: 'index/indexdata',
      method:'GET',
      success: res => {
        //console.log('首页轮播图数据', res.swiperdata);
        //console.log('首页信息流数据', res.informationdata);
        this.setData({
          swiperdata: res.swiperdata,
          informationdata: res.informationdata
        })
      }
    })
  },

 //点击轮播图
  clickSwiper:function(e){
    console.log("点击轮播图数据", e.currentTarget.dataset.data)
  },

  clickInformation:function(e){
    console.log("点击信息流数据", e.currentTarget.dataset.data)

  },


  miniappadData:function(){
    request({
      service: 'index/miniappad',
      method: 'GET',
      success: res => {
        //console.log('首页miniapp数据', res.miniappdata);
        this.setData({
           miniappaddata: res.miniappdata
        })
      }
    })

  },
  clickminiappad:function(e){
    console.log("点击miniappad", e.currentTarget.dataset.data)
  },








  onShareAppMessage: function(options) {
    // console.log("分享掉起", options)
    // if (options.from == 'button') {
    //   let expressName = options.target.dataset.name
    //   let expressNumber = options.target.dataset.number
    //   console.log("按钮分享", expressName, expressNumber)
    //   return share(1, expressName, expressNumber);
    // } else {
    //   return share(2);
    // }
  },


})