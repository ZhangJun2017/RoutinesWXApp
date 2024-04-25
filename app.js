// app.js
App({
  onLaunch() {
    wx.redirectTo({
      url: '/pages/todoList/todoList'
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  askForAddTodo() {
    window.alert(window.prompt('请输入待办内容：'))
  },
  globalData: {
    userInfo: null
  }
})