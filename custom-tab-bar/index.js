import TabMenu from './data';
Component({
  data: {
    active: 0,
    list: [],
  },

  lifetimes: {
    attached() {
      this._updateList();
    },
  },

  methods: {
    _updateList() {
      const app = getApp();
      if (!app.globalData.adminReady) {
        setTimeout(() => this._updateList(), 300);
        return;
      }
      const isAdmin = app.globalData.isAdmin;
      const filtered = isAdmin ? TabMenu : TabMenu.filter(item => item.text !== '管理');
      this.setData({ list: filtered });
    },

    onChange(event) {
      this.setData({ active: event.detail.value });
      wx.switchTab({
        url: this.data.list[event.detail.value].url.startsWith('/')
          ? this.data.list[event.detail.value].url
          : `/${this.data.list[event.detail.value].url}`,
      });
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const app = getApp();
      const isAdmin = app.globalData.isAdmin;
      const filtered = isAdmin ? TabMenu : TabMenu.filter(item => item.text !== '管理');
      const active = filtered.findIndex(
        (item) =>
          (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
          `${route}`,
      );
      this.setData({ list: filtered, active });
    },
  },
});
