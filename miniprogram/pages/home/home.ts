// pages/home/home.ts
import shuffle from '../../utils/shuffle';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    elements: [] as number[],
    status: 0,
    currentExpressionElement: 1,
    target: 25,
    time: '0',
    _timerStamp: 0,
    _timer: null as number | null,
    difficulty: 2,
    difficultyArray: ['简单3x3', '中等4x4', '困难5x5'],
    isStart: false,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.hideHomeButton();
    this.setData({
      elements: this._getNewShuffleElements(this.data.target),
      isStart: false,   
      time: '0',  
      status: 0, 
    });
  },
  onHide(){
    if (this.data._timer) clearInterval(this.data._timer);
  },

  async onTouchItem(event: any) {
    const { el } = event.currentTarget.dataset;

    if (el < this.data.currentExpressionElement) {
      console.log('close')
      return;
    }

    if (el == this.data.currentExpressionElement) {
      if (this.data.currentExpressionElement == this.data.target) {

        if (this.data._timer) clearInterval(this.data._timer);
        wx.showToast({
          title: `挑战成功，耗时${this.data.time}秒`,
          icon: 'none',
        });
        await wx.vibrateShort({
          type: 'heavy'
        });
        await new Promise((resolve, _) => {
          setTimeout(() => resolve(null), 300)
        })
        await wx.vibrateLong();
        this.setData({ currentExpressionElement: this.data.currentExpressionElement + 1 });
        return;
      }
      this.setData({ currentExpressionElement: this.data.currentExpressionElement + 1 });
    } else {
      wx.showToast({ title: '不是这一个', icon: 'none' });
      wx.vibrateShort({
        type: 'heavy'
      });
    }
  },
  _getNewShuffleElements(target: any) {
    return shuffle(Array.from({ length: target }, (_, k) => k + 1));
  },
  _start() {
    this.data._timerStamp = Date.now();
    this.setData({
      status: 1,
      time: '0',
    });
    this.data._timer = setInterval(() => {
      const now = Date.now();
      this.setData({
        time: (
          Number(this.data.time) +
          (now - this.data._timerStamp) / 1000
        ).toFixed(3),
      });
      this.data._timerStamp = Date.now();
    }, 300);
  },
  handleRestart() {
    if (this.data._timer) clearInterval(this.data._timer);

    this.setData({
      elements: this._getNewShuffleElements(this.data.target),
      time: '0',
      status: 0,
      currentExpressionElement: 1,
      isStart: false,
    });
  },
  bindDifficultyChange(event: any) {
    const value = Number(event.detail.value);
    if (this.data.difficulty === value) return;
    let target;
    switch (value) {
      case 0:
        target = 9;
        break;
      case 1:
        target = 16;
        break;
      case 2:
        target = 25;
        break;
    }
    this.setData({
      difficulty: value,
      target,
      elements: this._getNewShuffleElements(target),
      isStart: false,
    });
  },
  handleStartGame() {
    this.setData({
      isStart: true
    });
    this._start();
  }
});
