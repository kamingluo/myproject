const noLaunchType = [
  "contact",
  "getUserInfo",
  "share"
];

let preventShake = 0;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否阻止冒泡
    "catch": {
      type: String,
      value: ""
    },
    //按钮类型
    "openType": {
      type: String,
      value: ''
    },
    //跳转补充参数
    "extraData": {
      type: String,
      value: "{}"
    },
    //自定义点击事件名
    "event": {
      type: String,
      value: ""
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    catch: '',
    url: '',
    title: '',
    openType: '',
    needLogin: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //阻止冒泡
    catchtap(e) {
      return false
    },
    //获取formid
    formSubmit(e) {
      console.log("点击组件获得formId", e.detail.formId)
      //formId

    },
    //点击事件
    tapEvent(e) {
      //防止快速多次触发
      const nowTime = Date.now();
      if (nowTime - preventShake < 500) {
        return
      }
      preventShake = nowTime;

      //触发点击回调
      this.triggerEvent('click', e, {});
    },

  }
})