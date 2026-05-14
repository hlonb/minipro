Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '联系商家',
    },
    content: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: 'wechat',
    },
  },

  methods: {
    onClose() {
      this.setData({ show: false });
      this.triggerEvent('close');
    },

    onCopy() {
      wx.setClipboardData({
        data: this.data.content,
        success: () => {
          wx.showToast({
            title: this.data.type === 'wechat' ? '微信号已复制' : '电话号码已复制',
            icon: 'success',
          });
        },
      });
    },
  },
});
