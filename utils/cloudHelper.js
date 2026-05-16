const STAFF_KEY = 'staff_list';
const SCRIPT_KEY = 'script_list';
const SEED_KEY = 'seed_v3';
const SHOP_KEY = 'shop_info';

const defaultShopInfo = {
  name: '迷雾剧本杀体验馆',
  address: '北京市朝阳区望京SOHO T3 2308室',
  wechatId: 'AIlife_Y89',
  phone: '13800138000',
};

const seedScripts = [
  {
    name: '迷雾之城',
    tags: ['悬疑', '推理', '硬核'],
    desc: '一座被迷雾笼罩的城市，隐藏着不为人知的秘密。六位身份各异的住客，在一个暴雨之夜被锁在了老宅之中，谁才是真正的凶手？',
    price: '128',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner1.png',
    playerCount: 6,
    maleCount: 3,
    femaleCount: 3,
    duration: '4-5小时',
    images: [],
    difficulty: '高阶',
    releaseType: ['城限'],
    type: ['推理'],
    tagLabel: ['人气'],
  },
  {
    name: '古堡惊魂',
    tags: ['恐怖', '惊悚', '沉浸'],
    desc: '传说中无人敢靠近的古堡，今夜你却踏入了其中。走廊尽头传来低沉的吟唱，黑暗中似乎有什么东西在注视着你……',
    price: '158',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner2.png',
    playerCount: 7,
    maleCount: 4,
    femaleCount: 3,
    duration: '5-6小时',
    images: [],
    difficulty: '进阶',
    releaseType: ['独家'],
    type: ['惊悚', '推理'],
    tagLabel: ['新本'],
  },
  {
    name: '长安幻夜',
    tags: ['古风', '情感', '还原'],
    desc: '大唐盛世的长安城，夜色中却暗流涌动。一段跨越十年的爱恨纠葛，在月下缓缓展开，真相究竟是什么？',
    price: '98',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner3.png',
    playerCount: 5,
    maleCount: 2,
    femaleCount: 3,
    duration: '3-4小时',
    images: [],
    difficulty: '新手',
    releaseType: ['盒装'],
    type: ['情感', '还原'],
    tagLabel: ['人气'],
  },
  {
    name: '星际迷航',
    tags: ['科幻', '冒险', '机制'],
    desc: '星际飞船"曙光号"在深空遭遇未知信号，船员们必须合力破解谜题才能返航。但有人暗中破坏了系统……',
    price: '138',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner4.png',
    playerCount: 8,
    maleCount: 5,
    femaleCount: 3,
    duration: '5-6小时',
    images: [],
    difficulty: '进阶',
    releaseType: ['城限'],
    type: ['机制', '推理'],
    tagLabel: ['预告'],
  },
  {
    name: '校园往事',
    tags: ['青春', '情感', '治愈'],
    desc: '毕业十年后重回校园，昔日好友再度重逢。那些未说出口的话、未解开的误会，在回忆中一一浮现。',
    price: '88',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner5.png',
    playerCount: 4,
    maleCount: 2,
    femaleCount: 2,
    duration: '3-4小时',
    images: [],
    difficulty: '新手',
    releaseType: ['盒装'],
    type: ['情感'],
    tagLabel: ['新本'],
  },
  {
    name: '暗巷追踪',
    tags: ['悬疑', '推理', '阵营'],
    desc: '城市暗巷中发生了连环失踪案，侦探与嫌疑人各自隐藏身份，一场信任与背叛的博弈即将展开。',
    price: '108',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner6.png',
    playerCount: 9,
    maleCount: 5,
    femaleCount: 4,
    duration: '4-5小时',
    images: [],
    difficulty: '高阶',
    releaseType: ['独家'],
    type: ['阵营', '推理'],
    tagLabel: ['人气'],
  },
  {
    name: '幽灵列车',
    tags: ['惊悚', '沉浸', '还原'],
    desc: '午夜列车上发生了一系列诡异事件，乘客们被困在车厢中无法逃离，真相藏在每一个人的回忆之中。',
    price: '168',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner1.png',
    playerCount: 10,
    maleCount: 5,
    femaleCount: 5,
    duration: '5-6小时',
    images: [],
    difficulty: '高阶',
    releaseType: ['实景'],
    type: ['惊悚', '还原'],
    tagLabel: ['预告'],
  },
  {
    name: '江湖风云录',
    tags: ['古风', '阵营', '机制'],
    desc: '武林各大门派齐聚少林，一场惊天阴谋即将揭开。谁能在这场江湖风云中笑到最后？',
    price: '118',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner2.png',
    playerCount: 7,
    maleCount: 4,
    femaleCount: 3,
    duration: '4-5小时',
    images: [],
    difficulty: '进阶',
    releaseType: ['盒装'],
    type: ['阵营', '机制'],
    tagLabel: ['人气'],
  },
  {
    name: '时间悖论',
    tags: ['科幻', '推理', '还原'],
    desc: '时间线出现了裂缝，不同时空的你同时出现在同一地点。修复悖论，否则一切都将崩塌。',
    price: '148',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner3.png',
    playerCount: 6,
    maleCount: 3,
    femaleCount: 3,
    duration: '5-6小时',
    images: [],
    difficulty: '高阶',
    releaseType: ['城限'],
    type: ['还原', '推理'],
    tagLabel: ['新本'],
  },
  {
    name: '甜蜜陷阱',
    tags: ['现代', '欢乐', '换换'],
    desc: '一场看似甜蜜的约会，却隐藏着层层陷阱。每个人都在演戏，谁的心意才是真实的？',
    price: '78',
    image: 'https://tdesign.gtimg.com/miniprogram/template/retail/home/v2/banner4.png',
    playerCount: 5,
    maleCount: 2,
    femaleCount: 3,
    duration: '3-4小时',
    images: [],
    difficulty: '新手',
    releaseType: ['盒装'],
    type: ['换了', '情感'],
    tagLabel: ['人气'],
  },
];

let cloudAvailable = false;

function checkCloud() {
  try {
    if (wx.cloud) {
      cloudAvailable = true;
    }
  } catch (e) {
    cloudAvailable = false;
  }
}

checkCloud();

function getLocal(key) {
  try {
    return wx.getStorageSync(key) || [];
  } catch (e) {
    return [];
  }
}

async function cloudGetAll(collection, orderBy) {
  const db = wx.cloud.database();
  const MAX_LIMIT = 20;
  const countRes = await db.collection(collection).count();
  const total = countRes.total;
  if (total === 0) return [];
  const batchTimes = Math.ceil(total / MAX_LIMIT);
  let allData = [];
  for (let i = 0; i < batchTimes; i++) {
    let query = db.collection(collection).skip(i * MAX_LIMIT).limit(MAX_LIMIT);
    if (orderBy) {
      query = query.orderBy(orderBy, 'desc');
    }
    const res = await query.get();
    allData = allData.concat(res.data);
  }
  return allData;
}

async function resolveUrls(items) {
  const urls = [];
  for (const item of items) {
    if (item.avatar && item.avatar.startsWith('cloud://')) urls.push(item.avatar);
    if (item.image && item.image.startsWith('cloud://')) urls.push(item.image);
    if (item.images && Array.isArray(item.images)) {
      for (const img of item.images) {
        if (typeof img === 'string' && img.startsWith('cloud://')) urls.push(img);
      }
    }
  }
  if (urls.length === 0) return items;
  try {
    const res = await wx.cloud.getTempFileURL({ fileList: urls });
    console.log('resolveUrls tempFileURLs:', res.fileList);
    const map = {};
    for (const f of res.fileList) {
      map[f.fileID] = f.tempFileURL;
    }
    for (const item of items) {
      if (item.avatar && map[item.avatar]) item.avatar = map[item.avatar];
      if (item.image && map[item.image]) item.image = map[item.image];
      if (item.images && Array.isArray(item.images)) {
        item.images = item.images.map(img => map[img] || img);
      }
    }
  } catch (e) {
    console.error('resolveUrls fail:', e);
  }
  return items;
}

export async function initSeedData() {
  if (cloudAvailable) {
    try {
      const db = wx.cloud.database();
      const countRes = await db.collection('scripts').count();
      if (countRes.total === 0) {
        for (const script of seedScripts) {
          await db.collection('scripts').add({
            data: { ...script, createdAt: db.serverDate() },
          });
        }
        console.log('seed scripts inserted');
      } else {
        console.log('scripts collection has', countRes.total, 'records, skip seed');
      }
    } catch (e) {
      console.error('initSeedData cloud fail:', e);
    }
  } else {
    try {
      const initialized = wx.getStorageSync(SEED_KEY);
      if (!initialized) {
        wx.setStorageSync(SCRIPT_KEY, seedScripts);
        wx.setStorageSync(STAFF_KEY, []);
        wx.setStorageSync(SEED_KEY, true);
      }
    } catch (e) {}
  }
}

export async function loadStaffList() {
  if (cloudAvailable) {
    try {
      const list = await cloudGetAll('staff', 'createdAt');
      console.log('loadStaffList cloud:', list.length);
      return await resolveUrls(list);
    } catch (e) {
      console.error('loadStaffList cloud fail:', e);
      return getLocal(STAFF_KEY);
    }
  }
  return getLocal(STAFF_KEY);
}

export async function addStaff(name, avatar, gender) {
  if (cloudAvailable) {
    try {
      const db = wx.cloud.database();
      await db.collection('staff').add({
        data: { name, avatar, gender: gender || '男', createdAt: db.serverDate() },
      });
      return await loadStaffList();
    } catch (e) {
      console.error('addStaff fail:', e);
      wx.showToast({ title: '添加DM失败: ' + (e.errMsg || e.message || '未知错误'), icon: 'none', duration: 5000 });
      throw e;
    }
  }
  wx.showToast({ title: '云开发未开通，无法添加', icon: 'none', duration: 3000 });
  throw new Error('cloud not available');
}

export async function deleteStaff(id) {
  if (cloudAvailable) {
    try {
      const db = wx.cloud.database();
      try {
        const res = await db.collection('staff').doc(id).get();
        if (res.data && res.data.avatar) {
          try { await wx.cloud.deleteFile({ fileList: [res.data.avatar] }); } catch (e2) {}
        }
      } catch (e3) {}
      await db.collection('staff').doc(id).remove();
      return await loadStaffList();
    } catch (e) {
      console.error('deleteStaff fail:', e);
      wx.showToast({ title: '删除DM失败: ' + (e.errMsg || e.message || '未知错误'), icon: 'none', duration: 5000 });
      throw e;
    }
  }
  wx.showToast({ title: '云开发未开通，无法删除', icon: 'none', duration: 3000 });
  throw new Error('cloud not available');
}

export async function loadScriptList() {
  if (cloudAvailable) {
    try {
      const list = await cloudGetAll('scripts', 'createdAt');
      console.log('loadScriptList cloud:', list.length);
      return await resolveUrls(list);
    } catch (e) {
      console.error('loadScriptList cloud fail:', e);
      return getLocal(SCRIPT_KEY);
    }
  }
  return getLocal(SCRIPT_KEY);
}

export async function loadScriptById(id) {
  if (cloudAvailable) {
    try {
      const db = wx.cloud.database();
      const res = await db.collection('scripts').doc(id).get();
      return (await resolveUrls([res.data]))[0];
    } catch (e) {
      console.error('loadScriptById fail:', e);
      const list = getLocal(SCRIPT_KEY);
      return list.find(s => s._id === id) || null;
    }
  }
  const list = getLocal(SCRIPT_KEY);
  return list.find(s => s._id === id) || null;
}

export async function addScript(script) {
  if (cloudAvailable) {
    try {
      const db = wx.cloud.database();
      await db.collection('scripts').add({
        data: {
          name: script.name,
          tags: script.tags,
          desc: script.desc,
          price: script.price,
          image: script.image,
          playerCount: script.playerCount || 0,
          maleCount: script.maleCount || 0,
          femaleCount: script.femaleCount || 0,
          duration: script.duration || '',
          images: script.images || [],
          difficulty: script.difficulty || '',
          releaseType: script.releaseType || [],
          type: script.type || [],
          tagLabel: script.tagLabel || [],
          createdAt: db.serverDate(),
        },
      });
      return await loadScriptList();
    } catch (e) {
      console.error('addScript fail:', e);
      wx.showToast({ title: '添加剧本失败: ' + (e.errMsg || e.message || '未知错误'), icon: 'none', duration: 5000 });
      throw e;
    }
  }
  wx.showToast({ title: '云开发未开通，无法添加', icon: 'none', duration: 3000 });
  throw new Error('cloud not available');
}

export async function deleteScript(id) {
  if (cloudAvailable) {
    try {
      const db = wx.cloud.database();
      try {
        const res = await db.collection('scripts').doc(id).get();
        if (res.data && res.data.image) {
          try { await wx.cloud.deleteFile({ fileList: [res.data.image] }); } catch (e2) {}
        }
      } catch (e3) {}
      await db.collection('scripts').doc(id).remove();
      return await loadScriptList();
    } catch (e) {
      console.error('deleteScript fail:', e);
      wx.showToast({ title: '删除剧本失败: ' + (e.errMsg || e.message || '未知错误'), icon: 'none', duration: 5000 });
      throw e;
    }
  }
  wx.showToast({ title: '云开发未开通，无法删除', icon: 'none', duration: 3000 });
  throw new Error('cloud not available');
}

export async function uploadFile(tempFilePath, folder) {
  if (cloudAvailable) {
    try {
      const cloudPath = `${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 8)}.png`;
      const res = await wx.cloud.uploadFile({ cloudPath, filePath: tempFilePath });
      return res.fileID;
    } catch (e) {
      console.error('uploadFile fail:', e);
      wx.showToast({ title: '上传失败: ' + (e.errMsg || e.message || '未知错误'), icon: 'none', duration: 5000 });
      throw e;
    }
  }
  return tempFilePath;
}

export async function loadShopInfo() {
  if (cloudAvailable) {
    try {
      const db = wx.cloud.database();
      const res = await db.collection('shop').doc('shop_main').get();
      return res.data;
    } catch (e) {
      console.error('loadShopInfo cloud fail:', e);
      return { ...defaultShopInfo };
    }
  }
  try {
    const local = wx.getStorageSync(SHOP_KEY);
    if (local && local.name) return local;
  } catch (e) {}
  return { ...defaultShopInfo };
}

export async function isAdmin(openid) {
  if (!cloudAvailable || !openid) return false;
  try {
    const db = wx.cloud.database();
    const res = await db.collection('admins').where({ _openid: openid }).count();
    return res.total > 0;
  } catch (e) {
    console.error('isAdmin fail:', e);
    return false;
  }
}

export async function getAdminList() {
  if (!cloudAvailable) return [];
  try {
    const res = await wx.cloud.callFunction({ name: 'manageAdmin', data: { action: 'list' } });
    if (res.result && res.result.success) {
      return res.result.data;
    }
    return [];
  } catch (e) {
    console.error('getAdminList fail:', e);
    return [];
  }
}

export async function addAdmin(targetOpenid) {
  if (!cloudAvailable) {
    wx.showToast({ title: '云开发未开通，无法添加', icon: 'none', duration: 3000 });
    throw new Error('cloud not available');
  }
  try {
    const res = await wx.cloud.callFunction({ name: 'manageAdmin', data: { action: 'add', targetOpenid } });
    if (res.result && res.result.success) {
      return await getAdminList();
    }
    wx.showToast({ title: res.result.message || '添加失败', icon: 'none', duration: 3000 });
    throw new Error(res.result.message);
  } catch (e) {
    console.error('addAdmin fail:', e);
    wx.showToast({ title: '添加管理员失败: ' + (e.errMsg || e.message || '未知错误'), icon: 'none', duration: 5000 });
    throw e;
  }
}

export async function removeAdmin(targetOpenid) {
  if (!cloudAvailable) {
    wx.showToast({ title: '云开发未开通，无法移除', icon: 'none', duration: 3000 });
    throw new Error('cloud not available');
  }
  try {
    const res = await wx.cloud.callFunction({ name: 'manageAdmin', data: { action: 'remove', targetOpenid } });
    if (res.result && res.result.success) {
      return await getAdminList();
    }
    wx.showToast({ title: res.result.message || '移除失败', icon: 'none', duration: 3000 });
    throw new Error(res.result.message);
  } catch (e) {
    console.error('removeAdmin fail:', e);
    wx.showToast({ title: '移除管理员失败: ' + (e.errMsg || e.message || '未知错误'), icon: 'none', duration: 5000 });
    throw e;
  }
}

export async function getOpenId() {
  if (!cloudAvailable) return null;
  try {
    const res = await wx.cloud.callFunction({ name: 'getOpenId' });
    if (res.result && res.result.openid) {
      return res.result.openid;
    }
    return null;
  } catch (e) {
    console.error('getOpenId fail:', e);
    return null;
  }
}

export async function saveShopInfo(shopInfo) {
  const data = {
    name: shopInfo.name || '',
    address: shopInfo.address || '',
    wechatId: shopInfo.wechatId || '',
    phone: shopInfo.phone || '',
  };
  if (cloudAvailable) {
    try {
      const db = wx.cloud.database();
      await db.collection('shop').doc('shop_main').set({
        data: { ...data, updatedAt: db.serverDate() },
      });
      try { wx.setStorageSync(SHOP_KEY, data); } catch (e2) {}
      return data;
    } catch (e) {
      console.error('saveShopInfo cloud fail:', e);
      wx.showToast({
        title: '保存失败: ' + (e.errMsg || e.message || '未知错误'),
        icon: 'none',
        duration: 3000,
      });
      throw e;
    }
  }
  wx.showToast({ title: '云开发未开通，无法保存', icon: 'none', duration: 3000 });
  throw new Error('cloud not available');
}
