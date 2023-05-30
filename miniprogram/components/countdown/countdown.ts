// components/countdown/countdown.ts
let timer: number | null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    value: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clearInterval() {
      if (timer != null) {
        this.setData({value: 0});
        clearInterval(timer);
        timer = null;
      }
    },
    handleFetchVerifyCode() {
      wx.showToast({
        title: '验证码已发送',
      });
      this.setData({ value: 60 });

      timer = setInterval(() => {
        if (this.data.value > 0) {
          this.setData({ value: this.data.value - 1 });
        } else {
          this.clearInterval();
        }
      }, 1000);
    },
  },
});
