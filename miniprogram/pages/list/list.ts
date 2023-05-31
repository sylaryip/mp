// pages/home/home.ts
Page({
  data: {
    inputValue: '',
    listArr: [
      { id: 1, title: '告诉老墨，我要吃鱼！' },
      { id: 2, title: '咖啡不用冲，早晚会成功' },
      { id: 3, title: '读孙子兵法，品启强人生' },
    ],
  },

  onSubmit() {
    this.setData({
      listArr: [
        ...this.data.listArr,
        { id: Math.floor(Math.random() * 10000), title: this.data.inputValue },
      ],
      inputValue: '',
    });
  },

  clickClose(e: any) {
    const { index } = e.currentTarget.dataset;
    this.data.listArr.splice(index, 1);
    this.setData({
      listArr: this.data.listArr,
    });
  },
});
