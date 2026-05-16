import { getOpenId, uploadFile } from '../../utils/cloudHelper';

Page({
  data: {
    openid: '',
    avatarUrl: '',
    nickName: '点击登录',
    phone: '',
    showLoginDialog: false,
    loginAvatarUrl: '',
    loginNickName: '',
    loginPhone: '',
  },
  async onShow() {
    this.getTabBar().init();
    const app = getApp();
    const userInfo = wx.getStorageSync('user_info') || {};
    const isLoggedIn = userInfo.nickName && userInfo.nickName !== '点击登录';
    this.setData({
      avatarUrl: userInfo.avatarUrl || '',
      nickName: isLoggedIn ? userInfo.nickName : '点击登录',
      phone: userInfo.phone || '',
    });
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
  onTapLogin() {
    const userInfo = wx.getStorageSync('user_info') || {};
    if (userInfo.nickName && userInfo.nickName !== '点击登录') {
      return;
    }
    this.setData({
      showLoginDialog: true,
      loginAvatarUrl: userInfo.avatarUrl || '',
      loginNickName: userInfo.nickName || '',
      loginPhone: userInfo.phone || '',
    });
  },
  onLoginDialogClose() {
    this.setData({ showLoginDialog: false });
  },
  onChooseAvatar(e) {
    const tempUrl = e.detail.avatarUrl;
    if (!tempUrl) return;
    this.setData({ loginAvatarUrl: tempUrl });
  },
  onLoginNickNameInput(e) {
    this.setData({ loginNickName: e.detail.value });
  },
  onGetPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      wx.showToast({ title: '企业认证小程序才能获取真实手机号，当前为演示', icon: 'none', duration: 3000 });
    }
  },
  async onLoginConfirm() {
    const { loginNickName, loginAvatarUrl } = this.data;
    if (!loginNickName || !loginNickName.trim()) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }
    let avatarUrl = loginAvatarUrl;
    if (avatarUrl && avatarUrl.startsWith('http://tmp') || avatarUrl && avatarUrl.startsWith('wxfile://')) {
      try {
        avatarUrl = await uploadFile(avatarUrl, 'user');
      } catch (e) {
        console.error('upload avatar fail:', e);
      }
    }
    const userInfo = {
      avatarUrl: avatarUrl,
      nickName: loginNickName.trim(),
      phone: this.data.loginPhone || '',
    };
    wx.setStorageSync('user_info', userInfo);
    this.setData({
      showLoginDialog: false,
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      phone: userInfo.phone,
    });
    wx.showToast({ title: '登录成功', icon: 'success' });
  },
  onGoSettings() {
    wx.navigateTo({ url: '/pages/mine-settings/index' });
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
