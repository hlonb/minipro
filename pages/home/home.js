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

  onAvatarPreview(e) {
    const { url } = e.currentTarget.dataset;
    const urls = this.data.staffList.map(s => s.avatar);
    wx.previewImage({ current: url, urls });
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
