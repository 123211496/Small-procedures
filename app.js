//app.js

App({
  globalData: {
    URL: 'http://192.168.10.191:8080/kldis'
    // URL:'http://192.168.10.163:8088/kldis'
    // URL:'https://admin.gzyunku.com'
    // URL: 'http://192.168.1.110:8080/kldis'
  },
  onLaunch: function() {
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //    
    //  })
  },
  ajax(url, cd) {
    // return new Promise(function(resolve,reject){
      wx.request({
        url: url,
        data: cd,
        method: 'GET',
        success: res => {
        },
        fall: res => {
          wx.showModal({
            title: '提示',
            content: '网络异常，请稍后再试',
          })
        }
      })
    // })
    return promise
  },
  onShow:function(options){
    
  }
})