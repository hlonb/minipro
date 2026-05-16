import { getOpenId } from '../../utils/cloudHelper';

Page({
  data: {
    openid: '',
  },
  async onShow() {
    this.getTabBar().init();
    const app = getApp();
    if (app.globalData.openid) {
      this.setData({ openid: app.globalData.openid });
      return;
    }
    this.setData({ openid: '获取中...' });
    const openid = await getOpenId();
    if (openid) {
      app.globalData.openid = openid;
      this.setData({ openid });
    } else {
      this.setData({ openid: '获取失败' });
    }
  },
  onCopyId() {
    wx.setClipboardData({
      data: this.data.openid,
      success() {
        wx.showToast({ title: '已复制ID', icon: 'success' });
      },
    });
  },
});
