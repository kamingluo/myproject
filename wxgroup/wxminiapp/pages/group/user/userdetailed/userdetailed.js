
const {
  request
} = require('./../../../../utils/request.js');
const app = getApp();

Page({

  data: {
    role:0,//角色
    model:false,
    minusStatus: '',
    crowd_id:'',
    user_id:'',
    userdata:null,
    birthday:'',
    num:'',
    userscore:'',


  },

  onLoad: function (options) {
    console.log(options)

    this.setData({
      role: options.role,
      crowd_id: options.crowd_id,
      user_id: options.user_id,
    })


    this.userdata()

  },



  userdata: function (e) {
    var that = this
    var crowd_id = this.data.crowd_id
    var user_id = this.data.user_id
    request({
      service: 'group/handlegroup/querygroupuserdata',
      method: 'GET',
      data: {
        crowd_id: crowd_id,
        user_id: user_id,
      },
      success: res => {
        console.log("查询该群该用户的详细信息", res)
        that.setData({
          userdata: res.querygroupuserdata[0],
          num: res.querygroupuserdata[0].score,
          userscore:res.querygroupuserdata[0].score,
        })
        that.birthday(res.querygroupuserdata[0].birthday)
      },
    })

  },



  birthday: function (e) {
    if (e) {
      var temp = new Date(e);
      var t = temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate(); //去除时分秒
      var format = t.replace(/-/g, '/');
      this.setData({
        birthday: format,
      })
    }

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

 /*点击确定*/
  sure:function(){
    var that = this
    var crowd_id = this.data.crowd_id
    var user_id = this.data.user_id
    var score = this.data.num
    request({
      service: 'group/handlegroup/updateusergroupscore',
      data: {
        crowd_id: crowd_id,
        user_id: user_id,
        score: score
      },
      success: res => {
        that.setData({
          model: false,
          userscore: score
        })
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
        })
      },
    })
  },


 /**
   * 设置群管理员
   */

  setupadministrators: function () {
    var that = this
    var crowd_id = this.data.crowd_id
    var user_id = this.data.user_id
    request({
      service: 'group/handlegroup/setupadministrators',
      data: {
        crowd_id: crowd_id,
        user_id: user_id,
      },
      success: res => {
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 2000,
        })
        that.userdata()
      },
    })
  },

 /**
   * 取消群管理员
   */

  canceladministrators: function () {
    var that = this
    var crowd_id = this.data.crowd_id
    var user_id = this.data.user_id
    request({
      service: 'group/handlegroup/canceladministrators',
      data: {
        crowd_id: crowd_id,
        user_id: user_id,
      },
      success: res => {
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000,
        })
        that.userdata()
      },
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})