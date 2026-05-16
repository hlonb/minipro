const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const { action, targetOpenid } = event

  const adminRes = await db.collection('admins').where({ _openid: openid }).count()
  if (adminRes.total === 0) {
    return { success: false, message: '你不是管理员' }
  }

  if (action === 'add') {
    if (!targetOpenid) {
      return { success: false, message: '请提供要添加的openid' }
    }
    const existRes = await db.collection('admins').where({ _openid: targetOpenid }).count()
    if (existRes.total > 0) {
      return { success: false, message: '该用户已是管理员' }
    }
    await db.collection('admins').add({ data: { _openid: targetOpenid, createdAt: db.serverDate() } })
    return { success: true, message: '添加成功' }
  }

  if (action === 'remove') {
    if (!targetOpenid) {
      return { success: false, message: '请提供要移除的openid' }
    }
    const targetRes = await db.collection('admins').where({ _openid: targetOpenid }).get()
    if (targetRes.data.length === 0) {
      return { success: false, message: '该用户不是管理员' }
    }
    await db.collection('admins').doc(targetRes.data[0]._id).remove()
    return { success: true, message: '移除成功' }
  }

  if (action === 'list') {
    const list = await db.collection('admins').orderBy('createdAt', 'desc').limit(100).get()
    return { success: true, data: list.data }
  }

  return { success: false, message: '未知操作' }
}
