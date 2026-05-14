import { loadScriptById } from '../../utils/cloudHelper';

Page({
  data: {
    script: null,
    loading: true,
  },

  async onLoad(options) {
    const id = options.id;
    if (!id) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      this.setData({ loading: false });
      return;
    }
    try {
      const script = await loadScriptById(id);
      if (!script) {
        wx.showToast({ title: '剧本不存在', icon: 'none' });
      }
      this.setData({ script, loading: false });
    } catch (e) {
      console.error('loadScriptById fail:', e);
      this.setData({ loading: false });
    }
  },

  onPreviewImage(e) {
    const { url, urls } = e.currentTarget.dataset;
    wx.previewImage({ current: url, urls });
  },
});
