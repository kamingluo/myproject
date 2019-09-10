// pages/group/user/userdetailed/userdetailed.js
Page({

  data: {
    model:false,
    minusStatus: '',

  },

  onLoad: function (options) {

  },

 
  /*点击减号*/
  bindMinus: function () {
    var num = this.data.num;
    if (num >= 1) {
      num--;
    }
    var minusStatus = num >= 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num >= 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },

/*点击修改分数*/
  showmodel:function(){
    this.setData({
      model: true
    })

  },

  /*点击取消*/
  hidemodal: function () {
    this.setData({
      model: false
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})