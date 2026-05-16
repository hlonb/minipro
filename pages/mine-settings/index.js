import { uploadFile } from '../../utils/cloudHelper';

Page({
  data: {
    avatarUrl: '',
    nickName: '',
    phone: '',
  },
  onLoad() {
    const userInfo = wx.getStorageSync('user_info') || {};
    this.setData({
      avatarUrl: userInfo.avatarUrl || '',
      nickName: userInfo.nickName || '',
      phone: userInfo.phone || '',
    });
  },
  onChooseAvatar() {
    wx.requirePrivacyAuthorize({
      success: () => {
        wx.chooseMedia({
          count: 1,
          mediaType: ['image'],
          sourceType: ['album', 'camera'],
          success: async (res) => {
            const tempFilePath = res.tempFiles[0].tempFilePath;
            const fileID = await uploadFile(tempFilePath, 'user');
            this.setData({ avatarUrl: fileID });
            this._saveLocal();
          },
          fail: (err) => {
            console.error('chooseAvatar fail:', err);
          },
        });
      },
      fail: () => {
        wx.showToast({ title: '需要同意隐私协议', icon: 'none', duration: 3000 });
      },
    });
  },
  onNicknameInput(e) {
    this.setData({ nickName: e.detail.value });
  },
  onNicknameConfirm() {
    this._saveLocal();
  },
  onGetPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      wx.showToast({ title: '企业认证小程序才能获取真实手机号', icon: 'none', duration: 3000 });
    } else {
      wx.showToast({ title: '获取手机号失败', icon: 'none' });
    }
  },
  _saveLocal() {
    const { avatarUrl, nickName, phone } = this.data;
    wx.setStorageSync('user_info', { avatarUrl, nickName, phone });
  },
  onSave() {
    const { nickName } = this.data;
    if (!nickName.trim()) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }
    this._saveLocal();
    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 1500);
  },
});
