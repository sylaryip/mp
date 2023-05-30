// pages/login/login.ts

function handleGetSessionSuccess() {
  return new Promise<void>((resolve, _) => {
    setTimeout(() => {
      wx.switchTab({ url: '/pages/home/home' });
      resolve();
    }, 200);
  });
}

Page({
  data: {
    isOpenPhoneLogin: false,
  },
  showPhoneLogin() {
    this.setData({ isOpenPhoneLogin: true });
  },
  async handlePhoneLogin() {
    wx.showLoading({
      title: '登录中',
      mask: true,
    });
    await handleGetSessionSuccess();
    wx.hideLoading();
    this.selectComponent('#countdown').clearInterval();
  },
  handleWeChatLogin() {
    this.setData({ isOpenPhoneLogin: false });
    wx.showLoading({
      title: '登录中',
      mask: true,
    });

    wx.login({
      success: async (res) => {
        console.log(res.code);
        // 通过这个 code
        // 后端请求 wx 的接口确认登录 https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        // 模拟后台成功做跳转

        await handleGetSessionSuccess();
        wx.hideLoading();
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '登录失败',
        });
      },
    });
  },

  handleShowAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/agreement',
    });
  },
});
