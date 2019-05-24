Component({
    properties: {
        adData: Object,
    },
    attached: function () {
      //console.warn("看看是不是加载就出现了")
      var wladscore = wx.getStorageSync("appconfig").wladscore
      if (wladscore==null){
        var wladscore = 0
      }

        this.setData({
            adID: this.dataset.id,
          wladscore: wladscore
        });
    },
    methods: {
        clickAd(e) {
          console.warn("组件微量统计")
     
            if(e.currentTarget.dataset.type==='insert'){
                this.triggerEvent('close')
            }
            this.triggerEvent('click');
        },
        close() {
            this.triggerEvent('close')
        }
    }
});