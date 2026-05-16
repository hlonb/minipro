import updateManager from './common/updateManager';
import { getOpenId, isAdmin } from './utils/cloudHelper';

App({
  globalData: {
    openid: null,
    isAdmin: false,
    adminReady: false,
  },
  onLaunch: async function () {
    wx.cloud.init({ env: 'cloud1-d9g3205nj4da44e0f', traceUser: true });
    const openid = await getOpenId();
    if (openid) {
      this.globalData.openid = openid;
      this.globalData.isAdmin = await isAdmin(openid);
    }
    this.globalData.adminReady = true;
  },
  onShow: function () {
    updateManager();
  },
});
