import { loadScriptList } from '../../utils/cloudHelper';

const playerOptions = ['全部', '4', '5', '6', '7', '8', '9', '>=10'];
const difficultyOptions = ['全部', '新手', '进阶', '高阶'];
const releaseOptions = ['全部', '盒装', '独家', '城限', '实景', '全景', '其他', '微剧本'];
const typeOptions = ['全部', '情感', '机制', '推理', '换了', '阵营', '还原', '惊悚'];
const tagOptions = ['全部', '新本', '人气', '预告'];

Page({
  data: {
    scriptList: [],
    filteredList: [],
    playerOptions,
    difficultyOptions,
    releaseOptions,
    typeOptions,
    tagOptions,
    selectedPlayer: '全部',
    selectedDifficulty: '全部',
    selectedRelease: [],
    selectedType: [],
    selectedTag: [],
  },

  async onShow() {
    this.getTabBar().init();
    const scriptList = await loadScriptList();
    this.setData({ scriptList });
    this.applyFilters();
  },

  onFilterPlayer(e) {
    this.setData({ selectedPlayer: e.currentTarget.dataset.value });
    this.applyFilters();
  },

  onFilterDifficulty(e) {
    this.setData({ selectedDifficulty: e.currentTarget.dataset.value });
    this.applyFilters();
  },

  toggleFilter(field, value) {
    if (value === '全部') {
      this.setData({ [field]: [] });
    } else {
      const list = [...this.data[field]];
      const idx = list.indexOf(value);
      if (idx >= 0) {
        list.splice(idx, 1);
      } else {
        list.push(value);
      }
      this.setData({ [field]: list });
    }
    this.applyFilters();
  },

  onFilterRelease(e) {
    this.toggleFilter('selectedRelease', e.currentTarget.dataset.value);
  },

  onFilterType(e) {
    this.toggleFilter('selectedType', e.currentTarget.dataset.value);
  },

  onFilterTag(e) {
    this.toggleFilter('selectedTag', e.currentTarget.dataset.value);
  },

  applyFilters() {
    const { scriptList, selectedPlayer, selectedDifficulty, selectedRelease, selectedType, selectedTag } = this.data;
    const filtered = scriptList.filter(item => {
      if (selectedPlayer !== '全部') {
        const target = selectedPlayer === '>=10' ? 10 : parseInt(selectedPlayer);
        if (selectedPlayer === '>=10') {
          if ((item.playerCount || 0) < 10) return false;
        } else {
          if ((item.playerCount || 0) !== target) return false;
        }
      }
      if (selectedDifficulty !== '全部' && (item.difficulty || '') !== selectedDifficulty) return false;
      if (selectedRelease.length > 0) {
        const itemArr = item.releaseType || [];
        if (!selectedRelease.some(s => itemArr.indexOf(s) >= 0)) return false;
      }
      if (selectedType.length > 0) {
        const itemArr = item.type || [];
        if (!selectedType.some(s => itemArr.indexOf(s) >= 0)) return false;
      }
      if (selectedTag.length > 0) {
        const itemArr = item.tagLabel || [];
        if (!selectedTag.some(s => itemArr.indexOf(s) >= 0)) return false;
      }
      return true;
    });
    this.setData({ filteredList: filtered });
  },

  onScriptDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/script-detail/index?id=${id}` });
  },
});
