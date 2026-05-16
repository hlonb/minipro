import {
  loadStaffList, addStaff, deleteStaff,
  loadScriptList, addScript, deleteScript,
  uploadFile,
  loadShopInfo, saveShopInfo,
  getAdminList, addAdmin, removeAdmin,
} from '../../utils/cloudHelper';

Page({
  data: {
    staffList: [],
    scriptList: [],
    activeTab: 0,
    showAddDialog: false,
    dialogType: 'staff',
    newStaffName: '',
    newStaffAvatar: '',
    newStaffGender: '男',
    genderOptions: ['男', '女'],
    newScriptName: '',
    newScriptTags: '',
    newScriptDesc: '',
    newScriptPrice: '',
    newScriptImage: '',
    newScriptPlayerCount: '',
    newScriptMaleCount: '',
    newScriptFemaleCount: '',
    newScriptDuration: '',
    newScriptImages: [],
    selectedDifficulty: '',
    selectedRelease: [],
    selectedScriptType: [],
    selectedTagLabel: [],
    playerOptions: ['4', '5', '6', '7', '8', '9', '>=10'],
    difficultyOptions: ['新手', '进阶', '高阶'],
    releaseOptions: ['盒装', '独家', '城限', '实景', '全景', '其他', '微剧本'],
    typeOptions: ['情感', '机制', '推理', '换了', '阵营', '还原', '惊悚'],
    tagLabelOptions: ['新本', '人气', '预告'],
    showDeleteConfirm: false,
    deleteId: '',
    deleteName: '',
    deleteType: '',
    loading: true,
    shopInfo: {
      name: '',
      address: '',
      wechatId: '',
      phone: '',
    },
    showEditShopDialog: false,
    editShopName: '',
    editShopAddress: '',
    editShopWechatId: '',
    editShopPhone: '',
    shopSaving: false,
    adminList: [],
    showAddAdminDialog: false,
    newAdminOpenid: '',
    showRemoveAdminConfirm: false,
    removeAdminOpenid: '',
    removeAdminId: '',
  },

  async onShow() {
    const app = getApp();
    if (!app.globalData.isAdmin) {
      wx.showToast({ title: '仅管理员可访问此页面', icon: 'none', duration: 2000 });
      wx.switchTab({ url: '/pages/home/home' });
      return;
    }
    this.getTabBar().init();
    const [staffList, scriptList, shopInfo] = await Promise.all([
      loadStaffList(),
      loadScriptList(),
      loadShopInfo(),
    ]);
    const adminList = await getAdminList();
    this.setData({
      staffList, scriptList, shopInfo, adminList,
      loading: false,
      currentOpenid: app.globalData.openid,
    });
  },

  onTabChange(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab });
  },

  onShowAddStaff() {
    this.setData({
      showAddDialog: true,
      dialogType: 'staff',
      newStaffName: '',
      newStaffAvatar: '',
      newStaffGender: '男',
    });
  },

  onShowAddScript() {
    this.setData({
      showAddDialog: true,
      dialogType: 'script',
      newScriptName: '',
      newScriptTags: '',
      newScriptDesc: '',
      newScriptPrice: '',
      newScriptImage: '',
      newScriptPlayerCount: '',
      newScriptMaleCount: '',
      newScriptFemaleCount: '',
      newScriptDuration: '',
      newScriptImages: [],
      selectedDifficulty: '',
      selectedRelease: [],
      selectedScriptType: [],
      selectedTagLabel: [],
    });
  },

  onAddDialogClose() {
    this.setData({ showAddDialog: false });
  },

  onStaffNameInput(e) {
    this.setData({ newStaffName: e.detail.value });
  },

  onChooseAvatar() {
    wx.requirePrivacyAuthorize({
      success: () => {
        wx.chooseImage({
          count: 1,
          sourceType: ['album', 'camera'],
          success: async (res) => {
            const tempFilePath = res.tempFilePaths[0];
            const avatar = await uploadFile(tempFilePath, 'staff');
            this.setData({ newStaffAvatar: avatar });
          },
          fail: (err) => {
            console.error('chooseAvatar fail:', err);
            wx.showToast({ title: err.errMsg || '选择图片失败', icon: 'none', duration: 3000 });
          },
        });
      },
      fail: () => {
        wx.showToast({ title: '需要同意隐私协议才能选择图片', icon: 'none', duration: 3000 });
      },
    });
  },

  onSelectGender(e) {
    this.setData({ newStaffGender: e.currentTarget.dataset.value });
  },

  async onAddStaff() {
    const { newStaffName, newStaffAvatar, newStaffGender } = this.data;
    if (!newStaffName.trim()) {
      wx.showToast({ title: '请输入DM名称', icon: 'none' });
      return;
    }
    if (!newStaffAvatar) {
      wx.showToast({ title: '请选择头像', icon: 'none' });
      return;
    }
    try {
      const staffList = await addStaff(newStaffName.trim(), newStaffAvatar, newStaffGender);
      wx.showToast({ title: '添加成功', icon: 'success' });
      this.setData({ showAddDialog: false, staffList });
    } catch (e) {}
  },

  onScriptNameInput(e) {
    this.setData({ newScriptName: e.detail.value });
  },

  onScriptTagsInput(e) {
    this.setData({ newScriptTags: e.detail.value });
  },

  onScriptDescInput(e) {
    this.setData({ newScriptDesc: e.detail.value });
  },

  onScriptPriceInput(e) {
    this.setData({ newScriptPrice: e.detail.value });
  },

  onScriptPlayerCountInput(e) {
    this.setData({ newScriptPlayerCount: e.detail.value });
  },

  onScriptMaleCountInput(e) {
    this.setData({ newScriptMaleCount: e.detail.value });
  },

  onScriptFemaleCountInput(e) {
    this.setData({ newScriptFemaleCount: e.detail.value });
  },

  onScriptDurationInput(e) {
    this.setData({ newScriptDuration: e.detail.value });
  },

  onChooseScriptDetailImage() {
    wx.requirePrivacyAuthorize({
      success: () => {
        wx.chooseImage({
          count: 3,
          sourceType: ['album', 'camera'],
          success: async (res) => {
            for (const tempFilePath of res.tempFilePaths) {
              const fileID = await uploadFile(tempFilePath, 'scripts/detail');
              this.data.newScriptImages.push(fileID);
            }
            this.setData({ newScriptImages: [...this.data.newScriptImages] });
          },
          fail: (err) => {
            console.error('chooseScriptDetailImage fail:', err);
            wx.showToast({ title: err.errMsg || '选择图片失败', icon: 'none', duration: 3000 });
          },
        });
      },
      fail: () => {
        wx.showToast({ title: '需要同意隐私协议才能选择图片', icon: 'none', duration: 3000 });
      },
    });
  },

  onRemoveScriptDetailImage(e) {
    const { index } = e.currentTarget.dataset;
    this.data.newScriptImages.splice(index, 1);
    this.setData({ newScriptImages: [...this.data.newScriptImages] });
  },

  onSelectPlayerCount(e) {
    this.setData({ newScriptPlayerCount: e.currentTarget.dataset.value });
  },

  onSelectDifficulty(e) {
    this.setData({ selectedDifficulty: e.currentTarget.dataset.value });
  },

  toggleMultiSelect(field, value) {
    const list = [...this.data[field]];
    const idx = list.indexOf(value);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(value);
    }
    this.setData({ [field]: list });
  },

  onSelectRelease(e) {
    this.toggleMultiSelect('selectedRelease', e.currentTarget.dataset.value);
  },

  onSelectScriptType(e) {
    this.toggleMultiSelect('selectedScriptType', e.currentTarget.dataset.value);
  },

  onSelectTagLabel(e) {
    this.toggleMultiSelect('selectedTagLabel', e.currentTarget.dataset.value);
  },

  onChooseScriptImage() {
    wx.requirePrivacyAuthorize({
      success: () => {
        wx.chooseImage({
          count: 1,
          sourceType: ['album', 'camera'],
          success: async (res) => {
            const tempFilePath = res.tempFilePaths[0];
            const image = await uploadFile(tempFilePath, 'scripts');
            this.setData({ newScriptImage: image });
          },
          fail: (err) => {
            console.error('chooseScriptImage fail:', err);
            wx.showToast({ title: err.errMsg || '选择图片失败', icon: 'none', duration: 3000 });
          },
        });
      },
      fail: () => {
        wx.showToast({ title: '需要同意隐私协议才能选择图片', icon: 'none', duration: 3000 });
      },
    });
  },

  async onAddScript() {
    const { newScriptName, newScriptTags, newScriptDesc, newScriptPrice, newScriptImage, newScriptPlayerCount, newScriptMaleCount, newScriptFemaleCount, newScriptDuration, newScriptImages } = this.data;
    if (!newScriptName.trim()) {
      wx.showToast({ title: '请输入剧本名称', icon: 'none' });
      return;
    }
    if (!newScriptPrice.trim()) {
      wx.showToast({ title: '请输入价格', icon: 'none' });
      return;
    }
    if (!newScriptImage) {
      wx.showToast({ title: '请选择剧本图片', icon: 'none' });
      return;
    }
    const tags = newScriptTags.trim() ? newScriptTags.trim().split(/[,，\s]+/) : [];
    try {
      const scriptList = await addScript({
        name: newScriptName.trim(),
        tags,
        desc: newScriptDesc.trim(),
        price: newScriptPrice.trim(),
        image: newScriptImage,
        playerCount: (parseInt(newScriptMaleCount) || 0) + (parseInt(newScriptFemaleCount) || 0),
        maleCount: parseInt(newScriptMaleCount) || 0,
        femaleCount: parseInt(newScriptFemaleCount) || 0,
        duration: newScriptDuration.trim(),
        images: newScriptImages,
        difficulty: this.data.selectedDifficulty,
        releaseType: this.data.selectedRelease,
        type: this.data.selectedScriptType,
        tagLabel: this.data.selectedTagLabel,
      });
      wx.showToast({ title: '添加成功', icon: 'success' });
      this.setData({ showAddDialog: false, scriptList });
    } catch (e) {}
  },

  onDeleteItem(e) {
    const { id, name, type } = e.currentTarget.dataset;
    this.setData({
      showDeleteConfirm: true,
      deleteId: id,
      deleteName: name,
      deleteType: type,
    });
  },

  onDeleteConfirmClose() {
    this.setData({ showDeleteConfirm: false });
  },

  async onConfirmDelete() {
    const { deleteId, deleteType } = this.data;
    try {
      if (deleteType === 'staff') {
        const staffList = await deleteStaff(deleteId);
        wx.showToast({ title: '删除成功', icon: 'success' });
        this.setData({ showDeleteConfirm: false, staffList });
      } else {
        const scriptList = await deleteScript(deleteId);
        wx.showToast({ title: '删除成功', icon: 'success' });
        this.setData({ showDeleteConfirm: false, scriptList });
      }
    } catch (e) {
      this.setData({ showDeleteConfirm: false });
    }
  },

  noop() {},

  onShowEditShop() {
    const { shopInfo } = this.data;
    this.setData({
      showEditShopDialog: true,
      editShopName: shopInfo.name,
      editShopAddress: shopInfo.address,
      editShopWechatId: shopInfo.wechatId,
      editShopPhone: shopInfo.phone,
    });
  },

  onEditShopDialogClose() {
    this.setData({ showEditShopDialog: false });
  },

  onEditShopNameInput(e) {
    this.setData({ editShopName: e.detail.value });
  },
  onEditShopAddressInput(e) {
    this.setData({ editShopAddress: e.detail.value });
  },
  onEditShopWechatIdInput(e) {
    this.setData({ editShopWechatId: e.detail.value });
  },
  onEditShopPhoneInput(e) {
    this.setData({ editShopPhone: e.detail.value });
  },

  async onSaveShopInfo() {
    const { editShopName, editShopAddress, editShopWechatId, editShopPhone } = this.data;
    if (!editShopName.trim()) {
      wx.showToast({ title: '请输入店铺名称', icon: 'none' });
      return;
    }
    if (!editShopPhone.trim()) {
      wx.showToast({ title: '请输入联系电话', icon: 'none' });
      return;
    }
    this.setData({ shopSaving: true });
    try {
      const newShopInfo = {
        name: editShopName.trim(),
        address: editShopAddress.trim(),
        wechatId: editShopWechatId.trim(),
        phone: editShopPhone.trim(),
      };
      await saveShopInfo(newShopInfo);
      wx.showToast({ title: '保存成功', icon: 'success' });
      this.setData({
        showEditShopDialog: false,
        shopSaving: false,
        shopInfo: newShopInfo,
      });
    } catch (e) {
      this.setData({ shopSaving: false });
    }
  },

  onShowAddAdmin() {
    this.setData({ showAddAdminDialog: true, newAdminOpenid: '' });
  },

  onAddAdminDialogClose() {
    this.setData({ showAddAdminDialog: false });
  },

  onAdminOpenidInput(e) {
    this.setData({ newAdminOpenid: e.detail.value });
  },

  async onAddAdminConfirm() {
    const { newAdminOpenid } = this.data;
    if (!newAdminOpenid.trim()) {
      wx.showToast({ title: '请输入用户openid', icon: 'none' });
      return;
    }
    try {
      const adminList = await addAdmin(newAdminOpenid.trim());
      wx.showToast({ title: '添加成功', icon: 'success' });
      this.setData({ showAddAdminDialog: false, adminList });
    } catch (e) {}
  },

  onRemoveAdmin(e) {
    const { openid, id } = e.currentTarget.dataset;
    const app = getApp();
    if (openid === app.globalData.openid) {
      wx.showToast({ title: '不能移除自己', icon: 'none' });
      return;
    }
    this.setData({
      showRemoveAdminConfirm: true,
      removeAdminOpenid: openid,
      removeAdminId: id,
    });
  },

  onRemoveAdminConfirmClose() {
    this.setData({ showRemoveAdminConfirm: false });
  },

  async onConfirmRemoveAdmin() {
    const { removeAdminOpenid } = this.data;
    try {
      const adminList = await removeAdmin(removeAdminOpenid);
      wx.showToast({ title: '移除成功', icon: 'success' });
      this.setData({ showRemoveAdminConfirm: false, adminList });
    } catch (e) {
      this.setData({ showRemoveAdminConfirm: false });
    }
  },
});
