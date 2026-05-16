import { loadStaffList, loadScriptList, initSeedData, loadShopInfo } from '../../utils/cloudHelper';

Page({
  data: {
    shopInfo: {
      name: '',
      address: '',
      wechatId: '',
      phone: '',
    },
    staffList: [],
    scriptList: [],
    currentScriptIndex: 0,
    showWechatPopup: false,
    showPhonePopup: false,
  },

  async onShow() {
    this.getTabBar().init();
    await initSeedData();
    const [shopInfo, staffList, scriptList] = await Promise.all([
      loadShopInfo(),
      loadStaffList(),
      loadScriptList(),
    ]);
    this.setData({
      shopInfo,
      staffList,
      scriptList,
      currentScriptIndex: 0,
    });
  },

  onWechatReserve() {
    this.setData({ showWechatPopup: true });
  },

  onPhoneReserve() {
    this.setData({ showPhonePopup: true });
  },

  onWechatPopupClose() {
    this.setData({ showWechatPopup: false });
  },

  onPhonePopupClose() {
    this.setData({ showPhonePopup: false });
  },

  async onAvatarPreview(e) {
    const { url } = e.currentTarget.dataset;
    if (!url) return;
    let previewUrl = url;
    const urls = this.data.staffList.map(s => s.avatar).filter(Boolean);
    if (url.startsWith('cloud://') || urls.some(u => u.startsWith('cloud://'))) {
      try {
        const res = await wx.cloud.getTempFileURL({ fileList: urls });
        const map = {};
        for (const f of res.fileList) map[f.fileID] = f.tempFileURL;
        previewUrl = map[url] || url;
        urls = urls.map(u => map[u] || u);
      } catch (err) {}
    }
    wx.previewImage({ current: previewUrl, urls });
  },

  onScriptDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/script-detail/index?id=${id}` });
  },

  onScriptImageClick(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({ currentScriptIndex: index });
  },
});
