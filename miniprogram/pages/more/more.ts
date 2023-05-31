// pages/home/home.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    _timer: null as Number | null,
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const query = wx.createSelectorQuery();
    query
      .select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        // ctx.scale(dpr, dpr);

        console.log(canvas.width, canvas.height);
        this.data._timer = setInterval(() => {
          this.initClock(ctx, canvas.width, canvas.height);
        }, 1000);
      });
  },

  onUnload() {
    if (typeof this.data._timer == 'number') {
      clearInterval(this.data._timer);
    }
  },

  initClock(ctx: any, width: number, height: number) {
    ctx.clearRect(0, 0, width, height);
    ctx.save();

    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      ctx.moveTo(120, 0);
      ctx.lineTo(150, 0);
      ctx.stroke();
      ctx.rotate(Math.PI / 6);
    }
    ctx.restore();

    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 8;
    ctx.rotate(this.calcHourRotate(hour, minute, second));
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 4;
    ctx.rotate(this.calcMinuteRotate(minute, second));
    ctx.moveTo(-20, 0);
    ctx.lineTo(90, 0);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.rotate(this.calcSecondRotate(second));
    ctx.moveTo(-20, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  },

  calcHourRotate(hour: number, minute: number, second: number) {
    return (
      hour * (Math.PI / 6) +
      minute * (Math.PI / 360) +
      second * (Math.PI / 3600)
    );
  },
  calcMinuteRotate(minute: number, second: number) {
    return minute * (Math.PI / 30) + second * (Math.PI / 1800);
  },
  calcSecondRotate(second: number) {
    return second * (Math.PI / 30);
  },
});
